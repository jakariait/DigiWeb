const asyncHandler = require("express-async-handler");
const LeadModel = require("../models/LeadModel");

// Create a new lead (admin enters data from ads/calls)
const createLead = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.admin?._id) {
    data.createdBy = req.admin._id;
    if (!data.assignedTo) {
      data.assignedTo = req.admin._id;
      data.assignedToName = req.admin.name;
    }
  }
  const lead = await LeadModel.create(data);
  res.status(201).json({ message: "Lead created", lead });
});

// List leads with filters, search, pagination
const getAllLeads = asyncHandler(async (req, res) => {
  const {
    status,
    source,
    priority,
    assignedTo,
    search,
    from,
    to,
    page = 1,
    limit = 50,
    sort = "-updatedAt",
  } = req.query;

  const query = {};
  if (status) query.status = status;
  if (source) query.source = source;
  if (priority) query.priority = priority;
  if (assignedTo) query.assignedTo = assignedTo;
  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) query.createdAt.$lte = new Date(to);
  }
  if (search) {
    const s = new RegExp(search, "i");
    query.$or = [
      { fullName: s },
      { emailAddress: s },
      { phoneNumber: s },
      { company: s },
      { services: s },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [leads, total] = await Promise.all([
    LeadModel.find(query).sort(sort).skip(skip).limit(Number(limit)).lean(),
    LeadModel.countDocuments(query),
  ]);

  res.status(200).json({
    message: "Leads retrieved",
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    leads,
  });
});

// Single lead
const getLeadById = asyncHandler(async (req, res) => {
  const lead = await LeadModel.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.status(200).json({ lead });
});

// Update lead (generic fields)
const updateLead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  // if status is being changed, update timestamps
  if (updates.status === "Won" && !updates.wonAt) updates.wonAt = new Date();
  if (updates.status === "Lost" && !updates.lostAt) updates.lostAt = new Date();

  const lead = await LeadModel.findByIdAndUpdate(id, updates, { new: true });
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.status(200).json({ message: "Lead updated", lead });
});

// Quick status update, logs an activity
const updateLeadStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;
  if (!status) return res.status(400).json({ message: "status required" });

  const lead = await LeadModel.findById(id);
  if (!lead) return res.status(404).json({ message: "Lead not found" });

  const previous = lead.status;
  lead.status = status;
  if (status === "Won") {
    lead.wonAt = new Date();
    if (req.body.dealValue != null) lead.dealValue = req.body.dealValue;
  }
  if (status === "Lost") {
    lead.lostAt = new Date();
    if (req.body.lostReason) lead.lostReason = req.body.lostReason;
  }

  lead.activities.push({
    type: "status-change",
    content: `Status changed from ${previous} → ${status}${note ? ` — ${note}` : ""}`,
    createdBy: req.admin?._id,
    createdByName: req.admin?.name,
  });

  await lead.save();
  res.status(200).json({ message: "Status updated", lead });
});

// Add call / note / email activity to a lead
const addActivity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type, content, outcome, nextActionAt } = req.body;

  if (!content) return res.status(400).json({ message: "content required" });

  const lead = await LeadModel.findById(id);
  if (!lead) return res.status(404).json({ message: "Lead not found" });

  lead.activities.push({
    type: type || "note",
    content,
    outcome: outcome || "",
    nextActionAt: nextActionAt ? new Date(nextActionAt) : undefined,
    createdBy: req.admin?._id,
    createdByName: req.admin?.name,
  });

  if (type === "call") lead.lastContactedAt = new Date();
  if (nextActionAt) lead.nextFollowUpAt = new Date(nextActionAt);

  await lead.save();
  res.status(200).json({ message: "Activity added", lead });
});

// Assign lead to an admin
const assignLead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { assignedTo, assignedToName } = req.body;

  const lead = await LeadModel.findByIdAndUpdate(
    id,
    { assignedTo, assignedToName },
    { new: true },
  );
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.status(200).json({ message: "Lead assigned", lead });
});

// Delete a lead
const deleteLead = asyncHandler(async (req, res) => {
  const lead = await LeadModel.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ message: "Lead not found" });
  res.status(200).json({ message: "Lead deleted" });
});

// Dashboard KPIs
const getLeadStats = asyncHandler(async (req, res) => {
  const [byStatus, bySource, recent, totals] = await Promise.all([
    LeadModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 }, value: { $sum: "$dealValue" } } },
    ]),
    LeadModel.aggregate([
      { $group: { _id: "$source", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    LeadModel.find().sort("-createdAt").limit(5).lean(),
    LeadModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          wonValue: {
            $sum: { $cond: [{ $eq: ["$status", "Won"] }, "$dealValue", 0] },
          },
          openCount: {
            $sum: {
              $cond: [
                { $in: ["$status", ["New", "Contacted", "Qualified", "Proposal"]] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]),
  ]);

  res.status(200).json({
    byStatus,
    bySource,
    recent,
    totals: totals[0] || { total: 0, wonValue: 0, openCount: 0 },
  });
});

// Get today's follow-ups
const getTodaysFollowUps = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [todays, pending] = await Promise.all([
    LeadModel.find({
      nextFollowUpAt: { $gte: today, $lt: tomorrow },
      status: { $nin: ["Won", "Lost"] },
    })
      .sort("nextFollowUpAt")
      .lean(),
    LeadModel.find({
      nextFollowUpAt: { $lt: today },
      status: { $nin: ["Won", "Lost"] },
    })
      .sort("nextFollowUpAt")
      .lean(),
  ]);

  res.status(200).json({ todays, pending });
});

// Mark lead as followed up
const markFollowedUp = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nextFollowUpAt, notes } = req.body;

  const lead = await LeadModel.findById(id);
  if (!lead) return res.status(404).json({ message: "Lead not found" });

  lead.activities.push({
    type: "call",
    content: notes || "Follow-up completed",
    outcome: "answered",
    createdBy: req.admin?._id,
    createdByName: req.admin?.name,
  });

  lead.lastContactedAt = new Date();

  if (nextFollowUpAt) {
    lead.nextFollowUpAt = new Date(nextFollowUpAt);
  } else {
    lead.nextFollowUpAt = null;
  }

  await lead.save();
  res.status(200).json({ message: "Marked as followed up", lead });
});

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  updateLeadStatus,
  addActivity,
  assignLead,
  deleteLead,
  getLeadStats,
  getTodaysFollowUps,
  markFollowedUp,
};
