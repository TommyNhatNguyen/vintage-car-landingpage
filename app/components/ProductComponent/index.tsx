import React, { useRef } from "react";
import "./product.style.scss";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger, SplitText } from "gsap/all";
type Props = {
  scrollTween?: GSAPTween;
};

const ProductComponent = (props: Props) => {
  const { scrollTween } = props;
  const productRef = useRef<HTMLDivElement>(null);
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
      const productList = productRef.current?.querySelector(
        ".scproduct__list"
      ) as HTMLDivElement;
      const productListItems = productList?.querySelectorAll(
        ".scproduct__list-item"
      );
      const productInfo = productRef.current?.querySelector(
        ".scproduct__info"
      ) as HTMLDivElement;
      const productInfoCopyright = productInfo?.querySelector(
        ".scproduct__info-copyright"
      ) as HTMLSpanElement;
      const productInfoContent = SplitText.create(
        productInfo?.querySelector(
          ".scproduct__info-content"
        ) as HTMLParagraphElement
      );
      productListItems.forEach((item) => {
        const isTextItem = item.classList.contains("--content");
        if (isTextItem) {
          const num = item.querySelector(
            ".content-top__num"
          ) as HTMLSpanElement;
          const arrow = item.querySelector(
            ".content-top__arrow"
          ) as HTMLDivElement;
          const info = SplitText.create(
            item.querySelector(".content-bottom-info") as HTMLParagraphElement
          );
          tl.from(
            num,
            {
              xPercent: -100,
              opacity: 0,
              duration: 0.6,
              ease: "back(0.8)",
            },
            "<"
          );
          tl.from(
            arrow,
            {
              xPercent: -100,
              opacity: 0,
              duration: 0.6,
              ease: "back(0.8)",
            },
            "<"
          );
          tl.from(
            info.lines,
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
        } else {
          const overlay = item.querySelector(".overlay") as HTMLDivElement;
          const image = item.querySelector("img") as HTMLImageElement;
          tl.to(
            overlay,
            {
              xPercent: 100,
              duration: 1.5,
              ease: "power4.out",
            },
            "<+0.1"
          ).to(
            image,
            {
              transformOrigin: "left center",
              duration: 1.5,
              ease: "power4.out",
            },
            "<"
          );
        }
      });
      tl.textIntro([productInfoCopyright], {}, "<");
      tl.from(
        productInfoContent.lines,
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
        "<"
      );
    },
    {
      scope: productRef,
      dependencies: [scrollTween],
    }
  );
  return (
    <section id="scproduct" className="scproduct" ref={productRef}>
      <div className="container">
        <div className="scproduct-wrapper grid">
          <div className="scproduct__list">
            <div className="scproduct__list-item">
              <img src="images/showcase-4.jpg" alt="showcase" />
              <div className="overlay"></div>
            </div>
            <div className="scproduct__list-item">
              <img src="images/showcase-3.jpg" alt="showcase" />
              <div className="overlay"></div>
            </div>
            <div className="scproduct__list-item --content">
              <div className="content-top">
                <div className="text-container">
                  <span className="content-top__num">(1)</span>
                </div>
                <div className="text-container">
                  <div className="content-top__arrow">
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
                  </div>
                </div>
              </div>
              <div className="content-bottom">
                <div className="text-container">
                  <p className="content-bottom-info">
                    Post-war design saw a shift to bold, sleek lines and bigger
                    engines.
                  </p>
                </div>
              </div>
            </div>
            <div className="scproduct__list-item">
              <img src="images/showcase-2.jpg" alt="showcase" />
              <div className="overlay"></div>
            </div>
          </div>
          <div className="scproduct__info">
            <div className="text-container">
              <span className="scproduct__info-copyright">@2024</span>
            </div>
            <div className="text-container">
              <p className="scproduct__info-content">
                Explore the dawn of the automotive age, when cars became a
                symbol of freedom and luxury
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComponent;
