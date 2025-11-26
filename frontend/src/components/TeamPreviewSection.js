"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import CallOrWhatsApp from "@/components/CallOrWhatsApp";
import { Facebook, Linkedin, Globe } from "lucide-react";
import { getBrandName } from "@/utils/brand";

const teamMembers = [
  {
    name: "Jakaria",
    role: "Co-Founder & Tech Lead",
    image: "/jakaria.jpeg",
    bio: "Drives the technical vision of the company and leads the development team with hands-on expertise in modern web technologies.",
    socials: {
      facebook: "https://www.facebook.com/jakariait/",
      linkedin: "https://linkedin.com/in/jakaria",
      website: "https://buildwithjakaria.com/",
    },
  },
  {
    name: "Ridwan H. Rifat",
    role: "Co-Founder & Marketing Lead",
    image: "/hero-img.jpeg",
    bio: "Passionate marketer and co-founder focused on scaling brands through creative strategy and performance marketing.",
    socials: {
      facebook: "https://www.facebook.com/iamrifatt",
      linkedin: "https://linkedin.com/in/ridwanhrifat",
      website: "https://elevatewithrifat.com/",
    },
  },
];

// Animation variants
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

const TeamPreviewSection = ({ showLearnMoreButton = true }) => {
  return (
    <section id="team" className="relative py-20 px-4">
      <FloatingShapes />

      <motion.div
        className="max-w-6xl mx-auto text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          variants={fadeInUp}
          custom={0}
        >
          Meet Your {getBrandName()} Team
          <span className="block h-1 w-24 bg-indigo-400 rounded mt-2 mx-auto"></span>
        </motion.h2>

        <motion.p
          className="text-gray-200 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed mb-12"
          variants={fadeInUp}
          custom={1}
        >
          We’re a team of passionate developers, designers, and marketers
          dedicated to helping brands thrive online.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg transition duration-300 hover:-translate-y-1 "
              variants={fadeInUp}
              custom={index + 2}
              whileHover={{ scale: 1.00 }}
            >
              <div className="relative w-full h-96 md:h-[500px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center text-white">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-indigo-300 mb-2">{member.role}</p>
                <p className="text-sm text-gray-200">{member.bio}</p>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 mt-4">
                  {member.socials?.facebook && (
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-white transition"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-white transition"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials?.website && (
                    <a
                      href={member.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-white transition"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showLearnMoreButton && (
          <motion.div variants={fadeInUp} custom={teamMembers.length + 2}>
            <Link href="/about-us" className="btn-indigo">
              Learn more about us
            </Link>
          </motion.div>
        )}

        <div className="mt-10 -mb-10">
          <CallOrWhatsApp />
        </div>
      </motion.div>
    </section>
  );
};

export default TeamPreviewSection;
