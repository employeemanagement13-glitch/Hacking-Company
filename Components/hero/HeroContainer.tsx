"use client";

import React from "react";
import FloatingUILayer from "./FloatingUilayer";
import CarLayer from "./CarLayer";

const BG_DARK = "#0A0A0A";

interface HeroContainerProps {
  scrollProgress: number;
}

export default function HeroContainer({ scrollProgress }: HeroContainerProps) {
  /* ---- Fade + Shrink of UI when scrolling ---- */
  const surroundingOpacity = 1 - Math.min(1, scrollProgress * 1.5);
  const surroundingShrink = 1 - scrollProgress * 0.1;
  const surroundingTranslateY = -scrollProgress * 100;

  return (
    <div style={{ backgroundColor: BG_DARK, color: "white" }}>
      <div style={{ height: "400vh", backgroundColor: BG_DARK }} className="relative z-10">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div
  className="w-full h-full relative"
  style={{
    backgroundColor: BG_DARK,
    minWidth: "1000px",
    minHeight: "800px",
    borderRadius: "2rem",
    padding: "8rem 4rem",
  }}
>
  {/* Floating UI Layer */}
  <div
    className="w-full h-full relative transition-all duration-300"
    style={{
      opacity: surroundingOpacity,
      transform: `scale(${surroundingShrink}) translateY(${surroundingTranslateY}px)`,
      transformOrigin: "center",
    }}
  >
    <FloatingUILayer />
  </div>

  {/* 🔥 ADD SVG HERE (Centered + Covers Page) */}
  <div
    className="absolute top-[40%] left-1/2 pointer-events-none"
    style={{
      transform: "translate(-40%, -40%)",
      width: "100%",
      height: "100%",
      opacity: 0.15, // adjust visibility
      zIndex: 5,
    }}
  >
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
    >
      {/* Example content — replace with your SVG */}
      <rect width="1200" height="800" fill="" />
    </svg>
  </div>

  {/* Car Layer stays on top */}
  <CarLayer scrollProgress={scrollProgress} />
</div>

        </div>
      </div>
    </div>
  );
}
