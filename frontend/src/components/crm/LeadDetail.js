"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useLeadStore from "@/store/LeadStore";
import {
  LEAD_STATUSES,
  statusColor,
  priorityColor,
  formatDate,
  formatDateTime,
  formatMoney,
} from "@/utils/crm";

export default function LeadDetail({ id }) {
  const router = useRouter();
  const { lead, loading, fetchLead, updateStatus, addActivity, deleteLead } = useLeadStore();

  const [note, setNote] = useState("");
  const [outcome, setOutcome] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [activityType, setActivityType] = useState("call");
  const [dealValue, setDealValue] = useState("");
  const [lostReason, setLostReason] = useState("");
  const [showWonModal, setShowWonModal] = useState(false);
  const [showLostModal, setShowLostModal] = useState(false);

  useEffect(() => {
    fetchLead(id);
  }, [id, fetchLead]);

  if (loading || !lead) {
    return <div className="p-8 text-center text-gray-500">Loading lead…</div>;
  }

  const logActivity = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    await addActivity(id, {
      type: activityType,
      content: note,
      outcome,
      nextActionAt: nextAction || undefined,
    });
    setNote("");
    setOutcome("");
    setNextAction("");
  };

  const changeStatus = async (status) => {
    if (status === "Won") return setShowWonModal(true);
    if (status === "Lost") return setShowLostModal(true);
    await updateStatus(id, status);
  };

  const confirmWon = async () => {
    await updateStatus(id, "Won", { dealValue: Number(dealValue) || 0 });
    setShowWonModal(false);
  };
  const confirmLost = async () => {
    await updateStatus(id, "Lost", { lostReason });
    setShowLostModal(false);
  };

  const onDelete = async () => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    await deleteLead(id);
    router.push("/admin/dashboard/leads");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/admin/dashboard/leads" className="text-xs text-gray-500 hover:underline">
            ← Back to leads
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">{lead.fullName}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span>{lead.phoneNumber}</span>
            {lead.emailAddress && <span>· {lead.emailAddress}</span>}
            {lead.company && <span>· {lead.company}</span>}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${statusColor(lead.status)}`}>
              {lead.status}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColor(lead.priority)}`}>
              {lead.priority} priority
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {lead.source}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/dashboard/invoices/new?lead=${lead._id}`}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700"
          >
            + Create Invoice
          </Link>
          <button
            onClick={onDelete}
            className="rounded-lg border border-rose-300 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Pipeline stepper */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {LEAD_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => changeStatus(s)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                lead.status === s
                  ? statusColor(s) + " ring-2 ring-offset-1 ring-orange-400"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left: Details */}
        <div className="space-y-4 md:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700">Lead details</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <Row k="Service" v={lead.services || "—"} />
              <Row k="Budget" v={lead.budget ? formatMoney(lead.budget, lead.currency) : "—"} />
              <Row k="Campaign" v={lead.campaign || "—"} />
              <Row k="Website" v={lead.website || "—"} />
              <Row k="Created" v={formatDateTime(lead.createdAt)} />
              <Row k="Last contacted" v={formatDateTime(lead.lastContactedAt)} />
              <Row k="Next follow-up" v={formatDateTime(lead.nextFollowUpAt)} />
              {lead.status === "Won" && (
                <Row k="Deal value" v={formatMoney(lead.dealValue, lead.currency)} />
              )}
              {lead.status === "Lost" && <Row k="Lost reason" v={lead.lostReason || "—"} />}
            </dl>
          </div>

          {lead.message && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700">Original message</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{lead.message}</p>
            </div>
          )}

          <Link
            href={`/admin/dashboard/leads/${lead._id}/edit`}
            className="block rounded-lg border border-gray-300 px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-50"
          >
            Edit lead
          </Link>
        </div>

        {/* Right: Activities */}
        <div className="md:col-span-2 space-y-4">
          <form onSubmit={logActivity} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700">Log an activity</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
              >
                <option value="call">Call</option>
                <option value="note">Note</option>
                <option value="email">Email</option>
                <option value="meeting">Meeting</option>
              </select>
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
              >
                <option value="">Outcome (optional)</option>
                <option value="answered">Answered</option>
                <option value="no-answer">No answer</option>
                <option value="busy">Busy</option>
                <option value="callback">Callback requested</option>
                <option value="interested">Interested</option>
                <option value="not-interested">Not interested</option>
              </select>
              <input
                type="datetime-local"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What happened on this call / meeting?"
              className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-orange-600"
              >
                Log activity
              </button>
            </div>
          </form>

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-3">
              <h3 className="text-sm font-semibold text-gray-700">Timeline</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {(lead.activities || []).length === 0 && (
                <div className="p-5 text-center text-sm text-gray-400">
                  No activities yet. Log your first call above.
                </div>
              )}
              {(lead.activities || [])
                .slice()
                .reverse()
                .map((a) => (
                  <div key={a._id} className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                        {a.type}
                      </span>
                      {a.outcome && (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {a.outcome}
                        </span>
                      )}
                      <span className="ml-auto text-xs text-gray-400">
                        {formatDateTime(a.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{a.content}</p>
                    {a.nextActionAt && (
                      <div className="mt-1 text-xs text-gray-500">
                        Next action: {formatDateTime(a.nextActionAt)}
                      </div>
                    )}
                    {a.createdByName && (
                      <div className="mt-1 text-xs text-gray-400">by {a.createdByName}</div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Won modal */}
      {showWonModal && (
        <Modal onClose={() => setShowWonModal(false)} title="Mark as Won 🎉">
          <label className="block text-xs font-medium text-gray-600">Final deal value</label>
          <input
            type="number"
            value={dealValue}
            onChange={(e) => setDealValue(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="e.g. 50000"
          />
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setShowWonModal(false)} className="rounded-lg border px-3 py-2 text-sm">
              Cancel
            </button>
            <button onClick={confirmWon} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white">
              Confirm Won
            </button>
          </div>
        </Modal>
      )}
      {showLostModal && (
        <Modal onClose={() => setShowLostModal(false)} title="Mark as Lost">
          <label className="block text-xs font-medium text-gray-600">Reason lost</label>
          <textarea
            rows={3}
            value={lostReason}
            onChange={(e) => setLostReason(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Budget, chose competitor, etc."
          />
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setShowLostModal(false)} className="rounded-lg border px-3 py-2 text-sm">
              Cancel
            </button>
            <button onClick={confirmLost} className="rounded-lg bg-rose-600 px-4 py-2 text-sm text-white">
              Confirm Lost
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

const Row = ({ k, v }) => (
  <div className="flex justify-between gap-4">
    <dt className="text-xs uppercase tracking-wide text-gray-500">{k}</dt>
    <dd className="text-right text-sm text-gray-800">{v}</dd>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  </div>
);
