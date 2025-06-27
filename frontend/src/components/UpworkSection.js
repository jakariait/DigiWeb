"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Briefcase, CheckCircle, Calendar } from "lucide-react";
import { getBrandName } from "@/utils/brand";

const statsData = [
  {
    label: "Hours Worked",
    icon: Clock,
    value: 50000,
    color: "text-green-600",
  },
  {
    label: "Projects Completed",
    icon: Briefcase,
    value: 270,
    color: "text-yellow-500",
  },
  {
    label: "Job Success Rate",
    icon: CheckCircle,
    value: 100,
    suffix: "%",
    color: "text-blue-600",
  },
  {
    label: "Experience",
    icon: Calendar,
    value: 13,
    suffix: "+ Years",
    color: "text-pink-600",
  },
];

export default function UpworkSection() {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const intervals = statsData.map((stat, i) => {
      const increment = stat.value / 50;
      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[i] < stat.value) {
            updated[i] = Math.min(updated[i] + increment, stat.value);
          }
          return updated;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="relative z-10 ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            <span className={"text-indigo-950"}>{getBrandName()}</span> Proven on Upwork
          </h2>

          {/* Subheading */}
          <p className="text-gray-700 text-lg max-w-2xl">
            We’ve built long-term trust with global clients through consistent
            quality and delivery on the world’s top freelancing platform.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 w-full mt-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <div className="p-3 bg-gray-100 rounded-full shadow-inner">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div
                    className={`text-3xl sm:text-4xl font-bold ${stat.color}`}
                  >
                    {Math.floor(counts[index])}
                    {stat.suffix && (
                      <span className="text-xl font-medium ml-1 text-gray-700">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 tracking-wide uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <a
            href="https://www.upwork.com/agencies/638969246336360448/" // replace with your actual profile URL
            target="_blank"
            rel="noopener noreferrer"
            className="btn-indigo"
          >
            View Our Upwork Profile
          </a>
        </div>
      </motion.div>
    </div>
  );
}
