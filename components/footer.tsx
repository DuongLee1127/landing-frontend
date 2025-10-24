import style from "@/styles/style.module.scss";

function Footer() {
  return (
    <footer className={style["main-footer"]}>
      <div className={style["footer-cta"]}>
        <h2 className={style["footer-title"]}>
          Try Whitepace
          <br />
          today
        </h2>
        <p className={style["footer-desc"]}>
          Get started for free.
          <br />
          Add your whole team as your needs grow.
        </p>
        <button className={style["footer-btn"]}>Try Taskey free &rarr;</button>
        <div className={style["footer-sales"]}>
          On a big team? Contact sales
        </div>
        <div className={style["footer-platforms"]}>
          <span className={style["footer-icon"]}>
            <img src="apple.svg" alt="Apple" />
          </span>
          <span className={style["footer-icon"]}>
            <img src="windows.svg" alt="Windows" />
          </span>
          <span className={style["footer-icon"]}>
            <img src="android.svg" alt="Android" />
          </span>
        </div>
      </div>
      <div className={style["footer-links"]}>
        <div className={style["footer-col"]}>
          <div className={style["footer-logo"]}>whitepace</div>
          <div className={style["footer-text"]}>
            whitepace was created for the new ways we live and work. We make a
            better workspace around the world
          </div>
        </div>
        <div className={style["footer-col"]}>
          <div className={style["footer-heading"]}>Product</div>
          <a href="#">Overview</a>
          <a href="#">Pricing</a>
          <a href="#">Customer stories</a>
        </div>
        <div className={style["footer-col"]}>
          <div className={style["footer-heading"]}>Resources</div>
          <a href="#">Blog</a>
          <a href="#">Guides & tutorials</a>
          <a href="#">Help center</a>
        </div>
        <div className={style["footer-col"]}>
          <div className={style["footer-heading"]}>Company</div>
          <a href="#">About us</a>
          <a href="#">Careers</a>
          <a href="#">Media kit</a>
        </div>
        <div className={style["footer-col"]}>
          <div className={style["footer-heading"]}>Try It Today</div>
          <div className={style["footer-text"]}>
            Get started for free. Add your whole team as your needs grow.
          </div>
          <button
            className={`${style["footer-btn"]} ${style["footer-btn-outline"]}`}
          >
            Start today &rarr;
          </button>
        </div>
      </div>
      <div className={style["footer-bottom"]}>
        <div className={style["footer-meta"]}>
          <span>English</span>
          <span>Terms & privacy</span>
          <span>Security</span>
          <span>Status</span>
          <span>&copy;2021 Whitepace LLC.</span>
        </div>
        <div className={style["footer-social"]}>
          <a href="#">
            <img src="twitter.svg" alt="Twitter" />
          </a>
          <a href="#">
            <img src="facebook.svg" alt="Facebook" />
          </a>
          <a href="#">
            <img src="linkedin.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
