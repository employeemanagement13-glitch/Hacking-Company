"use client";

import React from "react";
import LeftSolutionHeader from "./LeftSolutionHeader";
import RightSolutionHeader from "./RightSolutionHeader";
import { motion } from "framer-motion";

export interface LogoItem {
  src: string;
  alt: string;
}

export interface SolutionHeaderProps {
  title: string;
  description: string;
  complianceTitle: string;
  logos: LogoItem[];
  formHeading: string;
  formParagraph: string;
  checkboxtitle: string;
  checkboxOptions: string[];
}

const SolutionHeader: React.FC<SolutionHeaderProps> = (props) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="max-w-[85vw] max-md:max-w-[90vw] mx-auto flex flex-col lg:flex-row gap-10 items-start justify-between"
    >
      {/* Left side with slide-in animation */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full lg:w-[60%]"
      >
        <LeftSolutionHeader
          title={props.title}
          description={props.description}
          complianceTitle={props.complianceTitle}
          logos={props.logos}
        />
      </motion.div>

      {/* Right side with slide-in animation */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="w-full lg:w-[40%]"
      >
        <RightSolutionHeader
          formHeading={props.formHeading}
          formParagraph={props.formParagraph}
          checkboxtitle={props.checkboxtitle}
          checkboxOptions={props.checkboxOptions}
        />
      </motion.div>
    </motion.div>
  );
};

export default SolutionHeader;