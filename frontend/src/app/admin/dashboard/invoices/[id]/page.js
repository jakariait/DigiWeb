"use client";
import { use } from "react";
import InvoiceDetail from "@/components/crm/InvoiceDetail";

export default function Page({ params }) {
  const { id } = use(params);
  return <InvoiceDetail id={id} />;
}
