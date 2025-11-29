"use client";

import React, { useState, useEffect } from "react";
import ImageComponent from "@/components/ImageComponent";
import FloatingShapes from "@/components/FloatingShapes";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";

const Clients = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const apiURL = process.env.NEXT_PUBLIC_API_URL;
        if (!apiURL) {
          console.error("API URL is not configured");
          return;
        }
        const res = await fetch(`${apiURL}/getallcarousel`);
        if (!res.ok) {
          console.error(`Failed to fetch brands. Status: ${res.status}`);
          return;
        }
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="relative  px-2 overflow-hidden py-20">
      {/* Floating geometric shapes */}
      <FloatingShapes />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-200 mb-4 relative inline-block">
          Trusted by Companies & Brands
          <span className="block h-1 w-24 bg-indigo-500 rounded mt-2 mx-auto"></span>
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed mb-12">
          We’ve delivered digital solutions for businesses across industries.
          These are some of the respected brands we’ve partnered with.
        </p>

        {/* Marquee container */}
        <div className="overflow-hidden relative">
          <div className="flex w-max animate-slide whitespace-nowrap gap-10">
            {brands.length > 0 &&
              [...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand.imgSrc}-${index}`}
                  className="bg-white rounded-xl shadow-sm p-4 flex justify-center items-center min-w-[120px]"
                >
                  <ImageComponent
                    imageName={brand.imgSrc}
                    alt={`Client logo ${index + 1}`}
                    className="h-24 sm:h-32 md:h-40 object-contain"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mt-10 -mb-15">
          <CallOrWhatsApp />
        </div>
      </div>
    </section>
  );
};

export default Clients;

