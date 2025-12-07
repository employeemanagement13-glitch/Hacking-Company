"use client";

import React from "react";

interface Props {
  value: string;
  label: string;
  color: string;
}

export default function StatsCircle({ value, label, color }: Props) {
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <div
        className="w-full h-full rounded-full absolute"
        style={{ backgroundColor: color, opacity: 0.8 }}
      ></div>

      <div className="relative z-10 text-white text-center">
        <div className="text-2xl font-extrabold leading-none">{value}</div>
        <div className="text-xs font-medium">{label}</div>
      </div>
    </div>
  );
}
