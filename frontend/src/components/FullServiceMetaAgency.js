"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Target,
  Star,
  Shield,
  Zap,
  BarChart3,
  Award,
  CheckCircle,
  Calendar,
  Camera,
  Smartphone,
} from "lucide-react";


export default function FullServiceMetaAgency() {
  const agencyStats = [
    {
      metric: "Campaigns Launched",
      value: "2,500+",
      icon: Target,
      description: "Successful campaigns",
    },
    {
      metric: "Ad Spend Managed",
      value: "$50M+",
      icon: TrendingUp,
      description: "Total ad investment",
    },
    {
      metric: "Years Experience",
      value: "8+",
      icon: Award,
      description: "Meta advertising expertise",
    },
    {
      metric: "ROAS Average",
      value: "4.2x",
      icon: BarChart3,
      description: "Return on ad spend",
    },
  ];

  const fullServices = [
    {
      category: "Campaign Strategy",
      icon: Target,
      services: [
        {
          name: "Meta Ads Strategy",
          description:
            "Comprehensive Facebook & Instagram advertising strategies",
        },
        {
          name: "Audience Research & Targeting",
          description: "Advanced audience segmentation and targeting",
        },
        {
          name: "Competitor Analysis",
          description: "In-depth analysis of competitor ad strategies",
        },
        {
          name: "Campaign Structure & Setup",
          description: "Optimized campaign architecture for maximum ROI",
        },
      ],
    },
    {
      category: "Creative Production",
      icon: Camera,
      services: [
        {
          name: "Video Ad Creation",
          description: "High-converting video ads for Facebook and Instagram",
        },
        {
          name: "Static Image Design",
          description: "Eye-catching static creatives that drive engagement",
        },
        {
          name: "Carousel & Collection Ads",
          description: "Interactive ad formats for product showcases",
        },
        {
          name: "User-Generated Content",
          description: "Authentic UGC campaigns and content curation",
        },
      ],
    },
    {
      category: "Platform Management",
      icon: Smartphone,
      services: [
        {
          name: "Facebook Ads Management",
          description: "Full Facebook advertising campaign management",
        },
        {
          name: "Instagram Ads Optimization",
          description: "Instagram-specific ad strategies and optimization",
        },
        {
          name: "Stories & Reels Advertising",
          description: "Short-form video advertising across all formats",
        },
        {
          name: "Messenger & WhatsApp Ads",
          description: "Direct messaging campaigns for lead generation",
        },
      ],
    },
    {
      category: "Conversion Optimization",
      icon: Zap,
      services: [
        {
          name: "Landing Page Optimization",
          description: "High-converting landing pages for Meta traffic",
        },
        {
          name: "Pixel Setup & Tracking",
          description: "Advanced Facebook Pixel implementation and tracking",
        },
        {
          name: "Conversion API Integration",
          description: "Server-side tracking for improved data accuracy",
        },
        {
          name: "A/B Testing & Analytics",
          description: "Continuous testing and optimization strategies",
        },
      ],
    },
    {
      category: "Analytics & Reporting",
      icon: BarChart3,
      services: [
        {
          name: "Performance Dashboards",
          description: "Real-time campaign performance and ROI tracking",
        },
        {
          name: "Attribution Modeling",
          description: "Advanced attribution analysis across touchpoints",
        },
        {
          name: "Audience Insights",
          description: "Deep audience behavior and demographic analysis",
        },
        {
          name: "Monthly Strategy Reviews",
          description: "Strategic planning and optimization recommendations",
        },
      ],
    },
    {
      category: "Account Management",
      icon: Shield,
      services: [
        {
          name: "Business Manager Setup",
          description: "Complete Meta Business Manager configuration",
        },
        {
          name: "Account Recovery & Security",
          description: "Account protection and recovery services",
        },
        {
          name: "Policy Compliance",
          description:
            "Ensuring all campaigns meet Meta's advertising policies",
        },
        {
          name: "24/7 Campaign Monitoring",
          description: "Round-the-clock campaign oversight and optimization",
        },
      ],
    },
  ];

  const successProcess = [
    {
      phase: "Discovery & Audit",
      duration: "Week 1",
      description:
        "Comprehensive analysis of your current Meta presence and advertising performance",
      deliverables: [
        "Account audit",
        "Competitor analysis",
        "Audience research",
        "Strategy framework",
      ],
    },
    {
      phase: "Strategy & Creative",
      duration: "Week 2-3",
      description:
        "Develop comprehensive strategy and create high-converting ad creatives",
      deliverables: [
        "Campaign strategy",
        "Creative concepts",
        "Targeting plan",
        "Budget allocation",
      ],
    },
    {
      phase: "Launch & Optimize",
      duration: "Week 4-5",
      description:
        "Campaign launch with continuous monitoring and real-time optimization",
      deliverables: [
        "Live campaigns",
        "Performance tracking",
        "Initial optimizations",
        "Weekly reports",
      ],
    },
    {
      phase: "Scale & Expand",
      duration: "Ongoing",
      description:
        "Scale successful campaigns and expand to new audiences and formats",
      deliverables: [
        "Scaling strategies",
        "New audience testing",
        "Creative iterations",
        "Growth reports",
      ],
    },
  ];

  const clientTypes = [
    {
      type: "E-commerce Brands",
      icon: Star,
      description:
        "Drive sales and revenue growth through targeted Meta advertising campaigns",
      services: [
        "Product catalog ads",
        "Dynamic retargeting",
        "Shopping campaigns",
        "Conversion tracking",
      ],
      results: "Average ROAS: 4.5x+",
    },
    {
      type: "Local Businesses",
      icon: Users,
      description:
        "Build local awareness and drive foot traffic through geo-targeted campaigns",
      services: [
        "Local awareness ads",
        "Store visit campaigns",
        "Lead generation",
        "Event promotion",
      ],
      results: "Average lead cost: -60%",
    },
    {
      type: "SaaS Companies",
      icon: TrendingUp,
      description:
        "Generate qualified leads and drive software subscriptions through Meta",
      services: [
        "Lead generation ads",
        "App install campaigns",
        "Webinar promotion",
        "Trial sign-ups",
      ],
      results: "Average CPA reduction: 45%",
    },
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-600/10 rounded-full text-blue-600 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Users className="w-4 h-4 mr-2" />
            Full-Service Meta Agency
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Your Complete Meta
            <br />
            Advertising Partner
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            From campaign strategy to million-dollar results, we&apos;re the
            only Meta advertising agency you&apos;ll ever need. Our
            comprehensive services handle every aspect of your Facebook and
            Instagram marketing.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.a
              // href={getCalendlyLink()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="btn-indigo">Get Your Free Meta Audit</button>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Agency Stats */}
      <section className="py-16 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4 text-black">
              Trusted by Brands Across All Industries
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our track record speaks for itself. We&apos;ve helped thousands of
              businesses succeed with Meta advertising.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {agencyStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/10 rounded-full flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-black font-medium mb-1">
                    {stat.metric}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Full Services Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-6 text-black">
              Complete Meta Advertising Solutions
            </h2>
            <motion.div
              className="w-24 h-1 bg-blue-600 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to dominate Facebook and Instagram
              advertising, all under one roof. No need to manage multiple
              vendors or agencies.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {fullServices.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg"
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-6">
                    <motion.div
                      className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mr-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-black">
                      {category.category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.services.map((service, idx) => (
                      <motion.div
                        key={idx}
                        className="border-l-2 border-blue-600/20 pl-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <h4 className="font-semibold text-black mb-1">
                          {service.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Client Types */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-6 text-black">
              We Serve Every Type of Business
            </h2>
            <motion.div
              className="w-24 h-1 bg-blue-600 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Whether you&apos;re a startup looking to build awareness or an
              enterprise scaling your advertising efforts, we have the expertise
              to drive results.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
          >
            {clientTypes.map((client, index) => {
              const IconComponent = client.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-600/50 transition-all duration-300 group hover:shadow-lg text-center"
                  variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600/20 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {client.type}
                  </h3>
                  <p className="text-gray-600 mb-6">{client.description}</p>

                  <div className="space-y-2 mb-6">
                    {client.services.map((service, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center justify-center text-gray-600"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                        {service}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="bg-blue-600/10 px-4 py-2 rounded-full text-blue-600 font-semibold text-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {client.results}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Success Process */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-6 text-black">
              Our Proven Success Process
            </h2>
            <motion.div
              className="w-24 h-1 bg-blue-600 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A systematic approach that&apos;s helped thousands of businesses
              achieve Meta advertising success
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {successProcess.map((phase, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <motion.div
                    className="w-12 h-12 bg-blue-600 text-white font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {index + 1}
                  </motion.div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    {phase.phase}
                  </h3>
                  <div className="inline-flex items-center text-blue-600 text-sm font-medium mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {phase.duration}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  {phase.description}
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-black text-sm">
                    Deliverables:
                  </h4>
                  {phase.deliverables.map((deliverable, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center text-gray-600 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {deliverable}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <h2 className="text-4xl font-bold mb-6 text-black">
                Why Choose Us as Your Meta Partner?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Certified Meta Experts",
                    description:
                      "Official Meta Blueprint certification and years of hands-on experience managing millions in ad spend.",
                  },
                  {
                    title: "Dedicated Account Teams",
                    description:
                      "Your own dedicated team of strategists, creatives, and analysts who understand your business goals.",
                  },
                  {
                    title: "Data-Driven Optimization",
                    description:
                      "Every campaign decision backed by real data and advanced analytics for maximum ROI.",
                  },
                  {
                    title: "Creative Excellence",
                    description:
                      "Award-winning creative team producing high-converting ads that stop the scroll and drive action.",
                  },
                  {
                    title: "Transparent Reporting",
                    description:
                      "Real-time dashboards and detailed monthly reports showing exactly where your budget goes.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-black mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-600/10 to-blue-600/5 rounded-2xl p-8 border border-gray-200"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Ready to Dominate Meta Advertising?
                </h3>
                <p className="text-gray-600">
                  Get a comprehensive analysis of your Meta advertising
                  potential
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Complete account audit & analysis",
                  "Competitor advertising research",
                  "Custom campaign strategy",
                  "ROI projection model",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    {item}
                  </motion.div>
                ))}
              </div>

              <motion.a
                // href={getCalendlyLink()}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="btn-indigo">Get Your Free Meta Audit</button>
              </motion.a>

              <div className="text-center text-gray-500 text-sm mt-4">
                No commitment required • 100% confidential
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
