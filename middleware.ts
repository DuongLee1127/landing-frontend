import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          request.cookies.delete("token");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
  if (!token) {
    const handleLogout = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          request.cookies.delete("token");
          window.location.href = "/login";
        } else {
          console.error("Logout failed:", await res.text());
        }
      } catch (err) {
        console.error("Network error:", err);
      }
    };
    handleLogout();
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
