"use client";

import React from "react";

interface BulletsInSectionProps {
  title: string;
  para?: string;
  bullets: string[];
  className?: string;
}

const BulletsInSection: React.FC<BulletsInSectionProps> = ({
  title,
  para,
  bullets,
  className = "",
}) => {
  return (
    <section className={`py-16 text-white mx-auto font-sans px-4 w-[80vw] ${className}`}>
      <div className="mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="heading text-4xl sm:text-5xl font-semibold mb-3">{title}</h2>
          {para && (
            <p className="headingpara text-sm text-gray-300 max-w-2xl mx-auto">
              {para}
            </p>
          )}
        </div>

        {/* Card container */}
        <div className="mt-12">
          <div className="cardBackground rounded-xl p-8 shadow-xl w-[90%] mx-auto">
            <ul className="space-y-3 list-none">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-3 items-start pl-8">
                  {/* small dot */}
                  <span className="mt-2.5 w-2 h-2 rounded-full bg-gray-500 shrink-0" />
                  <span className="text-[17px] text-white leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulletsInSection;
