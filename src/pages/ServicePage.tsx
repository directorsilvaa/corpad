import Image from "@/components/ui/vite-image";
import { CinematicFooter } from "@/components/ui/motion-footer";
import {
  ArrowUpRight,
  ArrowDownRight,
  Check,
  ChevronDown,
  DatabaseBackup,
  Gauge,
  Globe2,
  HardDrive,
  MessageSquareText,
  MessageCircle,
  MoveUpRight,
  PackageCheck,
  Rocket,
  ServerCog,
  Sparkles,
  Target,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, type CSSProperties } from "react";
import PortfolioCarousel from "../components/PortfolioCarousel";
import { featuredClientLogos } from "../data/clients";
import { portfolioProjects } from "../data/portfolioProjects";
import { servicePages, type ServicePageContent } from "../data/servicePages";

type ServicePageProps = {
  service: ServicePageContent;
};

const whatsappPhone = "5516996094649";

const serviceWhatsappMessages: Record<string, string> = {
  "criacao-de-sites": "Ola, vim por causa da criacao de sites.",
  "e-commerce": "Ola, vim por causa do e-commerce.",
  "hospedagem-de-sites": "Ola, vim por causa da hospedagem.",
  "marketing-digital": "Ola, vim por causa do marketing digital.",
  "trafego-pago": "Ola, vim por causa do trafego pago.",
  automacao: "Ola, vim por causa da automacao.",
};

function buildWhatsappUrl(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

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
  const isEcommerce = service.slug === "e-commerce";
  const isHosting = service.slug === "hospedagem-de-sites";
  const isMarketingDigital = service.slug === "marketing-digital";
  const isTrafficPaid = service.slug === "trafego-pago";
  const isAutomation = service.slug === "automacao";
  const serviceWhatsappUrl = buildWhatsappUrl(
    serviceWhatsappMessages[service.slug] ??
      `Ola, vim por causa de ${service.navLabel.toLowerCase()}.`
  );
  const highlights = isWebsiteCreation
    ? service.highlights.slice(0, 4)
    : service.highlights;
  const contentSections = isWebsiteCreation
    ? service.sections.slice(0, 4)
    : service.sections;
  const footerServiceLinks = servicePages
    .filter((item) => item.slug !== service.slug)
    .map((item) => ({
      label: item.navLabel,
      href: `/servicos/${item.slug}`,
    }));

  return (
    <main className={`service-page service-${service.slug}${isWebsiteCreation ? " website-service-page" : ""}`}>
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
          <a href="/portfolio">Portfólio</a>
          <a href="/clientes">Clientes</a>
          <a href="/corpad-digital#sobre">Sobre</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-cta" href={serviceWhatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp <MessageCircle size={15} />
          </a>
        </div>
      </header>

      {isMarketingDigital ? (
        <MarketingDigitalHero service={service} whatsappUrl={serviceWhatsappUrl} />
      ) : (
      <section className="service-page-hero">
        <div className="service-hero-copy">
          {isAutomation ? (
            <span className="automation-hero-kicker">Mais vendas com menos trabalho</span>
          ) : null}
          <h1>
            {isWebsiteCreation
              ? "Sua empresa precisa de um site que venda por você"
              : isHosting
                ? "O servidor mais rapido e seguro para o seu site"
                : isTrafficPaid
                  ? (
                    <>
                      Nosso trabalho é fazer você <span>vender o máximo</span> que puder, <span>investindo o mínimo</span> possível para isso
                    </>
                  )
                  : isAutomation
                    ? "Automação de processos"
                    : service.heroTitle}
          </h1>
          <p>
            {isWebsiteCreation
              ? "Criamos sites profissionais, rápidos e estratégicos para apresentar seus produtos ou serviços com mais autoridade. Tenha uma presença digital forte, passe mais confiança para seus clientes e transforme visitas em oportunidades reais de venda."
              : isHosting
                ? "Hospedagem com estrutura estavel, suporte proximo e seguranca para sua empresa manter o site online com mais velocidade."
                : isTrafficPaid
                  ? "Não sabe por onde começar? Fale conosco agora e saiba como alavancar os resultados da sua empresa."
                  : isAutomation
                    ? "Mais eficiência, menos erros na execução e no controle dos seus projetos, com automação que otimiza processos e reduz falhas operacionais."
                    : service.intro}
          </p>
          {isHosting ? (
            <div className="hosting-hero-benefits">
              {[
                "Migracao de sites com suporte",
                "Suporte via WhatsApp e orientacao tecnica",
                "Estrutura focada em velocidade e seguranca",
              ].map((benefit) => (
                <span key={benefit}>
                  <Check size={15} strokeWidth={2.8} />
                  {benefit}
                </span>
              ))}
            </div>
          ) : (
            <div className="service-hero-benefit">
              <Check size={16} strokeWidth={2.6} />
              <span>{highlights[0]}</span>
            </div>
          )}
          <a className="service-hero-cta" href={serviceWhatsappUrl} target="_blank" rel="noreferrer">
            {isHosting ? "Começar" : isTrafficPaid ? "Garanta sua vaga" : isAutomation ? "Começar agora" : "Fale conosco"} <ArrowUpRight size={28} />
          </a>
        </div>
        {!isHosting && !isEcommerce && !isTrafficPaid && !isAutomation ? (
          <ServiceHeroVisual
            service={service}
            isWebsiteCreation={isWebsiteCreation}
          />
        ) : null}
      </section>
      )}

      {isAutomation ? (
        <>
          <AutomationChallengesSection />
          <AutomationLeadershipSection />
        </>
      ) : null}

      {isTrafficPaid ? (
        <>
          <TrafficBenefitsSection />
          <TrafficPlatformsSection whatsappUrl={serviceWhatsappUrl} />
          <TrafficProductServicesSection />
        </>
      ) : null}

      {isMarketingDigital ? <MarketingHubSection whatsappUrl={serviceWhatsappUrl} /> : null}

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

      {isEcommerce || isHosting ? <ServiceClientsMarqueeSection /> : null}

      {isHosting ? <HostingReasonsSection whatsappUrl={serviceWhatsappUrl} /> : null}

      {isHosting ? <HostingSecurityPerformanceSection whatsappUrl={serviceWhatsappUrl} /> : null}

      {!isMarketingDigital && !isHosting && !isEcommerce && !isTrafficPaid && !isAutomation ? (
        <section className="service-page-highlights" aria-label="Destaques do serviço">
          {highlights.map((highlight) => (
            <article key={highlight}>
              <Check size={18} strokeWidth={3} />
              <span>{highlight}</span>
            </article>
          ))}
        </section>
      ) : null}

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

      {isWebsiteCreation ? <WebsiteInvestmentSection /> : null}

      {isWebsiteCreation ? <WebsiteConversionPillarsSection whatsappUrl={serviceWhatsappUrl} /> : null}

      {!isWebsiteCreation && !isMarketingDigital && !isHosting && !isEcommerce && !isTrafficPaid && !isAutomation ? (
        <section className="service-page-content">
          {contentSections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
      ) : null}

      {isMarketingDigital ? <MarketingProcessSection process={service.process} /> : null}

      {!isMarketingDigital ? (
      <section className="service-page-process">
        <div className="section-copy">
          <span className="section-kicker">Como funciona</span>
          <h2>Como tiramos seu site do papel?</h2>
          <p>
            Um processo simples, com direção clara do planejamento até a
            publicação.
          </p>
          <a className="process-cta" href={serviceWhatsappUrl} target="_blank" rel="noreferrer">
            Começar agora <ArrowUpRight size={15} />
          </a>
        </div>
        <ol>
          {service.process.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
              <MoveUpRight size={16} />
            </li>
          ))}
        </ol>
      </section>
      ) : null}

      <section className="service-page-faq">
        <div className="section-copy">
          <span className="section-kicker">FAQ</span>
          <h2>Perguntas sobre {service.navLabel.toLowerCase()}</h2>
          <p>
            Tire as principais dúvidas antes de começar e entenda o que esperar
            do projeto.
          </p>
          <a className="process-cta" href={serviceWhatsappUrl} target="_blank" rel="noreferrer">
            Tirar dúvidas <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="service-page-faq-list">
          {service.faqs.map((faq, index) => (
            <article key={faq.question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
              <MoveUpRight size={16} />
            </article>
          ))}
        </div>
      </section>

      <CinematicFooter
        heading="Pronto para o próximo passo?"
        solutionLabel="Ver todos os serviços"
        solutionHref="/corpad-digital#servicos"
        links={footerServiceLinks}
      />
    </main>
  );
}

function AutomationChallengesSection() {
  const challenges = [
    "Atendimento lento e ineficiente",
    "Confusão no time comercial",
    "Perda de clientes por falta de respostas",
    "Cliente com péssimas experiências",
    "Vários números de WhatsApp",
    "Custo elevado com funcionários",
    "Time de atendimento desmotivado",
    "Dificuldade em escalar",
    "Problemas para bater metas",
    "Entre outros...",
  ];

  return (
    <section className="automation-challenges-section" aria-labelledby="automation-challenges-title">
      <div className="automation-challenges-heading">
        <h2 id="automation-challenges-title">
          Você tem algum desses <strong>desafios</strong> na sua empresa?
        </h2>
      </div>

      <div className="automation-challenges-panel">
        {challenges.map((challenge) => (
          <span key={challenge}>
            <i aria-hidden="true">×</i>
            {challenge}
          </span>
        ))}
      </div>

      <div className="automation-challenges-footer">
        <h3>Se sim, fique tranquilo!</h3>
        <p>
          Quando sua operação responde mais rápido, reduz tarefas manuais e
          organiza o atendimento, sua equipe ganha controle para vender melhor e
          errar menos.
        </p>
      </div>
    </section>
  );
}

function AutomationLeadershipSection() {
  const brands = [
    "Melissa",
    "Bell'Bell",
    "Orcasa",
    "Gazola",
    "Fiat",
    "Chevrolet",
  ];

  const metrics = [
    {
      eyebrow: "A CORPAD IA aumenta",
      value: "47%",
      text: "na taxa de conversão em seus atendimentos.",
    },
    {
      eyebrow: "A CORPAD IA economiza",
      value: "62%",
      text: "de redução de custos operacionais.",
    },
    {
      eyebrow: "A CORPAD IA resolve",
      value: "94%",
      text: "dos atendimentos sem perder controle.",
    },
  ];

  return (
    <section className="automation-leadership-section" aria-labelledby="automation-leadership-title">
      <div className="automation-leadership-heading">
        <h2 id="automation-leadership-title">
          Escolha uma das <strong>líderes do mercado</strong>
        </h2>
        <p>
          Enquanto sua concorrência dorme, sua empresa continua atendendo,
          organizando demandas e convertendo oportunidades com automação.
        </p>
      </div>

      <div className="automation-brand-row" aria-label="Marcas atendidas">
        {brands.map((brand) => (
          <span key={brand}>{brand}</span>
        ))}
      </div>

      <div className="automation-ia-divider" aria-hidden="true">
        <span>IA</span>
      </div>

      <div className="automation-leadership-copy">
        <h3>
          Por que somos a <strong>escolha ideal</strong> dos nossos clientes?
        </h3>
        <div>
          <p>
            Somos especialistas no uso de IA para humanizar, automatizar e
            otimizar conversas no WhatsApp e nos canais digitais da sua empresa.
          </p>
          <p>
            Em menos de 48 horas, estruturamos fluxos para reduzir falhas,
            acelerar respostas e transformar atendimento em processo comercial.
          </p>
        </div>
      </div>

      <div className="automation-metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.value}>
            <span>{metric.eyebrow}</span>
            <div className="automation-metric-ring">
              <strong>{metric.value}</strong>
            </div>
            <p>{metric.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrafficProductServicesSection() {
  const services = [
    {
      title: "Estratégia e Tráfego pago",
      description:
        "Estratégia de distribuição de anúncios que são exibidos para usuários que correspondem ao perfil de público-alvo da sua empresa.",
    },
    {
      title: "Google meu negócio",
      description:
        "Mostre seu negócio no Google com um Perfil da empresa, transforme clientes que encontram você no Maps e na Pesquisa.",
    },
    {
      title: "Automação de atendimento",
      description:
        "Simples, poderoso e acessível. Os sistemas de automações estão impulsionando o mercado de atendimento inteligente.",
    },
    {
      title: "Sites e Páginas de alta conversão",
      description:
        "Maximize suas conversões, ofereça uma experiência de usuário superior e melhore o ROI das suas campanhas de marketing.",
    },
  ];

  return (
    <section className="product-services-section" aria-labelledby="traffic-product-services-title">
      <div className="product-services-heading">
        <span className="product-services-kicker">Produtos e serviços</span>
        <h2 id="traffic-product-services-title">
          Tenha estratégias e ferramentas personalizadas que{" "}
          <strong>aceleram seu funil de vendas</strong> de ponta a ponta.
        </h2>
      </div>

      <div className="product-services-grid">
        {services.map((service) => (
          <article className="product-service-item" key={service.title}>
            <ArrowUpRight size={18} strokeWidth={3} aria-hidden="true" />
            <div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrafficBenefitsSection() {
  const benefits = [
    {
      title: "Gerando mais leads",
      text: "Segmentamos os anuncios para alcancar leads mais qualificados. Ou seja, contatos de usuarios que tem real chance de comprar o seu produto ou servico.",
    },
    {
      title: "Criando trafego local",
      text: "Nosso objetivo e aumentar as suas vendas. Por isso, direcionamos as campanhas para impactar usuarios que estejam proximos a sua localizacao geografica.",
    },
    {
      title: "Aumentando o numero de seguidores",
      text: "Segmentamos os anuncios para alcancar leads mais qualificados. Ou seja, contatos de usuarios que tem real chance de comprar o seu produto ou servico.",
    },
    {
      title: "Distribuindo conteudo",
      text: "Tao importante quanto produzir conteudo de valor e garantir que este conteudo chegue ate as pessoas. Para isso, criamos uma rede de distribuicao qualificada para que o seu post chegue ate as pessoas certas.",
    },
  ];

  return (
    <section className="traffic-benefits-section" aria-labelledby="traffic-benefits-title">
      <div className="traffic-benefits-heading">
        <span>Beneficios exclusivos</span>
        <h2 id="traffic-benefits-title">
          Como a nossa gestao de trafego pode <strong>ajudar a sua empresa a crescer?</strong>
        </h2>
      </div>

      <div className="traffic-benefits-grid">
        {benefits.map((benefit) => (
          <article key={benefit.title}>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrafficPlatformsSection({ whatsappUrl }: { whatsappUrl: string }) {
  const googleChannels = [
    "Google Pesquisa",
    "Google Display",
    "Google Discovery",
    "Youtube Ads",
    "Google Shopping",
  ];

  const metaChannels = ["Instagram Ads", "Meta Ads"];

  return (
    <section className="traffic-platforms-section" aria-labelledby="traffic-platforms-title">
      <div className="traffic-platforms-heading">
        <span>Plataformas</span>
        <h2 id="traffic-platforms-title">
          Quais sao as <strong>plataformas de trafego pago?</strong>
        </h2>
        <p>Confira os principais canais que fazem parte das nossas campanhas de sucesso:</p>
      </div>

      <div className="traffic-platform-row traffic-platform-row-google">
        <div className="traffic-platform-copy">
          <h3>Google Ads</h3>
          <p>
            Resumidamente, a plataforma exibe seu anuncio no resultado de pesquisas pelos produtos ou servicos
            que sao oferecidos por voce. Seguindo criterios rigorosos, a inteligencia artificial do Google Ads
            busca mostrar os anuncios ideais para clientes em potencial no momento propicio a realizarem uma
            acao de compra.
          </p>
        </div>
        <TrafficOrbit className="traffic-google-orbit" labels={googleChannels} />
      </div>

      <div className="traffic-platform-row traffic-platform-row-meta">
        <TrafficOrbit className="traffic-meta-orbit" labels={metaChannels} />
        <div className="traffic-platform-copy">
          <h3>Meta Ads</h3>
          <p>
            O Facebook Ads e a ferramenta de anuncios pagos para Facebook e Instagram. Ou seja, e um mecanismo
            de marketing on-line utilizado para criar e exibir anuncios dentro das redes sociais do Facebook.
            Voce pode pagar antes de veicular os anuncios ou ser cobrado a medida que eles sao exibidos.
          </p>
        </div>
      </div>

      <a className="traffic-platforms-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
        Fale com especialista
      </a>
    </section>
  );
}

function TrafficOrbit({
  className,
  labels,
}: {
  className: string;
  labels: string[];
}) {
  return (
    <div className={`traffic-orbit ${className}`} aria-hidden="true">
      <span className="traffic-orbit-ring traffic-orbit-ring-1" />
      <span className="traffic-orbit-ring traffic-orbit-ring-2" />
      <span className="traffic-orbit-ring traffic-orbit-ring-3" />
      <span className="traffic-orbit-core" />
      {labels.map((label, index) => (
        <span className={`traffic-orbit-label traffic-orbit-label-${index + 1}`} key={label}>
          {label}
        </span>
      ))}
    </div>
  );
}

function MarketingHubSection({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section className="marketing-hub-section" aria-labelledby="marketing-hub-title">
      <div className="marketing-hub-card">
        <span>CORPAD DIGITAL</span>
        <h2 id="marketing-hub-title">O seu hub digital de marketing</h2>
        <p>
          Na CORPAD Digital, voce recebe um <strong>"escritorio digital"</strong> e
          uma <strong>equipe INTEIRA</strong> focada <strong>100% no seu negocio.</strong>
        </p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          Acelerar meu crescimento <ArrowDownRight size={18} />
        </a>
      </div>
    </section>
  );
}

function MarketingDigitalHero({
  service,
  whatsappUrl,
}: {
  service: ServicePageContent;
  whatsappUrl: string;
}) {
  const marqueeItems = [
    "Marketing digital",
    "Conteudo",
    "Posicionamento",
    "Social media",
    "Estrategia",
    "Leads",
    "Funil",
    "Crescimento",
  ];

  return (
    <section className="marketing-digital-hero">
      <div className="marketing-hero-ambient" aria-hidden="true">
        <div className="marketing-hero-grid" />
        <div className="marketing-hero-wave">
          {Array.from({ length: 48 }, (_, index) => (
            <span
              key={index}
              style={
                {
                  "--bar-height": `${18 + index * 1.7 + Math.sin(index * 0.82) * 14}%`,
                  "--bar-delay": `${index * 34}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="marketing-hero-orbit marketing-hero-orbit-a" />
        <div className="marketing-hero-orbit marketing-hero-orbit-b" />
      </div>

      <div className="marketing-hero-copy">
        <h1>{service.heroTitle}</h1>
        <p>{service.intro}</p>
        <a className="marketing-hero-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Acelerar meu crescimento <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="marketing-hero-marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, () => marqueeItems)
            .flat()
            .map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
        </div>
      </div>
    </section>
  );
}

function MarketingProcessSection({ process }: { process: string[] }) {
  const descriptions = [
    "Mapeamos o momento atual do negocio, publico, canais e oportunidades para entender o que precisa ser feito primeiro.",
    "Criamos uma direcao clara para posicionamento, conteudo, campanhas e canais prioritarios.",
    "Executamos as acoes combinadas, acompanhando cada entrega com consistencia e organizacao.",
    "Analisamos dados, compartilhamos aprendizados e ajustamos a rota com base no que esta acontecendo.",
    "Com a estrategia validada, ampliamos o que funciona para gerar mais alcance, leads e oportunidades.",
    "Organizamos os resultados, definimos proximos passos e mantemos a evolucao do projeto com clareza.",
  ];

  return (
    <section className="marketing-process-section">
      <div className="marketing-process-heading">
        <span>Processos</span>
        <h2>Conheca a metodologia dos nossos projetos.</h2>
      </div>

      <ol className="marketing-process-timeline">
        {process.map((step, index) => (
          <li className={`marketing-process-step marketing-process-step-${index + 1}`} key={step}>
            <article>
              <h3>
                {index + 1}- {step}
              </h3>
              <p>{descriptions[index] ?? "Acompanhamos a evolucao do projeto com clareza, dados e proximidade."}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ServiceHeroVisual({
  service,
  isWebsiteCreation,
}: {
  service: ServicePageContent;
  isWebsiteCreation: boolean;
}) {
  return (
    <div className="service-hero-visual" aria-hidden="true">
      {isWebsiteCreation ? (
        <WebsiteHeroPreview />
      ) : (
        <div className="service-hero-visual-card">
          <div className="service-hero-orbit service-hero-orbit-a" />
          <div className="service-hero-orbit service-hero-orbit-b" />
          <div className="service-hero-pulse" />
          <div className="service-hero-hub">
            {Array.from({ length: 10 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="service-hero-nodes">
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="service-hero-ring service-hero-ring-a" />
          <div className="service-hero-ring service-hero-ring-b" />

          <div className="service-hero-command">
            <span />
            <span />
            <span />
          </div>

          <div className="service-hero-flow">
            <span />
            <span />
            <span />
          </div>

          <div className="service-hero-metric service-hero-metric-main">
            <span>
              <TrendingUp size={22} />
            </span>
            <strong>+42%</strong>
            <small>crescimento</small>
          </div>

          <div className="service-hero-metric service-hero-metric-a">
            <PackageCheck size={24} />
            <span>entrega</span>
          </div>

          <div className="service-hero-metric service-hero-metric-b">
            <Globe2 size={24} />
            <span>alcance</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceClientsMarqueeSection() {
  const midpoint = Math.ceil(featuredClientLogos.length / 2);
  const logoRows = [
    featuredClientLogos.slice(0, midpoint),
    featuredClientLogos.slice(midpoint),
  ];

  return (
    <section className="service-clients-strip" aria-label="Clientes que confiam na CORPAD">
      <h2>Empresas que já confiaram na CORPAD</h2>
      <div className="service-clients-marquee">
        {logoRows.map((row, rowIndex) => (
          <div className="service-clients-row" key={rowIndex}>
            <div className="service-clients-track">
              {[...row, ...row, ...row].map((client, index) => (
                <a
                  href="/clientes"
                  key={`${client.name}-${rowIndex}-${index}`}
                  aria-label={`Ver clientes como ${client.name}`}
                >
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={170}
                      height={72}
                      loading="lazy"
                    />
                  ) : (
                    <strong>{client.name}</strong>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceClientsSection() {

  return (
    <section className="service-clients-strip" aria-label="Clientes que confiam na CORPAD">
      <h2>Empresas que já confiaram na CORPAD</h2>
      <div>
        {featuredClientLogos.map((client) => (
          <a href="/clientes" key={client.name} aria-label={`Ver clientes como ${client.name}`}>
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={170}
                  height={72}
                  loading="lazy"
                />
              ) : (
                <strong>{client.name}</strong>
              )}
          </a>
        ))}
      </div>
    </section>
  );
}

function HostingReasonsSection({ whatsappUrl }: { whatsappUrl: string }) {
  const cards = [
    {
      title: "Sites mais rapidos",
      text: "Ambiente otimizado para reduzir carregamento, melhorar a experiencia do visitante e ajudar sua empresa a vender sem perder oportunidades.",
      icon: Rocket,
      variant: "speed",
    },
    {
      title: "Backup e suporte",
      text: "Rotina de protecao, acompanhamento tecnico e orientacao proxima para resolver ajustes antes que eles virem problema.",
      icon: DatabaseBackup,
      variant: "backup",
    },
    {
      title: "Servidor estavel",
      text: "Estrutura pensada para manter seu site online com mais previsibilidade, seguranca e resposta rapida quando sua empresa precisa.",
      icon: ServerCog,
      variant: "server",
    },
    {
      title: "Armazenamento NVMe",
      text: "Tecnologia mais veloz que discos comuns para entregar paginas, arquivos e sistemas com muito mais agilidade.",
      icon: HardDrive,
      variant: "nvme",
    },
  ];

  return (
    <section className="hosting-reasons-section">
      <div className="hosting-reasons-heading">
        <span>Por que escolher a CORPAD?</span>
        <h2>Hospedagem preparada para velocidade, seguranca e estabilidade</h2>
        <p>
          Cuidamos da estrutura tecnica para sua empresa manter o site no ar,
          rapido e com suporte proximo sempre que precisar.
        </p>
      </div>

      <div className="hosting-reasons-cards">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article className={`hosting-reason-card hosting-reason-card-${card.variant}`} key={card.title}>
              <div className="hosting-reason-visual" aria-hidden="true">
                <span className="hosting-reason-light" />
                <span className="hosting-reason-icon">
                  <Icon size={34} strokeWidth={1.9} />
                </span>
                <span className="hosting-reason-grid" />
              </div>
              <div className="hosting-reason-copy">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          );
        })}
      </div>

      <a className="hosting-reasons-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
        Começar <ArrowUpRight size={18} />
      </a>
    </section>
  );
}

function HostingSecurityPerformanceSection({ whatsappUrl }: { whatsappUrl: string }) {
  const securityItems = [
    {
      eyebrow: "Protecao contra ataques",
      title: "Camada anti-invasao",
      text: "Monitoramento e barreiras tecnicas ajudam a reduzir tentativas de acesso indevido e manter seu site mais protegido.",
    },
    {
      eyebrow: "Protecao antimalware",
      title: "Verificacao em tempo real",
      text: "Acompanhamento para identificar riscos, orientar ajustes e manter a estrutura funcionando com mais seguranca.",
    },
    {
      eyebrow: "Contingencia",
      title: "Backups e suporte",
      text: "Rotinas de protecao e suporte proximo para recuperar, ajustar e evoluir o ambiente quando necessario.",
    },
  ];

  return (
    <section className="hosting-security-performance-section">
      <div className="hosting-security-copy">
        <span className="hosting-section-pill">Seguranca</span>
        <h2>Seu site seguro e rapido todos os dias</h2>
        <p>
          Hospedagem com protecao, acompanhamento tecnico e uma base pensada
          para manter sua presenca digital no ar com estabilidade.
        </p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          Começar <ArrowUpRight size={17} />
        </a>
      </div>

      <div className="hosting-security-list">
        {securityItems.map((item) => (
          <article key={item.title}>
            <span>{item.eyebrow}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

    </section>
  );
}

function WebsiteInvestmentSection() {
  const reasons = [
    "Melhorando a comunicação e a experiência do usuário",
    "Aumentando a percepção de valor da sua empresa",
    "Reduzindo dúvidas e conduzindo o visitante à ação",
    "Sites com foco em resultado",
    "Estrutura preparada para o Google",
    "Animações com propósito",
  ];
  const cards = [
    {
      title: "Comunicação",
      text: "Apresente seus serviços com clareza e ajude o cliente a entender rapidamente o que sua empresa entrega.",
      icon: MessageSquareText,
    },
    {
      title: "Experiência do usuário",
      text: "Navegação intuitiva, leitura fácil e adaptação para celular, tablet e desktop.",
      icon: UserRoundCheck,
    },
    {
      title: "Mais profissionalismo",
      text: "Um site bem construído fortalece sua marca e transmite confiança desde o primeiro contato.",
      icon: Sparkles,
    },
    {
      title: "Mais conversão",
      text: "CTAs, WhatsApp e hierarquia visual guiam o visitante para virar oportunidade real de venda.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="website-investment-section">
      <div className="website-investment-copy">
        <span>Arquitetura da conversão</span>
        <h2>
          Por que investir em um <strong>site profissional?</strong>
        </h2>
        <div>
          {reasons.map((reason) => (
            <p key={reason}>{reason}</p>
          ))}
        </div>
      </div>

      <div className="website-investment-grid">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.title}>
              <span aria-hidden="true">
                <Icon size={18} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function WebsiteConversionPillarsSection({ whatsappUrl }: { whatsappUrl: string }) {
  const pillars = [
    {
      eyebrow: "Essencial para melhorar sua conversão",
      title: "Velocidade e Otimização",
      text: "Páginas rápidas reduzem abandono, melhoram a experiência e ajudam sua empresa a aproveitar melhor cada visita.",
      action: "Quero páginas mais rápidas",
      variant: "speed",
      icon: Gauge,
    },
    {
      eyebrow: "Construída para o seu produto",
      title: "Individualidade e Estratégia",
      text: "Cada página precisa respeitar seu público, sua oferta e sua jornada. Nada de estrutura genérica para vender uma solução única.",
      action: "Quero páginas estratégicas",
      variant: "strategy",
      icon: Target,
    },
  ];

  return (
    <section className="website-pillars-section">
      <div className="website-pillars-heading">
        <span>Os pilares de uma página eficiente</span>
        <h2>
          Os principais aspectos de uma página otimizada para <strong>conversão</strong>
        </h2>
        <p>
          Trabalhamos os pontos que fazem um site cumprir seu objetivo com
          eficiência: velocidade, estratégia, clareza e responsividade.
        </p>
      </div>

      <div className="website-pillars-list">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;

          return (
            <article className={`website-pillar-card website-pillar-card-${pillar.variant}`} key={pillar.title}>
              <div className="website-pillar-copy">
                <span>{pillar.eyebrow}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  {pillar.action}
                </a>
              </div>

              <div className="website-pillar-visual" aria-hidden="true">
                <span className="website-pillar-orbit website-pillar-orbit-1" />
                <span className="website-pillar-orbit website-pillar-orbit-2" />
                <span className="website-pillar-tile website-pillar-tile-main">
                  <Icon size={32} />
                </span>
                <span className="website-pillar-tile website-pillar-tile-a">
                  <Rocket size={24} />
                </span>
                <span className="website-pillar-tile website-pillar-tile-b">
                  <TrendingUp size={24} />
                </span>
                <span className="website-pillar-tile website-pillar-tile-c">
                  <Sparkles size={22} />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function WebsiteCreationShowcase() {
  const features = [
    {
      title: "SEO",
      text: "Páginas, títulos e estrutura pensados para o Google entender seu conteúdo.",
      icon: SearchAnimation,
      variant: "seo",
    },
    {
      title: "Responsivo",
      text: "Experiência adaptada para celular, tablet e desktop sem perder clareza.",
      icon: ResponsivePhoneAnimation,
      variant: "responsive",
    },
    {
      title: "Performance",
      text: "Interface leve, rápida e preparada para visitantes que não esperam.",
      icon: Gauge,
      variant: "performance",
    },
    {
      title: "Conversão",
      text: "CTAs, WhatsApp e navegação guiando o visitante para o próximo passo.",
      icon: ConversionMouseAnimation,
      variant: "conversion",
    },
  ];

  return (
    <section className="website-build-showcase">
      <div className="website-build-copy">
        <h2>Um site bonito, rápido e preparado para aparecer no Google</h2>
        <p>
          Na criação de sites, cada detalhe precisa trabalhar junto: conteúdo,
          design, velocidade, SEO, responsividade e chamadas para ação. O
          resultado é uma presença digital bonita, clara e preparada para gerar
          oportunidades.
        </p>
      </div>

      <div className="website-build-features">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isPerformanceFeature = feature.variant === "performance";
          const isConversionFeature = feature.variant === "conversion";

          return (
            <article
              className={
                isPerformanceFeature
                  ? "website-build-feature-performance"
                  : isConversionFeature
                    ? "website-build-feature-conversion"
                    : undefined
              }
              key={feature.title}
            >
              {isPerformanceFeature ? (
                <PerformanceSpeedometer />
              ) : isConversionFeature ? (
                <ConversionMouseAnimation />
              ) : (
                <span aria-hidden="true">
                  <Icon size={20} />
                </span>
              )}
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ConversionMouseAnimation() {
  return (
    <span className="website-conversion-mouse" aria-hidden="true">
      <span className="website-conversion-pointer" />
      <span className="website-conversion-click website-conversion-click-1" />
      <span className="website-conversion-click website-conversion-click-2" />
    </span>
  );
}

function SearchAnimation() {
  return (
    <span className="website-search-animation" aria-hidden="true">
      <span className="website-search-lens" />
      <span className="website-search-handle" />
      <span className="website-search-scan" />
    </span>
  );
}

function ResponsivePhoneAnimation() {
  return (
    <span className="website-phone-animation" aria-hidden="true">
      <span className="website-phone-device">
        <span className="website-phone-screen" />
        <span className="website-phone-dot" />
      </span>
      <span className="website-phone-signal website-phone-signal-1" />
      <span className="website-phone-signal website-phone-signal-2" />
    </span>
  );
}

function PerformanceSpeedometer() {
  return (
    <div className="website-performance-speed" aria-hidden="true">
      <svg
        className="website-performance-speedometer"
        viewBox="0 0 3918 3918"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="website-performance-speed-mask"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="432"
          y="426"
          width="3047"
          height="1527"
        >
          <path
            d="M3386.24 1952.8C3438.71 1952.8 3481.55 1910.21 3478.29 1857.85C3455.23 1487.78 3298.01 1137.47 3034.29 873.754C2748.11 587.573 2359.96 426.799 1955.24 426.799C1550.52 426.799 1162.38 587.573 876.197 873.754C612.479 1137.47 455.253 1487.78 432.196 1857.85C428.934 1910.21 471.775 1952.8 524.242 1952.8L895.04 1952.8C947.507 1952.8 989.555 1910.16 994.709 1857.95C1016.54 1636.79 1114.23 1428.81 1272.74 1270.3C1453.75 1089.29 1699.25 987.597 1955.24 987.597C2211.23 987.597 2456.73 1089.29 2637.74 1270.3C2796.26 1428.81 2893.94 1636.79 2915.78 1857.95C2920.93 1910.16 2962.98 1952.8 3015.44 1952.8H3386.24Z"
            fill="#C3C0C0"
          />
        </mask>
        <g mask="url(#website-performance-speed-mask)">
          <path
            d="M3481.25 1952.8C3481.25 1548.08 3320.47 1159.93 3034.29 873.752C2748.11 587.571 2359.97 426.797 1955.25 426.797C1550.53 426.797 1162.38 587.571 876.201 873.752C590.021 1159.93 429.246 1548.08 429.246 1952.8L990.044 1952.8C990.044 1696.81 1091.73 1451.31 1272.75 1270.3C1453.76 1089.29 1699.26 987.595 1955.25 987.595C2211.23 987.595 2456.74 1089.29 2637.75 1270.3C2818.76 1451.31 2920.45 1696.81 2920.45 1952.8L3481.25 1952.8Z"
            fill="#15191b"
          />
          <g className="website-performance-speed-fill">
            <path
              d="M1081.68 3204.02C1413.52 3435.71 1823.81 3526.08 2222.28 3455.25C2620.76 3384.43 2974.78 3158.21 3206.46 2826.37C3438.15 2494.52 3528.52 2084.23 3457.7 1685.76C3386.87 1287.28 3160.65 933.264 2828.81 701.58L2507.78 1161.4C2717.67 1307.94 2860.75 1531.86 2905.55 1783.9C2950.35 2035.93 2893.19 2295.44 2746.65 2505.34C2600.1 2715.23 2376.19 2858.31 2124.15 2903.11C1872.11 2947.91 1612.6 2890.75 1402.71 2744.21L1081.68 3204.02Z"
              fill="currentColor"
            />
          </g>
        </g>
        <g className="website-performance-needle">
          <path
            d="M2826.29 689.029L2087.72 1917.75C2061.25 1961.8 2003.1 1974.39 1960.78 1945.23C1918.46 1916.07 1909.51 1857.25 1941.23 1816.82L2826.29 689.029Z"
            fill="#0c0f11"
          />
          <path
            d="M2086.87 1917.24C2060.69 1960.79 2003.19 1973.23 1961.35 1944.4C1919.5 1915.57 1910.65 1857.42 1942.02 1817.44L2817.15 702.301L2086.87 1917.24Z"
            stroke="url(#website-performance-needle-glow)"
            strokeWidth="2"
          />
        </g>
        <circle cx="2006" cy="1877" r="35" fill="#E7E7E7" />
        <defs>
          <linearGradient
            id="website-performance-needle-glow"
            x1="2819.23"
            y1="662.299"
            x2="2495.16"
            y2="1336.59"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#000000" />
          </linearGradient>
        </defs>
      </svg>
    </div>
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
              src="/criacaodesites/hero.gif"
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
