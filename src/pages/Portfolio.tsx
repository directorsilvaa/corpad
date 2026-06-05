import Image from "@/components/ui/vite-image";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  portfolioProjects,
  type PortfolioProject,
} from "../data/portfolioProjects";

export default function PortfolioPage() {
  const [previewProject, setPreviewProject] = useState<PortfolioProject | null>(
    null,
  );

  useEffect(() => {
    if (!previewProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewProject(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewProject]);

  return (
    <main className="portfolio-page">
      <header className="portfolio-page-nav">
        <a href="/corpad-digital" aria-label="Voltar para CORPAD Digital">
          <ArrowLeft size={18} />
          CORPAD Digital
        </a>
      </header>

      <section className="portfolio-page-hero">
        <span className="section-kicker">Portfólio</span>
        <h1>Projetos digitais criados para empresas reais</h1>
        <p>
          Uma seleção de sites, portais e landing pages desenvolvidos para
          apresentar marcas com clareza, credibilidade e foco em crescimento.
        </p>
      </section>

      <section className="portfolio-gallery" aria-label="Portfólio completo">
        {portfolioProjects.map((project) => (
          <article className="portfolio-gallery-card" key={project.client}>
            <button
              type="button"
              onClick={() => setPreviewProject(project)}
              aria-label={`Abrir imagem do projeto ${project.client}`}
            >
              <Image
                src={project.image}
                alt={`Imagem do projeto ${project.client}`}
                fill
                sizes="(max-width: 760px) 92vw, (max-width: 1180px) 45vw, 31vw"
              />
            </button>
            <div>
              <span>{project.service}</span>
              <h2>{project.client}</h2>
            </div>
          </article>
        ))}
      </section>

      {previewProject ? (
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem do projeto ${previewProject.client}`}
          onClick={() => setPreviewProject(null)}
        >
          <button
            type="button"
            className="portfolio-lightbox-close"
            aria-label="Fechar imagem do projeto"
            onClick={() => setPreviewProject(null)}
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
                alt={`Imagem do projeto ${previewProject.client}`}
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
    </main>
  );
}
