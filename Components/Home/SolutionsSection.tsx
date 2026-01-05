import React from 'react';
import SolutionCard from './SolutionCard';
import { SolutionCards } from '@/lib/data';
import SectionHeader from '../SubComponents/SectionHeader';
// --- 3. Main Section Component ---
const SolutionsSection: React.FC = () => {

  return (
    // Outer container with the dark background
    <section className="py-16 md:py-24 text-white w-[80vw] max-md:w-full mx-auto">
      <div className="max-w-[80vw] max-md:max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <SectionHeader title='Solutions' subtitle='We deliver expert information security, penetration testing & compliance services to safeguard your organisation' className='mb-16' subtitleClassName='headingpara' />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
          {SolutionCards.map((data, index) => (
            <SolutionCard key={index} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;