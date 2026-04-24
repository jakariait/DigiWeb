"use client";
import { use, useEffect } from "react";
import { Suspense } from "react";
import InvoiceForm from "@/components/crm/InvoiceForm";
import useInvoiceStore from "@/store/InvoiceStore";

export default function Page({ params }) {
  const { id } = use(params);
  const { invoice, fetchInvoice } = useInvoiceStore();

  useEffect(() => {
    fetchInvoice(id);
  }, [id, fetchInvoice]);

  if (!invoice) return <div className="p-8 text-center text-gray-500">Loading…</div>;

  return (
    <div className="p-4 md:p-6">
      <Suspense fallback={<div className="text-center text-gray-500">Loading…</div>}>
        <InvoiceForm initial={invoice} />
      </Suspense>
    </div>
  );
}
