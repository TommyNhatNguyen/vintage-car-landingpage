import React, { useRef } from "react";
import "./hero.style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
type Props = {};

const HeroComponent = (props: Props) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroThumbnailRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline();
      // Hero Thumbnail Animation
      const heroImg = heroThumbnailRef.current?.firstChild as HTMLImageElement;
      const heroImgOverlay = heroThumbnailRef.current
        ?.lastChild as HTMLDivElement;
      tl.to(
        heroImgOverlay,
        {
          xPercent: 100,
          duration: 1.5,
          ease: "power4.out",
        },
        "<+0.3"
      ).to(
        heroImg,
        {
          transformOrigin: "left center",
          duration: 1.5,
          ease: "power4.out",
        },
        "<"
      );
      // Hero Content Animation
      const heroContent = document.querySelector(
        ".schero__content"
      ) as HTMLDivElement;
      const titleContainer = heroContent?.querySelector(
        ".schero__content-title"
      ) as HTMLDivElement;
      const descriptionContainer = heroContent?.querySelector(
        ".schero__content-desc"
      ) as HTMLDivElement;
      const pageContainer = heroContent.querySelector(
        ".schero__content-page"
      ) as HTMLDivElement;
      const subtitle = heroContent?.querySelector(
        ".subtitle"
      ) as HTMLSpanElement;
      const title = heroContent?.querySelector(".title") as HTMLHeadingElement;
      const desc = SplitText.create(
        descriptionContainer?.querySelector(".info") as HTMLHeadingElement
      );
      gsap.set([titleContainer, descriptionContainer, pageContainer], {
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxWidth: "initial",
      });
      gsap.registerEffect({
        name: "textIntro",
        effect: (targets: any, config: any) => {
          const item = targets[0];
          const splitText = SplitText.create(item);
          const tl = gsap.timeline({
            ...config,
          });
          tl.from(splitText.lines, {
            opacity: 0,
            xPercent: -100,
            duration: 0.8,
            ease: "power4.out",
          }).from(
            splitText.chars,
            {
              duration: 0.8,
              ease: "power4.out",
              stagger: {
                amount: 0.3,
                from: "end",
              },
            },
            "<"
          );
          return tl;
        },
        extendTimeline: true,
      });
      tl.textIntro([title], {}, "<");
      tl.textIntro([subtitle], {}, "<");
      tl.from(
        desc.lines,
        {
          xPercent: -100,
          opacity: 0,
          duration: 0.8,
          stagger: {
            amount: 0.3,
            from: "start",
          },
          ease: "back(0.8)",
        },
        "<"
      );
      tl.from(
        pageContainer.children,
        {
          xPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: "back(1)",
        },
        "<"
      );
    },
    {
      scope: heroRef,
    }
  );
  return (
    <section id="schero" className="schero" ref={heroRef}>
      <div className="container">
        <div className="schero-wrapper grid">
          {/* Text */}
          <div className="schero__content">
            <div className="schero__content-title">
              <div className="text-container">
                <span className="subtitle">Carinal</span>
              </div>
              <div className="text-container">
                <h1 className="title">Festival</h1>
              </div>
            </div>
            <div className="schero__content-desc">
              <p className="info">
                Rediscover the Classics explore timeless automotive masterpieces
                from the golden age of motoring.
              </p>
            </div>
            <div className="schero__content-page">
              <span className="page__year">@2024</span>
              <span className="page__num">(1)</span>
            </div>
          </div>
          {/* Thumbnail */}
          <div className="schero__thumbnail" ref={heroThumbnailRef}>
            <img src="images/hero-2.jpg" alt="Hero 2" />
            <div className="overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
