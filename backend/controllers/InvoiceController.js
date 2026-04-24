const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");
const InvoiceModel = require("../models/InvoiceModel");
const LeadModel = require("../models/LeadModel");

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
const generateInvoiceNumber = async () => {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;
  const last = await InvoiceModel.findOne({ invoiceNumber: new RegExp(`^${prefix}`) })
    .sort("-createdAt")
    .lean();
  let next = 1;
  if (last && last.invoiceNumber) {
    const n = parseInt(last.invoiceNumber.replace(prefix, ""), 10);
    if (!isNaN(n)) next = n + 1;
  }
  return `${prefix}${String(next).padStart(5, "0")}`;
};

const currencySymbol = (code) =>
  ({ BDT: "৳", USD: "$", EUR: "€", INR: "₹" }[code] || code + " ");

// pdfkit's built-in Helvetica only covers WinAnsi glyphs — it can't render ৳ or ₹.
// Use ASCII-safe labels inside the PDF so no font embedding is required.
const pdfCurrencyLabel = (code) =>
  ({ BDT: "Tk ", USD: "$", EUR: "EUR ", INR: "Rs " }[code] || code + " ");

// -----------------------------------------------------------------------------
// Create invoice
// -----------------------------------------------------------------------------
const createInvoice = asyncHandler(async (req, res) => {
  const data = { ...req.body };

  // Auto-fill client details from lead if a leadId is passed
  if (data.lead && !data.clientName) {
    const lead = await LeadModel.findById(data.lead);
    if (lead) {
      data.clientName = lead.fullName;
      data.clientEmail = lead.emailAddress;
      data.clientPhone = lead.phoneNumber;
      data.clientCompany = lead.company;
      data.currency = data.currency || lead.currency;
    }
  }

  if (!data.clientName) return res.status(400).json({ message: "clientName required" });

  data.invoiceNumber = data.invoiceNumber || (await generateInvoiceNumber());
  data.shareToken = crypto.randomBytes(16).toString("hex");
  if (req.admin?._id) data.createdBy = req.admin._id;

  if (!data.dueDate) {
    const d = new Date();
    d.setDate(d.getDate() + 14); // 14-day default terms
    data.dueDate = d;
  }

  const invoice = await InvoiceModel.create(data);
  res.status(201).json({ message: "Invoice created", invoice });
});

// -----------------------------------------------------------------------------
// List
// -----------------------------------------------------------------------------
const getAllInvoices = asyncHandler(async (req, res) => {
  const { status, lead, search, page = 1, limit = 50 } = req.query;
  const query = {};
  if (status) query.status = status;
  if (lead) query.lead = lead;
  if (search) {
    const s = new RegExp(search, "i");
    query.$or = [{ invoiceNumber: s }, { clientName: s }, { clientEmail: s }, { clientCompany: s }];
  }
  const skip = (Number(page) - 1) * Number(limit);
  const [invoices, total] = await Promise.all([
    InvoiceModel.find(query).sort("-createdAt").skip(skip).limit(Number(limit)).lean(),
    InvoiceModel.countDocuments(query),
  ]);
  res.json({ total, page: Number(page), pages: Math.ceil(total / Number(limit)), invoices });
});

// Single invoice
const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await InvoiceModel.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });
  res.json({ invoice });
});

// Public invoice (via shareToken — no auth)
const getInvoiceByToken = asyncHandler(async (req, res) => {
  const invoice = await InvoiceModel.findOne({ shareToken: req.params.token });
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });
  res.json({ invoice });
});

// Update invoice
const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await InvoiceModel.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });
  Object.assign(invoice, req.body);
  await invoice.save();
  res.json({ message: "Invoice updated", invoice });
});

// Record payment
const recordPayment = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ message: "amount required" });
  const invoice = await InvoiceModel.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });
  invoice.amountPaid = Number(invoice.amountPaid || 0) + Number(amount);
  await invoice.save();
  res.json({ message: "Payment recorded", invoice });
});

// Mark as Sent
const markSent = asyncHandler(async (req, res) => {
  const invoice = await InvoiceModel.findById(req.params.id);
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });
  invoice.status = "Sent";
  await invoice.save();
  res.json({ message: "Invoice marked as sent", invoice });
});

// Delete
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await InvoiceModel.findByIdAndDelete(req.params.id);
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });
  res.json({ message: "Invoice deleted" });
});

// Stats for dashboard
const getInvoiceStats = asyncHandler(async (req, res) => {
  const stats = await InvoiceModel.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        total: { $sum: "$total" },
        due: { $sum: "$amountDue" },
      },
    },
  ]);
  const totals = await InvoiceModel.aggregate([
    {
      $group: {
        _id: null,
        totalInvoiced: { $sum: "$total" },
        totalPaid: { $sum: "$amountPaid" },
        totalDue: { $sum: "$amountDue" },
      },
    },
  ]);
  res.json({ byStatus: stats, totals: totals[0] || {} });
});

// -----------------------------------------------------------------------------
// PDF generation (pdfkit)
// -----------------------------------------------------------------------------
const streamInvoicePdf = asyncHandler(async (req, res) => {
  // Supports both authed (/invoices/:id/pdf) and public (/invoices/public/:token/pdf)
  let invoice;
  if (req.params.token) {
    invoice = await InvoiceModel.findOne({ shareToken: req.params.token });
  } else {
    invoice = await InvoiceModel.findById(req.params.id);
  }
  if (!invoice) return res.status(404).json({ message: "Invoice not found" });

  // Use PDF-safe labels (pdfkit's Helvetica can't render ৳ or ₹)
  const sym = pdfCurrencyLabel(invoice.currency);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${invoice.invoiceNumber}.pdf"`,
  );

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(res);

  // --- Header bar ---
  doc.rect(0, 0, doc.page.width, 90).fill("#ff6a00");
  doc.fillColor("#ffffff").fontSize(26).font("Helvetica-Bold").text("INVOICE", 50, 32);
  doc
    .fontSize(10)
    .font("Helvetica")
    .text(invoice.issuerName || "Your Agency", 0, 38, { align: "right", width: doc.page.width - 50 })
    .text(invoice.issuerEmail || "", { align: "right", width: doc.page.width - 50 })
    .text(invoice.issuerPhone || "", { align: "right", width: doc.page.width - 50 });

  doc.fillColor("#000000");
  doc.moveDown(3);

  // --- Meta block ---
  const metaY = 120;
  doc.fontSize(11).font("Helvetica-Bold").text("Bill To:", 50, metaY);
  doc
    .font("Helvetica")
    .text(invoice.clientName, 50, metaY + 16)
    .text(invoice.clientCompany || "", 50)
    .text(invoice.clientEmail || "", 50)
    .text(invoice.clientPhone || "", 50)
    .text(invoice.clientAddress || "", 50, undefined, { width: 250 });

  doc.font("Helvetica-Bold").text("Invoice #:", 370, metaY);
  doc.font("Helvetica").text(invoice.invoiceNumber, 450, metaY);
  doc.font("Helvetica-Bold").text("Issue Date:", 370, metaY + 18);
  doc.font("Helvetica").text(new Date(invoice.issueDate).toLocaleDateString(), 450, metaY + 18);
  doc.font("Helvetica-Bold").text("Due Date:", 370, metaY + 36);
  doc.font("Helvetica").text(new Date(invoice.dueDate).toLocaleDateString(), 450, metaY + 36);
  doc.font("Helvetica-Bold").text("Status:", 370, metaY + 54);
  doc.font("Helvetica").text(invoice.status, 450, metaY + 54);

  // --- Items table ---
  let y = 240;
  doc.rect(50, y, doc.page.width - 100, 22).fill("#f3f4f6");
  doc.fillColor("#111827").font("Helvetica-Bold").fontSize(10);
  doc.text("DESCRIPTION", 60, y + 6);
  doc.text("QTY", 340, y + 6, { width: 40, align: "right" });
  doc.text("PRICE", 390, y + 6, { width: 70, align: "right" });
  doc.text("AMOUNT", 470, y + 6, { width: 80, align: "right" });
  doc.fillColor("#000000");
  y += 26;

  doc.font("Helvetica").fontSize(10);
  invoice.items.forEach((it) => {
    const descHeight = doc.heightOfString(it.description, { width: 270 });
    const rowHeight = Math.max(20, descHeight + 6);
    if (y + rowHeight > doc.page.height - 180) {
      doc.addPage();
      y = 50;
    }
    doc.text(it.description, 60, y, { width: 270 });
    doc.text(String(it.quantity), 340, y, { width: 40, align: "right" });
    doc.text(sym + Number(it.unitPrice).toFixed(2), 390, y, { width: 70, align: "right" });
    doc.text(sym + Number(it.amount).toFixed(2), 470, y, { width: 80, align: "right" });
    y += rowHeight;
    doc.moveTo(50, y - 2).lineTo(doc.page.width - 50, y - 2).strokeColor("#e5e7eb").stroke();
  });

  // --- Totals ---
  y += 10;
  const labelX = 370;
  const valueX = 470;
  const addRow = (label, value, bold = false) => {
    if (bold) doc.font("Helvetica-Bold");
    else doc.font("Helvetica");
    doc.text(label, labelX, y, { width: 90, align: "right" });
    doc.text(value, valueX, y, { width: 80, align: "right" });
    y += 16;
  };
  addRow("Subtotal:", sym + invoice.subTotal.toFixed(2));
  if (invoice.discountAmount > 0)
    addRow(`Discount (${invoice.discountPercent}%):`, "-" + sym + invoice.discountAmount.toFixed(2));
  if (invoice.taxAmount > 0)
    addRow(`Tax (${invoice.taxPercent}%):`, sym + invoice.taxAmount.toFixed(2));

  doc.moveTo(labelX, y).lineTo(doc.page.width - 50, y).stroke();
  y += 6;
  doc.fontSize(12);
  addRow("TOTAL:", sym + invoice.total.toFixed(2), true);
  doc.fontSize(10);
  if (invoice.amountPaid > 0)
    addRow("Paid:", sym + Number(invoice.amountPaid).toFixed(2));
  addRow("Amount Due:", sym + invoice.amountDue.toFixed(2), true);

  // --- Notes & terms ---
  y += 20;
  if (y > doc.page.height - 150) {
    doc.addPage();
    y = 50;
  }
  doc.font("Helvetica-Bold").fontSize(10).text("Notes", 50, y);
  y += 14;
  doc.font("Helvetica").fontSize(10).text(invoice.notes || "", 50, y, { width: doc.page.width - 100 });
  y += 40;
  doc.font("Helvetica-Bold").fontSize(10).text("Terms", 50, y);
  y += 14;
  doc.font("Helvetica").fontSize(10).text(invoice.terms || "", 50, y, { width: doc.page.width - 100 });

  // --- Footer ---
  doc
    .fontSize(8)
    .fillColor("#6b7280")
    .text(
      `Invoice ${invoice.invoiceNumber} — generated ${new Date().toLocaleString()}`,
      50,
      doc.page.height - 60,
      { align: "center", width: doc.page.width - 100 },
    );

  doc.end();
});

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getInvoiceByToken,
  updateInvoice,
  recordPayment,
  markSent,
  deleteInvoice,
  getInvoiceStats,
  streamInvoicePdf,
};
