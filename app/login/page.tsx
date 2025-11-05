"use client";
import style from "@/styles/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      cookieStore.set("token", data.token);
      if (data.role_id === 1) {
        router.push("/dashboard");
      }
      router.push("/");
    } else {
      let message = data.message;
      if (typeof message === "object") {
        message = Object.values(data.message).join(", ");
      }
      alert(message);
    }
  };

  return (
    <div className={style["login-container"]}>
      <div className={style["login-left"]}>
        <div className={style["login-illustration"]}>
          <img src="images/image.jfif" alt="Turn your ideas into reality" />
        </div>
        <div className={style["login-caption"]}>
          <h2>Turn your ideas into reality.</h2>
          <p>Start for free and get attractive offers from the community</p>
        </div>
      </div>
      <div className={style["login-right"]}>
        <div className={style["login-box"]}>
          <div className={style["login-logo"]}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="#fff6fa" />
              <circle cx="24" cy="24" r="3" fill="#7c2a4d" />
              <circle cx="24" cy="13" r="2" fill="#7c2a4d" />
              <circle cx="24" cy="35" r="2" fill="#7c2a4d" />
              <circle cx="13" cy="24" r="2" fill="#7c2a4d" />
              <circle cx="35" cy="24" r="2" fill="#7c2a4d" />
            </svg>
          </div>
          <h1 className={style["login-title"]}>Login to your Account</h1>
          <p className={style["login-sub"]}>
            See what is going on with your business
          </p>
          <button className={style["login-google"]}>
            <img src="images/google.png" alt="Google" /> Continue with Google
          </button>
          <a href="#" className={style["login-or"]}>
            or Sign in with Email
          </a>
          <form className={style["login-form"]} onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@abc.com"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="************"
              required
            />
            <div className={style["login-options"]}>
              <label className={style["remember-me"]}>
                <input type="checkbox" /> Remember Me
              </label>
              <a href="#" className={style["forgot-password"]}>
                Forgot Password?
              </a>
            </div>
            <button type="submit" className={style["login-submit"]}>
              Login
            </button>
          </form>
          <div className={style["login-register"]}>
            Not Registered Yet? <Link href="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
