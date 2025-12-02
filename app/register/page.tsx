"use client";
import style from "@/styles/login.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [otp, setOtp] = useState(0);
  const [name, setName] = useState("");
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSOtp = async () => {
    const res = await fetch("http://localhost:8000/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setTime(60);
      setMessage(data.message);
    }
  };
  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        repassword,
        name,
        otp,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      router.push("/login");
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
        <div className={`${style["login-box"]} ${style["full-width"]}`}>
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
          <h1 className={style["login-title"]}>Sign up new Accoutnt</h1>
          <button className={`${style["login-google"]} ${style["width-70"]}`}>
            <img src="images/google.png" alt="Google" /> Continue with Google
          </button>
          <a href="#" className={`${style["login-or"]} ${style["width-70"]}`}>
            or Sign in with Email
          </a>
          <form
            className="max-w-md mx-auto space-y-4 w-full"
            autoComplete="off"
            noValidate
            onSubmit={handleRegister}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <div className="mt-2 flex gap-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  placeholder="you@example.com"
                  aria-describedby="email-help"
                  data-otp-email
                />
                <button
                  type="button"
                  onClick={handleSOtp}
                  disabled={time > 0}
                  className={`w-[50%] py-2 rounded-lg text-white font-medium transition 
          ${
            time > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }
        `}
                >
                  {time > 0 ? `Resend in ${time}s` : "Send OTP"}
                </button>
              </div>
              <p id="email-help" className="text-xs text-slate-400 mt-2">
                {message === ""
                  ? "We will send you a 6-digit OTP code."
                  : message}
              </p>
            </div>

            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-slate-700"
              >
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={otp == 0 ? "" : otp}
                onChange={(e) => {
                  setOtp(Number(e.target.value));
                }}
                autoComplete="one-time-code"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 tracking-widest text-center text-xl font-semibold"
                placeholder="******"
                aria-describedby="otp-help"
                data-otp-input
              />
              <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                <p id="otp-help">
                  Code valid for <strong>5 minutes</strong>.
                </p>
                <button
                  type="button"
                  className="text-indigo-600 underline text-xs hidden"
                  data-resend-otp
                >
                  Resend OTP
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="Nguyen Van A"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label
                htmlFor="repassword"
                className="block text-sm font-medium text-slate-700"
              >
                Repassword
              </label>
              <input
                id="repassword"
                name="repassword"
                type="password"
                required
                minLength={6}
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <button
                type="submit"
                className="login-module-scss-module__rBepBa__login-submit"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className={style["login-register"]}>
            Already have an account <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
