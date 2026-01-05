// app/publications/page.tsx
import { supabase } from "@/utils/supabaseClient";
import PublicationsListClient from "@/Components/publications/PublicationsListClient";

export default async function PublicationsPage() {
  const { data: pubs, error } = await supabase
    .from("publications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching publications:", error);
    return <div>Error loading publications.</div>;
  }

  const mapped = (pubs ?? []).map(p => ({
    id: p.id,
    title: p.title,
    summary: p.description,
    banner_image: p.banner_image,
    file_path: p.file_path,
    created_at: p.created_at,
  }));

  return (
    <div className="px-4 py-8">
      <PublicationsListClient initialPublications={mapped} />
    </div>
  );
}
