"use client";
import React from "react";
import { Check, Star, Zap, TrendingUp, Rocket } from "lucide-react";
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
    icon: Zap,
    name: "Starter",
    price: "৳20,000",
    period: "/month",
    badge: null,
    accentColor: "indigo",
    features: [
      "3 campaigns (awareness or conversion)",
      "Up to $1,000 ad spend managed",
      "2 ad creatives per month (copy + direction)",
      "Basic weekly performance update (WhatsApp/email)",
    ],
    bestFor: "Small local businesses, new to ads",
  },
  {
    icon: TrendingUp,
    name: "Growth",
    price: "৳30,000",
    period: "/month",
    badge: "Most Popular",
    accentColor: "purple",
    features: [
      "Up to 5 campaigns (full funnel — TOF, MOF, BOF)",
      "Competitors research & buyer persona creation",
      "Up to $1K–$2K ad spend managed",
      "5 high-quality graphics creatives with written content/month",
      "Pixel setup + basic conversion tracking",
      "CRO recommendations on landing pages",
      "Weekly performance update (WhatsApp/email)",
    ],
    bestFor: "E-commerce, coaching, local brands scaling up",
  },
  {
    icon: Rocket,
    name: "Scale",
    price: "৳50,000",
    period: "/month",
    badge: null,
    accentColor: "pink",
    features: [
      "Unlimited campaigns",
      "Advanced competitors research & buyer persona creation",
      "$3K–$5K ad spend managed",
      "Personalization content strategy development",
      "10 high-quality graphics creatives with written content/month",
      "Full funnel strategy + audience research",
      "CRO audit on website",
      "Advanced conversion tracking + Looker Studio dashboard",
      "Strategy call every month",
    ],
    bestFor: "Established businesses serious about growth",
  },
];

const accentMap = {
  indigo: {
    iconBg: "bg-indigo-600",
    badge: "bg-indigo-600/20 text-indigo-300 border border-indigo-600/40",
    check: "text-indigo-400",
    border: "border-indigo-600/30",
    priceBadge: "text-indigo-300",
  },
  purple: {
    iconBg: "bg-purple-600",
    badge: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
    check: "text-purple-400",
    border: "border-purple-500/50 ring-2 ring-purple-500/30",
    priceBadge: "text-purple-300",
  },
  pink: {
    iconBg: "bg-pink-600",
    badge: "bg-pink-500/20 text-pink-300 border border-pink-500/40",
    check: "text-pink-400",
    border: "border-pink-500/30",
    priceBadge: "text-pink-300",
  },
};

const PricingPlansSection = () => {
  return (
    <section className="relative px-4 overflow-hidden py-20">
      <FloatingShapes />

      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16 relative z-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 relative inline-block">
          Monthly Retainer Plans
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed tracking-wide">
          Transparent pricing built for results. Choose the plan that matches
          your goals and ad budget.
        </p>
      </div>

      {/* Pricing Cards */}
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
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${accent.badge}`}
                  >
                    <Star className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl ${accent.iconBg} flex items-center justify-center shrink-0`}
                >
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-extrabold ${accent.priceBadge}`}>
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${accent.check}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Best For */}
              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400">
                  <span className="text-gray-300 font-semibold">Best for: </span>
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

export default PricingPlansSection;