"use client";

import { useEffect } from "react";

const revealSelector = [
  ".problem-section",
  ".solution-section",
  ".portfolio-section",
  ".mid-cta-section",
  ".faq-section",
  ".final-cta-section",
  ".problem-heading",
  ".problem-body",
  ".case-card",
  ".faq-item",
].join(",");

export default function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(revealSelector));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14,
      },
    );

    elements.forEach((element) => {
      element.classList.add("reveal-on-scroll");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
