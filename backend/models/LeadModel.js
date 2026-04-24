const mongoose = require("mongoose");

// Activity / call log entry embedded in each lead
const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["note", "call", "email", "meeting", "status-change"],
      default: "note",
    },
    content: { type: String, trim: true, required: true },
    outcome: {
      type: String,
      enum: ["", "answered", "no-answer", "busy", "callback", "not-interested", "interested"],
      default: "",
    },
    nextActionAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    createdByName: { type: String, trim: true },
  },
  { timestamps: true, _id: true },
);

const leadSchema = new mongoose.Schema(
  {
    // Contact info (entered by admin from ad leads)
    fullName: { type: String, trim: true, required: true },
    emailAddress: { type: String, trim: true, lowercase: true },
    phoneNumber: { type: String, trim: true, required: true, index: true },
    company: { type: String, trim: true },
    website: { type: String, trim: true },

    // Lead source (where it came from)
    source: {
      type: String,
      enum: [
        "Facebook Ad",
        "Google Ad",
        "LinkedIn Ad",
        "Website Form",
        "Referral",
        "Cold Call",
        "Walk-in",
        "Other",
      ],
      default: "Facebook Ad",
    },
    campaign: { type: String, trim: true }, // optional campaign tag

    // What they want
    services: { type: String, trim: true },
    budget: { type: Number, default: 0 },
    currency: { type: String, default: "BDT", enum: ["BDT", "USD", "EUR", "INR"] },
    message: { type: String, trim: true },

    // Pipeline stage - standard 5-stage
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"],
      default: "New",
      index: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // Assignment
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    assignedToName: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

    // Conversion tracking
    wonAt: { type: Date },
    lostAt: { type: Date },
    lostReason: { type: String, trim: true },
    dealValue: { type: Number, default: 0 }, // final agreed value if Won

    // Follow-up
    nextFollowUpAt: { type: Date, index: true },
    lastContactedAt: { type: Date },

    // Tags & activities
    tags: [{ type: String, trim: true }],
    activities: [activitySchema],
  },
  { timestamps: true, versionKey: false },
);

// Compound index for common queries (filter by status + sort by updatedAt)
leadSchema.index({ status: 1, updatedAt: -1 });

const LeadModel =
  mongoose.models.Lead || mongoose.model("Lead", leadSchema);

module.exports = LeadModel;
