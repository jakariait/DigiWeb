// Shared helpers for the CRM module

export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

export const LEAD_SOURCES = [
  "Facebook Ad",
  "Google Ad",
  "LinkedIn Ad",
  "Website Form",
  "Referral",
  "Cold Call",
  "Walk-in",
  "Other",
];

export const PRIORITIES = ["Low", "Medium", "High"];

export const INVOICE_STATUSES = ["Draft", "Sent", "Paid", "Partial", "Overdue", "Cancelled"];

export const CURRENCIES = ["BDT", "USD", "EUR", "INR"];

export const currencySymbol = (code) =>
  ({ BDT: "৳", USD: "$", EUR: "€", INR: "₹" }[code] || `${code} `);

export const statusColor = (status) =>
  ({
    New: "bg-blue-100 text-blue-700 border-blue-200",
    Contacted: "bg-amber-100 text-amber-700 border-amber-200",
    Qualified: "bg-purple-100 text-purple-700 border-purple-200",
    Proposal: "bg-indigo-100 text-indigo-700 border-indigo-200",
    Won: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Lost: "bg-rose-100 text-rose-700 border-rose-200",
    Draft: "bg-gray-100 text-gray-700 border-gray-200",
    Sent: "bg-blue-100 text-blue-700 border-blue-200",
    Paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Partial: "bg-amber-100 text-amber-700 border-amber-200",
    Overdue: "bg-rose-100 text-rose-700 border-rose-200",
    Cancelled: "bg-gray-100 text-gray-500 border-gray-200",
  }[status] || "bg-gray-100 text-gray-700 border-gray-200");

export const priorityColor = (p) =>
  ({
    Low: "bg-gray-100 text-gray-600",
    Medium: "bg-blue-100 text-blue-600",
    High: "bg-rose-100 text-rose-600",
  }[p] || "bg-gray-100 text-gray-600");

export const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatMoney = (amount, currency = "BDT") =>
  `${currencySymbol(currency)}${Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
