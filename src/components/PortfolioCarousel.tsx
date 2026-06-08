"use client";

import { X } from "lucide-react";
import Image from "../../components/ui/vite-image";
import { useEffect, useRef, useState } from "react";

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
  const dragRef = useRef({
    active: false,
    moved: false,
    scrollLeft: 0,
    startX: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [previewProject, setPreviewProject] =
    useState<PortfolioProject | null>(null);

  const openPreview = (project: PortfolioProject) => {
    if (!project.image || dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }

    setPreviewProject(project);
  };

  const closePreview = () => setPreviewProject(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    dragRef.current = {
      active: true,
      moved: false,
      scrollLeft: viewport.scrollLeft,
      startX: event.clientX,
    };
    setIsDragging(true);
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const drag = dragRef.current;
    if (!viewport || !drag.active) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;

    viewport.scrollLeft = drag.scrollLeft - distance * 1.15;
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const moved = dragRef.current.moved;
    dragRef.current.active = false;
    setIsDragging(false);

    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    if (moved) {
      window.setTimeout(() => {
        dragRef.current.moved = false;
      }, 120);
    }
  };

  useEffect(() => {
    if (!previewProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewProject]);

  return (
    <div className="portfolio-showcase">
      <div
        className={`portfolio-project-viewport${isDragging ? " dragging" : ""}`}
        ref={viewportRef}
        aria-label="Galeria de projetos realizados"
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerEnd}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
      >
        <div className="portfolio-project-track">
          {projects.map((project, index) => (
            <article
              className={`portfolio-project-card portfolio-project-card-${
                (index % 6) + 1
              }`}
              key={`${project.client}-${index}`}
            >
              <button
                type="button"
                className="portfolio-project-media"
                onClick={() => openPreview(project)}
                aria-label={`Visualizar imagem do projeto ${project.client}`}
              >
                {project.image ? (
                  <Image
                    className="portfolio-project-image"
                    src={project.image}
                    alt={`Preview do projeto ${project.client}`}
                    fill
                    sizes="(max-width: 760px) 82vw, (max-width: 1020px) 43vw, 420px"
                    draggable={false}
                  />
                ) : (
                  <span className="portfolio-project-fallback" />
                )}
              </button>
            </article>
          ))}
        </div>
      </div>

      {previewProject?.image ? (
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem do projeto ${previewProject.client}`}
          onClick={closePreview}
        >
          <button
            type="button"
            className="portfolio-lightbox-close"
            aria-label="Fechar imagem do projeto"
            onClick={closePreview}
          >
            <X size={22} />
          </button>
          <div
            className="portfolio-lightbox-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="portfolio-lightbox-image-wrap">
              <Image
                src={previewProject.image}
                alt={`Preview do projeto ${previewProject.client}`}
                fill
                sizes="100vw"
                className="portfolio-lightbox-image"
                priority
              />
            </div>
            <div className="portfolio-lightbox-caption">
              <span>{previewProject.service}</span>
              <strong>{previewProject.client}</strong>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
