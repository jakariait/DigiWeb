"use client";
import { Suspense } from "react";
import InvoiceForm from "@/components/crm/InvoiceForm";

export default function Page() {
  return (
    <div className="p-4 md:p-6">
      <Suspense fallback={<div className="text-center text-gray-500">Loading…</div>}>
        <InvoiceForm />
      </Suspense>
    </div>
  );
}
