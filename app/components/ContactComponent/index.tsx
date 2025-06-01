import React, { useRef } from "react";
import "./contact.style.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
type Props = {
  scrollTween?: GSAPTween;
};

const ContactComponent = (props: Props) => {
  const { scrollTween } = props;
  const contactRef = useRef<HTMLDivElement>(null);
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
      const top = contactRef.current?.querySelector(
        ".sccontact__top"
      ) as HTMLDivElement;
      const topSubtitle = top?.querySelector(
        ".sccontact__top-subtitle"
      ) as HTMLDivElement;
      const topCopyright = top?.querySelector(
        ".sccontact__top-copyright"
      ) as HTMLDivElement;
      const middle = contactRef.current?.querySelector(
        ".sccontact__middle"
      ) as HTMLDivElement;
      const middleNum = middle?.querySelector(
        ".sccontact__middle-content .num"
      ) as HTMLDivElement;
      const middleContent = SplitText.create(
        middle?.querySelector(
          ".sccontact__middle-content .content"
        ) as HTMLDivElement
      );
      const middleImages = middle?.querySelectorAll(
        ".sccontact__middle-image"
      ) as NodeListOf<HTMLDivElement>;
      const bottom = contactRef.current?.querySelector(
        ".sccontact__bottom"
      ) as HTMLDivElement;
      const bottomTitle = bottom?.querySelector(
        ".sccontact__bottom-title"
      ) as HTMLDivElement;
      const bottomContact = bottom?.querySelector(
        ".sccontact__bottom-contact .contact"
      ) as HTMLDivElement;
      const bottomTerms = bottom?.querySelector(
        ".sccontact__bottom-contact .terms"
      ) as HTMLDivElement;
      // Top Animation
      tl.textIntro([topSubtitle], {}, "<");
      tl.textIntro([topCopyright], {}, "<");
      // Middle Animation
      tl.textIntro([middleNum], {}, "<+0.2");
      tl.from(
        middleContent.lines,
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
      middleImages.forEach((image, index) => {
        const overlay = image.querySelector(".overlay") as HTMLDivElement;
        const img = image.querySelector("img") as HTMLImageElement;
        tl.to(
          overlay,
          {
            xPercent: 100,
            duration: 1.5,
            ease: "power4.out",
          },
          "<+0.2"
        ).to(
          img,
          {
            scale: 1.1,
            transformOrigin: "left center",
            duration: 1.5,
            ease: "power4.out",
          },
          "<"
        );
      });
      // Bottom Animation
      tl.textIntro([bottomTitle], {}, "<+0.2");
      tl.textIntro([bottomContact.children[0]], {}, "<+0.2");
      tl.textIntro([bottomContact.children[1]], {}, "<");
      tl.textIntro([bottomTerms.children[0]], {}, "<+0.2");
      tl.textIntro([bottomTerms.children[1]], {}, "<");
    },
    {
      scope: contactRef,
      dependencies: [scrollTween],
    }
  );
  return (
    <section id="sccontact" className="sccontact" ref={contactRef}>
      <div className="container">
        <div className="sccontact-wrapper grid">
          <div className="sccontact__top">
            <div className="text-container">
              <div className="sccontact__top-subtitle">Carnival</div>
            </div>
            <div className="text-container">
              <div className="sccontact__top-copyright">@2024</div>
            </div>
          </div>
          <div className="sccontact__middle">
            <div className="sccontact__middle-content">
              <div className="text-container">
                <div className="num">(6)</div>
              </div>
              <div className="text-container">
                <div className="content">
                  Dedicated to preserving the history of the automobile, we
                  bring together a community of classic car.
                </div>
              </div>
            </div>
            <div className="sccontact__middle-image --first">
              <img src="images/contact-1.jpeg" alt="Contact" />
              <div className="overlay"></div>
            </div>
            <div className="sccontact__middle-image --second">
              <img src="images/contact-2.jpeg" alt="Contact" />
              <div className="overlay"></div>
            </div>
          </div>
          <div className="sccontact__bottom">
            <div className="sccontact__bottom-title">Carnival</div>
            <div className="sccontact__bottom-contact">
              <div className="contact">
                <a
                  href="mailto:nguyenanhnhat123456@gmail.com"
                  className="contact__text"
                >
                  nguyenanhnhat123456@gmail.com
                </a>
                <a href="tel:+84909284493" className="contact__text">
                  +84909284493
                </a>
              </div>
              <div className="terms">
                <a href="#" className="terms__text">
                  Terms and Conditions
                </a>
                <a href="#" className="terms__text">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
