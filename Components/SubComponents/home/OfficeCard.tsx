"use client";
import React from "react";
import { MapPin } from "lucide-react";

export interface OfficeCardProps {
  country: string;
  address: string;
}

const OfficeCard: React.FC<OfficeCardProps> = ({ country, address }) => {
  return (
    <div className="bg-[#101010] p-4 rounded-md space-y-2">
      <div className="flex items-center font-semibold text-white">
        <MapPin className="w-4 h-4 mr-2 text-red-700" /> {country}
      </div>
      <p className="text-sm text-gray-400">{address}</p>
    </div>
  );
};

export default OfficeCard;
