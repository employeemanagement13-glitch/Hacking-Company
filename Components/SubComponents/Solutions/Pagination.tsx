import React from 'react'
import { PaginationProps } from '@/types/dataType';
const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center space-x-3 mt-12">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`
            w-10 h-10 rounded-lg font-medium text-lg transition-colors duration-200 cursor-pointer
            ${number === currentPage 
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
            }
          `}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination