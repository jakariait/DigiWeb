const Contact = require("../models/ContactModel");
const Lead = require("../models/LeadModel");

/**
 * Create a Contact (from public contact form) AND a linked Lead so the
 * sales team sees it inside the CRM pipeline.
 *
 * If the lead creation fails for any reason, we still return the Contact
 * — the public form submission should never bubble an error back to the
 * visitor. Admin can later re-run the conversion via /contacts/:id/convert.
 */
const createContact = async (contactData) => {
  try {
    const contact = new Contact(contactData);
    await contact.save();

    // Mirror the submission into the CRM as a new lead
    try {
      const lead = await Lead.create({
        fullName: contact.fullName,
        phoneNumber: contact.phoneNumber,
        emailAddress: contact.emailAddress,
        services: contact.services,
        message: contact.message,
        source: "Website Form",
        status: "New",
        priority: "Medium",
      });
      contact.leadId = lead._id;
      await contact.save();
    } catch (e) {
      // Swallow — public form should never fail because of a CRM write.
      // Admin can manually convert via /contacts/:id/convert.
      console.error("[contact→lead] failed:", e.message);
    }

    return contact;
  } catch (error) {
    throw new Error("Error creating contact: " + error.message);
  }
};

const getAllContacts = async () => {
  try {
    return await Contact.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Error retrieving contacts: " + error.message);
  }
};

const getContactById = async (id) => {
  try {
    return await Contact.findById(id);
  } catch (error) {
    throw new Error("Error retrieving contact: " + error.message);
  }
};

const updateContact = async (id, contactData) => {
  try {
    return await Contact.findByIdAndUpdate(id, contactData, { new: true });
  } catch (error) {
    throw new Error("Error updating contact: " + error.message);
  }
};

const deleteContact = async (id) => {
  try {
    const result = await Contact.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error("Error deleting contact: " + error.message);
  }
};

/**
 * Convert an existing Contact into a Lead (idempotent — if already linked,
 * return the existing lead without creating a duplicate).
 */
const convertContactToLead = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) throw new Error("Contact not found");

  if (contact.leadId) {
    const existing = await Lead.findById(contact.leadId);
    if (existing) return { contact, lead: existing, alreadyLinked: true };
  }

  const lead = await Lead.create({
    fullName: contact.fullName,
    phoneNumber: contact.phoneNumber,
    emailAddress: contact.emailAddress,
    services: contact.services,
    message: contact.message,
    source: "Website Form",
    status: "New",
    priority: "Medium",
  });
  contact.leadId = lead._id;
  await contact.save();
  return { contact, lead, alreadyLinked: false };
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  convertContactToLead,
};
