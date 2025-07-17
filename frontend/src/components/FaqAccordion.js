"use client";

import React, { useState, useRef, useEffect } from "react";
import FloatingShapes from "@/components/FloatingShapes";

const FaqAccordion = ({ faqs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [heights, setHeights] = useState([]);

  const refs = useRef([]);

  useEffect(() => {
    const calculatedHeights = refs.current.map((ref) =>
      ref ? ref.scrollHeight : 0
    );
    setHeights(calculatedHeights);
  }, [faqs]);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="faqs" className="bg-indigo-950 pt-20 px-4 scroll-mt-20 relative">
      <FloatingShapes />

      <div className="xl:container xl:mx-auto flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-5xl font-bold text-white mb-10 text-center">
          Frequently Asked Questions
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </h2>

        <div className="space-y-4 md:w-4xl mx-auto text-gray-100 w-full max-w-4xl">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-700 rounded-lg overflow-hidden transition-all duration-300">
              <button
                className="w-full text-left px-4 py-3 flex justify-between items-center cursor-pointer focus:outline-none"
                onClick={() => toggle(index)}
              >
                <span className="text-lg md:text-xl font-medium">
                  {faq.question}
                </span>
                <span className="text-xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              <div
                ref={(el) => (refs.current[index] = el)}
                style={{
                  maxHeight: activeIndex === index ? `${heights[index]}px` : "0px",
                  opacity: activeIndex === index ? 1 : 0,
                }}
                className="transition-all duration-500 ease-in-out px-4 overflow-hidden"
              >
                <div className="pb-4 text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
