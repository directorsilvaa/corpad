import Image from "@/components/ui/vite-image";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Phone,
  Rocket,
  Search,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { CinematicFooter } from "@/components/ui/motion-footer";
import ConsultingSolutionsSection from "../components/ConsultingSolutionsSection";

const differentials = [
  ["Foco em Resultados", "Cada solução é desenvolvida para gerar impacto real nos indicadores do negócio."],
  ["Atendimento Personalizado", "Entendemos a realidade da sua empresa para entregar estratégias alinhadas aos seus objetivos."],
  ["Tecnologia e Inovação", "Utilizamos ferramentas modernas para aumentar eficiência e competitividade."],
  ["Decisões Baseadas em Dados", "Transformamos informações em inteligência para apoiar decisões mais assertivas."],
  ["Equipe Especializada", "Profissionais experientes em gestão, tecnologia e estratégia empresarial."],
  ["Soluções Integradas", "Uma única empresa para cuidar da gestão, tecnologia e crescimento do seu negócio."],
];

const methodology = [
  ["Diagnóstico", "Analisamos sua operação para identificar desafios, gargalos e oportunidades."],
  ["Planejamento", "Desenvolvemos estratégias personalizadas alinhadas aos objetivos da empresa."],
  ["Implementação", "Aplicamos soluções práticas para melhorar processos e resultados."],
  ["Monitoramento", "Acompanhamos indicadores e realizamos ajustes contínuos."],
  ["Crescimento", "Estruturamos sua empresa para crescer de forma organizada e sustentável."],
];

const methodologyIcons = [Search, ClipboardList, Wrench, Activity, TrendingUp];

const testimonials = [
  "A CORPAD nos ajudou a organizar processos internos e melhorar significativamente nossos resultados.",
  "Com as soluções implementadas, conseguimos aumentar nossa produtividade e ter mais controle sobre a operação.",
  "O suporte estratégico da CORPAD foi fundamental para o crescimento da nossa empresa.",
];

const aboutLogos = [
  ["BR Tax", "Logotipo-BR-Tax__1_-removebg-preview.png"],
  ["TK Soft", "tk_soft.webp"],
  ["Total Rede", "total_rede.webp"],
  ["BR Build", "Logotipo-BR-Build.png.webp"],
  ["Avant Medical", "Logotipo-Avant-Medical.png"],
  ["Global Trade", "Logotipo-Global-Trade.webp"],
];

const aboutStats = [
  ["20+", "Anos de experiencia"],
  ["320+", "Projetos entregues"],
  ["98%", "Satisfacao dos clientes"],
  ["40+", "Parceiros de longo prazo"],
];

const whatsappUrl =
  `https://wa.me/5516996094649?text=${encodeURIComponent("Ola, tudo bem? Acessei a pagina de Consultoria Empresarial da CORPAD e gostaria de falar com um especialista para entender as solucoes para minha empresa.")}`;

export default function CorpadConsultoria() {
  return (
    <main className="consulting-page">
      <header className="consulting-topbar">
        <nav className="consulting-topbar-links" aria-label="Navegacao principal">
          <a href="#solucoes">Serviços</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="consulting-topbar-brand" href="#top" aria-label="Pagina inicial">
          CORPAD
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
            Consultoria empresarial
            <span>focada em resultados.</span>
          </h1>
          <p>
            Ajudamos empresas a transformar desafios complexos em direcao clara,
            processos organizados e resultados reais.
          </p>
          <div className="consulting-actions">
            <a className="consulting-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Agendar diagnóstico
              <ArrowRight size={17} />
            </a>
            <a className="consulting-secondary" href="#solucoes">
              Ver serviços
            </a>
          </div>
        </div>
      </section>
      <section className="consulting-section consulting-split" id="sobre">
        <div className="consulting-about-logos" aria-label="Clientes e parceiros">
          {aboutLogos.map(([name, file]) => (
            <span key={name}>
              <Image
                src={`/logotiposclientes/${file}`}
                alt={name}
                width={140}
                height={52}
              />
            </span>
          ))}
        </div>
        <div className="consulting-about-main">
          <span className="consulting-about-watermark" aria-hidden="true">ABOUT</span>
          <p>
            Somos uma consultoria dedicada a ajudar empresas a tomar melhores
            decisoes, melhorar a performance e crescer com mais consistencia.
            Transformamos complexidade em resultados.
          </p>
        </div>
        <div className="consulting-about-metrics" aria-label="Resumo da CORPAD">
          {aboutStats.map(([value, label]) => (
            <span key={label}>
              <b>{value}</b>
              {label}
            </span>
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
        <div className="consulting-differentials">
          {differentials.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
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
        <div className="consulting-steps">
          {methodology.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                {(() => {
                  const Icon = methodologyIcons[index];

                  return (
                    <i aria-hidden="true">
                      <Icon size={22} />
                    </i>
                  );
                })()}
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
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
              <blockquote key={`${testimonial}-${index}`}>
                <p>{testimonial}</p>
                <footer>
                  <span>{String((index % testimonials.length) + 1).padStart(2, "0")}</span>
                  Cliente CORPAD
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


