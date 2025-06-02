import React, { useRef } from "react";
import "./showcase.style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
type Props = {
  scrollTween?: GSAPTween;
};

const ShowcaseComponent = (props: Props) => {
  const { scrollTween } = props;
  const showcaseRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!scrollTween) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".container",
          start: "left center",
          end: "left center",
          containerAnimation: scrollTween,
        },
      });
      const top = showcaseRef.current?.querySelector(
        ".scshowcase__top"
      ) as HTMLDivElement;
      const topPage = top?.querySelector(
        ".scshowcase__top-page"
      ) as HTMLSpanElement;
      const topYear = top?.querySelector(
        ".scshowcase__top-year"
      ) as HTMLHeadingElement;
      const middle = showcaseRef.current?.querySelector(
        ".scshowcase__middle"
      ) as HTMLDivElement;
      const middleText = SplitText.create(
        middle?.querySelector(
          ".scshowcase__middle-text"
        ) as HTMLParagraphElement
      );
      const middleArrow = middle?.querySelector(
        ".scshowcase__middle-arrow"
      ) as HTMLDivElement;
      const bottom = showcaseRef.current?.querySelector(
        ".scshowcase__bottom"
      ) as HTMLDivElement;
      const bottomItems = bottom?.querySelectorAll(
        ".scshowcase__bottom-item"
      ) as NodeListOf<HTMLDivElement>;
      // Top Animation
      tl.textIntro([topPage], {}, "<");
      tl.textIntro([topYear], {}, "<");
      // Middle Animation
      tl.from(
        middleText.lines,
        {
          xPercent: -100,
          opacity: 0,
          duration: 0.6,
          stagger: {
            amount: 0.3,
            from: "start",
          },
          ease: "back(0.8)",
        },
        "<+0.1"
      );
      tl.textIntro([middleArrow], {}, "<");
      // Bottom Animation
      bottomItems.forEach((item, index) => {
        const overlay = item.querySelector(".overlay") as HTMLDivElement;
        const image = item.querySelector("img") as HTMLImageElement;
        tl.to(
          overlay,
          {
            xPercent: 100,
            duration: 1.5,
            ease: "power4.out",
          },
          "<+0.2"
        ).to(
          image,
          {
            transformOrigin: "left center",
            duration: 1.5,
            ease: "power4.out",
          },
          "<"
        );
      });
    },
    {
      scope: showcaseRef,
      dependencies: [scrollTween],
    }
  );
  return (
    <section id="scshowcase" className="scshowcase" ref={showcaseRef}>
      <div className="container">
        <div className="scshowcase-wrapper grid">
          <div className="scshowcase__top">
            <div className="text-container">
              <span className="scshowcase__top-page">Page 2/8</span>
            </div>
            <div className="text-container">
              <h2 className="scshowcase__top-year">1950</h2>
            </div>
          </div>
          <div className="scshowcase__middle">
            <p className="scshowcase__middle-text">
              <span>
                Dedicated to preserving the history of the automobile, we bring
                together a community of classic car.
              </span>
            </p>
            <div className="scshowcase__middle-arrow">
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="200px"
                  width="200px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.25 8.5a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1 0-1.5h7.19L6.22 7.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L17.5 16.44V9.25a.75.75 0 0 1 .75-.75Z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="scshowcase__bottom">
            <div className="scshowcase__bottom-item">
              <img src="images/more-1.jpeg" alt="more" />
              <div className="overlay"></div>
            </div>
            <div className="scshowcase__bottom-item">
              <img src="images/more-2.jpeg" alt="more" />
              <div className="overlay"></div>
            </div>
            <div className="scshowcase__bottom-item">
              <img src="images/more-3.jpeg" alt="more" />
              <div className="overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseComponent;
