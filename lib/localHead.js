const defaultSiteUrl = "https://corpad.com.br";
const defaultImage = `${defaultSiteUrl}/logo.png?v=20260618`;

const localPages = {
  "criacao-de-sites-monte-alto": {
    slug: "criacao-de-sites-monte-alto",
    city: "Monte Alto",
    region: "SP",
    service: "criação de sites",
    title: "Criação de Sites em Monte Alto | CORPAD Digital",
    description:
      "Criação de sites em Monte Alto para empresas que precisam vender melhor, aparecer no Google, gerar contatos e transmitir confiança no digital.",
    h1: "Criação de sites em Monte Alto para empresas locais",
    intro:
      "A CORPAD Digital cria sites profissionais para empresas de Monte Alto que precisam apresentar serviços com clareza, carregar rápido no celular e transformar visitas em conversas pelo WhatsApp.",
    serviceUrl: "/servicos/criacao-de-sites",
  },
  "criacao-de-sites-ribeirao-preto": {
    slug: "criacao-de-sites-ribeirao-preto",
    city: "Ribeirão Preto",
    region: "SP",
    service: "criação de sites",
    title: "Criação de Sites em Ribeirão Preto | CORPAD Digital",
    description:
      "Criação de sites em Ribeirão Preto e região com estrutura profissional, SEO técnico, páginas de serviço, WhatsApp e conteúdo preparado para IA.",
    h1: "Criação de sites em Ribeirão Preto com SEO, GEO e AEO",
    intro:
      "A CORPAD Digital atende empresas de Ribeirão Preto e região com sites institucionais, landing pages e páginas comerciais criadas para gerar autoridade, tráfego qualificado e contatos reais.",
    serviceUrl: "/servicos/criacao-de-sites",
  },
  "marketing-digital-ribeirao-preto": {
    slug: "marketing-digital-ribeirao-preto",
    city: "Ribeirão Preto",
    region: "SP",
    service: "marketing digital",
    title: "Marketing Digital em Ribeirão Preto | CORPAD Digital",
    description:
      "Marketing digital em Ribeirão Preto para empresas que precisam organizar presença online, atrair clientes, gerar leads e melhorar campanhas.",
    h1: "Marketing digital em Ribeirão Preto para atrair clientes",
    intro:
      "A CORPAD Digital estrutura presença digital, conteúdo, campanhas e pontos de conversão para empresas de Ribeirão Preto que querem crescer com mais clareza e previsibilidade.",
    serviceUrl: "/servicos/marketing-digital",
  },
  "trafego-pago-ribeirao-preto": {
    slug: "trafego-pago-ribeirao-preto",
    city: "Ribeirão Preto",
    region: "SP",
    service: "tráfego pago",
    title: "Tráfego Pago em Ribeirão Preto | CORPAD Digital",
    description:
      "Gestão de tráfego pago em Ribeirão Preto para gerar leads, mensagens no WhatsApp e visitas qualificadas por Google, Instagram, Facebook e LinkedIn.",
    h1: "Tráfego pago em Ribeirão Preto para gerar oportunidades",
    intro:
      "A CORPAD Digital planeja campanhas para empresas de Ribeirão Preto com segmentação local, páginas de destino claras, acompanhamento de métricas e otimização contínua.",
    serviceUrl: "/servicos/trafego-pago",
  },
  "consultoria-empresarial-monte-alto": {
    slug: "consultoria-empresarial-monte-alto",
    city: "Monte Alto",
    region: "SP",
    service: "consultoria empresarial",
    title: "Consultoria Empresarial em Monte Alto | CORPAD Consultoria",
    description:
      "Consultoria empresarial em Monte Alto para organizar processos, tecnologia, dados, financeiro e decisões de crescimento com apoio próximo.",
    h1: "Consultoria empresarial em Monte Alto com visão prática",
    intro:
      "A CORPAD Consultoria apoia empresas de Monte Alto na organização de processos, indicadores, tecnologia e rotinas de gestão para melhorar controle e tomada de decisão.",
    serviceUrl: "/corpad-consultoria/servicos/assessoria-empresarial",
  },
  "consultoria-empresarial-ribeirao-preto": {
    slug: "consultoria-empresarial-ribeirao-preto",
    city: "Ribeirão Preto",
    region: "SP",
    service: "consultoria empresarial",
    title: "Consultoria Empresarial em Ribeirão Preto | CORPAD Consultoria",
    description:
      "Consultoria empresarial em Ribeirão Preto para empresas que precisam melhorar gestão, tecnologia, dados, processos e performance.",
    h1: "Consultoria empresarial em Ribeirão Preto para crescer com controle",
    intro:
      "A CORPAD Consultoria atende empresas de Ribeirão Preto com diagnóstico, planejamento, organização de processos, inteligência de dados e apoio para decisões de crescimento.",
    serviceUrl: "/corpad-consultoria/servicos/assessoria-empresarial",
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

function getWhatsappUrl(page) {
  return `https://wa.me/5516996094649?text=${encodeURIComponent(
    `Olá, acessei a página de ${page.service} em ${page.city} da CORPAD e quero falar sobre um projeto.`,
  )}`;
}

function jsonLd(page, siteUrl) {
  const url = `${siteUrl}/${page.slug}`;

  return [
    {
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
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-16-99609-4649",
        contactType: "customer service",
        availableLanguage: "pt-BR",
        areaServed: "BR",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Atendimento digital e consultivo para empresas",
        addressLocality: "Monte Alto",
        addressRegion: "SP",
        postalCode: "15910-000",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -21.2616,
        longitude: -48.4969,
      },
      areaServed: [
        { "@type": "City", name: page.city },
        { "@type": "AdministrativeArea", name: "São Paulo" },
        { "@type": "Country", name: "Brasil" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: `${page.service} em ${page.city}`,
      description: page.description,
      serviceType: page.service,
      areaServed: {
        "@type": "City",
        name: page.city,
      },
      provider: { "@id": `${siteUrl}/#organization` },
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: page.title,
      headline: page.h1,
      description: page.description,
      url,
      inLanguage: "pt-BR",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "CORPAD",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      mainEntity: { "@id": `${url}#service` },
      about: [
        { "@type": "Thing", name: page.service },
        { "@type": "Place", name: page.city },
        { "@type": "Thing", name: "SEO local" },
        { "@type": "Thing", name: "GEO" },
        { "@type": "Thing", name: "AEO" },
      ],
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".service-ssr-content > p", "[aria-label='Resposta direta']"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `A CORPAD atende ${page.city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Sim. A CORPAD atende empresas em ${page.city}, Monte Alto, região de Ribeirão Preto, São Paulo e todo o Brasil por canais digitais e consultivos.`,
          },
        },
        {
          "@type": "Question",
          name: `Como contratar ${page.service} em ${page.city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: "O primeiro passo é falar com a CORPAD pelo WhatsApp para explicar o objetivo, público, serviço, região de atendimento e urgência comercial.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: page.h1, item: url },
      ],
    },
  ];
}

function renderLocalPage(page) {
  const whatsappUrl = getWhatsappUrl(page);

  return `
    <main class="service-page service-ssr-page local-landing-page">
      <header class="navbar">
        <a class="brand" href="/" aria-label="Página inicial">CORPAD</a>
        <nav class="nav-links" aria-label="Navegação principal">
          <a href="/corpad-digital">CORPAD Digital</a>
          <a href="/corpad-consultoria">Consultoria</a>
          <a href="/portfolio">Portfólio</a>
          <a href="/clientes">Clientes</a>
          <a href="/blog">Blog</a>
        </nav>
      </header>
      <article class="service-ssr-content">
        <p class="section-kicker">Atendimento local | ${escapeHtml(page.city)} - ${escapeHtml(page.region)}</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.intro)}</p>
        <p><a href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noreferrer">Falar com a CORPAD pelo WhatsApp</a></p>

        <section aria-label="Resposta direta">
          <h2>${escapeHtml(page.title)}</h2>
          <p>${escapeHtml(page.description)}</p>
          <p>A página foi estruturada para campanhas, SEO local, mecanismos generativos e respostas de IA entenderem o serviço, a localização, o contato e a autoridade da CORPAD.</p>
        </section>

        <section aria-label="Por que escolher a CORPAD">
          <h2>Por que escolher a CORPAD?</h2>
          <ul>
            <li>Empresa fundada em 1996, com atuação em soluções digitais, tecnologia e consultoria empresarial.</li>
            <li>Conteúdo rastreável no HTML, com títulos claros, perguntas frequentes e dados estruturados Schema.org.</li>
            <li>Atendimento para empresas de ${escapeHtml(page.city)}, Monte Alto, região de Ribeirão Preto, São Paulo e Brasil.</li>
            <li>Estrutura voltada para tráfego pago, SEO, GEO, AEO, WhatsApp e geração de oportunidades comerciais.</li>
          </ul>
        </section>

        <section aria-label="Como funciona">
          <h2>Como funciona o atendimento</h2>
          <ol>
            <li>Entendemos a empresa, público, região de atendimento e objetivo comercial.</li>
            <li>Definimos a mensagem, páginas, prova de confiança e chamadas para contato.</li>
            <li>Organizamos conteúdo para pessoas, Google, mapas, mecanismos de resposta e ferramentas de IA.</li>
            <li>Publicamos a estrutura e acompanhamos os próximos ajustes para melhorar conversão.</li>
          </ol>
        </section>

        <section aria-label="Perguntas frequentes">
          <h2>Perguntas frequentes</h2>
          <article>
            <h3>A CORPAD atende ${escapeHtml(page.city)}?</h3>
            <p>Sim. A CORPAD atende empresas em ${escapeHtml(page.city)}, Monte Alto, região de Ribeirão Preto, São Paulo e todo o Brasil por canais digitais e consultivos.</p>
          </article>
          <article>
            <h3>Essa página serve para campanha de tráfego pago?</h3>
            <p>Sim. Ela entrega uma resposta direta, contexto local, benefício do serviço, CTA para WhatsApp e conteúdo semântico para melhorar a qualidade da página de destino.</p>
          </article>
          <article>
            <h3>Onde vejo mais detalhes do serviço?</h3>
            <p>Você pode acessar a página completa do serviço em <a href="${escapeHtml(page.serviceUrl)}">${escapeHtml(page.serviceUrl)}</a> ou falar diretamente com a equipe da CORPAD.</p>
          </article>
        </section>
      </article>
    </main>
  `.trim();
}

function removeHomeInlineStyle(html) {
  return html.replace(
    /\s*<style>\s*\*,\*::before,\*::after\{box-sizing:border-box\}[\s\S]*?\.gateway-info-strip span,\.gateway-info-strip a\{width:100%;white-space:normal\}\}\s*<\/style>/i,
    "",
  );
}

export function getLocalPageForHead(slug) {
  return localPages[slug] || null;
}

export function listLocalPageSlugs() {
  return Object.keys(localPages);
}

export function injectLocalPage(html, page) {
  if (!page) {
    return html;
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${page.slug}`;
  const jsonLdText = JSON.stringify(jsonLd(page, siteUrl)).replace(/</g, "\\u003c");
  const headTags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(`${page.service}, ${page.city}, ${page.region}, CORPAD, SEO local, GEO, AEO, tráfego pago, landing page`)}" />`,
    `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(defaultImage)}" />`,
    `<meta property="og:site_name" content="CORPAD" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(defaultImage)}" />`,
    `<meta name="geo.region" content="BR-SP" />`,
    `<meta name="geo.placename" content="${escapeHtml(`${page.city}, São Paulo, Brasil`)}" />`,
    `<meta name="geo.position" content="-21.2616;-48.4969" />`,
    `<meta name="ICBM" content="-21.2616, -48.4969" />`,
    `<meta name="coverage" content="${escapeHtml(`${page.city}, São Paulo, Brasil`)}" />`,
    `<meta name="target" content="${escapeHtml(`empresas que precisam de ${page.service} em ${page.city}`)}" />`,
    `<meta name="subject" content="${escapeHtml(page.h1)}" />`,
    `<script id="corpad-page-jsonld" type="application/ld+json">${jsonLdText}</script>`,
  ].join("\n    ");

  return removeHomeInlineStyle(html)
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|keywords|robots|coverage|target|subject|geo\.[^"']+|ICBM|og:[^"']+|twitter:[^"']+)["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*type=["']module["'][^>]*src=["'][^"']*\/assets\/index-[^"']+\.js["'][^>]*>\s*<\/script>/gi, "")
    .replace(/<script\b[^>]*type=["']module["'][^>]*src=["']\/src\/main\.tsx["'][^>]*>\s*<\/script>/gi, "")
    .replace(
      /<div id=["']root["']>[\s\S]*<\/div>\s*(?=<\/body>)/i,
      `<div id="root">${renderLocalPage(page)}</div>\n    `,
    )
    .replace(
      /<html\b([^>]*)>/i,
      `<html$1 data-corpad-route="/${escapeHtml(page.slug)}" data-corpad-template="local-landing">`,
    )
    .replace(
      /<!doctype html>/i,
      `<!doctype html>\n<!-- CORPAD_ROUTE: /${escapeHtml(page.slug)} | TEMPLATE: local-landing -->`,
    )
    .replace("</head>", `    ${headTags}\n  </head>`);
}
