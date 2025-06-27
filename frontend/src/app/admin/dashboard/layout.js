"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayoutWrapper({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="pt-5 overflow-hidden">{children}</div>
      </AdminLayout>
    </ProtectedRoute>
  );
}