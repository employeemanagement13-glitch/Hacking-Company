import React from 'react'
import { TestimonialCardProps } from '@/types/dataType';

const TestimonialCard: React.FC<TestimonialCardProps> = ({ data }) => {
    const { name, company, feedback } = data;

    return (
        // Removed mx-auto to allow left alignment
        <div className="bg-[#101010] rounded-xl p-8 full shadow-2xl">
            <h3 className="text-xl font-medium text-white mb-1">
                {name}
            </h3>
            <p className="text-lg text-gray-300 mb-6">
                {company}
            </p>
            <p className="text-base text-gray-200 leading-relaxed italic">
                "{feedback}"
            </p>
        </div>
    );
};

export default TestimonialCard