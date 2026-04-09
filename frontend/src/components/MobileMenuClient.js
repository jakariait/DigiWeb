"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import FloatingShapes from "@/components/FloatingShapes";
import { getWhatsAppLink } from "@/utils/brand";

const MobileMenuClient = ({ links }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="lg:hidden text-white border-1 border-white z-50 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={38} /> : <Menu size={38} />}
      </button>

      {/* Mobile Menu */}
      <ul
        className={`lg:hidden fixed top-14 right-0 w-full bg-indigo-950 z-100 transform transition-transform duration-300 ease-in-out px-6 py-8 flex flex-col items-start gap-4 font-bold text-white ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FloatingShapes />

        {links.map((link, i) =>
          link.children ? (
            <li className="relative w-full" key={i}>
              <button
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => toggleDropdown(link.name)}
              >
                {link.name}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === link.name ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openDropdown === link.name && (
                <ul className="mt-2 ml-3 flex flex-col gap-3 border-l-2 border-indigo-600/50 pl-4">
                  {link.children.map((child, j) => (
                    <li key={j} className="relative group">
                      <Link
                        href={child.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="text-gray-300 font-semibold text-sm"
                      >
                        {child.name}
                      </Link>
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full" />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li className="relative group" key={i}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}>
                {link.name}
              </Link>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full" />
            </li>
          )
        )}

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
