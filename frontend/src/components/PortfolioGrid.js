"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageComponent from "@/components/ImageComponent";
import FloatingShapes from "@/components/FloatingShapes";

const PortfolioGrid = () => {
  const [portfolios, setPortfolios] = useState([]);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await fetch(`${apiURL}/portfolio`);
        const data = await res.json();
        if (data.status === "success") setPortfolios(data.data);
      } catch (err) {
        console.error("Failed to load portfolios:", err);
      }
    };
    fetchPortfolios();
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
    <div className="relative text-white px-4 overflow-hidden pb-10">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
          custom={-1}
        >
          Our Portfolio
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </motion.h2>
      </div>

      <div className="grid gap-2 md:grid-cols-2 max-w-7xl mx-auto pt-5">
        {portfolios.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative group rounded shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-101 transition-all duration-300"
          >
            {/* Just image, no zoom or click */}
            <ImageComponent
              imageName={item.portfolioImg}
              className="w-full object-cover"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center
                            opacity-100 md:opacity-0 md:group-hover:opacity-100
                            transition-opacity duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.name}
              </h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-white text-gray-800 px-4 py-1 rounded hover:bg-gray-200 transition"
              >
                Visit Site
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioGrid;
