"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/dashboard/footer";
import Cookies from "js-cookie";
const token = Cookies.get("token") || "";

type Slide = {
  id: string;
  user_name: string;
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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [loadCreate, setLoadCreate] = useState(false);

  const [fetchSlides, setFetchSlides] = useState(0);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/slides`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setSlides(data);
      console.log(data);
      setLoading(false);
    }
    load();
  }, [fetchSlides]);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function openCreate() {
    setEditing(null);
    setFile(null);
    setPreview(null);
    setOpenModal(true);
  }

  function openEdit(s: Slide) {
    setEditing(s);
    setFile(null);
    setPreview(s.url);
    setOpenModal(true);
  }

  async function handleSave(e?: React.FormEvent) {
    setLoadCreate(true);
    if (e) e.preventDefault();
    const fd = new FormData();
    if (file) fd.append("image", file);
    if (editing) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-slide/${editing.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        console.log("Error saving slide: ", data.error);
        alert(data.error);
        return;
      }
      setFetchSlides(fetchSlides + 1);
      setSlides((prev) => [...prev]);
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-slide`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log("Error saving slide: ", data.error);
        alert(data.error);
        return;   
      }
      setSlides((prev) => [data, ...prev]);
    }
    setLoadCreate(false);

    setOpenModal(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this slide? This action cannot be undone.")) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Error deleting slide");
      return;
    }
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
              Add Slide
            </button>
          </div>
        </div>

        <div className="grid gap-4 max-h-[650px] overflow-y-auto pr-2">
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
              {slides.map((s, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-100 shadow-md p-3 flex flex-col overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative w-full h-44 rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={s.url}
                      alt={s.user_name}
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
                      {s.user_name}
                    </h5>
                  </div>

                  <div className="mt-3 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(s)}
                        className="flex-1 text-xs px-2 py-1.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="flex-1 text-xs px-2 py-1.5 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition font-medium"
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
                      className={`text-xs px-2 py-1.5 rounded-md font-medium transition ${
                        s.active
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
                          : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
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
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 z-10"
            >
              <div className="flex items-center justify-end mb-6">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl font-light"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* preview column */}
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center shadow-sm cursor-pointer"
                    onClick={() => fileRef.current?.click()}
                  >
                    {preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-slate-300"
                        >
                          <path
                            d="M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <circle cx="10" cy="11" r="2" fill="currentColor" />
                          <path
                            d="M4 15l4-4 8 8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-sm text-slate-400">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition shadow-sm"
                    >
                      Upload Image
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition"
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
                  <p className="text-xs text-slate-400">
                    JPG, PNG (max 2MB). Recommended: 1920x1080px
                  </p>
                </div>

                {/* form column */}
                <div className="flex flex-col justify-center items-center gap-6">
                  <div className="flex items-center justify-end gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
                      className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loadCreate || !file}
                      className={`px-5 py-2.5 rounded-lg text-white font-medium transition shadow-sm ${
                        loadCreate || !file
                          ? "bg-slate-300 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {loadCreate
                        ? editing
                          ? "Updating..."
                          : "Creating..."
                        : editing
                        ? "Save Changes"
                        : "Create Slide"}
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
