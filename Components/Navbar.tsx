"use client";

import React, { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/data";

const Navbar: React.FC = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [mounted, setMounted] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY) setScrollDir("down");
      else if (currentY < lastY) setScrollDir("up");
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses =
    "text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer";

  const isShort = scrollDir === "down";
  const hasDropdown = (item: any) =>
    item.links && Array.isArray(item.links) && item.links.length > 0;
  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      {/* Fixed Navbar Wrapper */}
      <motion.div
        animate={{
          paddingTop: isShort ? 8 : 16,
          paddingBottom: isShort ? 8 : 16,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 flex justify-center items-center z-100 transition-all"
      >
        <div className="w-fit px-4">
          {/* Desktop Navbar */}
          <motion.div
            animate={{ scale: isShort ? 0.95 : 1 }}
            transition={{ duration: 0.3 }}
            className={`${
              !isShort
                ? "hidden lg:flex flex-col items-center bg-black border border-neutral-800 shadow-2xl rounded-xl px-6 py-2"
                : ""
            }`}
          >
            <AnimatePresence mode="wait">
              {!isShort && (
                <motion.div
                  key="full-nav"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-6 py-2 items-center"
                >
                  {/* Logo */}
                  <Link href="/" className="text-white text-xl font-bold">
                    <Image
                      src="/waxwing.png"
                      width={30}
                      height={30}
                      alt="Logo"
                    />
                  </Link>

                  {/* Desktop Navigation Links */}
                  <nav className="flex items-center gap-6">
                    {navLinks.map((item) =>
                      hasDropdown(item) ? (
                        <div key={item.name} className="relative flex items-center gap-2">
                          <Link href={item.href} className={linkClasses}>
                            {item.name}
                          </Link>
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className="text-gray-300 hover:text-white cursor-pointer"
                          >
                            {openDropdown === item.name ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                          <AnimatePresence>
                            {openDropdown === item.name && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 bg-black border border-neutral-800 rounded-lg p-4 shadow-xl min-w-[250px] z-50"
                              >
                                <div className="flex flex-col">
                                  {item.links?.map((child: any, i: number) => (
                                    <Link
                                      key={i}
                                      href={child.link || child.href}
                                      className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-neutral-800 rounded-md transition"
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link key={item.name} href={item.href} className={linkClasses}>
                          {item.name}
                        </Link>
                      )
                    )}
                  </nav>

                  {/* Contact Button */}
                  <Link
                    href="/contact"
                    className="ml-2 px-5 py-2 text-sm font-semibold buttonstyles rounded-lg"
                  >
                    Contact
                  </Link>

                  {/* Render UserButton only after mount and if signed in */}
                  {mounted && isLoaded && isSignedIn && (
                    <div className="ml-4">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mobile Navbar */}
          <motion.div
            animate={{ scale: isMenuOpen ? 0.97 : 1 }}
            className="lg:hidden flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-4 h-16 w-full"
          >
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed top-0 right-0 h-full w-full max-w-xs bg-neutral-900 z-90"
            >
              <div className="flex justify-end p-6">
                <button
                  className="text-white p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col space-y-6 p-8">
                {navLinks.map((item) =>
                  hasDropdown(item) ? (
                    <div key={item.name}>
                      <div className="flex justify-between items-center w-full">
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-2xl text-white"
                        >
                          {item.name}
                        </Link>

                        {/* Dropdown toggle */}
                        <button
                          onClick={() =>
                            setOpenMobileDropdown(
                              openMobileDropdown === item.name ? null : item.name
                            )
                          }
                          className="text-white cursor-pointer"
                        >
                          {openMobileDropdown === item.name ? (
                            <ChevronUp className="w-6 h-6" />
                          ) : (
                            <ChevronDown className="w-6 h-6" />
                          )}
                        </button>
                      </div>

                      {/* Mobile Dropdown Items */}
                      <AnimatePresence>
                        {openMobileDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 mt-2 flex flex-col gap-2"
                          >
                            {item.links?.map((child: any, i: number) => (
                              <Link
                                key={i}
                                href={child.link || child.href}
                                className="text-lg text-gray-300 hover:text-white"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-2xl text-white py-3 border-b border-neutral-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}

                {/* Optionally show UserButton in mobile drawer */}
                {mounted && isLoaded && isSignedIn && (
                  <div className="pt-4 border-t border-neutral-800">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                )}
              </nav>
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-80"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
