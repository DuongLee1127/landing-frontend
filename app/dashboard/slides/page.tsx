"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/dashboard/footer";
import Cookies from "js-cookie";
const token = Cookies.get("token") || "";

type Slide = {
  id: string;
  title: string;
  url: string; // url
  active?: boolean;
};

export default function SlidePage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<Slide | null>(null);

  // form state
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // load slides (replace with real API)
    async function load() {
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/slides", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSlides(data);
      console.log(data);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function openCreate() {
    setEditing(null);
    setTitle("");
    setFile(null);
    setPreview(null);
    setOpenModal(true);
  }

  function openEdit(s: Slide) {
    setEditing(s);
    setTitle(s.title);
    setFile(null);
    setPreview(s.url);
    setOpenModal(true);
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    // If you have an API, upload file and submit formData here.
    // Example (uncomment & adapt):
    // const fd = new FormData();
    // if (file) fd.append('image', file);
    // fd.append('title', title);
    // const method = editing ? 'PUT' : 'POST';
    // const url = editing ? `/api/slides/${editing.id}` : '/api/slides';
    // const res = await fetch(url, { method, body: fd });

    // For demo, update local state:
    if (editing) {
      setSlides((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, title, image: preview ?? p.url } : p
        )
      );
    } else {
      const newSlide: Slide = {
        id: Date.now().toString(),
        title,
        url: preview ?? "/images/placeholder-slide.jpg",
      };
      setSlides((prev) => [newSlide, ...prev]);
    }

    setOpenModal(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this slide? This action cannot be undone.")) return;
    // call your API to delete
    // await fetch(`/api/slides/${id}`, { method: 'DELETE' })
    setSlides((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <>
      <div className="w-full px-6 py-6 mx-auto bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h5 className="text-lg">Slides</h5>
          <div className="flex items-center gap-2">
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow"
            >
              + Add Slide
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="p-8 bg-white rounded-lg shadow text-center text-sm text-slate-500">
              Loading slides...
            </div>
          ) : slides.length === 0 ? (
            <div className="p-8 bg-white rounded-lg shadow text-center text-sm text-slate-500">
              No slides yet. Click Add Slide to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {slides.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-xl border border-slate-100 shadow-md p-3 flex flex-col overflow-hidden"
                >
                  <div className="relative w-full h-44 rounded-lg overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.url}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                    {s.active && (
                      <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex-1">
                    <h5 className="text-sm font-semibold text-slate-800 truncate">
                      {s.title}
                    </h5>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(s)}
                        className="text-sm px-3 py-1 rounded-md bg-white border border-gray-200 hover:shadow"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-sm px-3 py-1 rounded-md bg-white border border-red-100 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        setSlides((prev) =>
                          prev.map((p) =>
                            p.id === s.id ? { ...p, active: !p.active } : p
                          )
                        )
                      }
                      className={`text-sm px-3 py-1 rounded-md ${
                        s.active
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      {s.active ? "Disable" : "Enable"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* modal */}
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpenModal(false)}
            />
            <form
              onSubmit={handleSave}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {editing ? "Edit Slide" : "Create Slide"}
                </h3>
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center md:items-start gap-3">
                  <div className="w-48 h-32 rounded-lg overflow-hidden bg-slate-100 border border-gray-100">
                    {preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm"
                    >
                      Choose image
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="px-3 py-1 rounded-md bg-gray-100 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(ev) => {
                      const f = ev.target.files?.[0] ?? null;
                      if (f) setFile(f);
                    }}
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    JPG, PNG recommended
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Slide title"
                  />

                  <div className="flex items-center justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
                      className="px-4 py-2 rounded-md bg-white border border-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-indigo-600 text-white"
                    >
                      {editing ? "Save changes" : "Create slide"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
