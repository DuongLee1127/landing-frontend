"use server";

import { cookies } from "next/headers";

export async function loginAction(data: { token: string; role: string }) {
  const cookieStore = cookies();
  (await cookieStore).set("token", data.token, { path: "/", httpOnly: true });
  (await cookieStore).set("role", data.role, { path: "/", httpOnly: true });
}
