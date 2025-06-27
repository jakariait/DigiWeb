import React from "react";
import AboutUsSection from "@/components/AboutUsSection";
import Clients from "@/components/Clients";
import TeamPreviewSection from "@/components/TeamPreviewSection";
import ContactSection from "@/components/ContactSection";
import ServiceSection from "@/components/ServiceSection";

const Page = () => {
  return (
    <div>
      <AboutUsSection />
      <TeamPreviewSection showLearnMoreButton={false} />
      <ServiceSection />
      <Clients />
      <ContactSection />
    </div>
  );
};

export default Page;