"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { getBrandLogo, getBrandName, getWhatsAppLink } from "@/utils/brand";
import FloatingShapes from "@/components/FloatingShapes";
import { FaWhatsapp } from "react-icons/fa";

const links = [
  { name: "Home", href: "/" },
  { name: "E-commerce", href: "/ecommerce-website-development" },
  { name: "Meta Marketing", href: "/meta-marketing" },
  {
    name: "Pricing",
    href: null,
    children: [
      { name: "Meta Marketing Plans", href: "/pricing/meta-marketing" },
      { name: "Web Development Plans", href: "/pricing/web-development" },
    ],
  },

  { name: "Portfolio", href: "/our-portfolio" },
  { name: "Case Study", href: "/casestudies" },
  { name: "Clients", href: "/our-clients" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

const HeaderServer = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="fixed w-full bg-indigo-950 z-100">
      <nav className="xl:container xl:mx-auto px-3 py-2 flex items-center justify-between relative">
        {/* Logo */}
        <div className="z-50">
          <Link href="/">
            <Image
              src={getBrandLogo()}
              alt="MySite Logo"
              width={100}
              height={50}
              priority
            />
          </Link>
        </div>

        <h1 className="text-gray-100 text-md font-semibold lg:hidden">
          Welcome to {getBrandName()}
        </h1>

        {/* Desktop Menu */}
        <ul className="lg:flex items-center justify-end gap-5 font-bold hidden text-white">
          {links.map((link, i) =>
            link.children ? (
              <li key={i} className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-1 cursor-pointer text-white font-bold"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  onMouseEnter={() => setDropdownOpen(true)}
                >
                  {link.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-transparent" />

                {dropdownOpen && (
                  <ul
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-indigo-900 border border-indigo-700/60 rounded-xl shadow-2xl overflow-hidden min-w-[230px] z-50"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {link.children.map((child, j) => (
                      <li key={j}>
                        <Link
                          href={child.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-5 py-3 text-sm text-gray-200 hover:bg-indigo-700/60 hover:text-white transition-colors duration-150 whitespace-nowrap"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li className="relative group" key={i}>
                <Link href={link.href}>{link.name}</Link>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full" />
              </li>
            ),
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white border border-white z-50 cursor-pointer"
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
              <li key={i} className="relative w-full">
                <button
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setMobileDropdownOpen((prev) => !prev)}
                >
                  {link.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdownOpen && (
                  <ul className="mt-2 ml-3 flex flex-col gap-3 border-l-2 border-indigo-600/50 pl-4">
                    {link.children.map((child, j) => (
                      <li key={j} className="relative group">
                        <Link
                          href={child.href}
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileDropdownOpen(false);
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
              <li key={i} className="relative group">
                <Link href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.name}
                </Link>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full" />
              </li>
            ),
          )}
          <li className="relative group">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 flex items-center gap-2"
            >
              <FaWhatsapp className="w-5 h-5" /> WhatsApp
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderServer;
