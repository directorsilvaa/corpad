import Image from "@/components/ui/vite-image";
import { CinematicFooter } from "@/components/ui/motion-footer";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Cpu,
  DatabaseZap,
  DollarSign,
  Gauge,
  LineChart,
  Mail,
  Network,
  Phone,
  Rocket,
  Server,
  ShieldCheck,
  TrendingUp,
  WalletCards,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  consultingServicePages,
  type ConsultingServicePageContent,
} from "../data/consultingServicePages";
import { organizationJsonLd, usePageSeo } from "../lib/seo";

type ConsultingServicePageProps = {
  service: ConsultingServicePageContent;
};

const whatsappPhone = "5516996094649";

function buildConsultingWhatsappUrl(service: ConsultingServicePageContent) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    `Ola, tudo bem? Acessei a pagina de ${service.navLabel} da CORPAD Consultoria e gostaria de falar com um especialista.`
  )}`;
}

export default function ConsultingServicePage({ service }: ConsultingServicePageProps) {
  usePageSeo({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/corpad-consultoria/servicos/${service.slug}`,
    jsonLd: [
      organizationJsonLd(),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.navLabel,
        description: service.metaDescription,
        provider: organizationJsonLd(),
        areaServed: "Brasil",
        url: `https://corpad.vercel.app/corpad-consultoria/servicos/${service.slug}`,
      },
    ],
  });

  const isCloudServers = service.slug === "servidores-em-nuvem";
  const isBpoFinanceiro = service.slug === "bpo-financeiro";
  const visibleProcess = service.process.slice(0, 4);
  const cloudSectionIcons = [Zap, Network, ShieldCheck];
  const whatsappUrl = buildConsultingWhatsappUrl(service);

  return (
    <main
      className={`consulting-page consulting-digital-idv consulting-service-page${
        isCloudServers ? " consulting-cloud-service-page" : ""
      }${isBpoFinanceiro ? " consulting-bpo-service-page" : ""
      }`}
    >
      <header className="consulting-topbar">
        <nav className="consulting-topbar-links" aria-label="Navegacao principal">
          <a href="/corpad-consultoria#sobre">Sobre</a>
          <div className="consulting-service-menu">
            <a className="consulting-service-trigger" href="/corpad-consultoria#solucoes">
              Serviços
              <ChevronDown size={14} strokeWidth={2.4} />
            </a>
            <div className="consulting-service-submenu" aria-label="Serviços">
              {consultingServicePages.map((item) => (
                <a href={`/corpad-consultoria/servicos/${item.slug}`} key={item.slug}>
                  {item.navLabel}
                </a>
              ))}
            </div>
          </div>
          <a href="/clientes">Clientes</a>
          <a href="/blog">Blog</a>
          <a href="/corpad-consultoria#contato">Contato</a>
        </nav>
        <a className="consulting-topbar-brand" href="/corpad-consultoria" aria-label="Pagina inicial">
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

      <section className="consulting-service-hero">
        <div className="consulting-service-hero-copy">
          {isCloudServers ? (
            <>
              <span className="consulting-cloud-hero-badge">
                <Cloud size={13} strokeWidth={2.4} />
                Desempenho de ponta
              </span>
              <h1>
                Servidores em nuvem para sua empresa operar com{" "}
                <span>Performance</span>, <span>Seguranca</span> e flexibilidade.
              </h1>
              <p>
                Oferecemos servidores VPS ou dedicados para armazenar dados,
                hospedar sistemas e otimizar as operacoes do seu negocio com
                alta performance, controle e suporte consultivo.
              </p>
            </>
          ) : (
            <>
              <span className="consulting-kicker">CORPAD Consultoria</span>
              <h1>{service.heroTitle}</h1>
              <p>{service.intro}</p>
            </>
          )}
          <div className="consulting-actions">
            <a className="consulting-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Falar com especialista
              <ArrowRight size={17} />
            </a>
            <a className="consulting-secondary" href="/corpad-consultoria#solucoes">
              {isCloudServers ? "Conhecer solucoes" : (
                <>
              Ver todos os serviços
                </>
              )}
            </a>
          </div>
        </div>

        <aside className="consulting-service-hero-aside">
          {isCloudServers ? (
            <CloudHostingHeroVisual />
          ) : isBpoFinanceiro ? (
            <BpoFinanceHeroVisual />
          ) : (
            <ConsultingServiceVisual slug={service.slug} label={service.navLabel} />
          )}
        </aside>
      </section>

      <section className="consulting-section consulting-service-content">
        {isCloudServers ? (
          <>
            <div className="consulting-cloud-features-heading">
              <h2>Sua operacao segura na nuvem CORPAD</h2>
            </div>
            <div className="consulting-cloud-features-grid">
              {service.sections.map((section, index) => {
                const SectionIcon = cloudSectionIcons[index] ?? CheckCircle2;

                return (
                  <article className="consulting-cloud-feature" key={section.title}>
                    <span>
                      <SectionIcon size={23} />
                    </span>
                    <h3>{section.title}</h3>
                    <p>{section.body}</p>
                  </article>
                );
              })}
            </div>
            <a className="consulting-cloud-features-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
              Começar
            </a>
          </>
        ) : (
          service.sections.map((section) => (
            <article className="consulting-card consulting-glass-card" key={section.title}>
              <span>
                <CheckCircle2 size={22} />
              </span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))
        )}
      </section>

      {isCloudServers ? <CloudServerDetails /> : null}

      <section className="consulting-section consulting-service-process">
        <div className="consulting-section-heading consulting-ui-heading">
          <span className="consulting-kicker">Como funciona</span>
          <h2>Um processo claro do diagnóstico à execução</h2>
          <p>
            Menos rodeio: entendemos o cenário, priorizamos o que importa e
            colocamos a melhoria em movimento.
          </p>
        </div>
        <ol>
          {visibleProcess.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="consulting-final-cta" id="contato">
        <div className="consulting-cloud-usage-heading">
          <span className="consulting-kicker">Próximo passo</span>
          <h2>Quer entender como isso se aplica à sua empresa?</h2>
          <p>
            Fale com a CORPAD e receba uma orientação inicial sobre o melhor
            caminho para estruturar essa solução.
          </p>
        </div>
        <div className="consulting-actions">
          <a className="consulting-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            <Rocket size={18} />
            Solicitar diagnóstico
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

function CloudServerDetails() {
  const cloudWhatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    "Ola, tudo bem? Acessei a pagina de Servidores em nuvem da CORPAD Consultoria e gostaria de saber mais sobre infraestrutura em nuvem."
  )}`;
  const serverOptions = [
    {
      title: "Servidores VPS",
      eyebrow: "Servidor Virtual Privado",
      text:
        "Para empresas que querem desempenho, economia e liberdade para escalar sem contratar uma estrutura maior do que precisam.",
      items: [
        "Online em ate 120 segundos",
        "Armazenamento SSD",
        "Baixa latencia em Sao Paulo",
        "Planos de 1 vCPU e 2 GB RAM ate configuracoes robustas",
      ],
    },
    {
      title: "Servidores Dedicados",
      eyebrow: "Recursos exclusivos",
      text:
        "Para aplicacoes que exigem maxima performance, controle e estabilidade com hardware dedicado para a operacao.",
      items: [
        "Intel Xeon ou AMD Ryzen",
        "Memoria DDR4 ECC e NVMe",
        "Portas de ate 10 Gbps",
        "Anti-DDoS corporativo",
      ],
    },
  ];

  const applications = [
    {
      title: "Dados em nuvem",
      text:
        "Arquivos, backups e rotinas internas em uma base acessivel, organizada e preparada para crescer.",
      Icon: Cloud,
    },
    {
      title: "Servidores de e-mail",
      text:
        "Estrutura profissional para comunicacao corporativa com mais controle, estabilidade e confianca.",
      Icon: Mail,
    },
    {
      title: "Sistemas web",
      text:
        "Hospedagem para sites, portais e aplicacoes que precisam de velocidade e disponibilidade.",
      Icon: Server,
    },
    {
      title: "Sistemas ERP",
      text:
        "Ambientes robustos para sustentar operacoes criticas, integracoes e uso diario da equipe.",
      Icon: DatabaseZap,
      featured: true,
    },
    {
      title: "Aplicacoes sob medida",
      text:
        "Recursos dedicados para ferramentas especificas do negocio, SaaS e projetos digitais.",
      Icon: Cpu,
    },
  ];

  const locations = [
    {
      place: "Sao Paulo",
      text:
        "Presenca no maior Data Center da America Latina, com redundancia, fibra propria e conectividade de alto nivel.",
    },
    {
      place: "Minas Gerais",
      text:
        "Data centers resilientes e baixa latencia para diferentes destinos no Brasil, com conexao direta aos PTTs de SP e RJ.",
    },
    {
      place: "Canada",
      text:
        "Bare metal em um dos grandes players globais, com excelente equilibrio entre custo, beneficio e competitividade.",
    },
    {
      place: "Alemanha",
      text:
        "Estrutura em um dos maiores complexos de data centers da Europa, ideal para servicos com estrategia global.",
    },
  ];

  return (
    <section className="consulting-cloud-detail">
      <div className="consulting-cloud-animation-showcase">
        <CloudServersVisual />
        <div>
          <h2>Uma arquitetura pensada para estabilidade, velocidade e escala</h2>
          <p>
            A animacao representa a base tecnica por tras da solucao: servidores,
            conectividade, protecao e recursos preparados para crescer com a sua
            operacao.
          </p>
        </div>
      </div>

      <div className="consulting-section-heading consulting-ui-heading">
        <span className="consulting-kicker">Infraestrutura</span>
        <h2>Escolha a nuvem do tamanho certo para sua operação</h2>
        <p>
          Da ativação rápida ao ambiente dedicado, a CORPAD monta a base técnica
          para sua empresa operar com velocidade, segurança e controle.
        </p>
      </div>

      <div className="consulting-cloud-plans">
        {serverOptions.map((option, index) => {
          const Icon = index === 0 ? Server : DatabaseZap;
          const variant = index === 0 ? "vps" : "dedicated";

          return (
          <article className={`consulting-cloud-plan consulting-cloud-plan-${variant}`} key={option.title}>
            <div className="consulting-cloud-plan-visual">
              <span className="consulting-cloud-plan-icon">
                <Icon size={25} strokeWidth={2.1} />
              </span>
              <div className="consulting-cloud-plan-bars">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="consulting-cloud-plan-copy">
              <span>{option.eyebrow}</span>
              <h3>{option.title}</h3>
              <p>{option.text}</p>
            </div>
            <ul>
              {option.items.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} strokeWidth={2.7} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          );
        })}
      </div>

      <div className="consulting-cloud-usage">
        <div className="consulting-cloud-usage-heading">
          <span className="consulting-kicker">Aplicações</span>
          <h3>
            A base completa para
            <span> sua operação online.</span>
          </h3>
        </div>
        <div className="consulting-cloud-usage-list">
          {applications.map(({ title, text, Icon, featured }) => (
            <article
              className={`consulting-cloud-usage-card${featured ? " consulting-cloud-usage-card-featured" : ""}`}
              key={title}
            >
              <div className="consulting-cloud-usage-visual">
                <Icon size={28} strokeWidth={1.9} />
                <i />
                <i />
              </div>
              <h4>{title}</h4>
              <p>{text}</p>
              <a href={cloudWhatsappUrl} target="_blank" rel="noreferrer">
                Saiba mais
                <ArrowRight size={14} strokeWidth={2.7} />
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="consulting-cloud-locations">
        <div className="consulting-cloud-locations-copy">
          <h2>
            Servidores localizados onde sua empresa
            <span> precisar de performance.</span>
          </h2>
          <p>
            Trabalhamos de forma descentralizada, com presença em grandes
            players globais para melhorar latência, redundância e alcance.
          </p>
        </div>
        <div className="consulting-cloud-location-map" aria-label="Localizacoes de servidores">
          <div className="consulting-cloud-map-shape" aria-hidden="true">
            <span className="consulting-cloud-map-dot consulting-cloud-map-dot-canada" />
            <span className="consulting-cloud-map-dot consulting-cloud-map-dot-brazil-a" />
            <span className="consulting-cloud-map-dot consulting-cloud-map-dot-brazil-b" />
            <span className="consulting-cloud-map-dot consulting-cloud-map-dot-germany" />
          </div>
          <div className="consulting-cloud-location-grid">
          {locations.map((location) => (
            <article key={location.place}>
              <strong>{location.place}</strong>
              <p>{location.text}</p>
            </article>
          ))}
          </div>
        </div>
      </div>

      <div className="consulting-cloud-stability">
        <article>
          <span>Garantia de estabilidade</span>
          <h3>Infraestrutura que acompanha o crescimento</h3>
          <p>
            A CORPAD estrutura ambientes flexíveis para que a operação evolua
            com segurança, escalabilidade e suporte robusto conforme as demandas
            do mercado mudam.
          </p>
        </article>
        <article>
          <span>A nuvem sob seu comando</span>
          <h3>Mais controle, menos complexidade operacional</h3>
          <p>
            Seja para SaaS, site ou aplicativo, a nuvem vira uma extensão do
            negócio: simples de operar, bem posicionada e preparada para dar
            credibilidade à sua presença digital.
          </p>
        </article>
      </div>
    </section>
  );
}

function BpoFinanceHeroVisual() {
  const metrics = [
    { label: "recebimentos", value: "+18%" },
    { label: "custos mapeados", value: "94%" },
    { label: "caixa previsto", value: "30d" },
  ];

  return (
    <div className="consulting-bpo-visual" aria-hidden="true">
      <div className="consulting-bpo-grid" />
      <div className="consulting-bpo-orbit consulting-bpo-orbit-a" />
      <div className="consulting-bpo-orbit consulting-bpo-orbit-b" />

      <div className="consulting-bpo-card consulting-bpo-card-main">
        <span>fluxo de caixa</span>
        <strong>R$ 128.400</strong>
        <div className="consulting-bpo-chart">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="consulting-bpo-card consulting-bpo-card-side">
        <WalletCards size={20} />
        <span>contas em dia</span>
        <strong>98%</strong>
      </div>

      <div className="consulting-bpo-trend">
        <TrendingUp size={20} />
        <span>previsibilidade subindo</span>
      </div>

      <div className="consulting-bpo-core">
        <DollarSign size={38} strokeWidth={2.3} />
      </div>

      <div className="consulting-bpo-metrics">
        {metrics.map((metric) => (
          <span key={metric.label}>
            <b>{metric.value}</b>
            {metric.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const visualIconBySlug: Partial<Record<string, LucideIcon>> = {
  "assessoria-empresarial": LineChart,
  "assessoria-em-ti": Cpu,
  "inteligencia-de-dados": DatabaseZap,
  "telefonia-em-nuvem": Network,
  "bpo-financeiro": LineChart,
};

function ConsultingServiceVisual({
  slug,
  label,
}: {
  slug: string;
  label: string;
}) {
  const Icon = visualIconBySlug[slug] ?? Server;

  return (
    <div className={`consulting-service-visual consulting-service-visual-${slug}`} aria-hidden="true">
      <div className="consulting-service-visual-grid" />
      <div className="consulting-service-visual-halo" />
      <div className="consulting-service-orbit consulting-service-orbit-a" />
      <div className="consulting-service-orbit consulting-service-orbit-b" />
      <div className="consulting-service-stream consulting-service-stream-a" />
      <div className="consulting-service-stream consulting-service-stream-b" />
      <div className="consulting-service-stream consulting-service-stream-c" />
      <div className="consulting-service-visual-core">
        <Icon size={46} strokeWidth={1.8} />
        <span />
        <span />
      </div>
      <div className="consulting-service-visual-card consulting-service-visual-card-a">
        <span />
        <strong>{label}</strong>
        <i />
        <i />
      </div>
      <div className="consulting-service-visual-card consulting-service-visual-card-b">
        <span />
        <strong>controle</strong>
        <i />
        <i />
      </div>
      <div className="consulting-service-visual-card consulting-service-visual-card-c">
        <span />
        <strong>resultado</strong>
        <i />
        <i />
      </div>
      <div className="consulting-service-visual-rail">
        <span />
        <span />
        <span />
      </div>
      <i className="consulting-service-spark consulting-service-spark-a" />
      <i className="consulting-service-spark consulting-service-spark-b" />
      <i className="consulting-service-spark consulting-service-spark-c" />
    </div>
  );
}

function CloudHostingHeroVisual() {
  return (
    <div className="consulting-cloud-hosting-hero-visual" aria-hidden="true">
      <div className="consulting-cloud-hosting-panel">
        <div className="consulting-cloud-hosting-grid" />
        <div className="consulting-cloud-hosting-orbit consulting-cloud-hosting-orbit-a" />
        <div className="consulting-cloud-hosting-orbit consulting-cloud-hosting-orbit-b" />
        <div className="consulting-cloud-hosting-core">
          <Cloud size={54} strokeWidth={1.7} />
          <span />
          <span />
        </div>
        <div className="consulting-cloud-hosting-server consulting-cloud-hosting-server-a">
          <Server size={18} strokeWidth={2.2} />
          <i />
          <i />
          <i />
        </div>
        <div className="consulting-cloud-hosting-server consulting-cloud-hosting-server-b">
          <DatabaseZap size={18} strokeWidth={2.2} />
          <i />
          <i />
          <i />
        </div>
        <div className="consulting-cloud-hosting-server consulting-cloud-hosting-server-c">
          <ShieldCheck size={18} strokeWidth={2.2} />
          <i />
          <i />
          <i />
        </div>
        <div className="consulting-cloud-hosting-stream consulting-cloud-hosting-stream-a" />
        <div className="consulting-cloud-hosting-stream consulting-cloud-hosting-stream-b" />
        <div className="consulting-cloud-hosting-stream consulting-cloud-hosting-stream-c" />
        <div className="consulting-cloud-hosting-particle consulting-cloud-hosting-particle-a" />
        <div className="consulting-cloud-hosting-particle consulting-cloud-hosting-particle-b" />
        <div className="consulting-cloud-hosting-particle consulting-cloud-hosting-particle-c" />
      </div>
      <div className="consulting-cloud-hosting-score">
        <strong>A+</strong>
        <span>
          <Gauge size={13} strokeWidth={2.6} />
          100%
        </span>
        <span>99%</span>
      </div>
    </div>
  );
}

function CloudServersVisual() {
  return (
    <div className="consulting-cloud-visual" aria-hidden="true">
      <div className="consulting-cloud-beam consulting-cloud-beam-a" />
      <div className="consulting-cloud-beam consulting-cloud-beam-b" />
      <div className="consulting-cloud-platform" />
      <div className="consulting-cloud-node consulting-cloud-node-a">
        <span className="consulting-cloud-chip" />
        <i />
        <i />
        <i />
      </div>
      <div className="consulting-cloud-node consulting-cloud-node-b">
        <span className="consulting-cloud-chip" />
        <i />
        <i />
        <i />
      </div>
      <div className="consulting-cloud-node consulting-cloud-node-c">
        <span className="consulting-cloud-chip" />
        <i />
        <i />
        <i />
      </div>
      <div className="consulting-cloud-core">
        <span />
        <i />
        <i />
      </div>
      <div className="consulting-cloud-pulse consulting-cloud-pulse-a" />
      <div className="consulting-cloud-pulse consulting-cloud-pulse-b" />
      <div className="consulting-cloud-particle consulting-cloud-particle-a" />
      <div className="consulting-cloud-particle consulting-cloud-particle-b" />
      <div className="consulting-cloud-particle consulting-cloud-particle-c" />
    </div>
  );
}
