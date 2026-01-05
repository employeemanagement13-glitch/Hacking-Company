// Components/hero/FloatingUILayer.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import AttackCard from "../AttackCard";
import StatsCircle from "../ui/StatusCircle";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const CARD_DARK = "#181818";
const ACCENT_RED = "#FF1B1F";

// Animated Bar Chart Component
interface AnimatedBarChartProps {
  values: number[];
  color: string;
  width?: number;
  height?: number;
}

const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  values,
  color,
  width = 6,
  height = 80,
}) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    new Array(values.length).fill(0)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValues(values);
    }, 100);
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
  const isDesktop = useIsDesktop();

  return (
    <div className="relative w-full h-full max-md:h-fit flex flex-col items-center">
      {/* Badge with responsive font sizes */}
      <div className="mb-4 sm:mb-6 md:mb-8 mt-6 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-16">
        <span
          className="inline-block px-3 sm:px-4 py-1 sm:py-2 text-[10px] xs:text-xs sm:text-sm md:text-base font-medium rounded-full border border-gray-700"
          style={{ backgroundColor: CARD_DARK }}
        >
          Cybersecurity Solutions Provider
        </span>
      </div>

      {/* Main Heading with responsive font sizes */}
      <h1 className="text-center text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold tracking-tight mb-8 sm:mb-10 md:mb-12 px-2 xs:px-3 sm:px-4 max-w-5xl mx-auto leading-tight">
        Keep your apps safe <br className="hidden xs:block" /> & secure
      </h1>

      {/* MOBILE LAYOUT (below md) - Vertical stacking, no overlap */}
      <div className="md:hidden w-full max-w-sm xs:max-w-md mx-auto space-y-6 px-2 xs:px-4">
        {/* Top Row - Left Card and Right Stats */}
        <div className="flex flex-row-reverse xs:flex-row justify-between items-stretch gap-4 xs:gap-6">
          {/* Left Card */}
          <div className="flex flex-col items-center bg-[#1F1F1F] px-3 xs:px-4 py-3 xs:py-4 rounded-xl w-fit  xs:w-1/2">
            <div className="mb-3 p-2 xs:p-3 rounded-full bg-white shadow-xl flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 relative">
              <Lock className="text-orange-500 w-4 h-4 xs:w-5 xs:h-5" />
              <div className="absolute -top-1 -right-1 text-[10px] xs:text-xs font-bold bg-white text-gray-800 px-1 xs:px-1.5 py-0.5 rounded-full shadow-md border border-gray-200">
                7.5M+
              </div>
            </div>
            <div
              className="px-3 xs:px-4 py-2 xs:py-2.5 rounded-full text-white font-semibold text-xs xs:text-sm whitespace-nowrap"
              style={{ backgroundColor: ACCENT_RED }}
            >
              Attacks in 2025
            </div>
          </div>

          {/* Right Stats with Chart */}
          <div className="flex flex-col items-center bg-[#1F1F1F] px-3 xs:px-4 py-3 xs:py-4 rounded-xl w-fit max-md:flex-row xs:w-1/2">
            <div className="scale-75 xs:scale-90">
              <StatsCircle value="+90%" label="Secure" color={ACCENT_RED} />
            </div>
            <div className="mt-3 xs:mt-4 h-16 xs:h-20 flex items-end justify-center space-x-0.5 xs:space-x-1">
              <AnimatedBarChart
                values={[0.2, 0.4, 0.6, 0.9, 0.8, 0.7]}
                color={ACCENT_RED}
                width={4}
                height={64}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row - Attack Card and Safety Stats */}
        <div className="flex flex-row-reverse xs:flex-row justify-between items-center gap-4 xs:gap-6">
          {/* Left Attack Card */}
          <div className="w-full xs:w-1/2">
            <AttackCard percentage="+44%" label="Attacks" isUp={true} />
          </div>

          {/* Right Stats Circle */}
          <div className="w-full xs:w-1/2 flex justify-center">
            <div className="scale-75 xs:scale-90">
              <StatsCircle value="+50%" label="Keeps safe" color={ACCENT_RED} />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP/TABLET LAYOUT (md and above) */}
      <div className="hidden md:block relative w-full max-w-7xl mx-auto h-[400px] lg:h-[500px] xl:h-[600px]">
        {/* Left Side Content */}
        <div 
          className="absolute flex flex-col items-center bg-[#1F1F1F] px-5 py-4 rounded-xl"
          style={{
            left: "4%",
            top: "15%",
            width: "clamp(150px, 15vw, 200px)",
          }}
        >
          <div className="mb-3 p-3 rounded-full bg-white shadow-xl flex items-center justify-center w-14 h-14 relative">
            <Lock className="text-orange-500 w-7 h-7" />
          </div>

          <div className="absolute top-3 right-4 text-sm font-bold bg-white text-gray-800 px-2 py-1 rounded-full shadow-md border border-gray-200">
            7.5M+
          </div>

          <div
            className="mt-3 px-5 py-3 rounded-full text-white font-semibold text-base whitespace-nowrap"
            style={{ backgroundColor: ACCENT_RED }}
          >
            Attacks in 2025
          </div>
        </div>

        {/* Left Attack Card */}
        <div 
          className="absolute"
          style={{
            left: "4%",
            top: "45%",
          }}
        >
          <AttackCard percentage="+44%" label="Attacks" isUp={true} />
        </div>

        {/* Right Side Content */}
        <div 
          className="absolute flex items-start space-x-6 bg-[#1F1F1F] px-6 py-5 rounded-xl"
          style={{
            right: "4%",
            top: "15%",
          }}
        >
          <StatsCircle value="+90%" label="Secure" color={ACCENT_RED} />

          <div className="h-28 flex items-end space-x-2 pt-4">
            <AnimatedBarChart
              values={[0.2, 0.4, 0.6, 0.9, 0.8, 0.7]}
              color={ACCENT_RED}
              width={8}
              height={112}
            />
          </div>
        </div>

        {/* Right Stats Circle - Desktop */}
        <div 
          className="absolute"
          style={{
            right: "4%",
            top: "55%",
          }}
        >
          <StatsCircle value="+50%" label="Keeps your apps safe" color={ACCENT_RED} />
        </div>
      </div>
    </div>
  );
}