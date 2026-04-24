"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useLeadStore from "@/store/LeadStore";
import {
  LEAD_STATUSES,
  LEAD_SOURCES,
  PRIORITIES,
  CURRENCIES,
} from "@/utils/crm";

const blank = {
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
  company: "",
  website: "",
  source: "Facebook Ad",
  campaign: "",
  services: "",
  budget: "",
  currency: "BDT",
  priority: "Medium",
  status: "New",
  message: "",
  nextFollowUpAt: "",
};

export default function LeadForm({ initial = null, onSaved }) {
  const router = useRouter();
  const [form, setForm] = useState(initial ? { ...blank, ...initial } : blank);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { createLead, updateLead } = useLeadStore();

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        budget: form.budget ? Number(form.budget) : 0,
        nextFollowUpAt: form.nextFollowUpAt || undefined,
      };
      const saved = initial
        ? await updateLead(initial._id, payload)
        : await createLead(payload);
      if (onSaved) return onSaved(saved);
      router.push(`/admin/dashboard/leads/${saved._id}`);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setSaving(false);
    }
  };

  const field = "rounded-lg border border-gray-300 px-3 py-2 text-sm w-full";
  const label = "block text-xs font-medium uppercase tracking-wide text-gray-600 mb-1";

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-4xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-gray-900">
        {initial ? "Edit Lead" : "New Lead"}
      </h2>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={label}>Full Name *</label>
          <input className={field} required value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
        </div>
        <div>
          <label className={label}>Phone Number *</label>
          <input className={field} required value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)} />
        </div>
        <div>
          <label className={label}>Email</label>
          <input className={field} type="email" value={form.emailAddress} onChange={(e) => set("emailAddress", e.target.value)} />
        </div>
        <div>
          <label className={label}>Company</label>
          <input className={field} value={form.company} onChange={(e) => set("company", e.target.value)} />
        </div>
        <div>
          <label className={label}>Website</label>
          <input className={field} value={form.website} onChange={(e) => set("website", e.target.value)} />
        </div>
        <div>
          <label className={label}>Service Interested In</label>
          <input className={field} placeholder="e.g. Web development, SEO" value={form.services} onChange={(e) => set("services", e.target.value)} />
        </div>

        <div>
          <label className={label}>Lead Source</label>
          <select className={field} value={form.source} onChange={(e) => set("source", e.target.value)}>
            {LEAD_SOURCES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Campaign</label>
          <input className={field} placeholder="e.g. Q2 Ecom Campaign" value={form.campaign} onChange={(e) => set("campaign", e.target.value)} />
        </div>

        <div>
          <label className={label}>Status</label>
          <select className={field} value={form.status} onChange={(e) => set("status", e.target.value)}>
            {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Priority</label>
          <select className={field} value={form.priority} onChange={(e) => set("priority", e.target.value)}>
            {PRIORITIES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className={label}>Budget</label>
          <input className={field} type="number" value={form.budget} onChange={(e) => set("budget", e.target.value)} />
        </div>
        <div>
          <label className={label}>Currency</label>
          <select className={field} value={form.currency} onChange={(e) => set("currency", e.target.value)}>
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={label}>Next Follow-up</label>
          <input className={field} type="datetime-local" value={form.nextFollowUpAt?.slice?.(0,16) || ""} onChange={(e) => set("nextFollowUpAt", e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <label className={label}>Notes / Message</label>
          <textarea className={field} rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white shadow hover:bg-orange-600 disabled:opacity-60"
        >
          {saving ? "Saving…" : initial ? "Save changes" : "Create lead"}
        </button>
      </div>
    </form>
  );
}
