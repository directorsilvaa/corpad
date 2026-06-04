import Image from "@/components/ui/vite-image";
import {
  Activity,
  ArrowUpRight,
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

export default function CorpadConsultoria() {
  return (
    <main className="consulting-page">
      <header className="consulting-nav">
        <a className="consulting-brand" href="#top" aria-label="Página inicial">
          <Image
            className="consulting-brand-logo"
            src="/logo.png"
            alt="CORPAD"
            width={1500}
            height={390}
            priority
          />
        </a>
        <nav aria-label="Navegação principal">
          <a className="active" href="#top">Home</a>
          <a href="#solucoes">Consultoria</a>
          <a href="#sobre">Equipe</a>
          <a href="#resultados">Conteudos</a>
        </nav>
        <a className="consulting-nav-button" href="#contato">
          Fale Conosco
        </a>
      </header>

      <section className="consulting-hero" id="top">
        <div className="consulting-hero-copy">
          <span className="consulting-kicker">Gestao empresarial e tecnologia</span>
          <h1>
            Viabilizamos crescimento atraves da <strong>administracao inteligente</strong> do seu negocio.
          </h1>
          <p>
            O modelo de consultoria que une estrategia, processos e tecnologia,
            agora ao alcance da sua empresa.
          </p>
          <div className="consulting-actions">
            <a className="consulting-primary" href="#contato">
              Fale com nossa equipe
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="consulting-family-proof" aria-label="Clientes atendidos">
            <span />
            <span />
            <span />
            <span />
            <span />
            <b>+ 300</b>
            <small>Empresas atendidas</small>
          </div>
        </div>
        <div className="consulting-hero-portrait" aria-hidden="true">
          <div className="consulting-portrait-frame">
            <Image
              className="consulting-portrait-image"
              src="/hero-consultoria.png"
              alt=""
              width={1024}
              height={1024}
              priority
            />
          </div>
          <div className="consulting-floating-card consulting-floating-card-left">
            <CheckCircle2 size={20} />
            Planejamento
          </div>
          <div className="consulting-floating-card consulting-floating-card-right">
            <CheckCircle2 size={20} />
            Liberdade
          </div>
        </div>
      </section>

      <section className="consulting-section consulting-split" id="sobre">
        <div className="consulting-about-heading">
          <span className="consulting-kicker">Sobre a CORPAD</span>
          <h2>Mais do que consultoria. Parceiros do seu crescimento.</h2>
          <p>
            Atuamos na intersecao entre gestao, tecnologia e dados para ajudar
            empresas a operar com mais clareza.
          </p>
          <div className="consulting-about-metrics" aria-label="Resumo da CORPAD">
            <span>
              <b>20+</b>
              anos de experiencia
            </span>
            <span>
              <b>360</b>
              visao do negocio
            </span>
          </div>
        </div>
        <div className="consulting-text-stack">
          <article>
            <CheckCircle2 size={18} />
            <div>
              <strong>Processos eficientes</strong>
              <p>
                Organizamos fluxos, responsabilidades e rotinas para reduzir
                gargalos e dar mais previsibilidade a operacao.
              </p>
            </div>
          </article>
          <article>
            <CheckCircle2 size={18} />
            <div>
              <strong>Tecnologia aplicada</strong>
              <p>
                Conectamos ferramentas, infraestrutura e automacoes ao que a
                empresa realmente precisa para crescer.
              </p>
            </div>
          </article>
          <article>
            <CheckCircle2 size={18} />
            <div>
              <strong>Decisoes com dados</strong>
              <p>
                Transformamos informacoes em indicadores claros para apoiar
                escolhas melhores e resultados consistentes.
              </p>
            </div>
          </article>
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
          <a className="consulting-primary" href="mailto:contato@corpad.com.br">
            <Rocket size={18} />
            Solicitar Diagnóstico Gratuito
          </a>
          <a className="consulting-secondary" href="mailto:contato@corpad.com.br">
            <Phone size={18} />
            Falar com um Especialista
          </a>
        </div>
      </section>

      <CinematicFooter />
    </main>
  );
}
