"use client";
import React from "react";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { getBrandLogo, getBrandName, getWhatsAppLink } from "@/utils/brand";

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

const FooterSimple = () => {
  return (
    <footer className="bg-indigo-950 text-white py-3 border-t border-indigo-600  border-dashed px-4">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left: Logo and description */}
        <motion.div
          className="flex items-center gap-3"
          variants={fadeInUp}
          custom={0}
        >
          <Image
            src={getBrandLogo()}
            alt="WebNinja Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold">{getBrandName()}</span>
        </motion.div>

        {/* Middle: Social Icons */}
        <motion.div
          className="flex gap-4 text-xl"
          variants={fadeInUp}
          custom={1}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2] hover:text-[#4a8dfc] transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A66C2] hover:text-[#3d7cc9] transition"
          >
            <FaLinkedinIn />
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:text-[#5de287] transition"
          >
            <FaWhatsapp />
          </a>
        </motion.div>

        {/* Right: Copyright */}
        <motion.div
          className="text-sm text-gray-400 text-center md:text-right "
          variants={fadeInUp}
          custom={2}
        >
          © {new Date().getFullYear()} {getBrandName()}. All rights reserved.
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default FooterSimple;
