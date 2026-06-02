"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type PortfolioProject = {
  client: string;
  service: string;
  url?: string;
  image?: string;
  challenge: string;
  solution: string;
  result: string;
};

type PortfolioCarouselProps = {
  projects: PortfolioProject[];
};

export default function PortfolioCarousel({ projects }: PortfolioCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const maxIndex = useMemo(
    () => Math.max(0, projects.length - visibleCount),
    [projects.length, visibleCount],
  );

  const scrollToIndex = (index: number) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelectorAll<HTMLElement>(
      ".portfolio-project-card",
    )[index];

    if (!viewport || !card) return;

    viewport.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });
  };

  const move = (direction: number) => {
    setActiveIndex((current) => {
      const next = current + direction;

      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 760) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1020) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (projects.length <= visibleCount) return;

    const interval = window.setInterval(() => {
      move(1);
    }, 4800);

    return () => window.clearInterval(interval);
  }, [maxIndex, projects.length, visibleCount]);

  return (
    <div className="portfolio-showcase">
      <div className="portfolio-carousel-shell">
        <div
          className="portfolio-project-viewport"
          ref={viewportRef}
          aria-label="Carrossel de projetos realizados"
        >
          <div className="portfolio-project-track">
            {projects.map((project, index) => (
              <article className="portfolio-project-card" key={project.client}>
                <a
                  className="portfolio-project-media"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir projeto ${project.client}`}
                >
                  {project.image ? (
                    <Image
                      className="portfolio-project-image"
                      src={project.image}
                      alt={`Preview do projeto ${project.client}`}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1020px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="portfolio-project-fallback" />
                  )}
                </a>

                <div className="portfolio-project-info">
                  <div>
                    <span>{project.service}</span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </div>
                  <h3>{project.client}</h3>
                  <p>{project.result}</p>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Ver projeto <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="portfolio-carousel-controls">
          <button
            type="button"
            aria-label="Projeto anterior"
            onClick={() => move(-1)}
          >
            <ChevronLeft size={19} />
          </button>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(maxIndex + 1).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Próximo projeto"
            onClick={() => move(1)}
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
