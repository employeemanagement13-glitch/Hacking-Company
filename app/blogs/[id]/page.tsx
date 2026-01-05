// app/blog/[id]/page.tsx
"use client"; // <-- Convert to client component

import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type ContentBlock = {
  title?: string;
  description: string;
  referenceImage?: string;
};

type Blog = {
  id: string;
  title: string;
  description: string;
  content: ContentBlock[];
  created_at: string;
  // Add other fields from your 'blogs' table as needed
};

export default function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogId, setBlogId] = useState<string | null>(null);

  // Extract the ID from params
  useEffect(() => {
    const extractId = async () => {
      try {
        const { id } = await params;
        setBlogId(id);
      } catch (err) {
        console.error("Error extracting params:", err);
        setError("Invalid blog ID");
        setLoading(false);
      }
    };
    
    extractId();
  }, [params]);

  // Fetch blog and set up real-time subscription when blogId is available
  useEffect(() => {
    if (!blogId) return; // Don't run until we have the ID

    let mounted = true;
    let channel: any = null;

    const fetchBlogAndSubscribe = async () => {
      // Initial fetch
      const { data, error: fetchError } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

      if (!mounted) return;

      if (fetchError || !data) {
        setError("Blog not found");
        setLoading(false);
        return;
      }

      setBlog(data);
      setLoading(false);

      // Set up real-time subscription for THIS specific blog
      channel = supabase
        .channel(`blog-${blogId}-changes`) // Unique channel name per blog
        .on(
          'postgres_changes',
          {
            event: 'UPDATE', // Only listen for updates
            schema: 'public',
            table: 'blogs',
            filter: `id=eq.${blogId}` // CRITICAL: Filter for only this blog ID
          },
          (payload: RealtimePostgresChangesPayload<Blog>) => {
            console.log('Blog updated in real-time:', payload);
            // Update the local state with the new data
            setBlog(payload.new as Blog);
          }
        )
        .subscribe((status) => {
          console.log(`Subscription status for blog ${blogId}:`, status);
        });
    };

    fetchBlogAndSubscribe();

    // Cleanup function
    return () => {
      mounted = false;
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [blogId]); // Re-run when blogId changes

  if (loading) {
    return <div className="p-6 text-white mt-28 text-center">Loading blog...</div>;
  }

  if (error || !blog) {
    return <div className="p-6 text-white mt-28">Blog not found</div>;
  }

  // Render the blog content (same as before)
  return (
    <article className="max-w-5xl mx-auto p-6 text-white mt-28">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-lg mb-6">{blog.description}</p>

      {Array.isArray(blog.content) && blog.content.map((block: ContentBlock, idx: number) => {
        const isEven = idx % 2 === 0;
        const imgSrc = block.referenceImage
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${block.referenceImage}`
          : null;

        return (
          <section key={idx} className="mb-12 flex flex-col md:flex-row items-center gap-6">
            {isEven ? (
              <div className="max-md:flex max-md:flex-col-reverse md:flex gap-4 md:items-center">
                <div className="md:w-1/2">
                  {block.title && <h2 className="text-2xl font-semibold mb-2">{block.title}</h2>}
                  <p className="text-base mb-2">{block.description}</p>
                </div>
                {imgSrc && (
                  <div className="md:w-1/2">
                    <img src={imgSrc} alt={block.title || `block-${idx}`} className="w-full h-auto rounded" />
                  </div>
                )}
              </div>
            ) : (
              <>
                {imgSrc && (
                  <div className="md:w-1/2">
                    <img src={imgSrc} alt={block.title || `block-${idx}`} className="w-full h-auto rounded" />
                  </div>
                )}
                <div className="md:w-1/2">
                  {block.title && <h2 className="text-2xl font-semibold mb-2">{block.title}</h2>}
                  <p className="text-base mb-2">{block.description}</p>
                </div>
              </>
            )}
          </section>
        );
      })}
    </article>
  );
}
