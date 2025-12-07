import React from 'react'
import { WhyUsCardProps } from '@/types/dataType';
const WhyUsCard: React.FC<WhyUsCardProps> = ({ data }) => {
  const { title, description, bullets, desc } = data;

  return (
    <div
      className="
        w-full
        p-8 md:p-10
        cardBackground
        rounded-xl
      "
    >
      {/* Title */}
      <h3 className="text-[28px] font-semibold text-white mb-4">
        {title}
      </h3>

      {/* Content: Conditional rendering based on the 'bullets' prop */}
      {bullets && bullets.length > 0 ? (
        // Renders bullets
        <ul className="list-disc ml-5 space-y-2 text-[#A9A9A9] text-[16px]">
          {bullets.map((bullet, index) => (
            <li key={index}>
              {bullet}
            </li>
          ))}
        </ul>
      ) : (
        // Renders description text
        <p className="text-[16px] text-[#A9A9A9]">
          {description || desc}
        </p>
      )}
    </div>
  );
};

export default WhyUsCard