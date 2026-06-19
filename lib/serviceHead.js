const defaultSiteUrl = "https://corpad.com.br";
const defaultImage = `${defaultSiteUrl}/logo.png?v=20260618`;

const servicePages = {
  "criacao-de-sites": {
    slug: "criacao-de-sites",
    navLabel: "Criação de sites",
    heroTitle: "Criação de sites profissionais para empresas",
    metaTitle: "Criação de Sites Profissionais | CORPAD Digital",
    metaDescription:
      "Criação de sites profissionais, responsivos e otimizados para empresas que querem mais credibilidade, performance e oportunidades no digital.",
    intro:
      "Um site profissional precisa apresentar sua empresa com clareza, transmitir confiança, carregar rápido, funcionar bem no celular e transformar visitantes em oportunidades reais de contato. A CORPAD Digital desenvolve sites sob medida para empresas que querem crescer com uma presença digital forte, moderna e preparada para SEO.",
    highlights: [
      "Site responsivo para celular, tablet e desktop",
      "Estrutura pensada para conversão e credibilidade",
      "Organização clara de serviços, diferenciais e contato",
      "Base técnica preparada para SEO e performance",
      "Animações e microinterações sem prejudicar velocidade",
      "Páginas internas planejadas para ranquear no Google",
      "Integração com WhatsApp e pontos de contato",
      "Layout alinhado à identidade visual da empresa",
    ],
    sections: [
      {
        title: "Por que investir em um site profissional?",
        body:
          "O site é muitas vezes o primeiro contato entre sua empresa e um possível cliente. Quando ele é lento, confuso ou desatualizado, a percepção de valor cai. Um site bem construído ajuda sua marca a ser encontrada, entendida e lembrada.",
      },
      {
        title: "Sites com foco em resultado",
        body:
          "A criação não se limita ao visual. Trabalhamos hierarquia de conteúdo, chamadas para ação, navegação, velocidade e adaptação para dispositivos móveis para que o visitante encontre rapidamente o que procura.",
      },
      {
        title: "Estrutura preparada para o Google",
        body:
          "Organizamos títulos, textos, seções, links internos e elementos técnicos para facilitar a leitura do conteúdo pelos mecanismos de busca e melhorar a base de ranqueamento.",
      },
      {
        title: "Animações com propósito",
        body:
          "Animações, transições e elementos interativos ajudam a criar uma experiência mais moderna, mas precisam ter função. Usamos movimento para guiar atenção, destacar CTAs e valorizar a marca sem deixar o site pesado.",
      },
      {
        title: "Páginas que explicam e vendem",
        body:
          "Um bom site não depende apenas da página inicial. Criamos páginas de serviços, portfólio, contato e conteúdos estratégicos para explicar melhor cada solução e aumentar a chance de ranquear para termos específicos.",
      },
      {
        title: "Contato simples pelo WhatsApp",
        body:
          "A jornada precisa terminar em ação. Por isso, posicionamos CTAs claros para WhatsApp, formulários ou outros canais de contato nos pontos certos da página.",
      },
    ],
    process: [
      "Diagnóstico do negócio, público e objetivos do site",
      "Planejamento de páginas, conteúdo e jornada do visitante",
      "Criação visual alinhada à identidade da empresa",
      "Definição de animações, CTAs e pontos de conversão",
      "Desenvolvimento responsivo e otimizado",
      "Configuração de SEO básico, velocidade e metadados",
      "Publicação, testes e orientação para evolução",
    ],
    faqs: [
      {
        question: "A criação do site é personalizada?",
        answer:
          "Sim. O site é planejado de acordo com a identidade, os serviços e os objetivos comerciais da empresa.",
      },
      {
        question: "O site funciona bem no celular?",
        answer:
          "Sim. A estrutura é responsiva para oferecer boa experiência em celulares, tablets e desktops.",
      },
      {
        question: "O site já nasce preparado para SEO?",
        answer:
          "Sim. Trabalhamos uma base técnica e estrutural para facilitar indexação, leitura e ranqueamento no Google.",
      },
      {
        question: "Vocês criam páginas internas para cada serviço?",
        answer:
          "Sim. Essa é uma estratégia importante para SEO, porque cada página pode trabalhar uma intenção de busca específica.",
      },
      {
        question: "O site pode ter animações?",
        answer:
          "Sim. Podemos usar animações, efeitos de entrada, cards interativos e microinterações, sempre cuidando para não comprometer performance.",
      },
    ],
  },
};

function getSiteUrl() {
  return (process.env.SITE_URL || defaultSiteUrl).replace(/\/+$/, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getOrganizationJsonLd(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#organization`,
    name: "CORPAD",
    legalName: "CORPAD Soluções Digitais e Consultoria Empresarial",
    url: siteUrl,
    logo: defaultImage,
    image: defaultImage,
    foundingDate: "1996",
    email: "contato@corpad.com.br",
    telephone: "+55-16-99609-4649",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Monte Alto",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -21.2616,
      longitude: -48.4969,
    },
    areaServed: [
      { "@type": "Country", name: "Brasil" },
      { "@type": "AdministrativeArea", name: "São Paulo" },
    ],
    knowsAbout: [
      "criação de sites",
      "marketing digital",
      "tráfego pago",
      "automação",
      "consultoria empresarial",
      "SEO",
      "GEO",
      "AEO",
    ],
  };
}

function getServiceJsonLd(service, siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/servicos/${service.slug}#service`,
    name: service.navLabel,
    alternateName: service.heroTitle,
    description: service.metaDescription,
    url: `${siteUrl}/servicos/${service.slug}`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Brasil",
    serviceType: service.navLabel,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BRL",
      url: `${siteUrl}/servicos/${service.slug}`,
    },
    mainEntityOfPage: `${siteUrl}/servicos/${service.slug}`,
  };
}

function getFaqJsonLd(service) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function getBreadcrumbJsonLd(service, siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Serviços", item: `${siteUrl}/corpad-digital#servicos` },
      { "@type": "ListItem", position: 3, name: service.navLabel, item: `${siteUrl}/servicos/${service.slug}` },
    ],
  };
}

function renderServicePage(service) {
  const whatsappUrl =
    "https://wa.me/5516996094649?text=Ola%2C%20tudo%20bem%3F%20Acessei%20a%20pagina%20de%20Criacao%20de%20Sites%20da%20CORPAD%20Digital%20e%20gostaria%20de%20conversar%20sobre%20um%20site%20profissional%20para%20minha%20empresa.";

  return `
    <main class="service-page service-${escapeHtml(service.slug)} website-service-page">
      <header class="navbar">
        <a class="brand" href="/corpad-digital" aria-label="Página inicial">CORPAD Digital</a>
        <nav class="nav-links" aria-label="Navegação principal">
          <a href="/corpad-digital#sobre">Sobre</a>
          <a class="active" href="/corpad-digital#servicos" aria-current="page">Serviços</a>
          <a href="/portfolio">Portfólio</a>
          <a href="/clientes">Clientes</a>
          <a href="/blog">Blog</a>
          <a href="/corpad-digital#contato">Contato</a>
        </nav>
      </header>
      <article class="service-ssr-content">
        <p class="section-kicker">CORPAD Digital</p>
        <h1>${escapeHtml(service.heroTitle)}</h1>
        <p>${escapeHtml(service.intro)}</p>
        <p><a href="${whatsappUrl}" target="_blank" rel="noreferrer">Falar com a CORPAD sobre criação de sites</a></p>

        <section aria-label="Destaques da criação de sites">
          <h2>O que está incluído na criação de sites</h2>
          <ul>
            ${service.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}
          </ul>
        </section>

        ${service.sections
          .map(
            (section) => `
              <section>
                <h2>${escapeHtml(section.title)}</h2>
                <p>${escapeHtml(section.body)}</p>
              </section>
            `,
          )
          .join("\n")}

        <section aria-label="Processo de criação de site">
          <h2>Como funciona o processo</h2>
          <ol>
            ${service.process.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n")}
          </ol>
        </section>

        <section aria-label="Perguntas frequentes sobre criação de sites">
          <h2>Perguntas frequentes</h2>
          ${service.faqs
            .map(
              (faq) => `
                <article>
                  <h3>${escapeHtml(faq.question)}</h3>
                  <p>${escapeHtml(faq.answer)}</p>
                </article>
              `,
            )
            .join("\n")}
        </section>
      </article>
    </main>
  `.trim();
}

export function getServicePageForHead(slug) {
  return servicePages[slug] || null;
}

export function injectServicePage(html, service) {
  if (!service) {
    return html;
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/servicos/${service.slug}`;
  const jsonLd = [
    getOrganizationJsonLd(siteUrl),
    getServiceJsonLd(service, siteUrl),
    getFaqJsonLd(service),
    getBreadcrumbJsonLd(service, siteUrl),
  ];
  const jsonLdText = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
  const headTags = [
    `<title>${escapeHtml(service.metaTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(service.metaDescription)}" />`,
    `<meta name="keywords" content="criação de sites, site profissional, desenvolvimento de sites, sites responsivos, CORPAD Digital" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(service.metaTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(service.metaDescription)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(defaultImage)}" />`,
    `<meta property="og:site_name" content="CORPAD" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(service.metaTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(service.metaDescription)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(defaultImage)}" />`,
    `<meta name="geo.region" content="BR-SP" />`,
    `<meta name="geo.placename" content="Monte Alto, São Paulo, Brasil" />`,
    `<meta name="geo.position" content="-21.2616;-48.4969" />`,
    `<meta name="ICBM" content="-21.2616, -48.4969" />`,
    `<script id="corpad-page-jsonld" type="application/ld+json">${jsonLdText}</script>`,
  ].join("\n    ");

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|keywords|geo\.[^"']+|ICBM|og:[^"']+|twitter:[^"']+)["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
    .replace(/<div id=["']root["']>[\s\S]*<\/div>\s*(?=<\/body>)/i, `<div id="root">${renderServicePage(service)}</div>\n    `)
    .replace("</head>", `    ${headTags}\n  </head>`);
}
