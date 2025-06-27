"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import { getWhatsAppLink } from "@/utils/brand";

const MobileMenuClient = ({ links }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="lg:hidden text-white border-1  border-white z-50 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={38} /> : <Menu size={38} />}
      </button>

      {/* Mobile Menu */}
      <ul
        className={`lg:hidden fixed top-14 right-0 w-full bg-indigo-950  z-100 transform transition-transform duration-300 ease-in-out px-6 py-8 flex flex-col items-start gap-4 font-bold text-white ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FloatingShapes />

        {links.map((link, i) => (
          <li className="relative group" key={i}>
            <Link href={link.href} onClick={() => setMenuOpen(false)}>
              {link.name}
            </Link>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full" />
          </li>
        ))}
        <li className="relative group">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600"
          >
            WhatsApp
          </a>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full" />
        </li>
      </ul>
    </>
  );
};

export default MobileMenuClient;
