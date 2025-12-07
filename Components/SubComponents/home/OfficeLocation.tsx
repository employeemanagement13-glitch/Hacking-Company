"use client";
import React from "react";
import OfficeCard from "./OfficeCard";

const OfficeLocations = () => {
  const offices = [
    {
      country: "United Kingdom",
      address: "166 Stoke Newington Road, London, N16 7UY",
    },
    {
      country: "United States",
      address: "30 N Gould St Ste N, Sheridan, WY 82801 USA",
    },
  ];

  return (
    <div>
      <h3 className="heading3">Our offices</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {offices.map((office, index) => (
          <OfficeCard 
            key={index}
            country={office.country}
            address={office.address}
          />
        ))}
      </div>
    </div>
  );
};

export default OfficeLocations;
