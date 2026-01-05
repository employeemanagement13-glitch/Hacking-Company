"use client";

import React from "react";
import { motion } from "framer-motion";

interface LeftSolutionHeaderProps {
  title: string;
  description: string;
  complianceTitle: string;
  logos: LogoItem[];
}

interface LogoItem {
  src: string;
  alt: string;
}

const LeftSolutionHeader: React.FC<LeftSolutionHeaderProps> = ({
  title,
  description,
  complianceTitle,
  logos,
}) => {
  return (
    <div className="flex flex-col justify-center w-full">
      {/* Title with fade-up animation */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
      >
        {title}
      </motion.h1>

      {/* Description with fade-up animation */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-lg md:text-xl text-neutral-300 mb-10 w-fit"
      >
        {description}
      </motion.p>

      {/* Compliance title with fade-up animation */}
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xl sm:text-2xl font-normal text-white mb-6"
      >
        {complianceTitle}
      </motion.h3>

      {/* Logos container with staggered children */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap items-center gap-5 bg-white w-fit p-4 rounded-[15px] shadow"
      >
        {logos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo.src}
            alt={logo.alt}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="h-12 sm:h-14 object-contain transition-transform duration-200 hover:scale-105"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LeftSolutionHeader;