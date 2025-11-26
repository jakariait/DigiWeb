"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Headphones, TrendingUp } from "lucide-react";
import { getBrandName } from "@/utils/brand";

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Proven Expertise",
    desc: "Years of experience delivering results-driven websites and marketing solutions.",
  },
  {
    icon: Sparkles,
    title: "Creative Excellence",
    desc: "We blend strategy with stunning design for memorable digital experiences.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Friendly, responsive support that’s with you every step of the way.",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    desc: "Everything we do is aimed at helping your business grow online.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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

const WhyChooseUs = () => {
  return (
    <section className="relative pb-10">
      <div className="max-w-6xl mx-auto text-center mb-16 px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          Why Choose {getBrandName()}?
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </motion.h2>

        <motion.p
          className="text-purple-200 text-lg max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          We’re more than just a service provider — we’re your long-term digital
          growth partner.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-w-6xl mx-auto px-4">
        {whyUs.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-1 "
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index + 2} // delay after heading and paragraph
              whileHover={{ scale: 1.03 }}
            >
              <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-indigo-600 text-white shadow-md">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
