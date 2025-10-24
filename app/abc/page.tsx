"use client";

import { useState } from "react";

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
];

export default function SlideShow() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-[500px] h-[300px] overflow-hidden rounded-2xl shadow-lg">
      {/* Ảnh hiển thị */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Nút điều hướng */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full text-2xl hover:bg-black/60"
      >
        ⟨
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded-full text-2xl hover:bg-black/60"
      >
        ⟩
      </button>
    </div>
  );
}
