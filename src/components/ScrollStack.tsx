"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
  opacity: number;
};

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
};

const calculateProgress = (scrollTop: number, start: number, end: number) => {
  if (scrollTop < start) return 0;
  if (scrollTop > end) return 1;
  return (scrollTop - start) / Math.max(1, end - start);
};

const parsePosition = (value: string | number, viewportHeight: number) => {
  if (typeof value === "string" && value.includes("%")) {
    return (parseFloat(value) / 100) * viewportHeight;
  }

  return parseFloat(String(value));
};

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 110,
  itemScale = 0.035,
  itemStackDistance = 28,
  stackPosition = "16%",
  scaleEndPosition = "8%",
  baseScale = 0.84,
  rotationAmount = 0,
  blurAmount = 0,
}: ScrollStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, CardTransform>());
  const updateFrameRef = useRef<number | null>(null);
  const lenisFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cards = Array.from(
      wrapper.querySelectorAll<HTMLElement>(".scroll-stack-card"),
    );
    const endElement = wrapper.querySelector<HTMLElement>(".scroll-stack-end");
    cardsRef.current = cards;

    cards.forEach((card, index) => {
      card.style.marginBottom =
        index < cards.length - 1 ? `${itemDistance}px` : "0";
      card.style.zIndex = String(index + 1);
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translate3d(0, 0, 0)";
    });

    const updateCardTransforms = () => {
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const wrapperTop = wrapper.getBoundingClientRect().top + scrollTop;
      const endTop = endElement
        ? wrapperTop + endElement.offsetTop
        : wrapperTop + wrapper.offsetHeight;
      cardsRef.current.forEach((card, index) => {
        const nextCard = cardsRef.current[index + 1];
        const nextTop = nextCard
          ? wrapperTop + nextCard.offsetTop
          : endTop;
        const triggerStart = nextTop - viewportHeight;
        const triggerEnd = nextTop;
        const scaleProgress = calculateProgress(
          scrollTop,
          triggerStart,
          triggerEnd,
        );
        const targetScale = baseScale + index * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);
        const rotation = rotationAmount
          ? index * rotationAmount * scaleProgress
          : 0;
        const blur = blurAmount ? scaleProgress * blurAmount : 0;
        const translateY = -scaleProgress * itemStackDistance * (index + 1);
        const opacity = 1 - scaleProgress * 0.1;

        const newTransform = {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 100) / 100,
          blur: Math.round(blur * 100) / 100,
          opacity: Math.round(opacity * 1000) / 1000,
        };
        const lastTransform = lastTransformsRef.current.get(index);
        const hasChanged =
          !lastTransform ||
          Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
          Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
          Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
          Math.abs(lastTransform.blur - newTransform.blur) > 0.1 ||
          Math.abs(lastTransform.opacity - newTransform.opacity) > 0.001;

        if (hasChanged) {
          card.style.transform = `translate3d(0, ${newTransform.translateY}px, ${-scaleProgress * 120}px) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
          card.style.filter =
            newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
          card.style.opacity = String(newTransform.opacity);
          lastTransformsRef.current.set(index, newTransform);
        }
      });

      updateFrameRef.current = null;
    };

    const queueUpdate = () => {
      if (updateFrameRef.current) return;
      updateFrameRef.current = requestAnimationFrame(updateCardTransforms);
    };

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      lenisFrameRef.current = requestAnimationFrame(raf);
    };

    lenis.on("scroll", updateCardTransforms);
    lenisRef.current = lenis;

    updateCardTransforms();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate, { passive: true });
    lenisFrameRef.current = requestAnimationFrame(raf);

    return () => {
      if (updateFrameRef.current) {
        cancelAnimationFrame(updateFrameRef.current);
      }
      if (lenisFrameRef.current) {
        cancelAnimationFrame(lenisFrameRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      lastTransformsRef.current.clear();
    };
  }, [
    baseScale,
    blurAmount,
    itemDistance,
    itemScale,
    itemStackDistance,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  return (
    <div className={`scroll-stack ${className}`} ref={wrapperRef}>
      <div className="scroll-stack-inner">
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return child;

          const element = child as ReactElement<{ className?: string }>;
          return cloneElement(element, {
            className: `${element.props.className ?? ""} scroll-stack-card`,
          });
        })}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}
