"use client";
import { use, useEffect } from "react";
import LeadForm from "@/components/crm/LeadForm";
import useLeadStore from "@/store/LeadStore";

export default function Page({ params }) {
  const { id } = use(params);
  const { lead, fetchLead } = useLeadStore();

  useEffect(() => {
    fetchLead(id);
  }, [id, fetchLead]);

  if (!lead) return <div className="p-8 text-center text-gray-500">Loading…</div>;

  return (
    <div className="p-4 md:p-6">
      <LeadForm initial={lead} />
    </div>
  );
}
