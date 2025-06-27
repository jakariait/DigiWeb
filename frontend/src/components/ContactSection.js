"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ContactSection = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  const services = [
    { value: "", label: "Select a Service" },
    { value: "web-development", label: "Website Development" },
    { value: "ecommerce-solutions", label: "E-Commerce Solutions" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "meta-marketing", label: "Meta Marketing" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.name,
      phoneNumber: formData.phone,
      emailAddress: formData.email,
      services: formData.service,
      message: formData.message,
    };

    try {
      const res = await fetch(`${apiUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMsg("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        console.error("❌ Failed to send message");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };

  return (
    <section className="relative px-4 py-20 overflow-hidden">
      <FloatingShapes />

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          variants={fadeInUp}
          custom={0}
        >
          Let&apos;s Talk About Your Project
          <span className="block h-1 w-24 bg-indigo-600 rounded mt-2 mx-auto"></span>
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed mb-12"
          variants={fadeInUp}
          custom={1}
        >
          Have an idea or project in mind? Let’s connect and bring it to life.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl text-white"
          variants={fadeInUp}
          custom={2}
        >
          <motion.input
            type="text"
            name="name"
            required
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="col-span-1 px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            variants={fadeInUp}
            custom={3}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="col-span-1 px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            variants={fadeInUp}
            custom={4}
          />
          <motion.input
            type="tel"
            name="phone"
            required
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="col-span-1 px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            variants={fadeInUp}
            custom={5}
          />
          <motion.select
            name="service"
            required
            value={formData.service}
            onChange={handleInputChange}
            className="col-span-1 px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500"
            variants={fadeInUp}
            custom={6}
          >
            {services.map((service) => (
              <option
                key={service.value}
                value={service.value}
                className="text-black"
              >
                {service.label}
              </option>
            ))}
          </motion.select>

          <motion.textarea
            name="message"
            required
            rows="5"
            placeholder="Tell us about your project, goals, and how we can help..."
            value={formData.message}
            onChange={handleInputChange}
            className="col-span-1 sm:col-span-2 px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-500"
            variants={fadeInUp}
            custom={7}
          />

          <motion.button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
            variants={fadeInUp}
            custom={8}
          >
            <Send className="w-5 h-5" />
            <span>Send Message</span>
          </motion.button>
        </motion.form>

        {successMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-600/90 text-white p-3 mt-6 rounded-lg text-center font-semibold"
          >
            {successMsg}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ContactSection;
