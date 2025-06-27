"use client";

import { ShoppingCart, Zap, Users, Sparkles } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import { getBrandName } from "@/utils/brand";
import { motion } from "framer-motion";

const AboutEcommerceSection = () => {
  return (
    <section className="bg-indigo-950 text-white pb-10 px-4 relative overflow-hidden">
      <FloatingShapes />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The easiest way to build an online store
          </h2>

          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            {getBrandName()} is the perfect solution for businesses of all
            sizes. Whether you`&apos;re just starting out or already running an
            established brand, our platform delivers a powerful, ready-to-use
            e-commerce Content Management System (CMS) along with professionally
            designed website templates. With deep expertise in e-commerce design
            and development, we help you launch, manage, and scale your online
            store with ease.
          </p>

          <p className="text-indigo-200 mb-8 text-lg font-medium">
            Here’s why businesses choose {getBrandName()}:
          </p>

          <div className="space-y-6">
            {[
              {
                icon: <Users className="w-6 h-6 text-white" />,
                title: "User-Friendly Interface",
                desc: `${getBrandName()} provides an intuitive and user-friendly interface that makes it easy for you to navigate, manage products, and handle customer orders without a steep learning curve.`,
                color: "from-indigo-400 to-purple-500",
              },
              {
                icon: <Zap className="w-6 h-6 text-white" />,
                title: "Powerful Features",
                desc: `${getBrandName()} e-commerce CMS offers a wide range of features to help you customize your store, manage your inventory, and process payments seamlessly.`,
                color: "from-purple-500 to-pink-500",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 bg-[#5039F7] rounded-lg flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Content - Replacing Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="relative bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-3xl p-8 border border-indigo-700 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-8 h-8 text-indigo-300" />
                <span className="text-xl font-bold text-white">
                  Store Builder
                </span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
              {[
                {
                  num: "1",
                  title: "Choose Template",
                  desc: "Pick from professionally designed themes",
                  color: "bg-green-500",
                },
                {
                  num: "2",
                  title: "Customize & Launch",
                  desc: "Add products and go live in minutes",
                  color: "bg-blue-500",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="bg-indigo-700/50 rounded-lg p-4 backdrop-blur-sm border border-indigo-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`${step.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {step.num}
                    </div>
                    <div>
                      <div className="text-white font-medium">{step.title}</div>
                      <div className="text-indigo-200 text-sm">{step.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                "No Coding Required",
                "Ready-to-Use Templates",
                "Built-in CMS",
                "Launch in Minutes",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center space-x-3 text-white">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      [
                        "bg-green-400",
                        "bg-blue-400",
                        "bg-purple-400",
                        "bg-pink-400",
                      ][i]
                    }`}
                  ></div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="absolute top-4 right-4">
              <Sparkles className="w-6 h-6 text-indigo-300 animate-pulse" />
            </div>
          </div>

          <div className="absolute bottom-8 right-8 w-12 h-12 bg-purple-600/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500">
            <Zap className="w-6 h-6 text-purple-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutEcommerceSection;
