import React from 'react';
import { AchievementCardProps } from '@/types/dataType';
import { AchievementsCards } from '@/lib/data';
import SectionHeader from '../SubComponents/SectionHeader';
const AchievementCard: React.FC<AchievementCardProps> = ({ data }) => {
  const { value, description, offsetClass } = data;

  return (
    // Card Container: Includes the offsetClass for staggering
    <div className={`rounded-xl py-8 px-6 sm:px-8 sm:py-12 border border-white/10 transition-colors duration-300 ${offsetClass}`}>
      <h3 className="text-5xl font-medium text-white mb-2">
        {value}
      </h3>
      <p className="text-xl font-light text-[#ededed]">
        {description}
      </p>
    </div>
  );
};

// --- 3. Main Achievements Section Component ---
const AchievementsSection: React.FC = () => {

  return (
    // Outer container with the dark background
    <section className="w-[80vw] mx-auto py-16 md:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        
        <SectionHeader title='Achievements' subtitle='We secure, monitor, and fortify your digital world, <br className="hidden sm:inline"/> with full transparency and intelligence in every layer.' className='mb-16' subtitleClassName='headingpara' />

        {/* Cards Grid: 
          - lg:grid-cols-4 for the four-column layout on desktop.
          - items-start ensures the grid items align to the top of their row cell, 
            allowing the margin classes (lg:mt-12) to push them down relative to the others.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:items-start">
          {AchievementsCards.map((data, index) => (
            <AchievementCard key={index} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;