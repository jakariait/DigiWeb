"use client";
import React from "react";
import {
  LifeBuoy,
  BarChart2,
  MonitorSmartphone,
  Code,
  Wand2,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import { getBrandName } from "@/utils/brand";

const features = [
  {
    title: "Dedicated Support",
    desc: "We pride ourselves on providing top-notch customer support. Our team is ready to assist you with any questions or issues you may encounter, ensuring you're never alone on your e-commerce journey.",
    icon: <LifeBuoy size={40} />,
  },
  {
    title: "Scalability",
    desc: "As your business grows, GetCommerce grows with you. Our platform is scalable, ensuring that your e-commerce website can handle increased traffic and product listings without a hitch.",
    icon: <BarChart2 size={40} />,
  },
  {
    title: "Responsive Design",
    desc: "We provide a fast and secure website service that will help you improve your online presence and protect your data. For more, please check our demo sites.",
    icon: <MonitorSmartphone size={40} />,
  },
  {
    title: "Neat and Clean Code",
    desc: "We provide a fast and secure website service that will help you improve your online presence and protect your data. For more, please check our demo sites.",
    icon: <Code size={40} />,
  },
  {
    title: "Fully Customizable",
    desc: "We provide a fast and secure website service that will help you improve your online presence and protect your data. For more, please check our demo sites.",
    icon: <Wand2 size={40} />,
  },
  {
    title: "Fast & Secure Website",
    desc: "We provide a fast and secure website service that will help you improve your online presence and protect your data. For more, please check our demo sites.",
    icon: <ShieldCheck size={40} />,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const MernCommerceFeatures = () => {
  return (
    <section className="relative bg-indigo-950 text-white pb-10 px-4 overflow-hidden">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={-1}
        >
          Why Choose {getBrandName()}?
          <span className="block h-1 w-24 bg-indigo-500 rounded mt-2 mx-auto"></span>
        </motion.h2>
        <motion.p
          className="text-lg text-indigo-200 mb-12 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          custom={0}
        >
          Everything you need to launch, grow, and scale your eCommerce business
          — fast, flexible, and future-proof.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              custom={idx + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-1 flex flex-col items-center justify-center"
            >
              <div className="mb-4 text-[#5039F7]">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MernCommerceFeatures;
