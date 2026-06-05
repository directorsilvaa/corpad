import Image from "@/components/ui/vite-image";
import { Check, ChevronDown, MessageCircle } from "lucide-react";
import { clientLogos } from "../data/clients";
import { servicePages } from "../data/servicePages";

const whatsappUrl =
  "https://wa.me/5516996094649?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20da%20CORPAD%20Digital.";

export default function ClientesPage() {
  return (
    <main className="clients-page">
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
          <a href="/corpad-digital#projetos">Portfólio</a>
          <a className="active" href="/clientes" aria-current="page">Clientes</a>
          <a href="/corpad-digital#sobre">Sobre</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp <MessageCircle size={15} />
          </a>
        </div>
      </header>

      <section className="clients-hero">
        <div>
          <span className="section-kicker">Clientes</span>
          <h1>Empresas que já confiaram na CORPAD</h1>
          <p>
            Marcas de diferentes segmentos que contaram com a CORPAD para
            construir presença digital, organizar comunicação e fortalecer sua
            estrutura online.
          </p>
        </div>
        <div className="clients-proof-card" aria-label="Resumo de clientes">
          <Image
            className="clients-proof-logo"
            src="/logo.png"
            alt="Logo CORPAD"
            width={1500}
            height={390}
            priority
          />
          <strong>{clientLogos.length}+</strong>
          <span>clientes e projetos no portfólio atual</span>
        </div>
      </section>

      <section className="clients-logo-grid" aria-label="Logotipos de clientes">
        {clientLogos.map((client) => (
          <article className="client-logo-card" key={client.name}>
            <div className="client-logo-mark" aria-hidden="true">
              {client.initials}
            </div>
            <h2>{client.name}</h2>
            <p>{client.segment}</p>
          </article>
        ))}
      </section>

      <section className="clients-credibility">
        <article>
          <Check size={18} strokeWidth={3} />
          <span>Mais de 20 anos desenvolvendo soluções digitais</span>
        </article>
        <article>
          <Check size={18} strokeWidth={3} />
          <span>Projetos para saúde, educação, varejo, associações e B2B</span>
        </article>
        <article>
          <Check size={18} strokeWidth={3} />
          <span>Sites, portais, landing pages e estruturas comerciais</span>
        </article>
      </section>
    </main>
  );
}
