import React from "react";
import { LogoItem } from "./SolutionHeader";

interface LeftSolutionHeaderProps {
  title: string;
  description: string;
  complianceTitle: string;
  logos: LogoItem[];
}

const LeftSolutionHeader: React.FC<LeftSolutionHeaderProps> = ({
  title,
  description,
  complianceTitle,
  logos,
}) => {
  return (
    <div className="flex flex-col justify-center w-full lg:w-1/2">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
        {title}
      </h1>

      <p className="text-lg sm:text-xl text-neutral-300 mb-10 w-fit">
        {description}
      </p>

      <h3 className="text-xl sm:text-2xl font-normal text-white mb-6">
        {complianceTitle}
      </h3>

      <div className="flex flex-wrap items-center gap-5 bg-white w-fit p-4 rounded-[15px] shadow">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className="h-12 sm:h-14 object-contain transition-transform duration-200 hover:scale-105"
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSolutionHeader;
