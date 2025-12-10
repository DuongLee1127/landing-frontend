"use client";

import { useState } from "react";
import Cookies from "js-cookie";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Vui lòng chọn hình ảnh!");

    const formData = new FormData();
    formData.append("image", file);

    const token = Cookies.get("token");

    setUploading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);
      } else {
        setMessage(
          "❌ Upload thất bại: " + (data.message || "Lỗi không xác định")
        );
      }
    } catch (error) {
      setMessage("❌ Lỗi kết nối server");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow space-y-4">
      <h1 className="text-2xl font-semibold text-center">Upload hình ảnh</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
      />

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-lg shadow-md border"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full py-2 rounded text-white ${
          uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Đang tải lên..." : "Tải lên"}
      </button>

      {message && <p className="text-center text-sm">{message}</p>}
    </div>
  );
}
