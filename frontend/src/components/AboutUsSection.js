"use client";
import React from "react";
import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import { getBrandName } from "@/utils/brand";

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

const AboutUsSection = () => {
  return (
    <section className=" text-white pt-20 px-6 lg:px-16 xl:px-28 relative overflow-hidden">
      <FloatingShapes />

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          About Us
        </motion.h2>

        {/* Main Paragraphs */}
        <motion.div
          className="space-y-6 text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
          <p>
            At <span className="text-purple-400 font-semibold">{getBrandName()}</span>, we don’t just deliver services — we deliver results. We are a full-service digital agency passionate about building, scaling, and optimizing brands for the digital era. From stunning websites to conversion-driven eCommerce platforms and targeted marketing campaigns — we provide end-to-end solutions that generate measurable growth.
          </p>

          <p>
            Our team is made up of 16+ in-house experts — web developers, UI/UX designers, eCommerce strategists, and Meta-certified marketers — working together to ensure every project meets high standards and exceeds expectations.
          </p>

          <p>
            Whether you&apos;re a startup aiming to make your mark, or an established brand ready to scale, we bring clarity, creativity, and cutting-edge technology to the table.
          </p>

          <p>
            From <span className="text-blue-400">Bangladesh to beyond</span>, we&apos;ve helped businesses across 8+ countries thrive online with strategic execution and a deep understanding of digital growth.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUsSection;
