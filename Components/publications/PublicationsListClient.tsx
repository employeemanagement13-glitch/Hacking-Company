// components/PublicationsListClient.tsx
"use client";

import React, { useState, useMemo } from "react";
import BlogCard from "../SubComponents/home/BlogCard";
import Pagination from "../SubComponents/Solutions/Pagination";
import LoadingCardPlaceholder from "../SubComponents/home/LoadingPlaceholder";
import { Search } from "lucide-react";

export type PublicationItem = {
  id: string;
  title: string;
  summary: string;
  banner_image: string;
  file_path: string;
  created_at: string;
};

interface Props {
  initialPublications: PublicationItem[];
}

const ITEMS_PER_PAGE = 6;

export default function PublicationsListClient({ initialPublications }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const filtered = useMemo(() => {
    return initialPublications.filter(pub => {
      const q = searchTerm.toLowerCase();
      return pub.title.toLowerCase().includes(q) ||
             pub.summary.toLowerCase().includes(q);
    });
  }, [initialPublications, searchTerm]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    setLoadingPage(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoadingPage(false);
    }, 150);
  };

  return (
    <div className="w-[80vw] mx-auto mt-20">
      {/* Search bar */}
      <div className="searchparent mb-4 min-w-full">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search publications..."
          className="search"
          value={searchTerm}
          onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* Listing / loading / empty state */}
      {loadingPage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <LoadingCardPlaceholder key={i} type="blog" />
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <p className="text-neutral-400">No publications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginated.map(pub => (
            <BlogCard
              key={pub.id}
              data={{
                id: pub.id,
                title: pub.title,
                summary: pub.summary,
                imagePath: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publication-images/${pub.banner_image}`,
                date: pub.created_at,
                category: "",  // optional
                blogid: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publication-files/${pub.file_path}`
              }}
              showReadMore={true}
              readMoreText="View PDF"
            />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
