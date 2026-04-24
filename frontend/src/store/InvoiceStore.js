"use client";

import { create } from "zustand";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const authHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return { headers: { Authorization: `Bearer ${token}` } };
};

const useInvoiceStore = create((set, get) => ({
  invoices: [],
  invoice: null,
  stats: null,
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null,
  filters: { status: "", search: "", page: 1, limit: 20 },

  setFilter: (patch) =>
    set((s) => ({ filters: { ...s.filters, ...patch, page: patch.page || 1 } })),

  fetchInvoices: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== "" && v != null),
      );
      const res = await axios.get(`${apiUrl}/invoices`, { params, ...authHeaders() });
      set({
        invoices: res.data.invoices || [],
        total: res.data.total || 0,
        page: res.data.page || 1,
        pages: res.data.pages || 1,
        loading: false,
      });
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
    }
  },

  fetchInvoice: async (id) => {
    set({ loading: true, invoice: null });
    try {
      const res = await axios.get(`${apiUrl}/invoices/${id}`, authHeaders());
      set({ invoice: res.data.invoice, loading: false });
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
    }
  },

  fetchStats: async () => {
    try {
      const res = await axios.get(`${apiUrl}/invoices/stats`, authHeaders());
      set({ stats: res.data });
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message });
    }
  },

  createInvoice: async (data) => {
    const res = await axios.post(`${apiUrl}/invoices`, data, authHeaders());
    return res.data.invoice;
  },

  updateInvoice: async (id, data) => {
    const res = await axios.put(`${apiUrl}/invoices/${id}`, data, authHeaders());
    set({ invoice: res.data.invoice });
    return res.data.invoice;
  },

  recordPayment: async (id, amount) => {
    const res = await axios.patch(
      `${apiUrl}/invoices/${id}/payment`,
      { amount },
      authHeaders(),
    );
    set({ invoice: res.data.invoice });
    return res.data.invoice;
  },

  markSent: async (id) => {
    const res = await axios.patch(`${apiUrl}/invoices/${id}/send`, {}, authHeaders());
    set({ invoice: res.data.invoice });
    return res.data.invoice;
  },

  deleteInvoice: async (id) => {
    await axios.delete(`${apiUrl}/invoices/${id}`, authHeaders());
    await get().fetchInvoices();
  },
}));

export default useInvoiceStore;
