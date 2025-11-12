import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (role != "1" && role != "3") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (role == "3" && request.nextUrl.pathname.startsWith("/dashboard/users")) {
    // alert("Editors are not allowed to access the Users page.");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

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
