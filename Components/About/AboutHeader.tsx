"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

// Image/Video Graphic Component
const SecurityGraphic: React.FC = () => {
  // Using a placeholder image URL for the security/shield graphic
  const imageUrl = "/solutions/assesment.jpg"; 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full h-full min-h-[300px] lg:min-h-[500px] overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
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
      </motion.div>
    </motion.div>
  );
};

const AboutUsSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-16 sm:py-24 text-white font-sans px-4 mt-10"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="
          grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center
        ">
          
          {/* Left Column: Image/Graphic */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-1"
          >
            <SecurityGraphic />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="order-2 lg:order-2 flex flex-col"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="heading mb-6"
            >
              About Us
            </motion.h2>
            
            <div className="text-lg text-gray-300 space-y-5 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Waxwing was established based on the idea that traditional
                security assessments identify problems, while security
                education helps to resolve or prevent them. Waxwing Security
                Executive Team comprises highly respected professionals with
                over 50 years of combined experience across the UK, Europe,
                and the GCC.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                We deliver top-tier cybersecurity consulting services, powered
                by cutting-edge AI and ML technologies, to provide robust,
                future-ready solutions tailored to our clients' unique challenges.
                Our methodology focuses on a proactive, risk-based approach tailored to your specific operational environment and threat landscape.
              </motion.p>
            </div>

            {/* Button - using a dark red consistent with the image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5, delay: 0.9 }}
              // whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.95 }}
            >
              <Link 
                className="
                  mt-8 
                  cursor-pointer
                  transition-all
                  px-8 py-3 
                  rounded-xl 
                  buttonstyles
                  w-fit sm:w-fit
                  inline-block
                "
                href="https://www.calendly.com"
              >
                Book Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
};

export default AboutUsSection;