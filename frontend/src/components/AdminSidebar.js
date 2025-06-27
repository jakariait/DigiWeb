"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthAdminStore from "@/store/AuthAdminStore";
import { getBrandName } from "@/utils/brand";
import Link from "next/link";

const AdminHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { admin, logout } = useAuthAdminStore();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Blogs", path: "/admin/dashboard/blogs" },
    { name: "Brands", path: "/admin/dashboard/brands" },
    { name: "Results", path: "/admin/dashboard/results" },
    { name: "Testimonial", path: "/admin/dashboard/testimonial" },
    { name: "FAQ", path: "/admin/dashboard/faq" },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleMenuClick = (path) => {
    if (pathname !== path) {
      router.push(path);
    }
    setIsDrawerOpen(false);
  };

  const adminName = admin?.name || "John Doe";
  const adminEmail = admin?.email || "admin@example.com";

  return (
    <div>
      {/* Header Bar */}
      <header className="bg-white text-gray-800 border-b border-gray-200 flex items-center justify-between px-4 py-3 shadow-sm">
        {/* Left - Brand */}
        <div className="flex items-center space-x-3">
          <Link href="/">
            <h1 className="text-lg font-bold text-gray-900">
              {getBrandName()}
            </h1>
          </Link>
        </div>

        <div className="md:flex items-center space-x-2 hidden text-gray-600">
          <span>{adminName}</span>
          <span>({adminEmail})</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item.path)}
                className={`transition-all px-3 py-2 rounded-lg cursor-pointer text-sm ${
                  isActive
                    ? "bg-orange-500/10 text-orange-600 border border-orange-500/30 shadow"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.name}
              </button>
            );
          })}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-4 py-2 cursor-pointer text-sm bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-600 rounded-lg disabled:opacity-50"
          >
            {isLoggingOut ? "Signing Out..." : "Sign Out"}
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isDrawerOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-200 shadow-xl p-6 flex flex-col">
            {/* Profile */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 truncate">
                {adminName}
              </h3>
              <p className="text-sm text-gray-600 truncate">{adminEmail}</p>
            </div>

            {/* Navigation */}
            <div className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                      isActive
                        ? "bg-orange-500/10 text-orange-600 border border-orange-500/30"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-600 text-sm rounded-lg"
              >
                {isLoggingOut ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHeader;