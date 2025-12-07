"use client";

import React from "react";

interface ValueCardProps {
  title: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ValueCard: React.FC<ValueCardProps> = ({
  title,
  description,
  className = "",
  style = {},
}) => {
  const CardContent = () => (
    <div className="flex flex-col h-full">
      {/* Title */}
      <h3 className="text-2xl font-semibold text-white mb-4 line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base text-gray-300">
        {description }
      </p>
    </div>
  );

  // If href is provided, wrap in <a> for clickable card
  return (
    <div
      className={`
        p-6 sm:p-8
        rounded-2xl
        shadow-lg
        border border-[#101010]
        bg-[#101010]
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${className}
      `}
      style={style}
    >
      <CardContent />
    </div>
  );
};

export default ValueCard;
