"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const pricingLinks = [
  { name: "Meta Marketing Plans", href: "/pricing/meta-marketing" },
  { name: "Web Development Plans", href: "/pricing/web-development" },
];

const NavPricingDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li className="relative" ref={ref}>
      <button
        className="flex items-center gap-1 cursor-pointer font-bold text-white"
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((prev) => !prev)}
      >
        Pricing
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full" />

      {open && (
        <ul
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-indigo-900 border border-indigo-700/60 rounded-xl shadow-xl overflow-hidden min-w-[220px] z-50"
          onMouseLeave={() => setOpen(false)}
        >
          {pricingLinks.map((child, j) => (
            <li key={j}>
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-3 text-sm text-gray-200 hover:bg-indigo-700/50 hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavPricingDropdown;
