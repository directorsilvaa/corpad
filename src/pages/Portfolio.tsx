import Image from "@/components/ui/vite-image";
import { ChevronDown, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  portfolioProjects,
  type PortfolioProject,
} from "../data/portfolioProjects";
import { servicePages } from "../data/servicePages";

const whatsappUrl =
  `https://wa.me/5516996094649?text=${encodeURIComponent("Ola, tudo bem? Acessei o portfolio da CORPAD Digital e gostaria de conversar sobre um projeto para minha empresa.")}`;

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
      <header className="navbar">
        <a className="brand" href="/corpad-digital" aria-label="Página inicial">
          <Image
            className="brand-logo"
            src="/logo.png"
            alt="Logo CORPAD"
            width={1500}
            height={390}
            priority
          />
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          <a href="/corpad-digital#sobre">Sobre</a>
          <div className="nav-menu">
            <a className="nav-menu-trigger" href="/corpad-digital#servicos">
              Serviços <ChevronDown size={14} strokeWidth={2.2} />
            </a>
            <div className="nav-submenu" aria-label="Serviços">
              {servicePages.map((item) => (
                <a href={`/servicos/${item.slug}`} key={item.slug}>
                  {item.navLabel}
                </a>
              ))}
            </div>
          </div>
          <a className="active" href="/portfolio" aria-current="page">
            Portfólio
          </a>
          <a href="/clientes">Clientes</a>
          <a href="/blog">Blog</a>
          <a href="/corpad-digital#contato">Contato</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp <MessageCircle size={15} />
          </a>
        </div>
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
