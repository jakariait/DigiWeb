"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const stats = [
  { number: "500+", label: "Brands Scaled" },
  { number: "2.5M+", label: "Revenue Generated" },
  { number: "300%", label: "Average ROI" },
  { number: "99%", label: "Client Satisfaction" },
];

export default function ClientStatsSlider() {
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8">
      <div className="text-center lg:text-left">
        <div className="text-5xl font-bold text-white mb-2 transition-all duration-500">
          {stats[currentStat].number}
        </div>
        <div className="text-purple-300 text-lg">{stats[currentStat].label}</div>
      </div>

    </div>
  );
}
