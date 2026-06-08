"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { ArrowUp, Briefcase, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  --footer-cyan: #69e8ff;
  --footer-blue: #3c73ff;
  --footer-white: #f7feff;
  --pill-bg-1: rgba(105, 232, 255, 0.22);
  --pill-bg-2: rgba(255, 255, 255, 0.08);
  --pill-shadow: rgba(105, 232, 255, 0.3);
  --pill-highlight: rgba(255, 255, 255, 0.34);
  --pill-inset-shadow: rgba(0, 0, 0, 0.45);
  --pill-border: rgba(105, 232, 255, 0.58);
  --pill-bg-1-hover: rgba(105, 232, 255, 0.34);
  --pill-bg-2-hover: rgba(60, 115, 255, 0.18);
  --pill-border-hover: rgba(141, 240, 255, 0.95);
  --pill-shadow-hover: rgba(105, 232, 255, 0.5);
  --pill-highlight-hover: rgba(255, 255, 255, 0.56);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(255, 82, 119, 0.55)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(255, 82, 119, 0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(105, 232, 255, 0.16) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(105, 232, 255, 0.11) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(105, 232, 255, 0.36) 0%,
    rgba(60, 115, 255, 0.24) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: 24vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(105, 232, 255, 0.4);
  background: linear-gradient(180deg, rgba(105, 232, 255, 0.28) 0%, rgba(60, 115, 255, 0.08) 45%, transparent 72%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, #9af4ff 44%, rgba(255, 255, 255, 0.72) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 30px rgba(105, 232, 255, 0.48));
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current =
              node;
          }
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Sites profissionais</span> <span className="text-primary/60">✦</span>
    <span>Tráfego pago</span> <span className="text-secondary/60">✦</span>
    <span>E-commerce</span> <span className="text-primary/60">✦</span>
    <span>Automação</span> <span className="text-secondary/60">✦</span>
    <span>Hospedagem segura</span> <span className="text-primary/60">✦</span>
  </div>
);

const whatsappUrl =
  `https://wa.me/5516996094649?text=${encodeURIComponent("Ola, tudo bem? Acessei o site da CORPAD e gostaria de falar com um especialista para entender qual solucao faz mais sentido para minha empresa.")}`;

type FooterLink = {
  label: string;
  href: string;
};

const defaultFooterLinks: FooterLink[] = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Projetos", href: "#projetos" },
  { label: "Clientes", href: "/clientes" },
  { label: "Sobre", href: "#sobre" },
];

type CinematicFooterProps = {
  heading?: string;
  solutionLabel?: string;
  solutionHref?: string;
  links?: FooterLink[];
};

export function CinematicFooter({
  heading = "Pronto para crescer?",
  solutionLabel = "Ver soluções",
  solutionHref = "#servicos",
  links = defaultFooterLinks,
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-screen"
        style={{
          clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
          marginLeft: "calc(50% - 50vw)",
        }}
      >
        <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#07141a] text-white">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_45%,rgba(105,232,255,0.12),transparent_34rem),linear-gradient(180deg,rgba(12,34,44,0.95),#07141a_58%,#061116)]" />
          <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[68vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[70px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          >
            CORPAD
          </div>

          <div className="absolute left-0 top-12 z-10 w-full scale-110 -rotate-2 overflow-hidden border-y border-[#69e8ff]/55 bg-[#69e8ff]/14 py-4 shadow-[0_0_70px_rgba(105,232,255,0.22)] backdrop-blur-md">
            <div className="flex w-max animate-footer-scroll-marquee text-xs font-black uppercase tracking-[0.3em] text-white md:text-sm">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
            <h2
              ref={headingRef}
              className="footer-text-glow mb-12 text-center text-5xl font-black tracking-tighter md:text-8xl"
            >
              {heading}
            </h2>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-wrap justify-center gap-4">
                <MagneticButton
                  as="a"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-glass-pill group flex items-center gap-3 rounded-full bg-[#69e8ff]/20 px-10 py-5 text-sm font-black text-white shadow-[0_0_35px_rgba(105,232,255,0.22)] md:text-base"
                >
                  <MessageCircle className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                  Falar pelo WhatsApp
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href={solutionHref}
                  className="footer-glass-pill group flex items-center gap-3 rounded-full bg-[#69e8ff]/20 px-10 py-5 text-sm font-black text-white shadow-[0_0_35px_rgba(105,232,255,0.22)] md:text-base"
                >
                  <Briefcase className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                  {solutionLabel}
                </MagneticButton>
              </div>

              <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
                {links.map((link) => (
                  <MagneticButton
                    as="a"
                    href={link.href}
                    className="footer-glass-pill rounded-full px-6 py-3 text-xs font-bold text-white/86 hover:text-white md:text-sm"
                    key={link.href}
                  >
                    {link.label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
            <div className="order-2 text-[10px] font-bold uppercase tracking-widest text-white/78 md:order-1 md:text-xs">
              © 2026 CORPAD Digital. Todos os direitos reservados.
            </div>

            <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full border-[#69e8ff]/60 bg-[#69e8ff]/12 px-6 py-3 md:order-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/78 md:text-xs">
                Criado com
              </span>
              <span className="animate-footer-heartbeat text-sm text-destructive md:text-base">
                ❤
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/78 md:text-xs">
                pela
              </span>
              <span className="ml-1 text-xs font-black tracking-normal text-white md:text-sm">
                CORPAD
              </span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="footer-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-primary hover:text-white"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-y-1.5" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
