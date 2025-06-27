"use client";
import React from "react";
import { motion } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import WhyChooseUs2 from "@/components/WhyChooseUs";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";
import { getBrandName } from "@/utils/brand";

const otherAgencyPoints = [
  "Poor Collaboration",
  "No Support After Delivery",
  "Generic, Template-Based Solutions",
  "Slow, Unstructured Process",
  "Limited Understanding of Your Business",
];

const quixtaPoints = [
  "Quick & Clear Communication",
  "Free Post-Launch Maintenance",
  "Custom-Built Digital Solutions",
  "Transparent Process & Timelines",
  "Deep Industry, Brand and UX Research",
];

// Animation variants for fade-in and slide-up
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function ComparisonSection() {
  return (
    <section className="relative py-24  text-white overflow-hidden">
      <FloatingShapes />
      <WhyChooseUs2 />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 leading-snug"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={-1} // Negative delay to show heading first
        >
          Why Would You Want to{" "}
          <span className="text-pink-400">Settle for Less?</span>
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </motion.h2>

        <motion.p
          className="text-lg text-purple-200 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={0}
        >
          Compare the experience — and see why businesses choose{" "}
          <span className="text-white font-semibold">{getBrandName()}</span>.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-4 text-left">
          {/* Other Agencies */}
          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-red-300/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <div className="flex items-center mb-5">
              <ThumbsDown className="w-7 h-7 text-red-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">Other Agencies</h3>
            </div>
            <ul className="space-y-4 mt-4">
              {otherAgencyPoints.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="text-red-100 border-l-4 border-red-500 pl-4"
                  custom={idx}
                  variants={fadeInUp}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quixta */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-green-300/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <div className="flex items-center mb-5">
              <ThumbsUp className="w-7 h-7 text-green-400 mr-3" />
              <h3 className="text-2xl font-semibold text-white">{getBrandName()}</h3>
            </div>
            <ul className="space-y-4 mt-4">
              {quixtaPoints.map((item, idx) => (
                <motion.li
                  key={idx}
                  className="text-green-100 border-l-4 border-green-400 pl-4"
                  custom={idx}
                  variants={fadeInUp}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="mt-10 -mb-15">
        <CallOrWhatsApp />
      </div>
    </section>
  );
}
