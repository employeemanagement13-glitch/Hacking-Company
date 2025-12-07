"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

// Image/Video Graphic Component
const SecurityGraphic: React.FC = () => {
  // Using a placeholder image URL for the security/shield graphic
  const imageUrl = "/solutions/assesment.jpg"; 

  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-[500px] overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
      <Image
        src={imageUrl}
        height={100}
        width={130}
        alt="Cybersecurity Shield Graphic"
        className="w-full h-full object-cover"
        draggable={false}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          // Fallback placeholder with better aesthetics
          target.src = "/solutions/assesment.jpg"; 
        }}
      />
      {/* Optional overlay to mimic dark, digital feel */}
      <div className="absolute inset-0 bg-black/30 backdrop-brightness-75"></div>
    </div>
  );
};


const AboutUsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 text-white font-sans px-4 mt-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="
          grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center
        ">
          
          {/* Left Column: Image/Graphic */}
          <div className="order-1 lg:order-1">
            <SecurityGraphic />
          </div>

          {/* Right Column: Content */}
          <div className="order-2 lg:order-2 flex flex-col">
            <h2 className="heading mb-6">
              About Us
            </h2>
            
            <div className="text-lg text-gray-300 space-y-5 leading-relaxed">
              <p>
                Waxwing was established based on the idea that traditional
                security assessments identify problems, while security
                education helps to resolve or prevent them. Waxwing Security
                Executive Team comprises highly respected professionals with
                over 50 years of combined experience across the UK, Europe,
                and the GCC.
              </p>

              <p>
                We deliver top-tier cybersecurity consulting services, powered
                by cutting-edge AI and ML technologies, to provide robust,
                future-ready solutions tailored to our clients' unique challenges.
                Our methodology focuses on a proactive, risk-based approach tailored to your specific operational environment and threat landscape.
              </p>
            </div>

            {/* Button - using a dark red consistent with the image */}
            <Link className="
              mt-8 
              cursor-pointer
              transition-all
              px-8 py-3 
              rounded-xl 
              buttonstyles
              w-fit sm:w-fit
            "
            href="https://www.calendly.com">
              Book Consultation
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;