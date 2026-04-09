"use client";
import React from "react";
import { Search, Settings, BarChart2, LayoutDashboard, Target } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const offerings = [
  {
    icon: Search,
    service: "Meta Ads Audit & Report",
    bdPrice: "৳5,000",
    intlPrice: "$100",
  },
  {
    icon: Settings,
    service: "Pixel + Conversion Setup",
    bdPrice: "৳5,000",
    intlPrice: "$100",
  },
  {
    icon: BarChart2,
    service: "CRO (Conversion Rate Optimization)",
    bdPrice: "৳5,000",
    intlPrice: "$100",
  },
  {
    icon: LayoutDashboard,
    service: "Looker Studio Setup",
    bdPrice: "৳5,000",
    intlPrice: "$100",
  },
  {
    icon: Target,
    service: "Google Ads Conversion Tracking",
    bdPrice: "৳5,000",
    intlPrice: "$100",
  },
];

const OneTimeOfferingsSection = () => {
  return (
    <section className="relative px-4 overflow-hidden py-20">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-14 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 relative inline-block">
            One-Time Offerings
            <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed tracking-wide">
            Entry points for clients who aren&apos;t ready for a retainer. Priced to
            convert — not just to profit.
          </p>
        </div>

        {/* Table Header */}
        <motion.div
          className="hidden sm:grid grid-cols-3 gap-4 px-6 py-3 rounded-xl bg-indigo-800/40 border border-indigo-700/40 mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span>Service</span>
          <span className="text-center">BD Price</span>
          <span className="text-center">International</span>
        </motion.div>

        {/* Offering Rows */}
        <div className="space-y-3">
          {offerings.map((item, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-indigo-900/40 backdrop-blur-sm border border-indigo-700/30 rounded-2xl px-6 py-5 hover:border-indigo-500/50 hover:-translate-y-0.5 transition-all duration-300"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Service Name */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-indigo-300" />
                </div>
                <span className="text-white font-medium text-sm sm:text-base">
                  {item.service}
                </span>
              </div>

              {/* BD Price */}
              <div className="flex sm:justify-center items-center gap-2">
                <span className="sm:hidden text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  BD Price:
                </span>
                <span className="text-purple-300 font-bold text-lg">
                  {item.bdPrice}
                </span>
              </div>

              {/* International Price */}
              <div className="flex sm:justify-center items-center gap-2">
                <span className="sm:hidden text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  International:
                </span>
                <span className="text-pink-300 font-bold text-lg">
                  {item.intlPrice}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-gray-400 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          All one-time services include a detailed report & recommendations.{" "}
          <span className="text-indigo-400 font-medium">
            Message us to get started.
          </span>
        </motion.p>
      </div>
    </section>
  );
};

export default OneTimeOfferingsSection;