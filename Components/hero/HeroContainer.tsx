// Components/hero/HeroContainer.tsx
"use client";

import React, { useState, useEffect } from "react";
import FloatingUILayer from "./FloatingUilayer";
import CarLayer from "./CarLayer";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const BG_DARK = "#0A0A0A";

interface HeroContainerProps {
  scrollProgress: number;
}

export default function HeroContainer({ scrollProgress }: HeroContainerProps) {
  const isDesktop = useIsDesktop();
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    if (scrollProgress > 0 && !hasScrolled) {
      setHasScrolled(true);
    }
  }, [scrollProgress, hasScrolled]);
  
  // Desktop animations
  const surroundingOpacity = isDesktop ? 1 - Math.min(1, scrollProgress * 1.5) : 1;
  const surroundingShrink = isDesktop ? 1 - scrollProgress * 0.1 : 1;
  const uiTranslateY = isDesktop ? -scrollProgress * 80 : 0;

  return (
    <div className="bg-[#0A0A0A] text-white">
      <div 
        style={{ 
          height: isDesktop ? "400vh" : "fit-content",
        }} 
        className="relative z-10"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div
            className="w-full h-full max-md:h-fit relative flex flex-col items-center justify-start"
            style={{
              backgroundColor: BG_DARK,
              minWidth: "100%",
              minHeight: "100vh",
              paddingTop: isDesktop ? "4vh" : "2vh",
              paddingBottom: isDesktop ? "30vh" : "25vh", // Increased for mobile
              paddingLeft: "clamp(0.5rem, 2vw, 2rem)",
              paddingRight: "clamp(0.5rem, 2vw, 2rem)",
            }}
          >
            {/* Floating UI Layer */}
            <div
              className="w-full max-w-6xl mx-auto relative grow flex flex-col items-center justify-center"
              style={{
                opacity: surroundingOpacity,
                transform: `scale(${surroundingShrink}) translateY(${uiTranslateY}px)`,
                transformOrigin: "center",
                transition: hasScrolled ? "all 0.5s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
              }}
            >
              <FloatingUILayer />
            </div>

            {/* Car Layer */}
            <CarLayer scrollProgress={scrollProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}