"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";

const ContactForm = ({ onSuccess }) => {
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
    { value: "ecommerce-solutions", label: "E-Commerce Solutions\n" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "meta-marketing", label: "Meta Marketing" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

        // ✅ Call onSuccess after 3 seconds (after showing success message)
        setTimeout(() => {
          setSuccessMsg("");
          if (onSuccess) onSuccess();
        }, 3000);
      } else {
        console.error("❌ Failed to send message");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl text-white">
      <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all"
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Service Dropdown */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Service Interested In *
          </label>
          <select
            name="service"
            required
            value={formData.service}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 transition-all"
          >
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-white font-semibold mb-2">
            Message *
          </label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-indigo-900/60 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all resize-none"
            placeholder="Tell us about your project, goals, and how we can help..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          <span>Send Message</span>
        </button>
      </form>

      {/* Success Message */}
      {successMsg && (
        <div className="bg-green-600/90 text-white p-3 mt-6 rounded-lg text-center font-semibold">
          {successMsg}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
