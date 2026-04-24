"use client";

import { create } from "zustand";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const authHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return { headers: { Authorization: `Bearer ${token}` } };
};

const useLeadStore = create((set, get) => ({
  leads: [],
  lead: null,
  stats: null,
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null,
  filters: { status: "", source: "", search: "", page: 1, limit: 20 },

  setFilter: (patch) =>
    set((state) => ({ filters: { ...state.filters, ...patch, page: patch.page || 1 } })),

  fetchLeads: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== "" && v != null),
      );
      const res = await axios.get(`${apiUrl}/leads`, { params, ...authHeaders() });
      set({
        leads: res.data.leads || [],
        total: res.data.total || 0,
        page: res.data.page || 1,
        pages: res.data.pages || 1,
        loading: false,
      });
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
    }
  },

  fetchLead: async (id) => {
    set({ loading: true, lead: null });
    try {
      const res = await axios.get(`${apiUrl}/leads/${id}`, authHeaders());
      set({ lead: res.data.lead, loading: false });
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
    }
  },

  fetchStats: async () => {
    try {
      const res = await axios.get(`${apiUrl}/leads/stats`, authHeaders());
      set({ stats: res.data });
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message });
    }
  },

  createLead: async (data) => {
    const res = await axios.post(`${apiUrl}/leads`, data, authHeaders());
    await get().fetchLeads();
    return res.data.lead;
  },

  updateLead: async (id, data) => {
    const res = await axios.put(`${apiUrl}/leads/${id}`, data, authHeaders());
    set({ lead: res.data.lead });
    return res.data.lead;
  },

  updateStatus: async (id, status, extra = {}) => {
    const res = await axios.patch(
      `${apiUrl}/leads/${id}/status`,
      { status, ...extra },
      authHeaders(),
    );
    set({ lead: res.data.lead });
    return res.data.lead;
  },

  addActivity: async (id, payload) => {
    const res = await axios.post(
      `${apiUrl}/leads/${id}/activity`,
      payload,
      authHeaders(),
    );
    set({ lead: res.data.lead });
    return res.data.lead;
  },

  deleteLead: async (id) => {
    await axios.delete(`${apiUrl}/leads/${id}`, authHeaders());
    await get().fetchLeads();
  },
}));

export default useLeadStore;
