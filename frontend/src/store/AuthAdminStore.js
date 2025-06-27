"use client"; // ✅ Required if used in `app/` directory with React Server Components

import { create } from "zustand";
import axios from "axios";

// ✅ Ensure this env is set in `.env.local` as: NEXT_PUBLIC_API_URL=https://your-api-url.com
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ✅ Zustand store (client-only)
const useAuthAdminStore = create((set) => ({
  admin: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  error: null,
  loading: false,

  initialize: async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      set({ loading: true });
      try {
        const res = await axios.get(`${apiUrl}/admin/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ admin: res.data.admin, token, loading: false });
      } catch (error) {
        console.error("Error initializing admin:", error?.response || error);
        if (error?.response?.status === 403) {
          if (typeof window !== "undefined") localStorage.removeItem("token");
          set({
            admin: null,
            token: null,
            error: "Token expired or invalid",
            loading: false,
          });
        } else {
          set({
            error:
              error?.response?.data?.message || "Failed to initialize admin",
            loading: false,
          });
        }
      }
    } else {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post(`${apiUrl}/admin/login`, {
        email,
        password,
      });

      const { admin } = res.data;
      const token = admin.token;

      if (typeof window !== "undefined") localStorage.setItem("token", token);
      set({ admin, token, loading: false });
      return true; // Return true on successful login
    } catch (error) {
      if (error.response) {
        set({
          error: error.response?.data?.message || "Login failed",
          loading: false,
        });
      } else if (error.request) {
        set({ error: "No response from server", loading: false });
      } else {
        set({ error: error.message, loading: false });
      }
      return false; // Return false on failed login
    }
  },

  logout: () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
    set({ admin: null, token: null });
  },
}));

export default useAuthAdminStore;