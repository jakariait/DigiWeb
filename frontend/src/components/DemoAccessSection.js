"use client";
import React from "react";
import {
  LayoutDashboard,
  UserCircle,
  Globe,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";

const features = [
  {
    title: "Admin Panel",
    desc: "Users can easily manage everything from the administrator panel.",
    icon: <LayoutDashboard size={40} />,
    link: "https://mern-ecommerce-chi-seven.vercel.app/admin/login", // Add your demo link here
  },
  {
    title: "User Panel",
    desc: "We made our user panel very accessible and user-friendly to everyone.",
    icon: <UserCircle size={40} />,
    link: "https://mern-ecommerce-chi-seven.vercel.app/login",
  },
  {
    title: "Website Demos",
    desc: "Easy-to-use website designs optimized for maximum conversion.",
    icon: <Globe size={40} />,
    link: "#",
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

const DemoAccessSection = () => {
  return (
    <section className="relative  text-white  px-4 overflow-hidden pb-10">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={-1}
        >
          Demo Access
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </motion.h2>
        <motion.p
          className="text-indigo-200 max-w-2xl mx-auto text-lg mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={0}
        >
          GetCommerce admin panel is user-friendly, visually impressive, and
          adaptable. Enjoy tablet and mobile access for on-the-go management.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-1  flex-col items-center justify-center"
            >
              <div>
                <div className="flex justify-center mb-4">
                  <div className="text-[#5039F7]">{item.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 transition"
                >
                  View Demo <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoAccessSection;
