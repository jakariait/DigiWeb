"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import UpworkSection from "@/components/UpworkSection";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";
import ClientStatsSlider from "@/components/ClientStatsSlider";

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

export default function HeroSection() {
  return (
    <div className="relative  overflow-hidden">
      <FloatingShapes />

      <div className="relative z-10 xl:container xl:mx-auto px-4 pt-30 pb-15">
        <div className="flex flex-col lg:flex-row items-center ">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-purple-200 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              custom={0}
            >
              #1 Digital Growth Agency
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              custom={1}
            >
              We Build &
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Scale
              </span>
              <br />
              Your Brand
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              custom={2}
            >
              Through cutting-edge{" "}
              <span className="text-purple-400 font-semibold">
                website development
              </span>
              ,
              <span className="text-blue-400 font-semibold">
                {" "}
                e-commerce solutions
              </span>
              , and
              <span className="text-pink-400 font-semibold">
                {" "}
                meta marketing
              </span>{" "}
              that converts.
            </motion.p>

            {/* Animated Stats */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              custom={3}
              className="mb-8"
            >
              <ClientStatsSlider />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-5 mb-5"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              custom={4}
            >
              <button className="btn-indigo">
                <span className="flex items-center">
                  Start Your Project
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 cursor-pointer">
                View Our Work
              </button>
            </motion.div>
          </div>

          {/* Right Content - Services Grid */}
          <motion.div
            className="lg:w-1/2 mt-16 lg:mt-0 lg:pl-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            custom={5}
          >
            <UpworkSection />
          </motion.div>
        </div>

        <div className="mt-10 -mb-5">
          <CallOrWhatsApp />
        </div>
      </div>
    </div>
  );
}
