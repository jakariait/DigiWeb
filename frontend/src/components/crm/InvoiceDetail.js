"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useInvoiceStore from "@/store/InvoiceStore";
import { statusColor, formatDate, formatMoney } from "@/utils/crm";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function InvoiceDetail({ id }) {
  const router = useRouter();
  const { invoice, loading, fetchInvoice, recordPayment, markSent, deleteInvoice } = useInvoiceStore();
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchInvoice(id);
  }, [id, fetchInvoice]);

  if (loading || !invoice) {
    return <div className="p-8 text-center text-gray-500">Loading invoice…</div>;
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const pdfUrl = `${apiUrl}/invoices/${invoice._id}/pdf`;

  const openPdf = async () => {
    // Fetch as blob with auth, then open so we can send the Bearer header
    const res = await fetch(pdfUrl, { headers: { Authorization: `Bearer ${token}` } });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/invoice/${invoice.shareToken}`
      : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onPayment = async (e) => {
    e.preventDefault();
    if (!amount) return;
    await recordPayment(id, Number(amount));
    setAmount("");
  };

  const onDelete = async () => {
    if (!confirm("Delete this invoice?")) return;
    await deleteInvoice(id);
    router.push("/admin/dashboard/invoices");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/admin/dashboard/invoices" className="text-xs text-gray-500 hover:underline">
            ← Back to invoices
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Invoice {invoice.invoiceNumber}
          </h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColor(invoice.status)}`}>
              {invoice.status}
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              Issued {formatDate(invoice.issueDate)}
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              Due {formatDate(invoice.dueDate)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={openPdf} className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black">
            Download PDF
          </button>
          {invoice.status === "Draft" && (
            <button onClick={() => markSent(id)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
              Mark as Sent
            </button>
          )}
          <Link href={`/admin/dashboard/invoices/${id}/edit`} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Edit
          </Link>
          <button onClick={onDelete} className="rounded-lg border border-rose-300 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">
            Delete
          </button>
        </div>
      </div>

      {/* Share link */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-medium uppercase text-gray-500">Client share link</div>
            <div className="mt-1 text-sm text-gray-800 break-all">{publicUrl}</div>
          </div>
          <button onClick={copyLink} className="rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Share this link with your client — they can view and download the invoice without logging in.
        </p>
      </div>

      {/* Invoice body */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-xs font-medium uppercase text-gray-500">From</div>
            <div className="mt-1 text-sm text-gray-800">
              <div className="font-medium">{invoice.issuerName || "—"}</div>
              <div>{invoice.issuerEmail}</div>
              <div>{invoice.issuerPhone}</div>
              <div className="whitespace-pre-wrap">{invoice.issuerAddress}</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-medium uppercase text-gray-500">Bill to</div>
            <div className="mt-1 text-sm text-gray-800">
              <div className="font-medium">{invoice.clientName}</div>
              {invoice.clientCompany && <div>{invoice.clientCompany}</div>}
              <div>{invoice.clientEmail}</div>
              <div>{invoice.clientPhone}</div>
              <div className="whitespace-pre-wrap">{invoice.clientAddress}</div>
            </div>
          </div>
        </div>

        <table className="mt-6 min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-right">Qty</th>
              <th className="px-3 py-2 text-right">Price</th>
              <th className="px-3 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoice.items.map((it) => (
              <tr key={it._id}>
                <td className="px-3 py-2">{it.description}</td>
                <td className="px-3 py-2 text-right">{it.quantity}</td>
                <td className="px-3 py-2 text-right">{formatMoney(it.unitPrice, invoice.currency)}</td>
                <td className="px-3 py-2 text-right">{formatMoney(it.amount, invoice.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 ml-auto max-w-xs space-y-1 text-sm">
          <Row k="Subtotal" v={formatMoney(invoice.subTotal, invoice.currency)} />
          {invoice.discountAmount > 0 && (
            <Row k={`Discount (${invoice.discountPercent}%)`} v={`-${formatMoney(invoice.discountAmount, invoice.currency)}`} />
          )}
          {invoice.taxAmount > 0 && (
            <Row k={`Tax (${invoice.taxPercent}%)`} v={formatMoney(invoice.taxAmount, invoice.currency)} />
          )}
          <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold">
            <span>Total</span>
            <span>{formatMoney(invoice.total, invoice.currency)}</span>
          </div>
          <Row k="Paid" v={formatMoney(invoice.amountPaid, invoice.currency)} />
          <div className="flex justify-between text-base font-semibold">
            <span>Due</span>
            <span className={invoice.amountDue > 0 ? "text-rose-600" : "text-emerald-600"}>
              {formatMoney(invoice.amountDue, invoice.currency)}
            </span>
          </div>
        </div>

        {(invoice.notes || invoice.terms) && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 text-sm text-gray-700">
            {invoice.notes && (
              <div>
                <div className="text-xs font-medium uppercase text-gray-500">Notes</div>
                <p className="mt-1 whitespace-pre-wrap">{invoice.notes}</p>
              </div>
            )}
            {invoice.terms && (
              <div>
                <div className="text-xs font-medium uppercase text-gray-500">Terms</div>
                <p className="mt-1 whitespace-pre-wrap">{invoice.terms}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Record payment */}
      {invoice.status !== "Paid" && invoice.status !== "Cancelled" && (
        <form onSubmit={onPayment} className="flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wide text-gray-600 mb-1">Record payment</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Amount received"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            Save payment
          </button>
          <span className="text-xs text-gray-500">Due: {formatMoney(invoice.amountDue, invoice.currency)}</span>
        </form>
      )}
    </div>
  );
}

const Row = ({ k, v }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{k}</span>
    <span className="text-gray-900">{v}</span>
  </div>
);
