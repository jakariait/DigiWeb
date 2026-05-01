"use client";

import { useEffect } from "react";
import Link from "next/link";
import useLeadStore from "@/store/LeadStore";
import {
  LEAD_STATUSES,
  LEAD_SOURCES,
  statusColor,
  priorityColor,
  formatDate,
  formatMoney,
} from "@/utils/crm";

export default function LeadTable() {
  const {
    leads,
    total,
    page,
    pages,
    loading,
    filters,
    setFilter,
    fetchLeads,
    deleteLead,
  } = useLeadStore();

  useEffect(() => {
    fetchLeads();
  }, [filters, fetchLeads]);

  const onDelete = async (id) => {
    if (!confirm("Delete this lead?")) return;
    await deleteLead(id);
  };

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500">{total} total</p>
        </div>
        <Link
          href="/admin/dashboard/leads/new"
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-orange-600"
        >
          + New Lead
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 md:grid-cols-4">
        <input
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="Search name, phone, email…"
          value={filters.search}
          onChange={(e) => setFilter({ search: e.target.value })}
        />
        <select
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          value={filters.status}
          onChange={(e) => setFilter({ status: e.target.value })}
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          value={filters.source}
          onChange={(e) => setFilter({ source: e.target.value })}
        >
          <option value="">All sources</option>
          {LEAD_SOURCES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={() =>
            setFilter({ status: "", source: "", search: "", page: 1 })
          }
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Reset filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Next Follow-up</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && leads.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                  No leads found.
                </td>
              </tr>
            )}
            {leads.map((l) => (
              <tr key={l._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/dashboard/leads/${l._id}`}
                    className="font-medium text-gray-900 hover:text-orange-600"
                  >
                    {l.fullName}
                  </Link>
                  {l.company && <div className="text-xs text-gray-500">{l.company}</div>}
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-800">{l.phoneNumber}</div>
                  {l.emailAddress && (
                    <div className="text-xs text-gray-500">{l.emailAddress}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">{l.services || "—"}</td>
                <td className="px-4 py-3 text-gray-700">{l.source}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColor(l.status)}`}
                  >
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColor(l.priority)}`}
                  >
                    {l.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {l.nextFollowUpAt ? formatDate(l.nextFollowUpAt) : "—"}
                </td>
                <td className="px-4 py-3 text-gray-500">{formatDate(l.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onDelete(l._id)}
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

      {/* Pagination */}
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
