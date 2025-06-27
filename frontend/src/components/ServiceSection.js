"use client";
import React from "react";
import { Globe, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ServiceSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Website Development",
      desc: "We design and develop responsive, SEO-friendly websites that load fast and convert visitors into customers.",
      href: "/ecommerce-website-development",
      features: [
        "Fast loading",
        "Mobile responsive",
        "SEO optimized",
        "Custom design",
        "Analytics integration",
      ],
    },
    {
      icon: TrendingUp,
      title: "E-Commerce Solutions",
      desc: "From product listings to secure checkout, we build scalable online stores that drive sales and grow with your business.",
      href: "ecommerce-website-development",
      features: [
        "Secure checkout",
        "Scalable platform",
        "Product management",
        "Mobile optimized",
        "Payment gateway integration",
      ],
    },
    {
      icon: Users,
      title: "Digital Marketing",
      desc: "Using targeted ads, SEO, and analytics, we help you reach the right people with the right message at the right time.",
      href: "/meta-marketing",
      features: [
        "Targeted ads",
        "SEO strategies",
        "Analytics & reports",
        "Social media growth",
        "Conversion tracking",
      ],
    },
    {
      icon: Zap,
      title: "Meta Marketing",
      desc: "Certified experts in Facebook & Instagram Ads. We optimize ad performance to deliver measurable ROI.",
      href: "/meta-marketing",
      features: [
        "Certified experts",
        "ROI optimization",
        "Ad performance tracking",
        "Audience targeting",
        "Budget management",
      ],
    },
  ];

  return (
    <section className="relative  px-4 overflow-hidden py-20">
      <FloatingShapes />

      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 relative inline-block">
          Our Core Services
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed tracking-wide">
          From building stunning websites to executing data-driven marketing
          campaigns — we offer everything you need to grow online.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-w-6xl mx-auto relative z-10">
        {services.map((service, index) => (
          <Link key={index} href={service.href} aria-label={service.title}>
            <motion.div
              className="bg-white group rounded-2xl shadow-md p-6 text-center transition-transform hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-[#4338CA] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <service.icon className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {service.desc}
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 text-left max-w-xs mx-auto mb-4">
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          </Link>
        ))}
      </div>


      <div className="mt-10 -mb-10">
        <CallOrWhatsApp />
      </div>
    </section>
  );
};

export default ServiceSection;
