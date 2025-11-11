export async function apiFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(`${url}`, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });

  // Nếu backend trả về 401 → tự động logout
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user"); // nếu bạn lưu user trong localStorage
      window.location.href = "/login";
    }
  } else if (res.status === 403) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  return res;
}
