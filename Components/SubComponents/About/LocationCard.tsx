import React from 'react'
import { LocationCardProps } from '@/types/dataType';
const LocationCard: React.FC<LocationCardProps> = ({ name, imageUrl, altText, onClick, isSelected }) => (
  <div 
    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${isSelected ? 'scale-105' : ''}`}
    onClick={onClick}
  >
    {/* Image Container with rounded corners and overflow hidden */}
    <div className={`
      w-32 h-40 sm:w-36 sm:h-48 md:w-44 md:h-58 lg:w-52 lg:h-64 xl:w-60 xl:h-72
      rounded-xl overflow-hidden 
      shadow-lg 
      transform transition-transform duration-300 
      border border-[#101010] ${isSelected ? 'border-white' : 'border-neutral-800'}
    `}>
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
        draggable={false}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://placehold.co/600x600/1a1a1a/cccccc?text=Location";
          target.style.filter = 'grayscale(100%)';
        }}
      />
    </div>
    {/* Location Name */}
    <p className={`text-lg sm:text-xl font-medium mt-4 transition-colors duration-300 ${isSelected ? 'text-white' : 'text-white'} `}>
      {name}
    </p>
  </div>
);

export default LocationCard