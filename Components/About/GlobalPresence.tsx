"use client";

import React, { useState } from "react";
import LocationCard from "../SubComponents/About/LocationCard";
import { LocationData } from "@/types/dataType";
import { locations } from "@/lib/data";
import SectionHeader from "../SubComponents/SectionHeader";

const GlobalPresenceSection: React.FC = () => {
  // State to track the currently selected location. Null if none is selected.
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const handleCardClick = (location: LocationData) => {
    // If the same card is clicked, deselect it. Otherwise, select the new one.
    if (selectedLocation && selectedLocation.name === location.name) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(location);
    }
  };

  return (
    <section className="py-16 sm:py-24 text-white font-sans px-4">
      <div className="max-w-[80vw] mx-auto">
        
        {/* Header Section */}
        <SectionHeader title="Global Presence" subtitle="We support clients in 23+ countries and drive continued
            growth through innovation and transformation." className='mb-12 sm:mb-16' subtitleClassName='headingpara mx-auto' />

        {/* Locations Grid */}
        <div className="
          grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-8 sm:gap-12 justify-items-center
        ">
          {locations.map((location, index) => (
            <LocationCard 
              key={index} 
              name={location.name} 
              imageUrl={location.imageUrl} 
              altText={location.altText} 
              city={location.city}
              state={location.state}
              addressLine={location.addressLine}
              phone={location.phone}
              onClick={() => handleCardClick(location)}
              isSelected={selectedLocation?.name === location.name}
            />
          ))}
        </div>

        {/* Address Details Display Section */}
        {selectedLocation && (
          <div className="
            mt-16 pt-8 
            border-t border-neutral-800 
            text-white 
            w-full
            animate-fadeIn
          ">
            <h3 className="text-xl font-bold mb-6 text-white"> 
              {selectedLocation.name} Office Details
            </h3>
            
            {/* Address box */}
            <div className="p-0 sm:p-0 rounded-xl">
              <div className="
                flex flex-col space-y-4 text-[16px] 
                pb-8 border-b border-neutral-800 
              ">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-200">City | State</span> 
                  <span className="text-white">{selectedLocation.city} | {selectedLocation.state}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-200">Address</span>
                  <span className="text-white">{selectedLocation.addressLine}</span>
                </div>
                <div className="flex flex-col"> {/* Removed col-span classes to force stacking */}
                  <span className="font-semibold text-gray-200">Phone</span>
                  <span className="text-white">{selectedLocation.phone}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GlobalPresenceSection;