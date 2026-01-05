"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Search } from "lucide-react";

type ContentBlock = {
    title?: string;
    description: string;
    referenceImage?: string;
};

type BlogRow = {
    id: string;
    title: string;
    description: string;
    banner_image: string;
    content: ContentBlock[];
    created_at: string;
};

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<BlogRow[]>([]);
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const [content, setContent] = useState<ContentBlock[]>([{ title: "", description: "" }]);
    const [contentFiles, setContentFiles] = useState<Map<number, File>>(new Map());

    const [typeField, setTypeField] = useState("");

    const [uploadProgress, setUploadProgress] = useState(0);

    async function fetchBlogs() {
        const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
        setBlogs(data || []);
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    function addContentBlock() {
        setContent(prev => [...prev, { title: "", description: "" }]);
    }
    function removeContentBlock(index: number) {
        setContent(prev => prev.filter((_, i) => i !== index));
        setContentFiles(prev => {
            const m = new Map(prev);
            m.delete(index);
            return m;
        });
    }
    function updateContentField(index: number, key: keyof ContentBlock, value: string) {
        setContent(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [key]: value };
            return copy;
        });
    }
    function handleContentFileChange(index: number, file: File | null) {
        setContentFiles(prev => {
            const m = new Map(prev);
            if (file) m.set(index, file);
            else m.delete(index);
            return m;
        });
    }

    function openAdd() {
        setIsEdit(false);
        setEditingId(null);
        setTitle("");
        setDescription("");
        setBannerFile(null);
        setBannerPreview(null);
        setContent([{ title: "", description: "" }]);
        setContentFiles(new Map());
        setOpen(true);
    }

    function openEdit(blog: BlogRow) {
        setIsEdit(true);
        setEditingId(blog.id);
        setTitle(blog.title);
        setDescription(blog.description);
        setBannerFile(null);
        setBannerPreview(
            blog.banner_image
                ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images/${blog.banner_image}`
                : null
        );
        setContent(
            (blog.content || []).map(c => ({
                title: c.title || "",
                description: c.description || "",
                referenceImage: c.referenceImage || "",
            }))
        );
        setContentFiles(new Map());
        setOpen(true);
    }

    function submitForm() {
        if (!title.trim() || !description.trim()) {
            alert("Title & description required");
            return;
        }
        if (!content.length || content.some(c => !c.description.trim())) {
            alert("Please fill description for all content blocks");
            return;
        }

        const fd = new FormData();
        fd.append("title", title);
        fd.append("description", description);
        fd.append("isEdit", String(isEdit));
        fd.append("type", typeField);
        if (isEdit && editingId) fd.append("id", editingId);
        fd.append("content", JSON.stringify(content));

        if (bannerFile) fd.append("banner", bannerFile);
        contentFiles.forEach((file, idx) => fd.append(`contentFile_${idx}`, file));

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/admins/blogs");
        xhr.setRequestHeader("Accept", "application/json");

        xhr.upload.onprogress = e => {
            if (e.lengthComputable) {
                setUploadProgress(Math.round((e.loaded / e.total) * 100));
            }
        };
        xhr.onload = () => {
            setUploadProgress(0);
            if (xhr.status >= 200 && xhr.status < 300) {
                const res = JSON.parse(xhr.responseText);
                if (res.success) {
                    alert("Saved");
                    setOpen(false);
                    fetchBlogs();
                } else {
                    alert("Error: " + (res.error || "Unknown"));
                    console.error(res);
                }
            } else {

                alert("Upload failed: " + xhr.statusText);
            }
        };
        xhr.onerror = () => {
            setUploadProgress(0);
            alert("Network error");
        };
        xhr.send(fd);
    }

    async function handleDelete(blog: BlogRow) {
        if (!confirm("Delete blog?")) return;
        const resp = await fetch("/api/admins/blogs-delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: blog.id }),
        });
        const json = await resp.json();
        if (json.success) fetchBlogs();
        else alert("Delete failed: " + (json.error || ""));
    }

    return (
        <div className="adminSearchbar">
            <div className="flex items-center justify-between mb-4 bg-[#242424] py-3 px-5 rounded-lg ">
                <div className="searchparent">
                    <Search size={18} />
                    <input
                        className="search"
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <button onClick={openAdd} className="px-4 py-2 buttonstyles">Add Blog</button>
            </div>

            <div className="space-y-3">
                {blogs
                    .filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
                    .map(b => (
                        <div key={b.id} className="p-4 flex justify-between items-center bg-[#242424] text-white rounded">
                            <div>
                                <div className="font-semibold">{b.title}</div>
                                <div className="text-sm opacity-80">{b.description}</div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEdit(b)} className="px-3 py-1 buttonstyles">Edit</button>
                                <button onClick={() => handleDelete(b)} className="px-3 py-1 buttonstyles">Delete</button>
                            </div>
                        </div>
                    ))}
            </div>

            {open && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
                    <div className="bg-black p-6 w-[800px] max-h-[90vh] overflow-auto rounded">
                        <h2 className="text-xl mb-3">{isEdit ? "Edit Blog" : "Add Blog"}</h2>

                        <input className="w-full border p-2 mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <textarea className="w-full border p-2 mb-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

                        <input
                            className="w-full border p-2 mb-2"
                            placeholder="Type"
                            value={typeField}
                            onChange={e => setTypeField(e.target.value)}
                        />
                        <div className="mb-3">
                            <label className="block mb-1">Banner Image</label>
                            {bannerPreview && <img src={bannerPreview} className="w-full h-40 object-cover mb-2" />}
                            <input type="file" onChange={e => {
                                const f = e.target.files?.[0] || null;
                                setBannerFile(f);
                                if (f) setBannerPreview(URL.createObjectURL(f));
                            }} />
                        </div>

                        <div className="mb-3">
                            <h3>Content Blocks</h3>
                            {content.map((c, i) => (
                                <div key={i} className="border p-3 mb-2 rounded">
                                    <input className="w-full border p-2 mb-2" placeholder="Block title (optional)" value={c.title || ""} onChange={e => updateContentField(i, "title", e.target.value)} />
                                    <textarea className="w-full border p-2 mb-2" placeholder="Block description" value={c.description} onChange={e => updateContentField(i, "description", e.target.value)} />
                                    <label className="block mb-1">Reference Image (optional)</label>
                                    <input type="file" onChange={e => handleContentFileChange(i, e.target.files?.[0] || null)} />
                                    <div className="flex gap-2 mt-2">
                                        <button className="px-4 py-2 buttonstyles" onClick={() => removeContentBlock(i)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            <button className="px-4 py-2 buttonstyles" onClick={addContentBlock}>+ Add Block</button>
                        </div>

                        {uploadProgress > 0 && (
                            <div className="w-full bg-gray-200 h-2 rounded mb-2">
                                <div className="h-full" style={{ width: `${uploadProgress}%`, background: "#C31616" }} />
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button className="px-4 py-2 buttonstyles" onClick={() => setOpen(false)}>Cancel</button>
                            <button className="px-4 py-2 buttonstyles" onClick={submitForm}>{isEdit ? "Update" : "Save"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
