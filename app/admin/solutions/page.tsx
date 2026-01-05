"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Search, X } from "lucide-react";

type ObjItem = { title: string; desc: string };

// -------- Reusable Components -------- //
const Input = ({ label, value, onChange, type = "text" }: any) => (
    <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium">{label}</label>
        <input
            type={type}
            className="border p-2 rounded-md w-full bg-[#101010] text-white"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

const TextArea = ({ label, value, onChange }: any) => (
    <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium">{label}</label>
        <textarea
            className="border p-2 rounded-md w-full h-24 bg-[#101010] text-white"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

// ---------- Sanitization helpers ---------- //
/**
 * Returns true if the object item is "empty" — i.e. all string fields are empty/whitespace.
 * This assumes object entries are flat and string-valued (title, desc).
 */
function isObjectItemEmpty(obj: any) {
  if (!obj || typeof obj !== "object") return true;
  // check every property — if any property has non-empty string, treat as non-empty
  return Object.values(obj).every(
    (v) => v === undefined || v === null || String(v).trim() === ""
  );
}

/**
 * Returns true if the string-entry is empty (or whitespace)
 */
function isStringItemEmpty(s: any) {
  return s === undefined || s === null || String(s).trim() === "";
}
 
function sanitizeFormArrays(formData: any) {
  const safe = { ...formData };

  // sanitize object arrays
  objectArrays.forEach((key) => {
    const arr = safe[key];
    if (!Array.isArray(arr)) {
      // if not an array, make it empty array
      safe[key] = [];
    } else if (arr.length === 1 && isObjectItemEmpty(arr[0])) {
      safe[key] = [];
    } else {
      // keep as-is (but ensure each item is object)
      safe[key] = arr.map((it) => (it && typeof it === "object" ? it : { title: "", desc: "" }));
    }
  });

  // sanitize string arrays
  stringArrays.forEach((key) => {
    const arr = safe[key];
    if (!Array.isArray(arr)) {
      safe[key] = [];
    } else if (arr.length === 1 && isStringItemEmpty(arr[0])) {
      safe[key] = [];
    } else {
      // keep as-is but ensure strings
      safe[key] = arr.map((it) => (it === undefined || it === null ? "" : String(it)));
    }
  });

  return safe;
}


// ----------- MAIN PAGE ----------- //
export default function SolutionsPage() {
    const [solutions, setSolutions] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const [formData, setFormData] = useState<any>(initialFormState);

    // local file state for preview & sending
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    // -------- Fetch all Solutions -------- //
    async function loadSolutions() {
        setLoading(true);

        try {
            const res = await fetch("/api/admins/solutions-get");
            const data = await res.json();
            console.log("This is data:", data)
            setSolutions(data?.data || []);
        } catch (err) {
            console.error("Fetch solutions error:", err);
            setSolutions([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSolutions();
    }, []);

    // -------- Reset Form -------- //
    function resetForm() {
        setFormData(initialFormState);
        setEditId(null);
        setBannerFile(null);
        setBannerPreview(null);
    }

    // -------- Add / Update helpers for arrays -------- //
    function addStringItem(key: string) {
        setFormData({
            ...formData,
            [key]: [...(formData[key] || []), ""],
        });
    }

    function updateStringItem(key: string, index: number, value: string) {
        const arr = [...(formData[key] || [])];
        arr[index] = value;
        setFormData({ ...formData, [key]: arr });
    }

    function removeStringItem(key: string, index: number) {
        const arr = [...(formData[key] || [])];
        arr.splice(index, 1);
        setFormData({ ...formData, [key]: arr });
    }

    function addObjectItem(key: string) {
        setFormData({
            ...formData,
            [key]: [...(formData[key] || []), { title: "", desc: "" }],
        });
    }

    function updateObjectItem(key: string, index: number, field: string, value: string) {
        const arr = [...(formData[key] || [])];
        arr[index] = { ...(arr[index] || {}), [field]: value };
        setFormData({ ...formData, [key]: arr });
    }

    function removeObjectItem(key: string, index: number) {
        const arr = [...(formData[key] || [])];
        arr.splice(index, 1);
        setFormData({ ...formData, [key]: arr });
    }

    // -------- Submit Form (FormData: supports file upload) -------- //
    async function handleSubmit() {
    try {
        // SANITIZE arrays so single-empty-items become []
        const sanitized = sanitizeFormArrays(formData);

        const fd = new FormData();

        // simple fields - use sanitized where appropriate (these are simple strings)
        [
            "title",
            "slug",
            "description",
            "name",
            "category",
            "headtitle",
            "headerdesc",
            "formtitle",
            "formdesc",
            "checkboxtitle",
        ].forEach((k) => {
            const v = sanitized[k] ?? formData[k];
            if (v !== undefined && v !== null) fd.append(k, String(v));
        });

        // arrays -> JSON (use sanitized arrays)
        [
            "formcheckboxes",
            "benefitsofservice",
            "typesofservice",
            "deliverables",
            "whoconsider",
        ].forEach((k) => {
            fd.append(k, JSON.stringify(sanitized[k] || []));
        });

        // object arrays -> JSON (use sanitized arrays)
        [
            "whydoyouneed",
            "methodology",
            "keycomponents",
            "frameworks",
            "capabilities",
            "whyus",
            "whatyouget",
            "procedure",
            "matters",
            "differences",
            "ourapproach",
        ].forEach((k) => {
            fd.append(k, JSON.stringify(sanitized[k] || []));
        });

        // banner file (if user selected new file)
        if (bannerFile) {
            fd.append("banner_image", bannerFile);
        } else {
            if (sanitized.banner_image || formData.banner_image) {
                fd.append("banner_image_old", sanitized.banner_image || formData.banner_image);
            }
        }

        // if editing, include id
        const method = editId ? "PUT" : "POST";
        if (editId) fd.append("id", editId);

        const res = await fetch("/api/admins/solutions", {
            method,
            body: fd,
        });

        const result = await res.json();
        if (result?.success) {
            await loadSolutions();
            setShowForm(false);
            resetForm();
        } else {
            console.error("Save error:", result);
            alert(result?.error || "Save failed");
        }
    } catch (err) {
        console.error("Submit error:", err);
        alert("Submit failed");
    }
}


    // -------- Edit Solution - prefill form and banner preview -------- //
    function handleEdit(solution: any) {
        setEditId(solution.id);
        // ensure arrays exist
        const safe: any = { ...initialFormState, ...solution };

        // ensure object arrays are arrays
        objectArrays.forEach((k) => {
            if (!safe[k] || !Array.isArray(safe[k])) safe[k] = [{ title: "", desc: "" }];
        });
        // ensure string arrays
        stringArrays.forEach((k) => {
            if (!safe[k] || !Array.isArray(safe[k])) safe[k] = [""];
        });

        setFormData(safe);
        setBannerPreview(solution.banner_image || null);
        setBannerFile(null);
        setShowForm(true);
    }

    // -------- Delete Solution -------- //
    async function handleDelete(id: string) {
        if (!confirm("Delete this solution?")) return;
        try {
            const res = await fetch("/api/admins/solutions-delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data?.success) loadSolutions();
            else alert(data?.error || "Delete failed");
        } catch (err) {
            console.error("Delete error:", err);
            alert("Delete failed");
        }
    }

    // ---------- JSX ---------- //
    return (
        <div className="p-6 mt-28 text-white w-[80vw] mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
                {/* Search */}
                <div className={`searchparent`}
                 
                 >
                    <Search size={18} />
                    <input
                        className="search"
                        placeholder="Search solutions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button
                    className="buttonstyles flex gap-3 px-4 py-2"
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                >
                    <Plus size={18} /> Add Solution
                </button>
            </div>

            {/* Solutions List */}
            {loading ? (
                <p>Loading...</p>
            ) : solutions.length === 0 ? (
                <p>No solutions found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {solutions
                        .filter((s: any) =>
                            (s.title || "").toLowerCase().includes(search.toLowerCase())
                        )
                        .map((solution: any) => (
                            <div key={solution.id} className="p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 rounded-xl overflow-hidden hover:bg-[#101010]  hover:border-white hover:border-0 cursor-pointer">
                                {solution.banner_image && (
                                    // next/image requires domains config if external; using img fallback is fine for preview
                                    // Using plain img for simplicity:
                                    <img
                                        src={solution.banner_image}
                                        className="rounded-md w-full h-40 object-cover"
                                        alt={solution.title}
                                    />
                                )}

                                <h3 className="text-lg font-semibold mt-3">{solution.title}</h3>

                                <p className="text-sm text-gray-400">{solution.description}</p>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => handleEdit(solution)}
                                        className="flex items-center gap-1 px-3 py-2 buttonstyles"
                                    >
                                        <Edit2 size={16} /> Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(solution.id)}
                                        className="flex items-center gap-1 px-3 py-2 buttonstyles"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            {/* -------- Add/Edit Form Modal -------- */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-start p-6 overflow-auto z-50">
                    <div className="bg-black p-6 rounded-lg w-full max-w-5xl relative text-white mt-12 hover:border-white">
                        <button
                            className="absolute border p-1 rounded-md top-4 right-4 hover:border-red-500 cursor-pointer"
                            onClick={() => {
                                setShowForm(false);
                                resetForm();
                            }}
                        >
                            <X size={24} className="cursor-pointer"/>
                        </button>

                        <h2 className="text-2xl font-semibold mb-4">
                            {editId ? "Edit Solution" : "Add Solution"}
                        </h2>

                        {/* -------- FULL FORM -------- */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Title"
                                    value={formData.title}
                                    onChange={(v: string) => setFormData({ ...formData, title: v })}
                                />

                                <Input
                                    label="Name"
                                    value={formData.name}
                                    onChange={(v: string) => setFormData({ ...formData, name: v })}
                                />
                                <Input
                                    label="Category"
                                    value={formData.category}
                                    onChange={(v: string) => setFormData({ ...formData, category: v })}
                                />
                            </div>

                            <TextArea
                                label="Description"
                                value={formData.description}
                                onChange={(v: string) => setFormData({ ...formData, description: v })}
                            />

                            {/* ---------- Banner image uploader (your requested UI) ---------- */}
                            <div className="mb-3">
                                <label className="block mb-1">Banner Image</label>
                                {bannerPreview ? (
                                    // preview from local selected file
                                    <img src={bannerPreview} className="w-full h-40 object-cover mb-2" />
                                ) : formData.banner_image ? (
                                    // existing image from DB
                                    <img src={formData.banner_image} className="w-full h-40 object-cover mb-2" />
                                ) : null}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0] || null;
                                        setBannerFile(f);
                                        if (f) setBannerPreview(URL.createObjectURL(f));
                                        else {
                                            setBannerPreview(null);
                                        }
                                    }}
                                />
                            </div>

                            {/* headtitle + headerdesc */}
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Head Title"
                                    value={formData.headtitle}
                                    onChange={(v: string) => setFormData({ ...formData, headtitle: v })}
                                />

                                <TextArea
                                    label="Header Description"
                                    value={formData.headerdesc}
                                    onChange={(v: string) => setFormData({ ...formData, headerdesc: v })}
                                />
                            </div>

                            {/* formtitle + formdesc + checkboxtitle */}
                            <Input
                                label="Form Title"
                                value={formData.formtitle}
                                onChange={(v: string) => setFormData({ ...formData, formtitle: v })}
                            />

                            <TextArea
                                label="Form Description"
                                value={formData.formdesc}
                                onChange={(v: string) => setFormData({ ...formData, formdesc: v })}
                            />

                            <Input
                                label="Checkbox Title"
                                value={formData.checkboxtitle}
                                onChange={(v: string) => setFormData({ ...formData, checkboxtitle: v })}
                            />

                            {/* ------------- OBJECT ARRAYS ------------- */}
                            {objectArrays.map((objKey) => (
                                <div key={objKey} className="border p-4 rounded-md bg-[#101010] text-white">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold">{objKey}</h3>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => addObjectItem(objKey)}
                                                className="p-1 rounded bg-gray-200 text-black cursor-pointer"
                                                title={`Add ${objKey}`}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {(formData[objKey] || []).map((item: ObjItem, idx: number) => (
                                        <div key={idx} className="grid grid-cols-2 gap-4 mb-3">
                                            <Input
                                                label="Title"
                                                value={item?.title}
                                                onChange={(v: string) => updateObjectItem(objKey, idx, "title", v)}
                                            />

                                            <div className="flex gap-2">
                                                <TextArea
                                                    label="Description"
                                                    value={item?.desc}
                                                    onChange={(v: string) => updateObjectItem(objKey, idx, "desc", v)}
                                                />
                                                <button
                                                    onClick={() => removeObjectItem(objKey, idx)}
                                                    className="p-2 bg-red-500 rounded text-white cursor-pointer h-fit self-end"
                                                    title="Remove"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* ------------- STRING ARRAYS ------------- */}
                            {stringArrays.map((key) => (
                                <div key={key} className="border p-4 rounded-md bg-[#101010] text-white">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold">{key}</h3>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => addStringItem(key)}
                                                className="p-1 rounded bg-gray-200 cursor-pointer text-black"
                                                title={`Add ${key}`}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {(formData[key] || []).map((value: any, idx: number) => (
                                        <div key={idx} className="flex gap-2 items-start mb-2">
                                            <Input
                                                label={`Item ${idx + 1}`}
                                                value={value}
                                                onChange={(v: string) => updateStringItem(key, idx, v)}
                                            />
                                            <button
                                                onClick={() => removeStringItem(key, idx)}
                                                className="p-2 bg-red-500 rounded cursor-pointer text-white h-fit self-end"
                                                title="Remove"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            {/* Submit */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSubmit}
                                    className="buttonstyles text-white px-6 py-2 rounded-lg"
                                >
                                    {editId ? "Update" : "Create"}
                                </button>

                                <button
                                    onClick={() => {
                                        resetForm();
                                        setShowForm(false);
                                    }}
                                    className="buttonstyles text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// -------- FORM DEFAULT STATE -------- //
const initialFormState = {
    title: "",
    slug: "",
    category: "",
    description: "",
    banner_image: "",
    name: "",
    headtitle: "",
    headerdesc: "",
    formtitle: "",
    formdesc: "",
    formcheckboxes: [],
    checkboxtitle: "",
    whydoyouneed: [{ title: "", desc: "" }],
    methodology: [{ title: "", desc: "" }],
    keycomponents: [{ title: "", desc: "" }],
    frameworks: [{ title: "", desc: "" }],
    capabilities: [{ title: "", desc: "" }],
    whyus: [{ title: "", desc: "" }],
    whatyouget: [{ title: "", desc: "" }],
    procedure: [{ title: "", desc: "" }],
    matters: [{ title: "", desc: "" }],
    differences: [{ title: "", desc: "" }],
    ourapproach: [{ title: "", desc: "" }],

    benefitsofservice: [""],
    typesofservice: [""],
    deliverables: [""],
    whoconsider: [""],
};

// ---------- Arrays for Looping ---------- //
const objectArrays = [
    "whydoyouneed",
    "methodology",
    "keycomponents",
    "frameworks",
    "capabilities",
    "whyus",
    "whatyouget",
    "procedure",
    "matters",
    "differences",
    "ourapproach",
];

const stringArrays = [
    "formcheckboxes",
    "benefitsofservice",
    "typesofservice",
    "deliverables",
    "whoconsider",
];
