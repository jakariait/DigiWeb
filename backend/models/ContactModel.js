const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, required: true },
    emailAddress: { type: String, trim: true },
    phoneNumber: { type: String, trim: true, required: true },
    message: { type: String, trim: true, required: true },
    services: { type: String, trim: true, required: true },
    served: { type: Boolean, default: false }, // Default value set to false

    // Link to CRM lead — set automatically when the public form is submitted,
    // or when an admin manually converts an existing contact into a lead.
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Contact = mongoose.model("Contact", dataSchema);

module.exports = Contact;
