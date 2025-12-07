import React from 'react';
import { gothackedlinks } from '@/lib/data';
import Link from 'next/link';
import SectionHeader from '../SubComponents/SectionHeader';
// --- Call to Action Section Component ---
const CallToActionSection: React.FC = () => {
  return (
    // Outer container: Key design elements are the bright red background and generous padding.
    <section className="bg-red-700 py-20 md:py-32 text-white font-sans" id='gothacked'>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title */}
        <SectionHeader title="Got Hacked?" subtitle='Looking for malware removal and incident analysis services? Our incident response team offers flexible schedules for urgent support and and fast recovery.' className='mb-12' subtitleClassName='headingpara' />

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          
          {/* Button 1: Get Immediate Help (Dark background) */}
          {gothackedlinks.map((button, index)=>(
              <Link
              href={button.link} 
              key={index}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-neutral-900 rounded-full shadow-2xl shadow-neutral-900/40 transition-transform duration-300 transform hover:bg-[#101010]"
              aria-label={button.title}
              >
            {button.title}
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;