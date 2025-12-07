"use client"
import React from 'react'
import SectionHeader from '../SubComponents/SectionHeader';
import BlogCard from '../SubComponents/home/BlogCard';
import CallToActionButton from '../SubComponents/CallToActionButton';
import { jobData } from '@/lib/data';

// --- 4. BeAPartSection (Main Component) ---
const BeAPartSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 text-white font-sans px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Component */}
        <SectionHeader
          title="Be A Part"
          subtitle="The Principles that Shape Our Identity and Drive Our Work"
          className="mb-12 sm:mb-20"
        />

        {/* Job Cards Grid */}
        <div className="
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
          gap-8 
          mb-16 sm:mb-20
        ">
          {jobData.map((job) => (
            <BlogCard 
              key={job.id} 
              data={job} 
              showReadMore={false} 
              href={`#job-${job.id}`} // Example link
            />
          ))}
        </div>
        
        {/* Button Component */}
        <div className="text-center">
          <CallToActionButton 
            text="Explore Opportunities" 
            href="#careers" 
          />
        </div>
      </div>
    </section>
  );
};

export default BeAPartSection;