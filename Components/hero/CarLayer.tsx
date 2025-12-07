"use client";

import React from "react";
import CarDetailsCard from "./CarDetailsCard";

const ACCENT_RED = "#EF4444";

interface Props {
  scrollProgress: number;
}

export default function CarLayer({ scrollProgress }: Props) {
  const baseWidth = 500;
  const baseHeight = 250;

  const maxScale = Math.max(
    typeof window !== "undefined" ? window.innerWidth / baseWidth : 1,
    typeof window !== "undefined" ? window.innerHeight / baseHeight : 1
  );

  const carScale = 1 + scrollProgress * (maxScale - 1);

  return (
    <div
      className="absolute top-[50%] left-1/2 transition-transform duration-300 overflow-hidden select-none pointer-events-none"
      style={{
        width: "500px",
        height: "270px",
        transform: `translate(-50%, -40%) scale(${carScale})`,
        transformOrigin: "center center",
        zIndex: 20,
        backgroundImage:
          "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5), transparent)",
        borderRadius: "1rem",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 z-0 bg-gray-900/60"></div>

      {/* 🔥 PROTECTED VIDEO BACKGROUND */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-1 pointer-events-none select-none"
        src="/video/animation.mov"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controls={false}
        style={{
          filter: "brightness(1.2) contrast(1.1) saturate(1.1)",
        }}
        onContextMenu={(e) => e.preventDefault()} // disable right-click
      />
    </div>
  );
}
