"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  
  // Use a ref to track if we're currently animating to prevent flickering
  const isAnimating = useRef(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run scroll logic on desktop (lg and above)
    const handleScroll = () => {
      // Check if we're on desktop (window width >= 1024px)
      if (window.innerWidth < 1024) {
        // On mobile, always show the navbar
        if (!isVisible) setIsVisible(true);
        return;
      }

      if (isAnimating.current) return;

      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN and past 100px - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll listener with passive for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isVisible]);

  const linkClasses =
    "text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer";

  const hasDropdown = (item: any) =>
    item.links && Array.isArray(item.links) && item.links.length > 0;
  
  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      {/* Desktop Navbar - Animate in/out on scroll */}
      <motion.div
        ref={navbarRef}
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="fixed top-0 left-0 right-0 hidden lg:flex justify-center items-center z-100 transition-all"
        onAnimationStart={() => { isAnimating.current = true; }}
        onAnimationComplete={() => { isAnimating.current = false; }}
      >
        <div className="w-fit px-4">
          <motion.div
            animate={{ scale: isVisible ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center bg-black border border-neutral-800 shadow-2xl rounded-xl px-6 py-2"
          >
            <div className="flex gap-6 py-2 items-center">
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
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Navbar - ALWAYS VISIBLE, NO SCROLL HIDING */}
      <div className="fixed top-0 right-0 lg:hidden z-100 p-4">
        <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-4 w-fit">
          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="text-white py-3"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

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
              <nav className="flex flex-col space-y-6 p-8 mt-20">
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