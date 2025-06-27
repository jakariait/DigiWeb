"use client";
import React from "react";
import {
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Loader,
  TrendingUp,
  Search,
  Server,
  Package,
  Boxes,
  FileText,
  MapPin,
  MessageCircle,
  CreditCard,
  Gift,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";
import FloatingShapes from "@/components/FloatingShapes";

const EcommerceFeatures = () => {
  const iconColor = "#5039F7";

  const features = [
    {
      icon: <Rocket color={iconColor} size={40} />,
      title: "Ultra-Fast Loading",
      desc: "Your website will be lightning-fast — customers won’t have to wait at all.",
    },
    {
      icon: <ShoppingCart color={iconColor} size={40} />,
      title: "Easy Order Process",
      desc: "Customers can place orders in just 2–3 clicks, completely hassle-free.",
    },
    {
      icon: <ShieldCheck color={iconColor} size={40} />,
      title: "Security & Trust",
      desc: "SSL, trust badges, and reviews help build trust with your customers.",
    },
    {
      icon: <Loader color={iconColor} size={40} />,
      title: "Mobile Optimized",
      desc: "Beautiful and fluid experience on mobile, tablet, and desktop devices.",
    },
    {
      icon: <TrendingUp color={iconColor} size={40} />,
      title: "Conversion-Focused Design",
      desc: "Banners, reviews, and CTAs — everything is optimized to increase sales.",
    },
    {
      icon: <Search color={iconColor} size={40} />,
      title: "SEO-Friendly Structure",
      desc: "Clean code, meta tags, and speed optimization for better Google ranking.",
    },
    {
      icon: <Server color={iconColor} size={40} />,
      title: "Server-Side Tracking",
      desc: "Facebook Conversion API helps track ads performance accurately.",
    },
    {
      icon: <Package color={iconColor} size={40} />,
      title: "1-Click Courier Booking",
      desc: "Instant booking to couriers like Steadfast or Pathao when orders are placed.",
    },
    {
      icon: <Boxes color={iconColor} size={40} />,
      title: "Automated Stock Management",
      desc: "Stock updates in real-time as orders are placed — shows out-of-stock instantly.",
    },
    {
      icon: <FileText color={iconColor} size={40} />,
      title: "Admin Invoice Download",
      desc: "Admins can download invoices as PDF for any order — perfect for tracking.",
    },
    {
      icon: <MapPin color={iconColor} size={40} />,
      title: "Order Tracking System",
      desc: "Customers can track their order live using a tracking ID.",
    },
    {
      icon: <MessageCircle color={iconColor} size={40} />,
      title: "SMS Notification System",
      desc: "Order confirmed, shipped, or delivered — all updates via SMS in real-time.",
    },
    {
      icon: <CreditCard color={iconColor} size={40} />,
      title: "Payment Gateway Integration",
      desc: "Support for bKash, Nagad, cards, and bank transfers — all payment options covered.",
    },
    {
      icon: <Gift color={iconColor} size={40} />,
      title: "Reward Points System",
      desc: "Customers earn points from purchases and redeem them as discounts later.",
    },
    {
      icon: <Tag color={iconColor} size={40} />,
      title: "Promo Code System",
      desc: "Customers can apply promo codes to get discounts and special deals.",
    },
  ];

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
    <section className="relative pb-10">
      <FloatingShapes />
      <div className="xl:container xl:mx-auto px-4 text-center flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Features of Our E-commerce Platform
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </h2>
        <p className="text-purple-200 text-lg max-w-2xl mx-auto mb-10">
          Check out the features included in our ready-to-use eCommerce website
          templates. We’ve packed these templates with powerful, user-friendly
          features and constantly add new functionalities to help you grow your
          online business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-lg p-6 text-center transition-transform duration-300 hover:-translate-y-1 flex flex-col items-center justify-center"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="mb-2">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-9">
          <CallOrWhatsApp />
        </div>
      </div>
    </section>
  );
};

export default EcommerceFeatures;
