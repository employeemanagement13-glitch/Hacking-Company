"use client";

import React from "react";

const CARD_DARK = "#181818";

export default function CarDetailsCard() {
  return (
    <div
      className="p-4 rounded-md shadow-2xl text-sm font-mono absolute w-60"
      style={{
        backgroundColor: CARD_DARK,
        borderColor: "#333",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="text-white text-lg font-bold mb-2 border-b border-gray-700 pb-1">
        MERCEDES-BENZ
      </div>

      <div className="grid grid-cols-2 gap-2 text-gray-400">
        <span className="font-semibold">MODEL</span>
        <span className="text-white">E-Class</span>

        <span className="font-semibold">COLOR</span>
        <span className="text-white">Black</span>

        <span className="font-semibold">NO PLATE</span>
        <span className="text-white">*****</span>
      </div>
    </div>
  );
}
