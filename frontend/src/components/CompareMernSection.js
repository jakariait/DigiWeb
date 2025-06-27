"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";
import WhyChooseUs from "@/components/WhyChooseUs";

const quixtaPoints = [
  "Full design control",
  "Build anything from scratch",
  "Tailored to your exact workflow",
  "Optimized for speed",
  "Grows with your business",
  "Custom responsive design",
  "100% yours",
  "Full access",
  "Choose your host",
  "Any API or service",
  "Fully customizable CMS",
  "Built to your needs",
  "No recurring platform fees",
  "0% (if custom payment gateway)",
  "Higher value",
  "Modular and efficient",
  "Built-in (e.g., chat, sockets)",
  "Fine-tuned control",
  "Tailored security layers",
  "Self-managed policies",
  "Easier to align with legal standards",
  "Full control (GA4, Mixpanel, etc.)",
  "Custom-built automation",
  "Integrated into app flow",
  "Large JS ecosystem",
  "Abundant developers",
  "Long-term dev partnership possible",
];

const otherAgencyPoints = [
  "Limited to templates",
  "Restricted to plugins & apps",
  "Must adapt to available tools",
  "Slower with too many plugins",
  "Needs upgrades or migrations",
  "Often dependent on themes",
  "Data stored on 3rd-party servers",
  "Limited or no backend access",
  "Platform-controlled hosting",
  "Limited to plugins/apps",
  "Predefined CMS structures",
  "Generic dashboards",
  "Monthly subscriptions required",
  "Often charges per transaction",
  "Costly over time with add-ons",
  "Theme/plugin dependent",
  "Rare or requires paid tools",
  "Depends on plugins/themes",
  "Plugin vulnerabilities common",
  "Shared server risks",
  "Harder due to platform restrictions",
  "Basic integrations only",
  "Depends on add-ons",
  "Often not available natively",
  "Larger but plugin-reliant",
  "Easier to find but less flexibility",
  "Usually one-time dev support",
];

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
    },
  }),
};

export default function CompareMernSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleQuixtaPoints = showAll ? quixtaPoints : quixtaPoints.slice(0, 5);
  const visibleOtherPoints = showAll
    ? otherAgencyPoints
    : otherAgencyPoints.slice(0, 5);

  return (
    <section className="relative pt-10 text-white overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 leading-snug"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          custom={-1}
        >
          Why Would You Want to{" "}
          <span className="text-pink-400">Settle for Less?</span>
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </motion.h2>

        <motion.p
          className="text-lg text-purple-200 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          custom={0}
        >
          Compare the experience — and see why businesses choose{" "}
          <span className="text-white font-semibold">MERN Stack</span>.
        </motion.p>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* Other Tech */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-red-300/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-5">
              <ThumbsDown className="w-7 h-7 text-red-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">
                Other Technologies
              </h3>
            </div>
            <ul className="space-y-4 mt-4">
              {visibleOtherPoints.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="text-red-100 border-l-4 border-red-500 pl-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={idx}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* MERN */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-green-300/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-5">
              <ThumbsUp className="w-7 h-7 text-green-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">MERN Stack</h3>
            </div>
            <ul className="space-y-4 mt-4">
              {visibleQuixtaPoints.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="text-green-100 border-l-4 border-green-400 pl-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={idx}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Button */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button onClick={() => setShowAll(!showAll)} className="btn-indigo">
            {showAll ? "Show Less" : "See More Comparisons"}
          </button>
        </motion.div>
      </div>
      <div className="mt-10 -mb-15">
        <CallOrWhatsApp />
      </div>
    </section>
  );
}
