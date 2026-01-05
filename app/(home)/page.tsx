// app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import HeroContainer from "@/Components/hero/HeroContainer";

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const SCROLL_DISTANCE_PX = 2000;
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const progress = Math.min(1, scrolled / SCROLL_DISTANCE_PX);
          setScrollProgress(progress);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0A0A0A]">
      <HeroContainer scrollProgress={scrollProgress} />
    </div>
  );
}