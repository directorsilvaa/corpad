import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  Globe2,
  Mail,
  MessageCircle,
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
          width={300}
          height={78}
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

        <footer className="gateway-info-strip" aria-label="Informacoes da CORPAD">
          <span>CORPAD (r) Todos os direitos reservados 2024</span>
          <span>CNPJ: 01.434.659/0001-19</span>
          <span>Fundada em 1996</span>
          <a href="mailto:contato@corpad.com.br">
            <Mail size={17} strokeWidth={2.1} />
            contato@corpad.com.br
          </a>
          <a href="/termos-de-uso">
            <FileText size={17} strokeWidth={2.1} />
            Termos de Uso
          </a>
          <a
            href="https://wa.me/5516996094649?text=Ola%2C%20tudo%20bem%3F%20Acessei%20o%20site%20da%20CORPAD%20e%20gostaria%20de%20falar%20com%20voces."
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} strokeWidth={2.1} />
            Clique para falar conosco
          </a>
        </footer>
      </section>
    </main>
  );
}
