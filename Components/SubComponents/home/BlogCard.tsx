"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface BlogCardData {
  id?: string | number;
  title: string;
  summary?: string;
  blogid?: string;
  imagePath: string;
  date?: string;
  category?: string;
}

interface BlogCardProps {
  data: BlogCardData;
  className?: string;
  style?: React.CSSProperties;
  showReadMore?: boolean; // Only show the read more button if true
  readMoreText?: string;   // Default text for Read More
  href?: string;           // URL for read more
}

const BlogCard: React.FC<BlogCardProps> = ({
  data,
  className = "",
  style = {},
  showReadMore = false,
  readMoreText = "Read more",
}) => {
  const { title, summary, imagePath, date, category, blogid } = data;

  console.log(imagePath, date, category)
  return (
    <Link
      href={`${blogid}`}
      className={`
        group
        block 
        px-5
        py-5
        h-fit
        transition-all duration-300 ease-in-out 
        hover:-translate-y-1 
        hover:shadow-2xl hover:shadow-black/30 
        rounded-xl overflow-hidden
        hover:bg-[#101010] 
        hover:border-white/10
        hover:border-0
        ${className}
      `}
      target={`${readMoreText === "View PDF" ? "_blank" : ""}`}
      style={style}
      aria-label={`Read blog post: ${title}`}
    >
      <div className="flex flex-col h-full">

        {/* IMAGE */}
        <div className="h-48 overflow-hidden shrink-0 rounded-xl">
          <img
            src={`${imagePath}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.onerror = null;
              img.src = `https://placehold.co/600x400/1e293b/ffffff?text=Blog+Image`;
            }}
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="py-8 grow flex flex-col">

          {/* Date + Category */}
          {date && (
            <p className="text-sm …">
              {(() => {
                const d = new Date(date);
                return `${String(d.getFullYear()).slice(-2)}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
              })()}
              {category && <span> — {category}</span>}
            </p>
          )}

          {/* Title */}
          <h3 className="text-[23px] font-medium text-white mb-4 line-clamp-2">
            {title}
          </h3>

          {/* Summary */}
          {summary && (
            <p className="text-[16px] text-[#adadad] line-clamp-3">
              {summary}
            </p>
          )}

          {/* Optional Read More */}
          {showReadMore && (
            <div className="flex items-center text-white font-medium text-sm transition-colors duration-300 mt-5">
              {readMoreText}
              <span className="relative w-5 h-5 ml-2 flex items-center justify-center overflow-hidden">
                {/* Initial Arrow */}
                <ArrowUpRight className="absolute transition-transform duration-300 ease-in-out group-hover:-translate-y-full group-hover:translate-x-full" />
                {/* Incoming Arrow */}
                <ArrowUpRight className="absolute translate-y-full -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-hover:translate-x-0" />
              </span>
            </div>
          )}

        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
