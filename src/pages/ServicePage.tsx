import Image from "@/components/ui/vite-image";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Gauge,
  MessageCircle,
  MousePointerClick,
  Search,
  Smartphone,
} from "lucide-react";
import { useEffect } from "react";
import PortfolioCarousel from "../components/PortfolioCarousel";
import { portfolioProjects } from "../data/portfolioProjects";
import { servicePages, type ServicePageContent } from "../data/servicePages";

type ServicePageProps = {
  service: ServicePageContent;
};

const whatsappUrl =
  "https://wa.me/5516996094649?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20CORPAD%20Digital.";

const portfolioPreviewProjects = portfolioProjects.slice(0, 6);

function setMetaDescription(content: string) {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }

  meta.content = content;
}

export default function ServicePage({ service }: ServicePageProps) {
  useEffect(() => {
    document.title = service.metaTitle;
    setMetaDescription(service.metaDescription);
  }, [service]);

  const isWebsiteCreation = service.slug === "criacao-de-sites";
  const highlights = isWebsiteCreation
    ? service.highlights.slice(0, 4)
    : service.highlights;
  const contentSections = isWebsiteCreation
    ? service.sections.slice(0, 4)
    : service.sections;

  return (
    <main className={`service-page${isWebsiteCreation ? " website-service-page" : ""}`}>
      <header className="navbar">
        <a className="brand" href="/corpad-digital" aria-label="Página inicial">
          {isWebsiteCreation ? (
            <span className="website-nav-logo">
              <i>&lt;/</i>
              <strong>CORPAD</strong>
              <i>&gt;</i>
            </span>
          ) : (
            <Image
              className="brand-logo"
              src="/logo.png"
              alt="Logo CORPAD"
              width={1500}
              height={390}
              priority
            />
          )}
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          <div className="nav-menu">
            <a className="active nav-menu-trigger" href="/corpad-digital#servicos" aria-current="page">
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
          <a href="/corpad-digital#projetos">Portfólio</a>
          <a href="/clientes">Clientes</a>
          <a href="/corpad-digital#sobre">Sobre</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp <MessageCircle size={15} />
          </a>
        </div>
      </header>

      <section className="service-page-hero">
        <div>
          {!isWebsiteCreation ? (
            <span className="section-kicker">{service.navLabel}</span>
          ) : null}
          <h1>
            {isWebsiteCreation
              ? "Sua empresa precisa de um site que venda por você"
              : service.heroTitle}
          </h1>
          <p>
            {isWebsiteCreation
              ? "Criamos sites profissionais, rápidos e estratégicos para apresentar seus produtos ou serviços com mais autoridade. Tenha uma presença digital forte, passe mais confiança para seus clientes e transforme visitas em oportunidades reais de venda."
              : service.intro}
          </p>
          <a className="primary-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            Falar sobre {service.navLabel.toLowerCase()} <MessageCircle size={17} />
          </a>
        </div>
        {isWebsiteCreation ? (
          <WebsiteHeroPreview />
        ) : (
          <div className="service-page-brand" aria-hidden="true">
            <Image
              className="service-page-logo"
              src="/logo.png"
              alt=""
              width={1500}
              height={390}
              priority
            />
            <span>{service.navLabel}</span>
          </div>
        )}
      </section>

      {isWebsiteCreation ? (
        <div className="website-hero-marquee" aria-hidden="true">
          {[
            [
              "Página de vendas",
              "Responsiva",
              "Página de links",
              "Design",
              "Mobile",
              "SEO",
              "WhatsApp",
              "Performance",
            ],
            [
              "Sites institucionais",
              "Landing pages",
              "Portfólio",
              "Blog",
              "Conversão",
              "Velocidade",
              "Credibilidade",
              "Presença digital",
            ],
          ].map((row, rowIndex) => (
            <div
              className={`website-hero-marquee-row website-hero-marquee-row-${rowIndex + 1}`}
              key={rowIndex}
            >
              {Array.from({ length: 4 }, () => row)
                .flat()
                .map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      <section className="service-page-highlights" aria-label="Destaques do serviço">
        {highlights.map((highlight) => (
          <article key={highlight}>
            <Check size={18} strokeWidth={3} />
            <span>{highlight}</span>
          </article>
        ))}
      </section>

      {isWebsiteCreation ? <WebsiteCreationShowcase /> : null}

      {isWebsiteCreation ? (
        <section className="portfolio-section service-page-portfolio" id="portfolio-sites">
          <div className="section-copy centered-copy">
            <span className="section-kicker">Portfólio</span>
            <h2>Sites criados para empresas reais</h2>
            <p>
              Alguns projetos desenvolvidos para apresentar marcas, serviços e
              ofertas com mais clareza, credibilidade e presença digital.
            </p>
          </div>

          <PortfolioCarousel projects={portfolioPreviewProjects} />
          <div className="portfolio-section-actions">
            <a className="secondary-cta" href="/portfolio">
              Ver portfólio completo <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      ) : null}

      <section className="service-page-content">
        {contentSections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="service-page-process">
        <div className="section-copy">
          <span className="section-kicker">Como funciona</span>
          <h2>Etapas para um projeto com mais clareza</h2>
        </div>
        <ol>
          {service.process.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="service-page-faq">
        <div className="section-copy centered-copy">
          <span className="section-kicker">FAQ</span>
          <h2>Perguntas sobre {service.navLabel.toLowerCase()}</h2>
        </div>
        <div>
          {service.faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-page-related">
        <span className="section-kicker">Outros serviços</span>
        <div>
          {servicePages
            .filter((item) => item.slug !== service.slug)
            .map((item) => (
              <a href={`/servicos/${item.slug}`} key={item.slug}>
                {item.navLabel}
              </a>
            ))}
        </div>
      </section>
    </main>
  );
}

function WebsiteHeroPreview() {
  return (
    <div className="website-hero-preview" aria-hidden="true">
      <div className="website-tablet-stage">
        <div className="website-tablet-device">
          <div className="website-tablet-camera" />
          <div className="website-tablet-screen">
            <Image
              className="website-hero-image"
              src="/criacaodesites/hero.png"
              alt=""
              fill
              priority
            />
            <span className="website-tablet-scan" />
          </div>
        </div>
        <span className="website-tablet-shadow" />
      </div>
    </div>
  );
}

function WebsiteCreationShowcase() {
  const features = [
    {
      title: "SEO",
      text: "Páginas, títulos e estrutura pensados para o Google entender seu conteúdo.",
      icon: Search,
    },
    {
      title: "Responsivo",
      text: "Experiência adaptada para celular, tablet e desktop sem perder clareza.",
      icon: Smartphone,
    },
    {
      title: "Performance",
      text: "Interface leve, rápida e preparada para visitantes que não esperam.",
      icon: Gauge,
    },
    {
      title: "Conversão",
      text: "CTAs, WhatsApp e navegação guiando o visitante para o próximo passo.",
      icon: MousePointerClick,
    },
  ];

  return (
    <section className="website-build-showcase">
      <div className="website-build-copy">
        <span className="section-kicker">Experiência do site</span>
        <h2>Visual moderno, animações leves e estrutura feita para ranquear</h2>
        <p>
          Na criação de sites, cada detalhe precisa trabalhar junto: conteúdo,
          design, velocidade, SEO, responsividade e chamadas para ação. O
          resultado é uma presença digital bonita, clara e preparada para gerar
          oportunidades.
        </p>
      </div>

      <div className="website-build-visual" aria-hidden="true">
        <div className="website-browser">
          <span />
          <span />
          <span />
        </div>
        <div className="website-screen">
          <div className="website-hero-block">
            <i />
            <strong>Site profissional</strong>
            <small>SEO + Performance + Conversão</small>
          </div>
          <div className="website-layout-grid">
            <span />
            <span />
            <span />
          </div>
          <div className="website-code-card">
            <Code2 size={18} />
            <code>ranking-ready</code>
          </div>
        </div>
      </div>

      <div className="website-build-features">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article key={feature.title}>
              <Icon size={20} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
