"use client";
import React, { useState, useMemo } from "react";
import BlogCard from "../SubComponents/home/BlogCard";
import SectionHeader from "../SubComponents/SectionHeader";
import Pagination from "../SubComponents/Solutions/Pagination";       // your pagination component
import LoadingCardPlaceholder from "../SubComponents/home/LoadingPlaceholder";
import { Search } from "lucide-react";

export type BlogItem = {
  id: string;
  title: string;
  summary: string;
  banner_image: string;
  content: any[];
  type?: string;
  created_at: string;
};

const ITEMS_PER_PAGE = 6;

export default function BlogListClient({ initialBlogs }: { initialBlogs: BlogItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeType, setActiveType] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const allTypes = useMemo(() => {
    const types = Array.from(new Set(initialBlogs.map(b => b.type).filter(Boolean) as string[]));
    return ["All", ...types];
  }, [initialBlogs]);

  const filtered = useMemo(() => {
    return initialBlogs.filter(blog => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = activeType === "All" || blog.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [initialBlogs, searchTerm, activeType]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filtered.slice(start, end);
  }, [filtered, currentPage]);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    setLoadingPage(true);
    // simulate loading (or could be async if you fetch page from backend)
    setTimeout(() => {
      setCurrentPage(page);
      setLoadingPage(false);
    }, 200);  // adjust delay if needed
  };

  return (
    <div className="w-[80vw] mx-auto mt-20">
      <SectionHeader title="Blogs" />

      {/* Search bar */}
      <div className="searchparent mb-4 min-w-full">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search blogs..."
          className="search"
          value={searchTerm}
          onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-start gap-3 mb-8">
        {allTypes.map(t => (
          <button
            key={t}
            onClick={() => { setActiveType(t); setCurrentPage(1); }}
            className={`
              px-5 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer
              ${activeType === t
                ? 'bg-[#C31616] text-white'
                : 'border border-neutral-600 text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Blog Cards grid or loading placeholder */}
      {loadingPage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <LoadingCardPlaceholder key={i} type="blog" />
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <p className="text-neutral-400">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginated.map(blog => (
            <BlogCard
              key={blog.id}
              data={{
                id: blog.id,
                title: blog.title,
                summary: blog.summary,
                blogid: `blogs/${blog.id}`,
                imagePath: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${blog.banner_image}`,
                date: blog.created_at,
                category: blog.type,
              }}
              href={`/blogs/${encodeURIComponent(blog.id)}`}
            />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="mt-10">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
