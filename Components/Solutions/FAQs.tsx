"use client"
import React, { useState } from 'react';
// Removed unused lucide icons (Minus, Plus)
import { faqData } from '@/lib/data';
import FAQItem from '../SubComponents/Solutions/Faqitem';
import SectionHeader from '../SubComponents/SectionHeader';


// --- MAIN FAQ SECTION ---
const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(faqData[0].id); // Keep the first item open by default

  const handleToggle = (id: number) => {
    // If the clicked item is already open, close it (set to null), otherwise open the new one
    setOpenId(prevId => (prevId === id ? null : id));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <SectionHeader title="FAQ's" className=' pb-10' />

        {/* FAQ List */}
        <div> 
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              data={item}
              isOpen={openId === item.id}
              onToggle={handleToggle}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;