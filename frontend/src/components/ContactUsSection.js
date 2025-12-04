"use client";
import React, { useState } from "react";
import { Mail, Phone, CheckCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FloatingShapes from "@/components/FloatingShapes";
import { motion } from "framer-motion";
import { getPhoneNumber, getWhatsAppLink } from "@/utils/brand";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ContactSection = () => {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <section className="text-white py-16 px-6 relative overflow-hidden">
      <FloatingShapes />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-indigo-600">Touch</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to scale your e-commerce business? Let&apos;s discuss how we
            can help you achieve breakthrough growth with our proven strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            <ContactForm />
          </motion.div>

          {/* Contact Information + Why Choose Us */}
          <motion.div
            className="space-y-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={2}
          >
            {/* Contact Details */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email Us</h4>
                    {showEmail ? (
                      <p className="text-gray-300">
                        <a href="mailto:jakariait@gmail.com">
                          jakariait@gmail.com
                        </a>
                      </p>
                    ) : (
                      <span
                        className="text-white cursor-pointer hover:text-indigo-300 transition-colors"
                        onClick={() => setShowEmail(true)}
                      >
                        Click to reveal email
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Call Us</h4>
                    <p className="text-gray-300">
                      <a href={getPhoneNumber()}>
                        {getPhoneNumber().replace(/^tel:/, "")}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-600/20 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.5 1.5 0 01-2.121 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Office Address</h4>
                    <p className="text-gray-300">
                      Pachbagh, Gafargaon, Mymensingh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why Choose Us?
              </h3>

              <div className="space-y-4">
                {[
                  "500+ Successful Projects Delivered",
                  "24/7 Dedicated Support Team",
                  "Free Strategy Session Included",
                  "ROI-Focused Growth Strategies",
                  "Money Back Guarantee",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-indigo-600/10 rounded-lg border border-indigo-600 hover:bg-indigo-600/20 transition-all cursor-pointer">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="text-white font-semibold text-center">
                    🚀 Ready to 10x your revenue? Let&apos;s talk!
                  </p>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
