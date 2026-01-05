import React from 'react';
import { navData } from '@/lib/data';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    // Outer Container: Black background, white text, generous padding
    <footer className="text-white py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid: 1 large column (description) + 3 smaller columns (links) 
            Grid layout changes from 1 column on mobile to 4 columns on desktop. */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8 lg:gap-16">
          
          {/* LEFT SIDE: Company Name and Description (2/5 width on large screens) */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              Company Name
            </h3>
            <p className="sm:text-base text-sm text-gray-300 leading-relaxed max-w-lg">
              We delivers expert cybersecurity consulting backed by 50+ years of global 
              experience and advanced AI/ML. We provide tailored, practical assessments 
              that address real-world threats. Our mission is to be the leading cybersecurity 
              partner for SMEs with precise, future-ready solutions at competitive rates.
            </p>
          </div>

          {/* RIGHT SIDE: Navigation Links (Remaining 3 columns) */}
          {navData.map((column) => (
            <div key={column.title} className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-6 text-white whitespace-nowrap">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;