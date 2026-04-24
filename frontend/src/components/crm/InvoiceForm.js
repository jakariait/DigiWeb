"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import useInvoiceStore from "@/store/InvoiceStore";
import { CURRENCIES, currencySymbol, formatMoney } from "@/utils/crm";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const emptyItem = () => ({ description: "", quantity: 1, unitPrice: 0 });

export default function InvoiceForm({ initial = null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadIdFromQuery = searchParams.get("lead");

  const { createInvoice, updateInvoice } = useInvoiceStore();

  const [form, setForm] = useState(
    initial || {
      lead: leadIdFromQuery || "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientAddress: "",
      clientCompany: "",
      issuerName: "",
      issuerEmail: "",
      issuerPhone: "",
      issuerAddress: "",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 14);
        return d.toISOString().slice(0, 10);
      })(),
      currency: "BDT",
      items: [emptyItem()],
      discountPercent: 0,
      taxPercent: 0,
      notes: "Thank you for your business.",
      terms: "Payment is due within the date specified above.",
    },
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Pre-fill from lead if linked
  useEffect(() => {
    const autofill = async () => {
      if (!form.lead || form.clientName || initial) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${apiUrl}/leads/${form.lead}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const l = res.data.lead;
        if (l) {
          setForm((f) => ({
            ...f,
            clientName: l.fullName || "",
            clientEmail: l.emailAddress || "",
            clientPhone: l.phoneNumber || "",
            clientCompany: l.company || "",
            currency: l.currency || f.currency,
          }));
        }
      } catch { /* ignore */ }
    };
    autofill();
  }, [form.lead, form.clientName, initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setItem = (i, k, v) =>
    setForm((f) => ({
      ...f,
      items: f.items.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)),
    }));
  const addItem = () => set("items", [...form.items, emptyItem()]);
  const removeItem = (i) => set("items", form.items.filter((_, idx) => idx !== i));

  // Live totals preview
  const subTotal = form.items.reduce(
    (s, it) => s + Number(it.quantity || 0) * Number(it.unitPrice || 0),
    0,
  );
  const discountAmount = (subTotal * Number(form.discountPercent || 0)) / 100;
  const afterDiscount = subTotal - discountAmount;
  const taxAmount = (afterDiscount * Number(form.taxPercent || 0)) / 100;
  const total = afterDiscount + taxAmount;

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        lead: form.lead || undefined,
        items: form.items.map((it) => ({
          description: it.description,
          quantity: Number(it.quantity) || 0,
          unitPrice: Number(it.unitPrice) || 0,
        })),
        discountPercent: Number(form.discountPercent) || 0,
        taxPercent: Number(form.taxPercent) || 0,
      };
      const saved = initial
        ? await updateInvoice(initial._id, payload)
        : await createInvoice(payload);
      router.push(`/admin/dashboard/invoices/${saved._id}`);
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
      className="mx-auto max-w-5xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-gray-900">
        {initial ? `Edit Invoice ${initial.invoiceNumber}` : "New Invoice"}
      </h2>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Bill From */}
        <div className="rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700">From (Your Agency)</h3>
          <div className="mt-3 space-y-3">
            <div><label className={label}>Name</label><input className={field} value={form.issuerName} onChange={(e) => set("issuerName", e.target.value)} /></div>
            <div><label className={label}>Email</label><input className={field} value={form.issuerEmail} onChange={(e) => set("issuerEmail", e.target.value)} /></div>
            <div><label className={label}>Phone</label><input className={field} value={form.issuerPhone} onChange={(e) => set("issuerPhone", e.target.value)} /></div>
            <div><label className={label}>Address</label><textarea rows={2} className={field} value={form.issuerAddress} onChange={(e) => set("issuerAddress", e.target.value)} /></div>
          </div>
        </div>

        {/* Bill To */}
        <div className="rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700">Bill To (Client)</h3>
          <div className="mt-3 space-y-3">
            <div><label className={label}>Client Name *</label><input required className={field} value={form.clientName} onChange={(e) => set("clientName", e.target.value)} /></div>
            <div><label className={label}>Company</label><input className={field} value={form.clientCompany} onChange={(e) => set("clientCompany", e.target.value)} /></div>
            <div><label className={label}>Email</label><input className={field} value={form.clientEmail} onChange={(e) => set("clientEmail", e.target.value)} /></div>
            <div><label className={label}>Phone</label><input className={field} value={form.clientPhone} onChange={(e) => set("clientPhone", e.target.value)} /></div>
            <div><label className={label}>Address</label><textarea rows={2} className={field} value={form.clientAddress} onChange={(e) => set("clientAddress", e.target.value)} /></div>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="grid gap-4 md:grid-cols-3">
        <div><label className={label}>Issue Date</label><input type="date" className={field} value={form.issueDate?.slice?.(0,10)} onChange={(e) => set("issueDate", e.target.value)} /></div>
        <div><label className={label}>Due Date</label><input type="date" className={field} value={form.dueDate?.slice?.(0,10)} onChange={(e) => set("dueDate", e.target.value)} /></div>
        <div><label className={label}>Currency</label>
          <select className={field} value={form.currency} onChange={(e) => set("currency", e.target.value)}>
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-lg border border-gray-200 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Line Items</h3>
          <button type="button" onClick={addItem} className="rounded-lg border border-gray-300 px-3 py-1 text-xs hover:bg-gray-50">
            + Add item
          </button>
        </div>
        <div className="space-y-2">
          {form.items.map((it, i) => {
            const amt = Number(it.quantity || 0) * Number(it.unitPrice || 0);
            return (
              <div key={i} className="grid grid-cols-12 gap-2">
                <input
                  placeholder="Description"
                  className={`${field} col-span-6`}
                  value={it.description}
                  onChange={(e) => setItem(i, "description", e.target.value)}
                  required
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Qty"
                  className={`${field} col-span-1`}
                  value={it.quantity}
                  onChange={(e) => setItem(i, "quantity", e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Unit price"
                  className={`${field} col-span-2`}
                  value={it.unitPrice}
                  onChange={(e) => setItem(i, "unitPrice", e.target.value)}
                />
                <div className="col-span-2 flex items-center justify-end pr-2 text-sm text-gray-700">
                  {currencySymbol(form.currency)}
                  {amt.toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  disabled={form.items.length === 1}
                  className="col-span-1 rounded-lg text-sm text-rose-600 hover:bg-rose-50 disabled:opacity-30"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Totals */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div><label className={label}>Notes</label><textarea rows={2} className={field} value={form.notes} onChange={(e) => set("notes", e.target.value)} /></div>
          <div><label className={label}>Terms</label><textarea rows={2} className={field} value={form.terms} onChange={(e) => set("terms", e.target.value)} /></div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
          <div className="flex items-center justify-between py-1">
            <span>Subtotal</span>
            <span>{formatMoney(subTotal, form.currency)}</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-1">
            <label>Discount %</label>
            <input type="number" min="0" max="100" step="0.01" className="w-24 rounded border border-gray-300 px-2 py-1 text-right" value={form.discountPercent} onChange={(e) => set("discountPercent", e.target.value)} />
          </div>
          <div className="flex items-center justify-between py-1 text-gray-600">
            <span>− Discount</span>
            <span>{formatMoney(discountAmount, form.currency)}</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-1">
            <label>Tax / VAT %</label>
            <input type="number" min="0" max="100" step="0.01" className="w-24 rounded border border-gray-300 px-2 py-1 text-right" value={form.taxPercent} onChange={(e) => set("taxPercent", e.target.value)} />
          </div>
          <div className="flex items-center justify-between py-1 text-gray-600">
            <span>+ Tax</span>
            <span>{formatMoney(taxAmount, form.currency)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-gray-300 pt-2 text-base font-semibold">
            <span>Total</span>
            <span>{formatMoney(total, form.currency)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 disabled:opacity-60">
          {saving ? "Saving…" : initial ? "Save changes" : "Create invoice"}
        </button>
      </div>
    </form>
  );
}
