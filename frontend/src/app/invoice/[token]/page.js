"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import { statusColor, formatDate, formatMoney } from "@/utils/crm";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PublicInvoicePage({ params }) {
  const { token } = use(params);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiUrl}/invoices/public/${token}`);
        setInvoice(res.data.invoice);
      } catch (e) {
        setError(e?.response?.data?.message || "Invoice not found");
      }
    })();
  }, [token]);

  if (error)
    return (
      <div className="mx-auto max-w-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Invoice unavailable</h1>
        <p className="mt-2 text-sm text-gray-500">{error}</p>
      </div>
    );

  if (!invoice)
    return <div className="p-8 text-center text-gray-500">Loading invoice…</div>;

  const pdfUrl = `${apiUrl}/invoices/public/${token}/pdf`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 print:bg-white">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <h1 className="text-xl font-semibold text-gray-900">
            Invoice {invoice.invoiceNumber}
          </h1>
          <div className="flex gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Download PDF
            </a>
            <button
              onClick={() => window.print()}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Print
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm print:shadow-none print:border-0">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest opacity-80">Invoice</div>
                <div className="text-2xl font-bold">{invoice.invoiceNumber}</div>
              </div>
              <span className={`rounded-full border px-3 py-0.5 text-xs font-medium ${statusColor(invoice.status)}`}>
                {invoice.status}
              </span>
            </div>
          </div>

          <div className="p-6">
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

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700 md:grid-cols-3">
              <Info k="Issue Date" v={formatDate(invoice.issueDate)} />
              <Info k="Due Date" v={formatDate(invoice.dueDate)} />
              <Info k="Currency" v={invoice.currency} />
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
        </div>
      </div>
    </div>
  );
}

const Info = ({ k, v }) => (
  <div>
    <div className="text-xs uppercase text-gray-500">{k}</div>
    <div className="mt-0.5 font-medium text-gray-800">{v}</div>
  </div>
);

const Row = ({ k, v }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{k}</span>
    <span className="text-gray-900">{v}</span>
  </div>
);
