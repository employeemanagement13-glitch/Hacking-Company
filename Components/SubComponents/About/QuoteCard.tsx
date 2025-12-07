import React from 'react'
import { QuoteCardProps } from '@/types/dataType';

const QuoteCard: React.FC<QuoteCardProps> = ({ title, content }) => {
  return (
    <section className="py-12 px-6 sm:px-10 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">{title}</h2>

      {/* Quote Card Container */}
      <div
        className="
          group
          relative
          px-[15px] py-[25px] bg-[#101010] border border-white/10
          rounded-xl shadow-lg
        "
      >
        {/* Quote Content */}
        <p className="">
          {/* Start Quote Symbol */}
          {/* <span className="text-white text-3xl absolute top-0 left-0 transform -translate-x-6 -translate-y-4 opacity-70">
            &ldquo;
          </span> */}

          <span className="pl-6 block text-[18px] text-gray-200 leading-relaxed italic">" {content} "</span>

          {/* End Quote Symbol */}
          {/* <span className="text-white text-6xl absolute bottom-0 right-0 transform translate-x-6 translate-y-4 opacity-70">
            &rdquo;
          </span> */}
        </p>
      </div>
    </section>
  );
};

export default QuoteCard