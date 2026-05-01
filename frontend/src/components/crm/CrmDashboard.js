"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useLeadStore from "@/store/LeadStore";
import useInvoiceStore from "@/store/InvoiceStore";
import {
  formatMoney,
  formatDate,
  statusColor,
  LEAD_STATUSES,
} from "@/utils/crm";

const StatCard = ({ label, value, sub, tone = "orange" }) => {
  const tones = {
    orange: "from-orange-500 to-amber-500",
    blue: "from-blue-500 to-indigo-500",
    emerald: "from-emerald-500 to-teal-500",
    rose: "from-rose-500 to-pink-500",
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </div>
      <div
        className={`mt-2 bg-gradient-to-r ${tones[tone]} bg-clip-text text-2xl font-bold text-transparent`}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-xs text-gray-500">{sub}</div>}
    </div>
  );
};

export default function CrmDashboard() {
  const {
    stats: leadStats,
    fetchStats: fetchLeadStats,
    todayFollowUps,
    pendingFollowUps,
    fetchTodaysFollowUps,
    markFollowedUp,
  } = useLeadStore();
  const { stats: invStats, fetchStats: fetchInvStats } = useInvoiceStore();
  const [activeTab, setActiveTab] = useState("today");
  const [markingId, setMarkingId] = useState(null);

  useEffect(() => {
    fetchLeadStats();
    fetchInvStats();
    fetchTodaysFollowUps();
  }, [fetchLeadStats, fetchInvStats, fetchTodaysFollowUps]);

  const handleMarkFollowedUp = async (lead) => {
    setMarkingId(lead._id);
    try {
      await markFollowedUp(lead._id, { notes: "Follow-up completed" });
    } catch (e) {
      console.error(e);
    } finally {
      setMarkingId(null);
    }
  };

  const counts = Object.fromEntries(
    (leadStats?.byStatus || []).map((s) => [s._id, s.count]),
  );
  const totalLeads = leadStats?.totals?.total || 0;
  const openLeads = leadStats?.totals?.openCount || 0;
  const wonValue = leadStats?.totals?.wonValue || 0;

  const totalInvoiced = invStats?.totals?.totalInvoiced || 0;
  const totalPaid = invStats?.totals?.totalPaid || 0;
  const totalDue = invStats?.totals?.totalDue || 0;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="text-sm text-gray-500">
            Quick snapshot of your pipeline and invoices.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/dashboard/leads/new"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-orange-600"
          >
            + New Lead
          </Link>
          <Link
            href="/admin/dashboard/invoices/new"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + New Invoice
          </Link>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total Leads" value={totalLeads} tone="blue" />
        <StatCard
          label="Open Pipeline"
          value={openLeads}
          tone="orange"
        />
        <StatCard
          label="Won Deal Value"
          value={formatMoney(wonValue, "BDT")}
          tone="emerald"
        />
        <StatCard
          label="Amount Due"
          value={formatMoney(totalDue, "BDT")}
          tone="rose"
        />
      </div>

      {/* Pipeline breakdown */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700">
          Pipeline by stage
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6">
          {LEAD_STATUSES.map((s) => (
            <Link
              key={s}
              href={`/admin/dashboard/leads?status=${encodeURIComponent(s)}`}
              className={`rounded-lg border p-3 transition hover:shadow ${statusColor(s)}`}
            >
              <div className="text-xs font-medium uppercase">{s}</div>
              <div className="mt-1 text-xl font-bold">{counts[s] || 0}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Follow-ups */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("today")}
              className={`text-sm font-semibold ${
                activeTab === "today" ? "text-orange-600" : "text-gray-500"
              }`}
            >
Today&apos;s Follow-ups
              {todayFollowUps.length > 0 && (
                <span className="ml-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs">
                  {todayFollowUps.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`text-sm font-semibold ${
                activeTab === "pending" ? "text-orange-600" : "text-gray-500"
              }`}
            >
              Pending
              {pendingFollowUps.length > 0 && (
                <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">
                  {pendingFollowUps.length}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {activeTab === "today" && todayFollowUps.length === 0 && (
            <div className="p-5 text-center text-sm text-gray-400">
              No follow-ups for today.
            </div>
          )}
          {activeTab === "pending" && pendingFollowUps.length === 0 && (
            <div className="p-5 text-center text-sm text-gray-400">
              No pending follow-ups.
            </div>
          )}
          {(activeTab === "today" ? todayFollowUps : pendingFollowUps).map((l) => (
            <div
              key={l._id}
              className="flex items-center justify-between px-5 py-3 hover:bg-gray-50"
            >
              <Link
                href={`/admin/dashboard/leads/${l._id}`}
                className="flex-1"
              >
                <div className="text-sm font-medium text-gray-900">
                  {l.fullName}
                </div>
                <div className="text-xs text-gray-500">
                  {l.phoneNumber} · {l.services || "—"}
                </div>
              </Link>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColor(l.status)}`}
                  >
                    {l.status}
                  </span>
                  <div className="mt-1 text-xs text-gray-400">
                    Follow-up: {formatDate(l.nextFollowUpAt)}
                  </div>
                </div>
                <button
                  onClick={() => handleMarkFollowedUp(l)}
                  disabled={markingId === l._id}
                  className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
                >
                  {markingId === l._id ? "..." : "Mark Done"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total Invoiced"
          value={formatMoney(totalInvoiced, "BDT")}
          tone="blue"
        />
        <StatCard
          label="Collected"
          value={formatMoney(totalPaid, "BDT")}
          tone="emerald"
        />
        <StatCard
          label="Outstanding"
          value={formatMoney(totalDue, "BDT")}
          tone="rose"
        />
      </div>

      {/* Recent leads */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          <h2 className="text-sm font-semibold text-gray-700">Recent leads</h2>
          <Link
            href="/admin/dashboard/leads"
            className="text-xs font-medium text-orange-600 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {(leadStats?.recent || []).length === 0 && (
            <div className="p-5 text-center text-sm text-gray-400">
              No leads yet.
            </div>
          )}
          {(leadStats?.recent || []).map((l) => (
            <Link
              key={l._id}
              href={`/admin/dashboard/leads/${l._id}`}
              className="flex items-center justify-between px-5 py-3 hover:bg-gray-50"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {l.fullName}
                </div>
                <div className="text-xs text-gray-500">
                  {l.phoneNumber} · {l.services || "—"} ·{" "}
                  {formatDate(l.createdAt)}
                </div>
              </div>
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColor(l.status)}`}
              >
                {l.status}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
