"use client";

import AppHeader from "@/components/header";
import AppFooter from "@/components/footer";
import style from "@/styles/style.module.scss";
import { useEffect, useState } from "react";

const images = ["/images/ba-la-gi-min.jpeg", "/images/idea.jpg"];

export default function Body() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    console.log(current);
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    console.log(current);
  };
  useEffect(() => {}, [current]);

  return (
    <>
      <AppHeader />
      <div className={style["container"]}>
        <div className={style["about-us"]}>
          <div className={style["left"]}>
            <h1>Get More Done with Whitepace</h1>
            <p>
              Whitepace is your all-in-one productivity solution designed to
              help you manage tasks, collaborate with teams, and streamline
              workflows effortlessly.
            </p>
            <div className={style["try-whitepace"]}>Try whitepace Free</div>
          </div>
          <div className={style["right"]}>
            <div className={style["slide-show"]}>
              <div
                className={`${style["slides"]} relative overflow-hidden w-[800px] h-[480px]`}
              >
                {images.map((image, index) => (
                  <img
                    key={index}
                    className={`${style["slide"]} absolute top-0 left-[${
                      index == current ? current * 0 : 100
                    }%]`}
                    src={image}
                    alt={`Slide ${index}`}
                  />
                ))}
              </div>
            </div>

            <div className={style["arrow-slide"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                onClick={() => {
                  handlePrev();
                }}
              >
                <path
                  fill="white"
                  d="M512 256a256 256 0 1 0 -512 0 256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                onClick={() => {
                  handleNext();
                }}
              >
                <path
                  fill="white"
                  d="M0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={style["project"]}>
          <div className={style["left"]}>
            <h1>Project Management</h1>
            <p>
              Whitepace is your all-in-one productivity solution designed to
              help you manage tasks, collaborate with teams, and streamline
              workflows effortlessly.
            </p>
            <div className={style["try-whitepace"]}>Get Started</div>
          </div>
          <div className={style["right"]}>
            <img src="images/idea.jpg" alt="acb" />
          </div>
        </div>
        <div className={style["choose-plan"]}>
          <h1 className={style["plan-title"]}>
            Choose <span className={style["highlight"]}>Your Plan</span>
          </h1>
          <p className={style["plan-desc"]}>
            Whether you want to get organized, keep your personal life on track,
            or boost workplace productivity, Whitepace has the right plan for
            you.
          </p>
          <div className={style["plan-list"]}>
            <div className={`${style["plan-card"]} ${style["plan-free"]}`}>
              <div className={style["plan-name"]}>Free</div>
              <div className={style["plan-price"]}>$0</div>
              <div className={style["plan-desc-short"]}>
                Capture ideas and find them quickly
              </div>
              <ul className={style["plan-features"]}>
                <li>Sync unlimited devices</li>
                <li>10 GB monthly uploads</li>
                <li>200 MB max. note size</li>
                <li>Customize Home dashboard and access extra widgets</li>
                <li>Connect primary Google Calendar account</li>
                <li>
                  Add due dates, reminders, and notifications to your tasks
                </li>
              </ul>
              <button
                className={`${style["plan-btn"]} ${style["plan-btn-outline"]}`}
              >
                Get Started
              </button>
            </div>
            <div className={`${style["plan-card"]} ${style["plan-personal"]}`}>
              <div className={style["plan-name"]}>Personal</div>
              <div className={style["plan-price"]}>$11.99</div>
              <div className={style["plan-desc-short"]}>
                Keep home and family on track
              </div>
              <ul className={style["plan-features"]}>
                <li>Sync unlimited devices</li>
                <li>10 GB monthly uploads</li>
                <li>200 MB max. note size</li>
                <li>Customize Home dashboard and access extra widgets</li>
                <li>Connect primary Google Calendar account</li>
                <li>
                  Add due dates, reminders, and notifications to your tasks
                </li>
              </ul>
              <button className={style["plan-btn"]}>Get Started</button>
            </div>
            <div
              className={`${style["plan-card"]} ${style["plan-organization"]}`}
            >
              <div className={style["plan-name"]}>Organization</div>
              <div className={style["plan-price"]}>$49.99</div>
              <div className={style["plan-desc-short"]}>
                Capture ideas and find them quickly
              </div>
              <ul className={style["plan-features"]}>
                <li>Sync unlimited devices</li>
                <li>10 GB monthly uploads</li>
                <li>200 MB max. note size</li>
                <li>Customize Home dashboard and access extra widgets</li>
                <li>Connect primary Google Calendar account</li>
                <li>
                  Add due dates, reminders, and notifications to your tasks
                </li>
              </ul>
              <button
                className={`${style["plan-btn"]} ${style["plan-btn-outline"]}`}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className={style["client-say"]}>
          <h1 className={style["client-title"]}>
            What Our Clients <span className={style["highlight"]}>Says</span>
          </h1>
          <div className={style["client-list"]}>
            <div
              className={`${style["client-card"]} ${style["client-card-white"]}`}
            >
              <div className={style["client-quote"]}>&#8220;</div>
              <div className={style["client-text"]}>
                Whitepace is designed as a collaboration tool for businesses
                that is a full project management solution.
              </div>
              <hr className={style["client-divider"]} />
              <div className={style["client-info"]}>
                <img
                  className={style["client-avatar"]}
                  src="images/image1.jpg"
                  alt="image"
                />
                <div>
                  <div className={style["client-name"]}>Oberon Shaw, MCH</div>
                  <div className={style["client-role"]}>
                    Head of Talent Acquisition, North America
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${style["client-card"]} ${style["client-card-blue"]}`}
            >
              <div className={style["client-quote"]}>&#8220;</div>
              <div className={style["client-text"]}>
                Whitepace is designed as a collaboration tool for businesses
                that is a full project management solution.
              </div>
              <hr className={style["client-divider"]} />
              <div className={style["client-info"]}>
                <img
                  className={style["client-avatar"]}
                  src="images/image2.jpg"
                  alt="image"
                />
                <div>
                  <div className={style["client-name"]}>Oberon Shaw, MCH</div>
                  <div className={style["client-role"]}>
                    Head of Talent Acquisition, North America
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${style["client-card"]} ${style["client-card-blue"]}`}
            >
              <div className={style["client-quote"]}>&#8220;</div>
              <div className={style["client-text"]}>
                Whitepace is designed as a collaboration tool for businesses
                that is a full project management solution.
              </div>
              <hr className={style["client-divider"]} />
              <div className={style["client-info"]}>
                <img
                  className={style["client-avatar"]}
                  src="images/image3.jpg"
                  alt="image"
                />
                <div>
                  <div className={style["client-name"]}>Oberon Shaw, MCH</div>
                  <div className={style["client-role"]}>
                    Head of Talent Acquisition, North America
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
}
