import React, { useRef } from "react";
import "./index.style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
type Props = {
  scrollTween?: GSAPTween;
};

const IndexComponent = (props: Props) => {
  const { scrollTween } = props;
  const indexRef = useRef<HTMLDivElement>(null);
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
      const nav = indexRef.current?.querySelector(
        ".scindex__nav"
      ) as HTMLDivElement;  
      const thumbnailContainer = indexRef.current?.querySelector(
        ".scindex__content-thumbnail"
      ) as HTMLDivElement;
      const thumbnailImage = thumbnailContainer?.querySelector(
        ".thumbnail__img"
      ) as HTMLImageElement;
      const thumbnailOverlay = thumbnailContainer?.querySelector(
        ".overlay"
      ) as HTMLDivElement;
      const thumbnailContent = thumbnailContainer?.querySelector(
        ".content"
      ) as HTMLDivElement;
      const thumbnailNum = thumbnailContent?.querySelector(
        ".content__num"
      ) as HTMLSpanElement;
      const thumbnailTitle = thumbnailContent?.querySelector(
        ".content__title"
      ) as HTMLHeadingElement;
      const info = indexRef.current?.querySelector(
        ".scindex__content-info"
      ) as HTMLDivElement;
      const infoContent = info?.querySelectorAll(
        ".content"
      ) as NodeListOf<HTMLDivElement>;
      // Nav animation
      tl.textIntro([nav.children[0]], {});
      tl.textIntro([nav.children[1]], {}, "<");
      // Thumbnail Animation
      tl.to(
        thumbnailOverlay,
        {
          xPercent: 100,
          duration: 1.5,
          ease: "power4.out",
        },
        "<"
      ).to(
        thumbnailImage,
        {
          scale: 1.1,
          transformOrigin: "left center",
          duration: 1.5,
          ease: "power4.out",
        },
        "<"
      );
      // Thumbnail Content Animation
      tl.textIntro([thumbnailTitle], {}, "<+0.2");
      tl.textIntro([thumbnailNum], {}, "<");
      // Info Animation
      infoContent.forEach((content, index) => {
        const num = content.querySelector(".content__num") as HTMLSpanElement;
        const desc = SplitText.create(
          content.querySelector(".content__desc") as HTMLParagraphElement
        );
        const copyright = content.querySelector(
          ".content__copyright"
        ) as HTMLSpanElement;
        tl.textIntro([num], {}, "<+0.2");
        tl.from(
          desc.lines,
          {
            xPercent: -100,
            opacity: 0,
            scale: 0.2,
            duration: 1.2,
            stagger: {
              amount: 0.3,
              from: "start",
            },
            ease: "back(1)",
          },
          "<+0.1"
        );
        tl.textIntro([copyright], {}, "<");
      });
    },
    {
      scope: indexRef,
      dependencies: [scrollTween],
    }
  );
  return (
    <section id="scindex" className="scindex" ref={indexRef}>
      <div className="container">
        <div className="scindex grid">
          {/* Navigation */}
          <div className="scindex__nav">
            <div className="text-container">
              <button type="button">Previous</button>
            </div>
            <div className="text-container">
              <button type="button">Next</button>
            </div>
          </div>
          {/* Content */}
          <div className="scindex__content">
            <div className="scindex__content-thumbnail">
              <div className="thumbnail">
                <img
                  src={"images/product-1.jpg"}
                  className="thumbnail__img"
                  alt="thumbnail image"
                ></img>
                <div className="overlay"></div>
              </div>
              <div className="content">
                <div className="text-container">
                  <span className="content__num">(1)</span>
                </div>
                <div className="text-container">
                  <h2 className="content__title">Index</h2>
                </div>
              </div>
            </div>
            <div className="scindex__content-info">
              <div className="content">
                <div className="text-container">
                  <span className="content__num">(2)</span>
                </div>
                <div className="text-container">
                  <p className="content__desc">
                    A symbol of luxury and craftsmanship, built for the elite
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="text-container">
                  <span className="content__num">1957 Chevolet Bel Air</span>
                </div>
                <div className="text-container">
                  <p className="content__desc">
                    A true icon of 1950s Americana, this car combines elegance
                    with power.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="text-container">
                  <span className="content__copyright">@2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexComponent;
