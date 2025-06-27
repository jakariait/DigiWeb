"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white xl:container xl:mx-auto">
      <AdminSidebar />
      <main className="relative text-gray-800">{children}</main>
    </div>
  );
}