"use client";
import React from "react";
import { Check, Globe, ShoppingCart, Rocket, Server } from "lucide-react";
import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";

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

const plans = [
  {
    icon: Globe,
    name: "Starter",
    price: "৳5,000",
    type: "Landing Page (Product / Lead Gen)",
    badge: null,
    accentColor: "indigo",
    note: "One-time",
    includes: [
      "1 high-converting landing page",
      "Mobile responsive design",
      "Fast loading (optimized structure)",
      "WhatsApp + form integration",
      "Basic on-page SEO",
      "Thank you page setup",
      "Admin panel for management",
    ],
    limitations: ["No advanced animations", "No custom backend"],
    bestFor: "Small businesses, coaches, local services starting with ads.",
  },
  {
    icon: ShoppingCart,
    name: "Growth",
    price: "৳30,000",
    type: "Ecommerce Website",
    badge: "Most Popular",
    accentColor: "purple",
    note: "One-time",
    includes: [
      "3–5 pages (Home, Shop, Category, Sub-Category, About, Contact, Landing)",
      "Conversion-focused UI/UX",
      "Lead capture system (form + WhatsApp + email)",
      "Basic conversion tracking (Pixel + events)",
      "Basic CRO structure (CTA, sections, flow)",
    ],
    bonus: "Landing page structure guidance for ads",
    bestFor: "Coaching, real estate, service businesses running ads.",
  },
  {
    icon: Rocket,
    name: "Scale",
    price: "৳50,000+",
    type: "Custom E-commerce / Advanced Funnel Website",
    badge: null,
    accentColor: "pink",
    note: "One-time",
    includes: [
      "Fully custom design (not template-feel)",
      "Product pages optimized for conversion",
      "Cart + checkout optimization",
      "Payment gateway integration",
      "Advanced speed optimization",
      "Mobile-first UX",
      "Funnel-based structure",
      "Advanced conversion tracking setup",
      "CRO-focused design (AOV, upsell sections)",
    ],
    bonus:
      "Basic content structure for ads funnel + scalability-ready architecture",
    bestFor: "E-commerce brands, scaling businesses, serious growth stage.",
  },
];

const hostingAddons = [
  { label: "With 1 Year VPS Hosting Support", price: "৳25,000" },
  { label: "Without Hosting", price: "৳20,000" },
  { label: "Single Product Landing Page with Hosting", price: "৳5,000" },
];

const accentMap = {
  indigo: {
    iconBg: "bg-indigo-600",
    popularBadge:
      "bg-indigo-600/20 text-indigo-300 border border-indigo-600/40",
    check: "text-indigo-400",
    border: "border-indigo-600/30",
    price: "text-indigo-300",
  },
  purple: {
    iconBg: "bg-purple-600",
    popularBadge:
      "bg-purple-500/20 text-purple-300 border border-purple-500/40",
    check: "text-purple-400",
    border: "border-purple-500/50 ring-2 ring-purple-500/30",
    price: "text-purple-300",
  },
  pink: {
    iconBg: "bg-pink-600",
    popularBadge: "bg-pink-500/20 text-pink-300 border border-pink-500/40",
    check: "text-pink-400",
    border: "border-pink-500/30",
    price: "text-pink-300",
  },
};

const WebDevPricingSection = () => {
  return (
    <section className="relative px-4 overflow-hidden py-20">
      <FloatingShapes />

      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 relative inline-block">
          Web Development Pricing
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed tracking-wide">
          One-time packages built to convert — not just look good. Every site is
          built with growth in mind.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        {plans.map((plan, index) => {
          const accent = accentMap[plan.accentColor];
          return (
            <motion.div
              key={index}
              className={`relative bg-indigo-900/40 backdrop-blur-sm rounded-2xl border ${accent.border} p-8 flex flex-col`}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${accent.popularBadge}`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Icon + Name + Price */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${accent.iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-extrabold ${accent.price}`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-sm">({plan.note})</span>
                  </div>
                </div>
              </div>

              {/* Type Tag */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5 border-b border-white/10 pb-4">
                {plan.type}
              </p>

              {/* Includes */}
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
                Includes
              </p>
              <ul className="space-y-2 mb-5 flex-1">
                {plan.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-300 text-sm"
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${accent.check}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Limitations */}
              {plan.limitations && (
                <div className="mb-5">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
                    Limitations
                  </p>
                  <ul className="space-y-1">
                    {plan.limitations.map((lim, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-400 text-sm"
                      >
                        <span className="text-red-400 mt-0.5">✕</span>
                        {lim}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bonus */}
              {plan.bonus && (
                <div className="mb-5 bg-indigo-800/30 border border-indigo-600/20 rounded-xl px-4 py-3">
                  <p className="text-xs text-indigo-300 font-semibold uppercase tracking-wider mb-1">
                    Bonus
                  </p>
                  <p className="text-gray-300 text-sm">{plan.bonus}</p>
                </div>
              )}

              {/* Best For */}
              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400">
                  <span className="text-gray-300 font-semibold">
                    Best for:{" "}
                  </span>
                  {plan.bestFor}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 -mb-10">
        <CallOrWhatsApp />
      </div>
    </section>
  );
};

export default WebDevPricingSection;
