"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState<File | null | string>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      const user = await fetch(`http://localhost:8000/api/get-user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await user.json();

      if (user.ok) {
        setEmail(data.email);
        setName(data.name);
        setImageFile(data.image);
        setPreview(data.image);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (imageFile instanceof File) {
      const imageUrl = URL.createObjectURL(imageFile);
      setPreview(imageUrl);
    } else if (typeof imageFile === "string") {
      setPreview(imageFile);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  function validate() {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setSuccess(null);

    await new Promise((r) => setTimeout(r, 900));

    const token = Cookies.get("token");

    if (!imageFile) return;
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", name);
    formData.append("email", email);

    const data = await fetch(`http://localhost:8000/api/update-user/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const dataJson = await data.json();
    if (data.ok) {
      setSaving(false);
      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(null), 3000);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    setImageFile(f);
  }

  function removeImage() {
    setImageFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <>
      <div className="w-full py-6 mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Edit User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="flex flex-col items-center gap-4 p-4 border border-gray-100 rounded-xl">
            <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-inner">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="opacity-60"
                  >
                    <path
                      d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20c0-4 4-6 8-6s8 2 8 6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
              >
                Change
              </button>
              <button
                type="button"
                onClick={removeImage}
                className="px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
              >
                Remove
              </button>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />

            <div className="text-xs text-gray-400 text-center">
              JPG, PNG up to 2MB. Square images work best.
            </div>
          </div>

          {/* fields column */}
          <div className="lg:col-span-2 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-gray-200 focus:ring-indigo-200"
                  }`}
                  placeholder="Full name"
                />
                {errors.name && (
                  <div className="text-rose-500 text-xs mt-1">
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-gray-200 focus:ring-indigo-200"
                  }`}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <div className="text-rose-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold text-slate-600">
                About
              </label>
              <textarea
                placeholder="Short bio (optional)"
                className="mt-2 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                rows={4}
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow-sm ${
                    saving
                      ? "bg-indigo-400 cursor-wait"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>

                <Link
                  href="/dashboard/users"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Cancel
                </Link>
              </div>

              <div>
                {success && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">
                    ✓ {success}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* footer (kept from original) */}
        <footer className="pt-10">
          <div className="w-full px-6 mx-auto">
            <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
              <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
                  © 2025, made with <i className="fa fa-heart"></i> by
                  <a
                    href="https://www.creative-tim.com"
                    className="font-semibold text-slate-700"
                    target="_blank"
                    rel="noreferrer"
                  >
                    DuongLe
                  </a>
                  for a better web.
                  <span className="w-full"> Distributed by ❤️ ThemeWagon </span>
                </div>
              </div>
              <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
                <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                    >
                      DuongLe
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                      target="_blank"
                      rel="noreferrer"
                    >
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
