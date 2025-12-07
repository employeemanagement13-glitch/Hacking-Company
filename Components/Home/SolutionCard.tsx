import React from 'react'
import { SolutionCardProps } from '@/types/dataType';
import Link from 'next/link';


const SolutionCard: React.FC<SolutionCardProps> = ({ data }) => {
  const { title, href, description, visualIcon } = data;

  return (
    // Card Container: Dark background, rounded corners, subtle hover effect
    <Link href={`${href}`} className="flex flex-col justify-between rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out bg-[#101010d4]  border border-[#101010] hover:bg-[#101010] transform hover:-translate-y-1">
      
      {/* Text Content Area */}
      <div className="p-8 shrink-0">
        <h3 className="text-2xl font-medium text-white mb-4">
          {title}
        </h3>
        {/* Paragraph text color (less bright than heading) */}
        <p className="text-[16px] text-[#737373]">
          {description}
        </p>
      </div>

      {/* Visual / SVG Area (Mimicking the style from the image) */}
      {/* CORRECTION: Changed 'items-center' to 'items-end' to align the icon to the bottom of this flex container. */}
      {/* Increased height a bit and added more padding at the top for better visual balance */}
      <div className="relative h-64 bottom-0 w-full flex items-end justify-center p-4 rounded-xl">
        
        {/* We use a descriptive icon and styling to mimic the complex graphics */}
       <img src={`${visualIcon}`} height={500} width={600} className='w-full h-full rounded-xl' alt={`${title}`}/>
      </div>
    </Link>
  );
};

export default SolutionCard 