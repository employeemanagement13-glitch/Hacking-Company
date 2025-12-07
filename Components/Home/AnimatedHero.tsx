"use client";

import React, { useState, useEffect } from "react";
import HeroContainer from "../hero/HeroContainer";

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const SCROLL_DISTANCE_PX = 2000;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const progress = Math.min(1, scrolled / SCROLL_DISTANCE_PX);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-10 bg-[#0A0A0A]">
  <HeroContainer scrollProgress={scrollProgress} />
  </div>
  )
}
