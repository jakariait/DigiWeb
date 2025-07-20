import Link from "next/link";
import Image from "next/image";
import MobileMenuClient from "@/components/MobileMenuClient";
import { getBrandLogo, getBrandName, getWhatsAppLink } from "@/utils/brand";

const links = [
  { name: "Home", href: "/" },
  { name: "E-commerce Website", href: "/ecommerce-website-development" },
  { name: "Landing Page", href: "/" },
  { name: "Meta Marketing", href: "/meta-marketing" },
  { name: "Pricing", href: "/" },
  { name: "Our Portfolio", href: "/our-portfolio" },
  { name: "Our Clients", href: "/our-clients" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

const HeaderServer = () => {
  return (
    <header className="fixed w-full bg-indigo-950 z-100">
      <nav className="xl:container xl:mx-auto px-3 py-2 flex items-center justify-between relative">
        {/* Logo */}
        <div className=" z-50">
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
        <h1 className={"text-gray-100 text-md font-semibold lg:hidden"}>
          Welcome to {getBrandName()}
        </h1>
        {/* Desktop Menu */}
        <ul className="lg:flex items-center justify-end gap-6 font-bold hidden text-white">
          {links.map((link, i) => (
            <li className="relative group" key={i}>
              <Link href={link.href}>{link.name}</Link>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 transition-all duration-300 ease-in-out group-hover:w-full" />
            </li>
          ))}

        </ul>

        {/* Mobile Menu Toggle */}
        <MobileMenuClient links={links} />
      </nav>
    </header>
  );
};

export default HeaderServer;
