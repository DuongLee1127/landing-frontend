"use client";
import style from "@/styles/style.module.scss";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  return (
    <header>
      <nav>
        <div className={style.logo}>whitepace</div>
        <div className={style["nav-list"]}>
          <div className={style["nav-item"]}>Product</div>
          <div className={style["nav-item"]}>Solutions</div>
          <div className={style["nav-item"]}>Resources</div>
          <div className={style["nav-item"]}>Pricing</div>
        </div>
        <div className={style["nav-auth"]}>
          <div className={style["login"]}>
            <a href="/login">Login</a>
          </div>
          <a className={style["try-whitepace"]} href="/dashboard">
            Dashboard
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
