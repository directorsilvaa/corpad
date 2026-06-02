"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];
  const progress = useMemo(
    () => `${activeIndex + 1}`.padStart(2, "0"),
    [activeIndex],
  );

  const move = (direction: number) => {
    setActiveIndex((current) => {
      const next = current + direction;

      if (next < 0) return projects.length - 1;
      if (next >= projects.length) return 0;
      return next;
    });
  };

  useEffect(() => {
    if (projects.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [projects.length]);

  const getDomain = (url?: string) => {
    if (!url) return "corpad.digital";

    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  };

  return (
    <div className="portfolio-carousel" aria-label="Carrossel de projetos">
      <div className="portfolio-carousel-stage">
        <div
          className="portfolio-carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <article className="portfolio-slide" key={project.client}>
              <div className="project-preview">
                {project.image ? (
                  <Image
                    className="project-preview-image"
                    src={project.image}
                    alt={`Preview do projeto ${project.client}`}
                    fill
                    sizes="(max-width: 1020px) 100vw, 760px"
                  />
                ) : (
                  <div className="project-preview-fallback" aria-hidden="true" />
                )}
              </div>

              <div className="project-copy">
                <span>{project.service}</span>
                <h3>{project.client}</h3>
                <small>{getDomain(project.url)}</small>
                <p>{project.result}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir projeto ${project.client}`}
                >
                  Ver projeto <ExternalLink size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="portfolio-carousel-controls">
        <div>
          <span>{progress}</span>
          <i />
          <span>{String(projects.length).padStart(2, "0")}</span>
        </div>

        <div className="portfolio-carousel-actions">
          <button
            type="button"
            aria-label="Projeto anterior"
            onClick={() => move(-1)}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            type="button"
            aria-label="Próximo projeto"
            onClick={() => move(1)}
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      <div className="portfolio-thumbs" aria-label="Selecionar projeto">
        {projects.map((project, index) => (
          <button
            type="button"
            className={index === activeIndex ? "active" : undefined}
            onClick={() => setActiveIndex(index)}
            key={project.client}
            aria-label={`Mostrar ${project.client}`}
            aria-current={index === activeIndex ? "true" : undefined}
          >
            <span>{project.service}</span>
          </button>
        ))}
      </div>

      <p className="portfolio-active-summary">{activeProject.challenge}</p>
    </div>
  );
}
