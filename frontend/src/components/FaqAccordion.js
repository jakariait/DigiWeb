"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";

// Animation variant with staggered delay support
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const FaqAccordion = ({ faqs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="bg-indigo-950 pt-20 px-4 scroll-mt-20 relative">
      <FloatingShapes />

      <div className="xl:container xl:mx-auto flex flex-col items-center justify-center">
        <motion.h2
          className="text-2xl md:text-5xl font-bold text-white mb-10 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          Frequently Asked Questions
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </motion.h2>

        <div className="space-y-4 md:w-4xl mx-auto text-gray-100 w-full max-w-4xl">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-700 rounded-lg"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index + 1}
            >
              <button
                className="w-full text-left px-4 py-3 flex justify-between items-center cursor-pointer focus:outline-none"
                onClick={() => toggle(index)}
              >
                <span className="text-lg md:text-2xl font-medium">
                  {faq.question}
                </span>
                <span className="text-xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
