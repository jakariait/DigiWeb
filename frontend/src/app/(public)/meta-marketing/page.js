import React from "react";
import FullServiceMetaAgency from "@/components/FullServiceMetaAgency";
import ContactSection from "@/components/ContactSection";
import FaqAccordion from "@/components/FaqAccordion";
import { metaMarketingFaqData } from "@/utils/faq";

const Page = () => {
  return (
    <div>
      <FullServiceMetaAgency />
      <FaqAccordion faqs={metaMarketingFaqData} />
      <ContactSection />
    </div>
  );
};

export default Page;