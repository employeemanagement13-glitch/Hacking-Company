"use client";

import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import AttackCard from "../ui/AttackCard";
import StatsCircle from "../ui/StatusCircle";

const CARD_DARK = "#181818";
const ACCENT_RED = "#FF1B1F";

// Animated Bar Chart Component
interface AnimatedBarChartProps {
  values: number[]; // 0-1 heights
  color: string;
  width?: number;
  height?: number;
}

const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  values,
  color,
  width = 8,
  height = 112, // Tailwind h-28
}) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    new Array(values.length).fill(0)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValues(values);
    }, 100); // slight delay to trigger animation
    return () => clearTimeout(timeout);
  }, [values]);

  return (
    <div className="flex items-end space-x-1" style={{ height: `${height}px` }}>
      {animatedValues.map((v, i) => (
        <div
          key={i}
          className="rounded-t-sm transition-all duration-1000 ease-out"
          style={{
            width: `${width}px`,
            height: `${v * height}px`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

export default function FloatingUILayer() {
  return (
    <>
      <div className="text-center mb-4">
        <span
          className="inline-block px-4 py-2 text-xs font-medium rounded-full border border-gray-700"
          style={{ backgroundColor: CARD_DARK }}
        >
          Cybersecurity Solutions Provider
        </span>
      </div>

      <h1 className="text-center text-5xl font-semibold tracking-tight mb-12">
        Keep your apps safe <br /> & secure
      </h1>

      {/* Left */}
      <div className="absolute top-10 left-30 flex flex-col items-center bg-[#1F1F1F] px-5 py-1 rounded-xl">
        <div className="mb-2 p-3 rounded-full bg-white top-1 right-10 shadow-xl flex items-center justify-center w-12 h-12 relative">
          <Lock size={28} className="text-orange-500" />
        </div>

        <div className="absolute top-4 right-4 text-xs font-bold bg-white text-gray-800 px-2 py-1 rounded-full shadow-md border border-gray-200">
          7.5M+
        </div>

        <div
          className="mt-3 px-4 py-4 rounded-full text-white font-semibold"
          style={{ backgroundColor: ACCENT_RED }}
        >
          Attacks in 2025
        </div>
      </div>

      <div className="absolute top-60 left-30">
        <AttackCard percentage="+44%" label="Attacks" isUp={true} />
      </div>

      {/* Right */}
      <div className="absolute top-16 right-28 flex items-start space-x-4 bg-[#1F1F1F] px-4 py-2 rounded-xl">
        <StatsCircle value="+90%" label="Secure" color={ACCENT_RED} />

        <div className="h-28 flex items-end space-x-1 pt-4">
          <AnimatedBarChart
            values={[0.2, 0.4, 0.6, 0.9, 0.8, 0.7]}
            color={ACCENT_RED}
            height={112} // h-28
          />
        </div>
      </div>

      <div className="absolute top-60 right-60">
        <StatsCircle value="+50%" label="Keeps your apps safe" color={ACCENT_RED} />
      </div>
    </>
  );
}
