import Image from "@/components/ui/vite-image";
import {
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  Map,
  Megaphone,
  MousePointer2,
  Rocket,
  Search,
  ServerCog,
  ShoppingCart,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { CinematicFooter } from "@/components/ui/motion-footer";
import FastDevelopmentSection from "../components/FastDevelopmentSection";
import HypedAnimationsSection from "../components/HypedAnimationsSection";
import LightRays from "../components/LightRays";
import PortfolioCarousel from "../components/PortfolioCarousel";
import ScrollReveal from "../components/ScrollReveal";

const navItems = [
  { label: "Soluções", href: "#solucoes", active: true },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
];

const supportPhrases = [
  "Mais de 20 anos desenvolvendo soluções digitais para empresas que querem evoluir.",
];

const services = [
  {
    title: "Sites profissionais",
    icon: Layers3,
    description:
      "Desenvolvemos sites modernos, responsivos e otimizados para transmitir credibilidade, apresentar sua empresa com clareza e transformar visitantes em oportunidades de negócio.",
    fit: "Para empresas que precisam de uma presença digital forte, profissional e confiável.",
  },
  {
    title: "Lojas virtuais",
    icon: ShoppingCart,
    description:
      "Criamos e-commerces práticos, seguros e preparados para venda, com estrutura para cadastro de produtos, gestão de estoque, preços, descrições e otimização para buscadores.",
    fit: "Para empresas que querem vender online com mais organização e profissionalismo.",
  },
  {
    title: "Marketing digital",
    icon: Megaphone,
    description:
      "Planejamos estratégias para fortalecer sua marca, atrair o público certo, gerar leads qualificados e aproximar sua comunicação dos objetivos comerciais da empresa.",
    fit: "Para empresas que querem sair do improviso e crescer com direção no digital.",
  },
  {
    title: "Tráfego pago",
    icon: MousePointer2,
    description:
      "Criamos, gerenciamos e otimizamos campanhas em Google, Instagram, Facebook, TikTok e LinkedIn para aumentar sua visibilidade e gerar resultados mais rápidos.",
    fit: "Para empresas que querem atrair clientes agora, com campanhas mensuráveis e bem direcionadas.",
  },
  {
    title: "Hospedagem de alta performance",
    icon: ServerCog,
    description:
      "Oferecemos hospedagem rápida, segura e estável para garantir que seu site esteja sempre disponível, protegido e preparado para entregar uma boa experiência ao usuário.",
    fit: "Para empresas que não querem perder vendas por lentidão, instabilidade ou falhas técnicas.",
  },
  {
    title: "Automação de processos",
    icon: Workflow,
    description:
      "Automatizamos tarefas, integramos ferramentas e reduzimos processos manuais para que sua empresa ganhe tempo, reduza falhas e opere com mais inteligência.",
    fit: "Para empresas que querem escalar sem depender de processos lentos e repetitivos.",
  },
];

const benefitsList = [
  "Mais credibilidade para sua marca",
  "Mais visibilidade nos canais digitais",
  "Mais oportunidades de venda",
  "Melhor experiência para seus clientes",
  "Sites mais rápidos, seguros e responsivos",
  "Campanhas com estratégia e acompanhamento",
  "Processos mais ágeis com automação",
  "Suporte técnico e orientação especializada",
];

const differentials = [
  ["Estratégia antes da execução", "Antes de desenvolver qualquer solução, entendemos o cenário, os objetivos e as necessidades da sua empresa para criar uma entrega mais assertiva."],
  ["Soluções em um só lugar", "Site, e-commerce, hospedagem, tráfego pago, marketing digital e automação trabalhando juntos para fortalecer sua presença digital."],
  ["Foco em crescimento", "Cada solução é pensada para gerar valor real: mais visibilidade, mais eficiência, mais oportunidades e mais resultados."],
  ["Experiência e confiança", "São mais de 20 anos criando soluções digitais para empresas que precisam evoluir com segurança, tecnologia e estratégia."],
  ["Suporte próximo", "Você conta com uma equipe preparada para orientar, acompanhar e melhorar sua estrutura digital ao longo do tempo."],
];

const processSteps = [
  ["Entendemos seu negócio", "Analisamos o momento da sua empresa, seus desafios, objetivos, público e oportunidades no ambiente digital."],
  ["Planejamos a melhor solução", "Definimos quais ferramentas, estratégias e canais fazem mais sentido para alcançar os resultados que sua empresa busca."],
  ["Desenvolvemos a estrutura", "Criamos sites, lojas, campanhas, hospedagem ou automações com foco em performance, usabilidade e crescimento."],
  ["Colocamos tudo para funcionar", "Configuramos, testamos, publicamos e acompanhamos a implantação para garantir que a solução esteja pronta para operar."],
  ["Otimizamos continuamente", "Monitoramos dados, identificamos melhorias e ajustamos a estratégia para aumentar a performance ao longo do tempo."],
];

const processJourney = [
  {
    title: "Diagnostico",
    description:
      "Mapeamos objetivos, canais e gargalos para entender onde agir primeiro.",
    outcome: "Mapa",
    icon: Search,
  },
  {
    title: "Estrategia",
    description:
      "Definimos prioridades, ferramentas e proximos passos com foco em resultado.",
    outcome: "Plano",
    icon: Map,
  },
  {
    title: "Construcao",
    description:
      "Criamos a estrutura digital com performance, usabilidade e conversao.",
    outcome: "Base",
    icon: Code2,
  },
  {
    title: "Ativacao",
    description:
      "Testamos, publicamos e acompanhamos a entrada da solucao em operacao.",
    outcome: "Go live",
    icon: Rocket,
  },
  {
    title: "Evolucao",
    description:
      "Monitoramos dados e ajustamos a estrategia para melhorar continuamente.",
    outcome: "Dados",
    icon: TrendingUp,
  },
];

const caseCards = [
  {
    client: "JS Grupo",
    service: "Site institucional",
    url: "https://jsgrupo.com/",
    image: "/projetos/js.png",
    challenge:
      "O grupo precisava de uma presença digital organizada para apresentar sua estrutura e áreas de atuação.",
    solution:
      "Criamos uma experiência institucional com navegação clara, comunicação objetiva e foco em credibilidade.",
    result:
      "Um site mais profissional para apoiar relacionamento, apresentação comercial e descoberta da marca.",
  },
  {
    client: "Instituto Mont Care",
    service: "Site para saúde",
    url: "https://institutomontcare.com.br/",
    image: "/projetos/insti.png",
    challenge:
      "A instituição precisava apresentar serviços, especialidades e informações de atendimento com mais clareza.",
    solution:
      "Desenvolvemos uma estrutura visual acolhedora, direta e preparada para orientar o visitante.",
    result:
      "Uma presença digital mais confiável para pacientes, familiares e parceiros.",
  },
  {
    client: "Clínica Vitacore",
    service: "Site clínico",
    url: "https://www.clinicavitacore.com.br/",
    image: "/projetos/clinicavitacore.png",
    challenge:
      "A clínica precisava destacar seus serviços e facilitar o entendimento da jornada de atendimento.",
    solution:
      "Organizamos conteúdo, chamadas e áreas institucionais em uma interface leve e responsiva.",
    result:
      "Um canal digital mais claro, acessível e alinhado à experiência do paciente.",
  },
  {
    client: "Principia Medicina",
    service: "Site médico",
    url: "https://principiamedicina.com.br/",
    image: "/projetos/principiamedicina.png",
    challenge:
      "O projeto precisava comunicar autoridade, cuidado e informação médica de forma simples.",
    solution:
      "Criamos uma apresentação digital com hierarquia visual, conteúdo organizado e navegação objetiva.",
    result:
      "Uma vitrine digital preparada para apresentar especialidades e aproximar pacientes da clínica.",
  },
];

const faqs = [
  ["A Corpad Digital cria sites personalizados?", "Sim. Cada site é desenvolvido de acordo com a identidade, os objetivos e as necessidades da empresa."],
  ["Vocês também fazem campanhas de tráfego pago?", "Sim. Criamos, gerenciamos e otimizamos campanhas em Google Ads, Instagram, Facebook, TikTok e LinkedIn."],
  ["Posso contratar apenas um serviço?", "Sim. Você pode contratar uma solução específica ou combinar diferentes serviços de acordo com a necessidade da sua empresa."],
  ["A Corpad oferece suporte após a entrega?", "Sim. Dependendo do serviço contratado, a Corpad oferece suporte, acompanhamento técnico e melhorias contínuas."],
  ["Vocês desenvolvem lojas virtuais?", "Sim. Criamos e-commerces com estrutura para venda, organização de produtos, gestão de estoque e otimização para buscadores."],
  ["A automação serve para qualquer empresa?", "A automação pode ser aplicada em diferentes tipos de negócio, principalmente quando existem tarefas repetitivas, integração entre sistemas ou processos manuais que consomem muito tempo."],
];

const faqItems = [
  {
    question: "A Corpad Digital cria sites personalizados?",
    answer:
      "Sim. Cada site e desenvolvido de acordo com a identidade, os objetivos e as necessidades da empresa.",
    points: ["Layout sob medida", "Estrutura responsiva", "Foco em conversao"],
    command: "iniciar projeto personalizado",
  },
  {
    question: "Voces tambem fazem campanhas de trafego pago?",
    answer:
      "Sim. Criamos, gerenciamos e otimizamos campanhas em Google Ads, Instagram, Facebook, TikTok e LinkedIn.",
    points: ["Configuracao das campanhas", "Segmentacao do publico", "Otimizacao constante"],
    command: "ativar campanhas digitais",
  },
  {
    question: "Posso contratar apenas um servico?",
    answer:
      "Sim. Voce pode contratar uma solucao especifica ou combinar diferentes servicos conforme a necessidade da empresa.",
    points: ["Contratacao flexivel", "Escopo claro", "Evolucao por etapas"],
    command: "selecionar servico ideal",
  },
  {
    question: "A Corpad oferece suporte apos a entrega?",
    answer:
      "Sim. Dependendo do servico contratado, oferecemos suporte, acompanhamento tecnico e melhorias continuas.",
    points: ["Acompanhamento tecnico", "Ajustes e melhorias", "Orientacao especializada"],
    command: "solicitar suporte continuo",
  },
  {
    question: "Voces desenvolvem lojas virtuais?",
    answer:
      "Sim. Criamos e-commerces com estrutura para venda, organizacao de produtos, estoque e otimizacao para buscadores.",
    points: ["Cadastro de produtos", "Estrutura de venda", "Experiencia de compra"],
    command: "criar loja virtual",
  },
  {
    question: "A automacao serve para qualquer empresa?",
    answer:
      "A automacao pode ser aplicada quando existem tarefas repetitivas, integracao entre sistemas ou processos manuais que consomem tempo.",
    points: ["Reducao de tarefas manuais", "Integracao de sistemas", "Mais velocidade operacional"],
    command: "mapear automacoes",
  },
];

export default function CorpadPage() {
  return (
    <main className="verdant-page">
      <ScrollReveal />
      <LightRays
        className="hero-light-rays"
        raysOrigin="top-center"
        raysColor="#8df0ff"
        raysSpeed={0.8}
        lightSpread={0.72}
        rayLength={2.2}
        pulsating
        fadeDistance={1.08}
        saturation={1.12}
        mouseInfluence={0.09}
        noiseAmount={0.045}
        distortion={0.075}
      />

      <header className="navbar">
        <a className="brand" href="#" aria-label="Página inicial">
          <Image
            className="brand-logo"
            src="/logo.png"
            alt="Logo"
            width={1500}
            height={390}
            priority
          />
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              className={item.active ? "active" : undefined}
              href={item.href}
              key={item.label}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-cta" href="#contato">
            Faça parte <ArrowUpRight size={15} />
          </a>
        </div>
      </header>

      <section className="hero-shell">
        <div className="hero-content">
          <h1>
            Transforme sua presença digital
            <br />
            em uma <em>máquina de crescimento</em>
          </h1>

          <p>
            Criamos sites, lojas virtuais, marketing, tráfego pago, hospedagem
            e automações para empresas que querem vender mais e crescer com
            tecnologia.
          </p>

          <div className="hero-actions">
            <a className="primary-cta" href="#contato">
              Falar com um especialista <ArrowUpRight size={17} />
            </a>
            <a className="secondary-cta" href="#solucoes">
              Conhecer soluções
            </a>
          </div>

          <div className="benefits" aria-label="Frase de apoio">
            {supportPhrases.map((phrase) => (
              <span key={phrase}>
                <i>
                  <Check size={10} strokeWidth={3} />
                </i>
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="problem-section" id="problema">
        <div className="problem-heading">
          <span className="section-kicker">Por que importa</span>
          <h2>
            <span>Estar online</span>
            <span>
              não basta<strong>.</strong>
            </span>
          </h2>
        </div>

        <div className="problem-body">
          <span className="problem-tags">
            Velocidade · segurança · posicionamento
          </span>
          <p>
            Sua empresa precisa estar pronta para gerar resultado. Um site
            desatualizado, campanhas sem estratégia, baixa visibilidade no
            Google ou processos manuais podem fazer sua empresa perder clientes
            todos os dias.
          </p>
          <p>
            No digital, cada detalhe importa: experiência do usuário,
            comunicação, segurança e conversão trabalhando juntos.
          </p>
          <p>
            A Corpad Digital organiza tudo isso em uma estrutura digital
            inteligente, profissional e orientada para crescimento.
          </p>
        </div>
      </section>

      <section className="solution-section" id="solucoes">
        <div className="section-copy">
          <span className="section-kicker">Solução</span>
          <h2>
            Soluções digitais completas para empresas que querem crescer com
            mais estratégia
          </h2>
        </div>
        <div className="solution-copy">
          <p>
            A Corpad Digital une tecnologia, marketing e performance para criar
            soluções sob medida para o seu negócio.
          </p>
          <p>
            Mais do que entregar sites, campanhas ou sistemas, desenvolvemos
            estruturas digitais que ajudam sua empresa a atrair, converter,
            vender e operar com mais eficiência.
          </p>
        </div>
      </section>

      <FastDevelopmentSection />

      <HypedAnimationsSection />

      <section className="services-section" id="servicos">
        <div className="section-copy centered-copy">
          <span className="section-kicker">Serviços</span>
          <h2>O que podemos construir para sua empresa</h2>
        </div>

        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="service-card" key={service.title}>
                <span className="service-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-copy">
          <span className="section-kicker">Benefícios</span>
          <h2>
            Sua empresa mais preparada para vender, atender e crescer no digital
          </h2>
          <p>
            Com a Corpad Digital, sua empresa ganha uma estrutura mais
            profissional, estratégica e eficiente para competir no ambiente
            online.
          </p>
        </div>

        <div className="benefits-panel">
          <ul>
            {benefitsList.map((benefit) => (
              <li key={benefit}>
                <Check size={16} strokeWidth={3} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="differentials-section" id="sobre">
        <div className="section-copy centered-copy">
          <span className="section-kicker">Diferenciais</span>
          <h2>Por que empresas escolhem a Corpad Digital?</h2>
        </div>

        <div className="differential-grid">
          {differentials.map(([title, description], index) => (
            <article
              className="differential-item"
              data-index={String(index + 1).padStart(2, "0")}
              key={title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="section-copy">
          <span className="section-kicker">Processo</span>
          <h2>Como transformamos sua presença digital</h2>
          <div className="process-visual" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="process-list">
          {processJourney.map((step, index) => {
            const Icon = step.icon;

            return (
            <article
              className="process-step"
              data-index={String(index + 1).padStart(2, "0")}
              key={step.title}
            >
              <span className="process-step-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <i className="process-step-icon" aria-hidden="true">
                <Icon size={22} />
              </i>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <strong>{step.outcome}</strong>
              </div>
            </article>
            );
          })}
        </div>
      </section>
      <section className="portfolio-section" id="projetos">
        <div className="section-copy centered-copy">
          <span className="section-kicker">Portfólio</span>
          <h2>Projetos digitais criados para empresas reais</h2>
          <p>
            A Corpad Digital já ajudou empresas a modernizarem sua presença
            online, estruturarem canais de venda, melhorarem sua comunicação e
            tornarem seus processos mais eficientes.
          </p>
        </div>

        <PortfolioCarousel projects={caseCards} />

        <div className="case-grid" hidden>
          {caseCards.map((card) => (
            <article className="case-card" key={card.client}>
              <span>{card.service}</span>
              <h3>{card.client}</h3>
              <dl>
                <div>
                  <dt>Desafio</dt>
                  <dd>{card.challenge}</dd>
                </div>
                <div>
                  <dt>Solução</dt>
                  <dd>{card.solution}</dd>
                </div>
                <div>
                  <dt>Resultado</dt>
                  <dd>{card.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="mid-cta-section">
        <div>
          <span className="section-kicker">Diagnóstico</span>
          <h2>
            Sua presença digital está ajudando ou limitando o crescimento da sua
            empresa?
          </h2>
          <p>
            Se o seu site, suas campanhas ou seus processos digitais ainda não
            acompanham o potencial do seu negócio, está na hora de mudar.
          </p>
        </div>
        <a className="primary-cta" href="#contato">
          Converse com a Corpad Digital <ArrowUpRight size={17} />
        </a>
      </section>

      <section className="faq-section">
        <div className="section-copy">
          <span className="section-kicker">FAQ</span>
          <h2>Perguntas frequentes</h2>
        </div>

        <div className="faq-list">
          {faqItems.map((item, index) => (
            <article className="faq-item" key={item.question}>
              <div className="faq-copy">
                <span>{index + 1}. {item.question}</span>
                <p>{item.answer}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <Check size={15} strokeWidth={3} />
                      {point}
                    </li>
                  ))}
                </ul>
                <a href="#contato">
                  Ver detalhes <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="faq-terminal" aria-hidden="true">
                <span>Resposta rapida</span>
                <div>
                  <i>site</i>
                  <i>trafego</i>
                  <i>automacao</i>
                  <code>corpad digital --acao "{item.command}"</code>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta-section" id="contato">
        <div className="final-cta-glow" aria-hidden="true" />
        <span className="section-kicker">Vamos crescer</span>
        <h2>
          Pronto para construir uma presença digital mais forte, eficiente e
          lucrativa?
        </h2>
        <p>
          A Corpad Digital desenvolve a estrutura que sua empresa precisa para
          atrair mais clientes, vender melhor e crescer com tecnologia.
        </p>
        <a className="primary-cta" href="mailto:contato@corpad.com.br">
          Fale com um especialista agora <ArrowUpRight size={17} />
        </a>
      </section>
      <CinematicFooter />
    </main>
  );
}
