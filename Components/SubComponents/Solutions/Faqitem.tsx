import React from 'react'
import { FAQItemProps } from '@/types/dataType';
// --- REUSABLE FAQ ITEM COMPONENT (Accordion) ---
const FAQItem: React.FC<FAQItemProps> = ({ data, isOpen, onToggle }) => {

  return (
    // The border-b remains to separate items
    <div className="border-b border-neutral-800">
      <button
        className="flex justify-between items-center cursor-pointer w-full py-6 text-left transition-colors duration-200 focus:outline-none"
        onClick={() => onToggle(data.id)}
      >
        <span className="text-xl font-medium text-white pr-4">
          {data.question}
        </span>
        
        {/* Animated Icon: Plus turns into Minus */}
        <div className="relative w-4 h-4 flex items-center justify-center shrink-0 cursor-pointer">
          
          {/* Horizontal Bar (The Minus/Dash) */}
          <div className="absolute h-0.5 w-4 bg-[#A9A9A9] transition-all duration-300"></div>
          
          {/* Vertical Bar (The Plus part, rotates 90deg to hide/align when open) */}
          <div
            className={`
              absolute h-4 w-0.5 bg-[#A9A9A9] transition-transform duration-300 ease-in-out 
              ${isOpen ? 'rotate-90 scale-x-0' : 'rotate-0 scale-x-100'} 
            `}
          ></div>
        </div>
      </button>

      {/* Answer Content (Animated Collapse) */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[16px] text-[#A9A9A9] pb-6 pr-4">
            {data.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem