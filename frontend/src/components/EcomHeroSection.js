"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import { getBrandName } from "@/utils/brand";

const EcomHeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);

  const rotatingWords = ["Startups", "Enterprises", "SMEs", "Brands"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative xl:container xl:mx-auto overflow-hidden bg-indigo-950">
      <FloatingShapes />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-30 pb-10 flex items-center">
        <div className="w-full text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white text-sm font-medium">
              Your Trusted E-Commerce Partner
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              {getBrandName()}
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-medium text-purple-300">
              Powers Your Business
            </span>
          </motion.h1>

          {/* Dynamic Subtitle */}
          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-4 h-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span>Custom E-Commerce Solutions for </span>
            <span className="inline-block min-w-[120px] text-left">
              <span
                key={currentWord}
                className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold animate-fade-in"
              >
                {rotatingWords[currentWord]}
              </span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            Boost your online business with our powerful CMS tailored for
            startups and enterprises. Essential tools for effective growth and
            management from Bangladesh`&apos;s leading{" "}
            <span className="text-white font-medium">
              e-commerce development company
            </span>
            .
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <button className="btn-indigo">
              <span className="relative z-10 flex items-center">
                See Pricing
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="px-4 py-2 border-2 border-white/30 rounded-2xl text-white font-medium text-lg hover:bg-white/10 hover:border-white/50 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              Request a Quote
            </button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EcomHeroSection;
