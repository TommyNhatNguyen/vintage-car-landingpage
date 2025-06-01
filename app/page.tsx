"use client";
import { useGSAP } from "@gsap/react";
import ContactComponent from "./components/ContactComponent";
import HeroComponent from "./components/HeroComponent";
import IndexComponent from "./components/IndexComponent";
import LeatherComponent from "./components/LeatherComponent";
import ProductComponent from "./components/ProductComponent";
import ShowcaseComponent from "./components/ShowcaseComponent";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GSDevTools, ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";

export default function Home() {
  const [scrollTween, setScrollTween] = useState<GSAPTween>();
  const mainRef = useRef<HTMLDivElement>(null);
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollSmoother);
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(GSDevTools);
      gsap.registerPlugin(SplitText);
      const sections = document.querySelectorAll("section");
      const horizontalScrollContainer = document.querySelector(
        ".horizontal-scroll"
      ) as HTMLDivElement;
      gsap.set(sections, {
        width: "100vw",
      });
      let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalScrollContainer,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            inertia: false,
            duration: {
              min: 0.03,
              max: 0.04,
            },
            delay: 0,
          },
          invalidateOnRefresh: true,
        },
      });
      setScrollTween(scrollTween);
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
        speed: 0.1,
        effects: true,
      });
    },
    {
      scope: mainRef,
    }
  );
  return (
    <div ref={mainRef} id="smooth-wrapper">
      <main className="main" id="smooth-content">
        <div className="horizontal-scroll">
          <HeroComponent />
          <IndexComponent scrollTween={scrollTween} />
          <ProductComponent scrollTween={scrollTween} />
          <LeatherComponent scrollTween={scrollTween} />
          <ShowcaseComponent scrollTween={scrollTween} />
          <ContactComponent scrollTween={scrollTween} />
        </div>
      </main>
    </div>
  );
}
