import React, { useRef } from "react";
import "./leather.style.scss";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger, SplitText } from "gsap/all";

type Props = {
  scrollTween?: GSAPTween;
};

const LeatherComponent = (props: Props) => {
  const { scrollTween } = props;
  const leatherRef = useRef<HTMLDivElement>(null);
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
      const content = leatherRef.current?.querySelector(
        ".scleather__content"
      ) as HTMLDivElement;
      const contentTop = content?.querySelector(
        ".scleather__content-top"
      ) as HTMLDivElement;
      const contentTopNum = contentTop?.querySelector(
        ".num"
      ) as HTMLSpanElement;
      const contentTopInfoNum = contentTop?.querySelector(
        ".info__num"
      ) as HTMLDivElement;
      const contentTopInfoTitle = contentTop?.querySelector(
        ".info__title"
      ) as HTMLDivElement;
      const contentMiddle = content?.querySelector(
        ".scleather__content-middle"
      ) as HTMLDivElement;
      const contentMiddleInfo = contentMiddle?.querySelector(
        ".info"
      ) as HTMLDivElement;
      const contentMiddleContent = SplitText.create(
        contentMiddle?.querySelector(".content") as HTMLDivElement
      );
      const contentBottom = content?.querySelector(
        ".scleather__content-bottom"
      ) as HTMLDivElement;
      const contentBottomThumbs = contentBottom?.querySelectorAll(
        ".thumb"
      ) as NodeListOf<HTMLDivElement>;
      const thumbnail = leatherRef.current?.querySelector(
        ".scleather__thumbnail"
      ) as HTMLDivElement;
      // Content Top Animation
      tl.textIntro([contentTopNum], {}, "<");
      tl.textIntro([contentTopInfoNum], {}, "<");
      tl.textIntro([contentTopInfoTitle], {}, "<");
      // Content Bottom Animation
      contentBottomThumbs.forEach((thumb, index) => {
        const overlay = thumb.querySelector(".overlay") as HTMLDivElement;
        const image = thumb.querySelector("img") as HTMLImageElement;
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
      });
      // Content Middle Animation
      tl.textIntro([contentMiddleInfo], {}, "<");
      tl.from(
        contentMiddleContent.lines,
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
      // Thumbnail Animation
      tl.to(
        thumbnail.children[1],
        {
          xPercent: 100,
          duration: 0.6,
          ease: "power4.out",
        },
        "<"
      ).to(
        thumbnail.children[0],
        {
          transformOrigin: "left center",
          duration: 0.6,
          ease: "power4.out",
        },
        "<"
      );
    },
    {
      scope: leatherRef,
      dependencies: [scrollTween],
    }
  );
  return (
    <section id="scleather" className="scleather" ref={leatherRef}>
      <div className="container">
        <div className="scleather-wrapper grid">
          <div className="scleather__content">
            <div className="scleather__content-top">
              <div className="text-container">
                <span className="num">No. 10423</span>
              </div>
              <div className="info">
                <div className="text-container">
                  <span className="info__num">(2)</span>
                </div>
                <div className="text-container">
                  <h3 className="info__title">Leather</h3>
                </div>
              </div>
            </div>
            <div className="scleather__content-middle">
              <span className="info">
                <span>1932 Ford Model B</span>
              </span>
              <p className="content">
                <span>
                  This classic Ford was one of the first mass-produced vehicles
                  with a V8 engine
                </span>
              </p>
            </div>
            <div className="scleather__content-bottom">
              <div className="thumb">
                <img src="images/case-2.jpeg" alt="case 2" />
                <div className="overlay"></div>
              </div>
              <div className="thumb">
                <img src="images/case-1.avif" alt="case 1" />
                <div className="overlay"></div>
              </div>
            </div>
          </div>
          <div className="scleather__thumbnail">
            <img src="images/showcase-1.jpg" alt="showcase" />
            <div className="overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeatherComponent;
