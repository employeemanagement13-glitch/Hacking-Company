"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Search } from "lucide-react";

type Opportunity = {
  id: string;
  position: string;
  description: string;
  image: string; // This stores the path like "images/123456789-abc.jpg"
  link: string | null;
  created_at: string;
};

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [search, setSearch] = useState("");

  // form state
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // progress (optional)
  const [uploadProgress, setUploadProgress] = useState(0);

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    // If it's already a full URL (for blob previews), return as-is
    if (imagePath.startsWith('blob:') || imagePath.startsWith('http')) {
      return imagePath;
    }
    // Otherwise construct the Supabase URL
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/opportunity-images/${imagePath}`;
  };

  async function fetchOpportunities() {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch opportunities error:", error);
    } else {
      setOpportunities(data as Opportunity[]);
    }
  }

  useEffect(() => {
    fetchOpportunities();
  }, []);

  function openAdd() {
    setIsEdit(false);
    setEditingId(null);
    setPosition("");
    setDescription("");
    setLink("");
    setImageFile(null);
    setImagePreview(null);
    setOpen(true);
  }

  function openEdit(opp: Opportunity) {
    setIsEdit(true);
    setEditingId(opp.id);
    setPosition(opp.position);
    setDescription(opp.description);
    setLink(opp.link || "");
    setImageFile(null);
    
    // Use the helper function to get the image URL
    const imageUrl = getImageUrl(opp.image);
    setImagePreview(imageUrl);
    
    setOpen(true);
  }

  function submitForm() {
    if (!position.trim() || !description.trim()) {
      alert("Position & description required");
      return;
    }
    if (!imageFile && !isEdit) {
      alert("Image is required for new opportunity");
      return;
    }

    const fd = new FormData();
    fd.append("position", position);
    fd.append("description", description);
    fd.append("link", link);
    fd.append("isEdit", String(isEdit));
    if (isEdit && editingId) fd.append("id", editingId);
    if (imageFile) fd.append("image", imageFile);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admins/opportunities");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(pct);
      }
    };
    xhr.onload = async () => {
      setUploadProgress(0);
      if (xhr.status >= 200 && xhr.status < 300) {
        const res = JSON.parse(xhr.responseText);
        if (res.success) {
          alert("Saved successfully");
          setOpen(false);
          fetchOpportunities();
        } else {
          alert("Server error: " + (res.error || "Unknown"));
          console.error(res);
        }
      } else {
        alert("Upload failed: " + xhr.statusText);
      }
    };
    xhr.onerror = () => {
      setUploadProgress(0);
      alert("Upload request failed");
    };
    xhr.send(fd);
  }

  async function handleDelete(opp: Opportunity) {
    if (!confirm("Delete this opportunity?")) return;
    const resp = await fetch("/api/admins/opportunities-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: opp.id }),
    });
    const json = await resp.json();
    if (json.success) {
      fetchOpportunities();
    } else {
      alert("Delete failed: " + (json.error || ""));
    }
  }

  return (
    <div className="adminSearchbar">
      <div className="flex items-center justify-between mb-4 bg-[#242424] py-3 px-5 rounded-lg">
        <div className="searchparent">
          <Search size={18} />
          <input
            placeholder="Search opportunities..."
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 rounded buttonstyles"
        >
          Add Opportunity
        </button>
      </div>

      <div className="space-y-3">
        {opportunities
          .filter((o) => 
            o.position.toLowerCase().includes(search.toLowerCase()) ||
            o.description.toLowerCase().includes(search.toLowerCase())
          )
          .map((o) => {
            const imageUrl = getImageUrl(o.image);
            
            return (
              <div
                key={o.id}
                className="p-4 flex justify-between items-center bg-[#242424] text-white rounded"
              >
                <div className="flex items-center gap-4">
                  {imageUrl ? (
                    <img 
                      src={imageUrl}
                      alt={o.position}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        // If image fails to load, hide the img element
                        console.error("Failed to load image:", imageUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">No image</span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{o.position}</div>
                    <div className="text-sm opacity-80 line-clamp-2">{o.description}</div>
                    {o.link && (
                      <div className="text-xs text-blue-400 mt-1">
                        Link: <a href={o.link} target="_blank" rel="noopener noreferrer" className="underline">{o.link}</a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded buttonstyles"
                    onClick={() => openEdit(o)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 buttonstyles"
                    onClick={() => handleDelete(o)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
          <div className="bg-black p-6 w-[800px] max-h-[90vh] overflow-auto rounded">
            <h2 className="text-xl mb-3">{isEdit ? "Edit Opportunity" : "Add Opportunity"}</h2>
            
            <div className="mb-3">
              <label className="block mb-1">Position/Title *</label>
              <input
                className="w-full border p-2"
                placeholder="e.g., Frontend Developer, Marketing Intern"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Description *</label>
              <textarea
                className="w-full border p-2"
                placeholder="Describe the opportunity..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Link (Optional)</label>
              <input
                className="w-full border p-2"
                placeholder="https://example.com/apply"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Image {!isEdit && "*"}</label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-full h-40 object-cover mb-2 rounded"
                  alt="Preview"
                  onError={(e) => {
                    console.error("Failed to load preview image");
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setImageFile(f);
                  if (f) {
                    // Create a blob URL for local preview
                    setImagePreview(URL.createObjectURL(f));
                  } else {
                    setImagePreview(null);
                  }
                }}
              />
              <p className="text-sm text-gray-400 mt-1">
                {isEdit ? "Leave empty to keep current image" : "Required for new opportunity"}
              </p>
            </div>

            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 h-2 rounded mb-2">
                <div
                  className="h-full bg-[#C31616]"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2"
                onClick={() => {
                  // Clean up blob URL if it exists
                  if (imagePreview && imagePreview.startsWith('blob:')) {
                    URL.revokeObjectURL(imagePreview);
                  }
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2"
                style={{ background: "#C31616", color: "white" }}
                onClick={submitForm}
              >
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}