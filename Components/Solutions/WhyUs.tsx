"use client";

import React from "react";
import WhyUsCard from "../SubComponents/Solutions/WhyUsCard";
import SectionHeader from "../SubComponents/SectionHeader";

interface WhyUsProps {
  title: string;
  description?: string;
  data: any[]; // Replace `any` with your own type if needed
}

const WhyUs: React.FC<WhyUsProps> = ({ title, description, data }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[90vw] mx-auto">

        {/* Section Header */}

        <SectionHeader title={title} className=' pb-10' subtitle={description} />

        {/* Cards Stack */}
        <div className="flex flex-col space-y-8 w-4xl mx-auto">
          {data.map((item, index) => (
            <WhyUsCard key={index} data={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
