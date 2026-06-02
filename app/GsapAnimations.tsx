"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroSelectors = [
  ".gateway-column",
  ".hero-content",
  ".consulting-hero-copy",
  ".consulting-hero-portrait",
].join(", ");

const revealSelectors = [
  ".problem-section",
  ".solution-section",
  ".services-section",
  ".benefits-section",
  ".differentials-section",
  ".process-section",
  ".portfolio-section",
  ".mid-cta-section",
  ".faq-section",
  ".final-cta-section",
  ".service-card",
  ".benefits-panel",
  ".differential-item",
  ".process-step",
  ".faq-item",
  ".portfolio-project-card",
  ".consulting-section",
  ".consulting-card",
  ".consulting-differentials article",
  ".consulting-steps article",
  ".consulting-testimonials blockquote",
  ".consulting-results",
  ".consulting-institutional",
  ".consulting-final-cta",
].join(", ");

const interactiveSelectors = [
  ".gateway-primary",
  ".primary-cta",
  ".secondary-cta",
  ".nav-cta",
  ".consulting-primary",
  ".consulting-secondary",
  ".consulting-nav-button",
  ".portfolio-project-info button",
].join(", ");

export default function GsapAnimations() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      return undefined;
    }

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroSelectors,
        { autoAlpha: 0, y: 28, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.12,
        },
      );

      gsap.fromTo(
        ".gateway-copy > span, .section-kicker, .consulting-kicker",
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.045,
        },
      );

      gsap.utils.toArray<HTMLElement>(revealSelectors).forEach((element) => {
        if (element.closest(".gateway-hero")) {
          return;
        }

        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(interactiveSelectors).forEach((element) => {
        const enter = () => {
          gsap.to(element, {
            y: -2,
            scale: 1.025,
            duration: 0.28,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.to(element, {
            y: 0,
            scale: 1,
            duration: 0.34,
            ease: "power3.out",
          });
        };

        element.addEventListener("mouseenter", enter);
        element.addEventListener("mouseleave", leave);

        cleanups.push(() => {
          element.removeEventListener("mouseenter", enter);
          element.removeEventListener("mouseleave", leave);
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
