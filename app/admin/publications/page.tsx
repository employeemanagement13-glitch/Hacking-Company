"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Search } from "lucide-react";

type Publication = {
  id: string;
  title: string;
  description: string;
  banner_image: string;
  file_path: string;
  created_at: string;
};

export default function AdminPublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [search, setSearch] = useState("");

  // form state
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // progress (optional)
  const [uploadProgress, setUploadProgress] = useState(0);

  async function fetchPublications() {
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch publications error:", error);
    } else {
      setPublications(data as Publication[]);
    }
  }

  useEffect(() => {
    fetchPublications();
  }, []);

  function openAdd() {
    setIsEdit(false);
    setEditingId(null);
    setTitle("");
    setDescription("");
    setBannerFile(null);
    setPdfFile(null);
    setBannerPreview(null);
    setOpen(true);
  }

  function openEdit(pub: Publication) {
    setIsEdit(true);
    setEditingId(pub.id);
    setTitle(pub.title);
    setDescription(pub.description);
    setBannerFile(null);
    setPdfFile(null);
    setBannerPreview(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publication-images/${pub.banner_image}`
    );
    setOpen(true);
  }

  function submitForm() {
    if (!title.trim() || !description.trim()) {
      alert("Title & description required");
      return;
    }
    if (!bannerFile && !isEdit) {
      alert("Banner image is required for new publication");
      return;
    }
    if (!pdfFile && !isEdit) {
      alert("PDF file is required for new publication");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("isEdit", String(isEdit));
    if (isEdit && editingId) fd.append("id", editingId);
    if (bannerFile) fd.append("banner", bannerFile);
    if (pdfFile) fd.append("file", pdfFile);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admins/publications");
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
          fetchPublications();
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

  async function handleDelete(pub: Publication) {
    if (!confirm("Delete this publication?")) return;
    const resp = await fetch("/api/admins/publications-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pub.id }),
    });
    const json = await resp.json();
    if (json.success) {
      fetchPublications();
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
          placeholder="Search..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
          </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 rounded buttonstyles"
        >
          Add Publication
        </button>
      </div>

      <div className="space-y-3">
        {publications
          .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
          .map((p) => (
            <div
              key={p.id}
              className="p-4 flex justify-between items-center bg-[#242424] text-white rounded"
            >
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm opacity-80">{p.description}</div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded buttonstyles"
                  onClick={() => openEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 buttonstyles"
                  onClick={() => handleDelete(p)}
                >
                  Delete
                </button>
                <a
                  href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publication-files/${p.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded buttonstyles"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
          <div className="bg-black p-6 w-[800px] max-h-[90vh] overflow-auto rounded">
            <h2 className="text-xl mb-3">{isEdit ? "Edit Publication" : "Add Publication"}</h2>
            <input
              className="w-full border p-2 mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full border p-2 mb-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="mb-3">
              <label className="block mb-1">Banner Image</label>
              {bannerPreview && (
                <img
                  src={bannerPreview}
                  className="w-full h-40 object-cover mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setBannerFile(f);
                  if (f) setBannerPreview(URL.createObjectURL(f));
                }}
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Publication PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setPdfFile(f);
                }}
              />
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
                onClick={() => setOpen(false)}
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
