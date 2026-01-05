// app/blogs/page.tsx
import { supabase } from "@/utils/supabaseClient";
import BlogListClient from "@/Components/blogs/BlogListClient";

export default async function BlogsPage() {
  // Initial server-side fetch
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, description, banner_image, content, type, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
    return <div>Error loading blogs.</div>;
  }

  const mapped = (blogs ?? []).map(b => ({
    id: b.id,
    title: b.title,
    summary: b.description,
    banner_image: b.banner_image,
    content: b.content,
    type: b.type,
    created_at: b.created_at,
  }));

  return (
    <div className="px-4 py-8">
      <BlogListClient initialBlogs={mapped} />
    </div>
  );
}
