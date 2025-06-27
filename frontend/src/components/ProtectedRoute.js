"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthAdminStore from "@/store/AuthAdminStore";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { token, loading, initialize } = useAuthAdminStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!loading && !token) {
      router.push("/admin");
    }
  }, [token, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-tl primaryBgColor">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="mt-4 text-white text-sm">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return children;
}
