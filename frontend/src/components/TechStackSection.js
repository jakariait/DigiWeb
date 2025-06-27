"use client";

import { Code, Server, Database, Globe } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import { motion } from "framer-motion";
import React from "react";

const stack = [
  {
    title: "MongoDB",
    desc: "A flexible NoSQL database perfect for storing structured and unstructured data at scale.",
    icon: <Database className="w-8 h-8 text-green-400 mb-4" />,
  },
  {
    title: "Express.js",
    desc: "A minimal and fast Node.js backend framework that handles routing, APIs, and business logic.",
    icon: <Server className="w-8 h-8 text-blue-400 mb-4" />,
  },
  {
    title: "React.js",
    desc: "A dynamic frontend library that delivers interactive, component-driven user interfaces.",
    icon: <Globe className="w-8 h-8 text-cyan-400 mb-4" />,
  },
  {
    title: "Node.js",
    desc: "A runtime environment that enables JavaScript to run on the server, powering fast and scalable apps.",
    icon: <Code className="w-8 h-8 text-yellow-400 mb-4" />,
  },
];

const TechStackSection = () => {
  return (
    <section className="relative bg-indigo-950 text-white pt-10 px-4 overflow-hidden">
      <FloatingShapes />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Powered by the MERN Stack
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          We build high-performance, scalable web applications using MongoDB, Express.js, React, and Node.js — a full-stack JavaScript solution trusted by top startups and enterprises.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-left">
          {stack.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white group rounded-2xl shadow-md p-6 text-center transition-transform hover:shadow-xl hover:-translate-y-1 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {item.icon}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.05) 0%, transparent 60%)`,
            backgroundSize: "cover",
            height: "100%",
          }}
        ></div>
      </div>
    </section>
  );
};

export default TechStackSection;
