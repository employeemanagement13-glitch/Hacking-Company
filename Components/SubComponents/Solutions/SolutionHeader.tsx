import React from "react";
import LeftSolutionHeader from "./LeftSolutionHeader";
import RightSolutionHeader from "./RightSolutionHeader";

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
    <div className="max-w-[85vw] w-full mx-auto flex flex-col lg:flex-row gap-10 items-start justify-between">
      <LeftSolutionHeader
        title={props.title}
        description={props.description}
        complianceTitle={props.complianceTitle}
        logos={props.logos}
      />

      <RightSolutionHeader
        formHeading={props.formHeading}
        formParagraph={props.formParagraph}
        checkboxtitle={props.checkboxtitle}
        checkboxOptions={props.checkboxOptions}
      />
    </div>
  );
};

export default SolutionHeader;
