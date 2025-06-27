import HeroSection from "@/components/HeroSection";
import ServiceSection from "@/components/ServiceSection";
import ComparisonSection from "@/components/ComparisonSection";
import Clients from "@/components/Clients";
import React from "react";
import TeamPreviewSection from "@/components/TeamPreviewSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <ComparisonSection />
      <Clients />
      <TeamPreviewSection />
      <ContactSection />
    </>
  );
}
