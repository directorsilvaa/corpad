import Image from "@/components/ui/vite-image";
import type { CSSProperties } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Handshake,
  Lightbulb,
  Network,
  Phone,
  Rocket,
  Search,
  SmilePlus,
  Sparkles,
  TrendingUp,
  Trophy,
  UsersRound,
  Wrench,
} from "lucide-react";
import { CinematicFooter } from "@/components/ui/motion-footer";
import ConsultingSolutionCard from "../components/ConsultingSolutionCard";
import ConsultingSolutionsSection from "../components/ConsultingSolutionsSection";
import LightRays from "../components/LightRays";
import { consultingServicePages } from "../data/consultingServicePages";
import { importantClientLogos } from "../data/clients";

const differentials = [
  {
    title: "Foco em Resultados",
    icon: TrendingUp,
    description:
      "Cada solucao e desenvolvida para gerar impacto real nos indicadores do negocio.",
  },
  {
    title: "Atendimento Personalizado",
    icon: UsersRound,
    description:
      "Entendemos a realidade da sua empresa para entregar estrategias alinhadas aos seus objetivos.",
  },
  {
    title: "Tecnologia e Inovacao",
    icon: Sparkles,
    description:
      "Utilizamos ferramentas modernas para aumentar eficiencia e competitividade.",
  },
  {
    title: "Decisoes Baseadas em Dados",
    icon: Lightbulb,
    description:
      "Transformamos informacoes em inteligencia para apoiar decisoes mais assertivas.",
  },
  {
    title: "Equipe Especializada",
    icon: CheckCircle2,
    description:
      "Profissionais experientes em gestao, tecnologia e estrategia empresarial.",
  },
  {
    title: "Solucoes Integradas",
    icon: Network,
    description:
      "Uma unica empresa para cuidar da gestao, tecnologia e crescimento do seu negocio.",
  },
];

const methodology = [
  {
    title: "Diagnostico",
    icon: Search,
    description:
      "Analisamos sua operacao para identificar desafios, gargalos e oportunidades.",
  },
  {
    title: "Planejamento",
    icon: ClipboardList,
    description:
      "Desenvolvemos estrategias personalizadas alinhadas aos objetivos da empresa.",
  },
  {
    title: "Implementacao",
    icon: Wrench,
    description:
      "Aplicamos solucoes praticas para melhorar processos e resultados.",
  },
  {
    title: "Monitoramento",
    icon: Activity,
    description:
      "Acompanhamos indicadores e realizamos ajustes continuos.",
  },
  {
    title: "Crescimento",
    icon: TrendingUp,
    description:
      "Estruturamos sua empresa para crescer de forma organizada e sustentavel.",
  },
];

const testimonials = [
  {
    text: "A CORPAD nos ajudou a organizar processos internos e melhorar significativamente nossos resultados.",
    author: "V.P.",
  },
  {
    text: "Com as soluções implementadas, conseguimos aumentar nossa produtividade e ter mais controle sobre a operação.",
    author: "R.M.",
  },
  {
    text: "O suporte estratégico da CORPAD foi fundamental para o crescimento da nossa empresa.",
    author: "A.C.",
  },
];

const aboutStats = [
  {
    value: "20+",
    label: "Anos de experiencia",
    detail: "Estrategia aplicada em diferentes mercados",
    progress: "86%",
    icon: Trophy,
  },
  {
    value: "320+",
    label: "Projetos entregues",
    detail: "Do diagnostico a implementacao",
    progress: "92%",
    icon: Sparkles,
  },
  {
    value: "98%",
    label: "Satisfacao dos clientes",
    detail: "Acompanhamento proximo e recorrente",
    progress: "98%",
    icon: SmilePlus,
  },
  {
    value: "40+",
    label: "Parceiros de longo prazo",
    detail: "Relacionamentos construidos com consistencia",
    progress: "78%",
    icon: Handshake,
  },
];

const whatsappUrl =
  `https://wa.me/5516996094649?text=${encodeURIComponent("Ola, tudo bem? Acessei a pagina de Consultoria Empresarial da CORPAD e gostaria de falar com um especialista para entender as solucoes para minha empresa.")}`;

export default function CorpadConsultoria() {
  return (
    <main className="consulting-page consulting-digital-idv">
      <LightRays
        className="consulting-light-rays"
        raysOrigin="top-center"
        raysColor="#8df0ff"
        raysSpeed={0.72}
        lightSpread={0.68}
        rayLength={2}
        pulsating
        fadeDistance={1.05}
        saturation={1.1}
        mouseInfluence={0.08}
        noiseAmount={0.04}
        distortion={0.065}
      />
      <header className="consulting-topbar">
        <nav className="consulting-topbar-links" aria-label="Navegacao principal">
          <div className="consulting-service-menu">
            <a className="consulting-service-trigger" href="#solucoes">
              Serviços
              <ChevronDown size={14} strokeWidth={2.4} />
            </a>
            <div className="consulting-service-submenu" aria-label="Serviços">
              {consultingServicePages.map((service) => (
                <a href={`/corpad-consultoria/servicos/${service.slug}`} key={service.slug}>
                  {service.navLabel}
                </a>
              ))}
            </div>
          </div>
          <a href="/blog">Blog</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="consulting-topbar-brand" href="#top" aria-label="Pagina inicial">
          <Image
            className="consulting-topbar-logo"
            src="/logo.png"
            alt="CORPAD"
            width={1500}
            height={390}
            priority
          />
        </a>
        <a className="consulting-topbar-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Entrar em contato
        </a>
      </header>
      <section className="consulting-hero" id="top">
        <Image
          className="consulting-hero-bg"
          src="/consultoria/bg.png"
          alt=""
          fill
          width={1792}
          height={1024}
          priority
        />
        <div className="consulting-hero-copy">
          <h1>
            CONSULTORIA EMPRESARIAL
            <span>FOCADA EM RESULTADOS.</span>
          </h1>
          <p>
            AJUDAMOS EMPRESAS A TRANSFORMAR DESAFIOS COMPLEXOS EM DIRECAO CLARA,
            PROCESSOS ORGANIZADOS E RESULTADOS REAIS.
          </p>
          <div className="consulting-actions">
            <a className="consulting-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Agendar Diagnóstico
              <ArrowRight size={17} />
            </a>
            <a className="consulting-secondary" href="#solucoes">
              Ver Serviços
            </a>
          </div>
          <div className="consulting-hero-proof" aria-label="Resumo da consultoria">
            <span>
              <CheckCircle2 size={12} strokeWidth={3} />
              Mais de 20 anos de experiencia
            </span>
            <span>
              <CheckCircle2 size={12} strokeWidth={3} />
              Estrategia, tecnologia e dados
            </span>
          </div>
        </div>
      </section>
      <section className="consulting-section consulting-split" id="sobre">
        <div className="consulting-about-logos" aria-label="Clientes e parceiros">
          {importantClientLogos.map((client) => (
            <span key={client.name}>
              <Image
                src={client.logo ?? ""}
                alt={client.name}
                width={140}
                height={52}
              />
            </span>
          ))}
        </div>
        <div className="consulting-about-main">
          <div className="consulting-about-title">
            <span className="consulting-kicker">Sobre</span>
            <h2>Sobre A CORPAD</h2>
          </div>
          <span className="consulting-about-watermark" aria-hidden="true">ABOUT</span>
          <p>
            Somos uma consultoria dedicada a ajudar empresas a tomar melhores
            decisoes, melhorar a performance e crescer com mais consistencia.
            Transformamos complexidade em resultados.
          </p>
        </div>
        <div className="consulting-about-metrics" aria-label="Resumo da CORPAD">
          {aboutStats.map(({ value, label, detail, progress, icon: Icon }) => (
            <article
              className="consulting-about-metric"
              key={label}
              style={{ "--metric-size": progress } as CSSProperties}
            >
              <div className="consulting-about-metric-top">
                <span className="consulting-about-metric-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={2.25} />
                </span>
                <b>{value}</b>
              </div>
              <strong>{label}</strong>
              <p>{detail}</p>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <ConsultingSolutionsSection />

      <section className="consulting-section consulting-differentials-section">
        <div className="consulting-section-heading consulting-ui-heading">
          <span className="consulting-kicker">Diferenciais</span>
          <h2>Por que empresas escolhem a CORPAD?</h2>
          <p>
            Uma operacao mais inteligente depende de clareza, acompanhamento e
            solucoes que conversam entre si.
          </p>
        </div>
        <div className="consulting-card-grid">
          {differentials.map((differential) => (
            <ConsultingSolutionCard
              key={differential.title}
              title={differential.title}
              description={differential.description}
              icon={differential.icon}
            />
          ))}
        </div>
      </section>

      <section className="consulting-section consulting-method consulting-method-ui" id="metodologia">
        <div className="consulting-section-heading consulting-ui-heading">
          <span className="consulting-kicker">Nossa metodologia</span>
          <h2>
            Tudo que sua empresa precisa para <em>crescer melhor</em>
          </h2>
          <p>
            Um processo simples de acompanhar, com diagnostico, execucao e
            melhoria continua em cada etapa.
          </p>
        </div>
        <div className="consulting-card-grid">
          {methodology.map((step) => (
            <ConsultingSolutionCard
              key={step.title}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </section>

      <section className="consulting-section consulting-results" id="resultados">
        <div>
          <span className="consulting-kicker">Resultados</span>
          <h2>Crescimento baseado em estratégia e execução</h2>
          <div className="consulting-result-metrics" aria-label="Indicadores de resultado">
            <span>
              <b>+ eficiencia</b>
              Processos claros e menos retrabalho.
            </span>
            <span>
              <b>+ controle</b>
              Dados para decidir com seguranca.
            </span>
          </div>
        </div>
        <p>
          Empresas que investem em gestão, tecnologia e inteligência de negócios
          conquistam maior eficiência operacional, melhor controle financeiro e
          mais competitividade. A CORPAD atua para garantir que cada decisão
          tomada gere valor para sua organização.
        </p>
      </section>

      <section className="consulting-section consulting-testimonials-section">
        <div className="consulting-section-heading consulting-ui-heading">
          <span className="consulting-kicker">Depoimentos</span>
          <h2>A confiança dos nossos clientes é o nosso maior resultado</h2>
          <p>
            Parcerias construidas com proximidade, acompanhamento e foco no que
            move o negocio.
          </p>
        </div>
        <div className="consulting-testimonials-carousel">
          <div className="consulting-testimonials">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <blockquote key={`${testimonial.author}-${index}`}>
                <p>{testimonial.text}</p>
                <footer>
                  <span>{String((index % testimonials.length) + 1).padStart(2, "0")}</span>
                  {testimonial.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="consulting-section consulting-institutional">
        <div>
          <span className="consulting-kicker">Estrutura para crescer</span>
          <h2>Empresas fortes são construídas com estratégia, tecnologia e gestão eficiente.</h2>
          <p>
            Independentemente do tamanho do seu negócio, a estrutura correta faz
            toda a diferença nos resultados.
          </p>
        </div>
        <ul>
          <li>
            <CheckCircle2 size={18} />
            Diagnostico claro das prioridades
          </li>
          <li>
            <CheckCircle2 size={18} />
            Solucoes conectadas ao objetivo comercial
          </li>
          <li>
            <CheckCircle2 size={18} />
            Acompanhamento para evoluir continuamente
          </li>
        </ul>
      </section>

      <section className="consulting-final-cta" id="contato">
        <div>
          <span className="consulting-kicker">CTA final</span>
          <h2>Pronto para transformar sua empresa?</h2>
          <p>
            Descubra como as soluções da CORPAD podem aumentar a eficiência,
            reduzir custos e impulsionar o crescimento do seu negócio.
          </p>
        </div>
        <div className="consulting-actions">
          <a className="consulting-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            <Rocket size={18} />
            Solicitar Diagnóstico Gratuito
          </a>
          <a className="consulting-secondary" href={whatsappUrl} target="_blank" rel="noreferrer">
            <Phone size={18} />
            Falar pelo WhatsApp
          </a>
        </div>
      </section>

      <CinematicFooter />
    </main>
  );
}


