"use client";

import { useEffect, useRef, useState } from "react";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  type User = {
    name: string;
    image: string;
  };
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data.message);
        setUser(data);
      } catch (err) {
        console.error("Không lấy được user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      const res = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        Cookies.remove("token");
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", await res.text());
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 px-3 py-1 rounded-full bg-white shadow-sm hover:shadow transition"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <img
          src={user?.image}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="hidden md:inline text-sm text-gray-700 font-medium">
          {user?.name}
        </span>
        <svg
          className="w-4 h-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-gray-800 text-white rounded-lg shadow-lg ring-1 ring-black/20 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={user?.image}
                alt="avatar"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{user?.name}</div>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button
              className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-white/5 text-sm"
              onClick={() => handleLogout()}
            >
              <span className="w-6 h-6 flex items-center justify-center rounded">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                    stroke="#fff"
                  />
                  <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#fff" />
                </svg>
              </span>
              Log out
            </button>
          </div>

          <div className="px-3 py-2 text-xs text-gray-400 border-t border-white/5">
            <button className="w-full text-left">See all profiles</button>
          </div>
        </div>
      )}
    </div>
  );
}
