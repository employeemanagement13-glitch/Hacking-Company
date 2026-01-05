// components/Home/SolutionCard.tsx - ADD THIS AT THE TOP
'use client';

import React from 'react'
import { SolutionCardProps } from '@/types/dataType';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SolutionCard: React.FC<SolutionCardProps> = ({ data, index = 0 }) => {
  const { title, href, description, visualIcon } = data;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1
      }}
      className="flex flex-col justify-between rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out bg-[#101010d4] border border-[#101010] hover:bg-[#101010] transform hover:-translate-y-1"
    >
      <Link 
        href={`${href}`} 
        className="block w-full h-full"
      >
        {/* Text Content Area */}
        <div className="p-8 shrink-0">
          <h3 className="text-2xl font-medium text-white mb-4">
            {title}
          </h3>
          <p className="text-[16px] text-[#737373]">
            {description}
          </p>
        </div>

        {/* Visual / SVG Area */}
        <div className="relative h-64 bottom-0 w-full flex items-end justify-center p-4 max-md:pt-4 max-md:h-auto rounded-xl max-md:p-2">
          <img 
            src={`${visualIcon}`} 
            height={500} 
            width={600} 
            className='w-full h-full rounded-xl' 
            alt={`${title}`}
            loading="lazy"
          />
        </div>
      </Link>
    </motion.article>
  );
};

export default SolutionCard;