"use client";

import { useEffect } from "react";
import Link from "next/link";
import useInvoiceStore from "@/store/InvoiceStore";
import {
  INVOICE_STATUSES,
  statusColor,
  formatDate,
  formatMoney,
} from "@/utils/crm";

export default function InvoiceTable() {
  const {
    invoices,
    total,
    page,
    pages,
    loading,
    filters,
    setFilter,
    fetchInvoices,
    deleteInvoice,
  } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [filters, fetchInvoices]);

  const onDelete = async (id) => {
    if (!confirm("Delete this invoice?")) return;
    await deleteInvoice(id);
  };

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500">{total} total</p>
        </div>
        <Link
          href="/admin/dashboard/invoices/new"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700"
        >
          + New Invoice
        </Link>
      </div>

      <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 md:grid-cols-3">
        <input
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="Search invoice #, client…"
          value={filters.search}
          onChange={(e) => setFilter({ search: e.target.value })}
        />
        <select
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          value={filters.status}
          onChange={(e) => setFilter({ status: e.target.value })}
        >
          <option value="">All statuses</option>
          {INVOICE_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={() => setFilter({ status: "", search: "", page: 1 })}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Invoice #</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Issued</th>
              <th className="px-4 py-3 text-left">Due</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Due</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && invoices.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  No invoices yet.
                </td>
              </tr>
            )}
            {invoices.map((inv) => (
              <tr key={inv._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/dashboard/invoices/${inv._id}`}
                    className="font-medium text-gray-900 hover:text-orange-600"
                  >
                    {inv.invoiceNumber}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-800">{inv.clientName}</div>
                  {inv.clientCompany && (
                    <div className="text-xs text-gray-500">{inv.clientCompany}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">{formatDate(inv.issueDate)}</td>
                <td className="px-4 py-3 text-gray-700">{formatDate(inv.dueDate)}</td>
                <td className="px-4 py-3 text-gray-800">
                  {formatMoney(inv.total, inv.currency)}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  {formatMoney(inv.amountDue, inv.currency)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColor(inv.status)}`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onDelete(inv._id)}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setFilter({ page: page - 1 })}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => setFilter({ page: page + 1 })}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
