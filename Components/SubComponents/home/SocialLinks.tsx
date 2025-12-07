"use client";
import React from "react";
import Image from "next/image";
import { socials } from "@/lib/data";

const SocialLinks = () => {
  return (
    <div className="rounded-xl shadow-2xl shadow-neutral-900/50">
      <h3 className="heading3">Connect With Us</h3>

      <div className="flex space-x-4 border-b border-neutral-700 pb-4">
        {socials.map((s, index) => (
          <a
            key={index}
            href={s.link}
            className="text-white hover:text-blue-500 transition-colors"
            aria-label="social icon"
          >
            <Image src={s.image} alt={s.link} width={30} height={30} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
