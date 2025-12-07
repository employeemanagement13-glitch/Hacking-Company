// app/blog/[id]/page.tsx
import { supabase } from "@/utils/supabaseClient";

type ContentBlock = {
  title?: string;
  description: string;
  referenceImage?: string;
};

export default async function BlogPage({ params }: { params: { id: string } }) {
  const {id} = await params;
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !blog) {
    return <div className="p-6 text-white">Blog not found</div>;
  }

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
            {/* If even index: text first, image right */}
            {isEven ? (
              <>
                <div className="md:w-1/2">
                  {block.title && <h2 className="text-2xl font-semibold mb-2">{block.title}</h2>}
                  <p className="text-base mb-2">{block.description}</p>
                </div>
                {imgSrc && (
                  <div className="md:w-1/2">
                    <img src={imgSrc} alt={block.title || `block-${idx}`} className="w-full h-auto rounded" />
                  </div>
                )}
              </>
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
