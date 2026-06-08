import {
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
} from "lucide-react";
import Image from "@/components/ui/vite-image";

export default function Home() {
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
          width={1500}
          height={390}
          priority
        />
      </a>

      <section className="gateway-hero" aria-label="Entrada CORPAD">
        <article className="gateway-column gateway-digital">
          <div className="gateway-card-visual" aria-hidden="true">
            <i />
            <i />
            <Globe2 size={42} strokeWidth={1.7} />
          </div>
          <div className="gateway-copy">
            <span>Solucoes digitais</span>
            <h1>
              CORPAD <strong>Digital</strong>
            </h1>
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
      </section>
    </main>
  );
}
