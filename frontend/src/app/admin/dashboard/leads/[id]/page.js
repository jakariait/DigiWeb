"use client";
import { use } from "react";
import LeadDetail from "@/components/crm/LeadDetail";

export default function Page({ params }) {
  const { id } = use(params);
  return <LeadDetail id={id} />;
}
