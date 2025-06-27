import React from "react";
import ImageComponent from "@/components/ImageComponent";
import FloatingShapes from "@/components/FloatingShapes";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";

async function fetchBrands(apiURL) {
  try {
    const res = await fetch(`${apiURL}/getallcarousel`, { cache: "no-store" });
    // cache: 'no-store' to always fetch fresh data on server-side
    if (!res.ok) throw new Error("Failed to fetch brands");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const Clients = async () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const brands = await fetchBrands(apiURL);

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
            {[...brands, ...brands].map((brand, index) => (
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
