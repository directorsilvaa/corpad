import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  Globe2,
  Mail,
  MessageCircle,
} from "lucide-react";
import Image from "../components/ui/vite-image";
import { organizationJsonLd, usePageSeo } from "../lib/seo";

export default function Home() {
  const currentYear = new Date().getFullYear();

  usePageSeo({
    title: "CORPAD | Soluções Digitais e Consultoria Empresarial",
    description:
      "Portal da CORPAD para soluções digitais e consultoria empresarial: tecnologia, marketing, infraestrutura, gestão e estratégia para empresas.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "CORPAD",
      url: "https://corpad.com.br/",
      publisher: organizationJsonLd(),
    },
  });

  return (
    <main className="home-gateway">
      <div className="gateway-motion-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <a className="gateway-home-brand" href="/" aria-label="Pagina inicial">
        <Image
          src="/logo.png"
          alt="CORPAD"
          width={300}
          height={78}
          priority
        />
      </a>

      <section className="gateway-hero" aria-label="Entrada CORPAD">
        <h1 className="sr-only">CORPAD Digital e CORPAD Consultoria</h1>
        <article className="gateway-column gateway-digital">
          <div className="gateway-card-visual" aria-hidden="true">
            <i />
            <i />
            <Globe2 size={42} strokeWidth={1.7} />
          </div>
          <div className="gateway-copy">
            <span>Solucoes digitais</span>
            <h2>
              CORPAD <strong>Digital</strong>
            </h2>
            <p>
              Sites, sistemas, automacoes e estrutura digital para empresas que
              querem crescer com tecnologia.
            </p>
            <a className="gateway-primary gateway-cyan" href="/corpad-digital">
              Conhecer solucoes digitais
              <ArrowRight size={18} />
            </a>
          </div>
        </article>

        <article className="gateway-column gateway-consulting">
          <div className="gateway-card-visual" aria-hidden="true">
            <i />
            <i />
            <BriefcaseBusiness size={42} strokeWidth={1.7} />
          </div>
          <div className="gateway-copy">
            <span>Consultoria estrategica</span>
            <h2>
              CORPAD <strong>Consultoria</strong>
            </h2>
            <p>
              Estrategia, gestao e inteligencia para organizar decisoes,
              processos e crescimento.
            </p>
            <a className="gateway-primary gateway-blue" href="/corpad-consultoria">
              Conhecer consultoria
              <ArrowRight size={18} />
            </a>
          </div>
        </article>

        <footer className="gateway-info-strip" aria-label="Informacoes da CORPAD">
          <div className="gateway-info-main">
            <span>© {currentYear} CORPAD. Todos os direitos reservados</span>
            <span>CNPJ: 01.434.659/0001-19</span>
            <span>Fundada em 1996</span>
          </div>
          <div className="gateway-info-contact">
            <a href="mailto:contato@corpad.com.br">
              <Mail size={16} strokeWidth={2.1} />
              contato@corpad.com.br
            </a>
            <a href="/termos-de-uso">
              <FileText size={16} strokeWidth={2.1} />
              Termos de Uso
            </a>
            <a
              href="https://wa.me/5516996094649?text=Ola%2C%20tudo%20bem%3F%20Acessei%20o%20site%20da%20CORPAD%20e%20gostaria%20de%20falar%20com%20voces."
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} strokeWidth={2.1} />
              Clique para falar conosco
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}
