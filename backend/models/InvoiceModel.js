const mongoose = require("mongoose");

const lineItemSchema = new mongoose.Schema(
  {
    description: { type: String, trim: true, required: true },
    quantity: { type: Number, default: 1, min: 0 },
    unitPrice: { type: Number, default: 0, min: 0 },
    // computed: quantity * unitPrice (stored for reporting speed)
    amount: { type: Number, default: 0 },
  },
  { _id: true },
);

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    // Link to lead (optional - can also create ad-hoc invoice)
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },

    // Client snapshot (denormalized so invoice is a point-in-time record)
    clientName: { type: String, trim: true, required: true },
    clientEmail: { type: String, trim: true, lowercase: true },
    clientPhone: { type: String, trim: true },
    clientAddress: { type: String, trim: true },
    clientCompany: { type: String, trim: true },

    // Agency / sender snapshot (can be overridden per-invoice)
    issuerName: { type: String, trim: true, default: "" },
    issuerAddress: { type: String, trim: true, default: "" },
    issuerEmail: { type: String, trim: true, default: "" },
    issuerPhone: { type: String, trim: true, default: "" },

    // Dates
    issueDate: { type: Date, default: Date.now, required: true },
    dueDate: { type: Date, required: true },
    paidAt: { type: Date },

    // Line items
    items: { type: [lineItemSchema], default: [] },

    // Money
    currency: { type: String, default: "BDT", enum: ["BDT", "USD", "EUR", "INR"] },
    subTotal: { type: Number, default: 0 },
    discountPercent: { type: Number, default: 0, min: 0, max: 100 },
    discountAmount: { type: Number, default: 0 },
    taxPercent: { type: Number, default: 0, min: 0, max: 100 },
    taxAmount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 },
    amountDue: { type: Number, default: 0 },

    // Status
    status: {
      type: String,
      enum: ["Draft", "Sent", "Paid", "Partial", "Overdue", "Cancelled"],
      default: "Draft",
      index: true,
    },

    // Public share token so client can view without logging in
    shareToken: { type: String, unique: true, sparse: true },

    notes: { type: String, trim: true, default: "Thank you for your business." },
    terms: { type: String, trim: true, default: "Payment is due within the date specified above." },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true, versionKey: false },
);

// Recompute totals every time the invoice is validated / saved.
// Note: this is registered as a no-arg async hook so it fires during .validate()
// and .save() but NOT during .validateSync() (which is expected for Mongoose).
invoiceSchema.pre("validate", function () {
  let sub = 0;
  (this.items || []).forEach((it) => {
    const qty = Number(it.quantity || 0);
    const price = Number(it.unitPrice || 0);
    const amt = Number((qty * price).toFixed(2));
    it.amount = amt;
    sub += amt;
  });
  this.subTotal = Number(sub.toFixed(2));

  this.discountAmount = Number(((this.subTotal * (this.discountPercent || 0)) / 100).toFixed(2));
  const afterDiscount = this.subTotal - this.discountAmount;

  this.taxAmount = Number(((afterDiscount * (this.taxPercent || 0)) / 100).toFixed(2));
  this.total = Number((afterDiscount + this.taxAmount).toFixed(2));
  this.amountDue = Number((this.total - (this.amountPaid || 0)).toFixed(2));

  // Derive status if not manually set to Cancelled
  if (this.status !== "Cancelled") {
    if (this.amountPaid >= this.total && this.total > 0) {
      this.status = "Paid";
      if (!this.paidAt) this.paidAt = new Date();
    } else if (this.amountPaid > 0 && this.amountPaid < this.total) {
      this.status = "Partial";
    } else if (this.dueDate && new Date() > new Date(this.dueDate) && this.status !== "Draft") {
      this.status = "Overdue";
    }
  }
});

const InvoiceModel =
  mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

module.exports = InvoiceModel;
