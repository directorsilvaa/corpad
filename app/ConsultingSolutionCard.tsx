"use client";

import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";

type ConsultingSolutionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function ConsultingSolutionCard({
  title,
  description,
  icon: Icon,
}: ConsultingSolutionCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMouseMove = (event: MouseEvent) => {
      if (reduceMotion.matches) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = ((y - centerY) / centerY) * -8;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
      card.style.setProperty("--mouse-x", "50%");
      card.style.setProperty("--mouse-y", "50%");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <article className="consulting-card consulting-glass-card" ref={cardRef}>
      <span>
        <Icon size={22} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
