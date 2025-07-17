"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageComponent from "@/components/ImageComponent";
import FloatingShapes from "@/components/FloatingShapes";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";

const ClientsGrid = () => {
  const [clients, setClients] = useState([]);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${apiURL}/getallcarousel`);
        const data = await res.json();
        if (Array.isArray(data)) setClients(data);
      } catch (err) {
        console.error("Failed to load clients:", err);
      }
    };
    fetchClients();
  }, [apiURL]);

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

  return (
    <section className="relative px-4 overflow-hidden py-20">
      <FloatingShapes />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-200 mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={-1}
        >
          Our Clients
          <span className="block h-1 w-24 bg-indigo-500 rounded mt-2 mx-auto"></span>
        </motion.h2>

        <p className="text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed mb-12">
          These companies trusted us with their digital presence.
        </p>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {clients.map((client, index) => (
            <motion.div
              key={client.imgSrc + index}
              className="bg-white rounded shadow flex items-center justify-center p-4 cursor-pointer hover:shadow-lg transform transition-all duration-300 hover:scale-101"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={index}
            >
              <ImageComponent
                imageName={client.imgSrc}
                alt={`Client ${index + 1}`}
                className="h-28 object-contain"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <CallOrWhatsApp />
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;
