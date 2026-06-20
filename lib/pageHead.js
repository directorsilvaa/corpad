const siteUrl = "https://corpad.com.br";
const defaultImage = `${siteUrl}/logo.png?v=20260618`;

const pages = {
  "/": {
    title: "CORPAD | Soluções Digitais e Consultoria Empresarial",
    description:
      "CORPAD une soluções digitais e consultoria empresarial para empresas que precisam crescer com tecnologia, gestão, dados, infraestrutura e estratégia.",
    h1: "CORPAD Digital e CORPAD Consultoria",
    intro:
      "A CORPAD ajuda empresas a construir presença digital, organizar processos, melhorar tecnologia, estruturar dados e tomar decisões com mais clareza.",
    sections: [
      ["CORPAD Digital", "Sites, e-commerce, marketing digital, tráfego pago, hospedagem, e-mail profissional e automação para empresas que querem vender e atender melhor."],
      ["CORPAD Consultoria", "Gestão, tecnologia, dados, infraestrutura, telefonia em nuvem, BPO financeiro e assessoria empresarial para empresas que precisam crescer com controle."],
    ],
    keywords: "CORPAD, soluções digitais, consultoria empresarial, criação de sites, marketing digital, automação, gestão empresarial, tecnologia, Monte Alto, São Paulo",
  },
  "/corpad-digital": {
    title: "CORPAD Digital | Sites, Marketing, Tráfego Pago e Automação",
    description:
      "Soluções digitais para empresas: criação de sites, e-commerce, marketing digital, tráfego pago, hospedagem, e-mail profissional e automação de processos.",
    h1: "CORPAD Digital",
    intro:
      "A CORPAD Digital cria estruturas digitais para empresas que precisam atrair, converter, vender e operar com mais eficiência.",
    sections: [
      ["Serviços digitais", "Criação de sites, lojas virtuais, marketing digital, tráfego pago, hospedagem de sites, e-mail profissional e automação de processos."],
      ["SEO, GEO e AEO", "As páginas são organizadas para mecanismos de busca, respostas diretas e mecanismos generativos entenderem serviços, localização, autoridade e próximos passos."],
      ["Atendimento", "A CORPAD atende empresas em Monte Alto, região de Ribeirão Preto, São Paulo e todo o Brasil por canais digitais."],
    ],
    keywords: "CORPAD Digital, criação de sites, SEO, GEO, AEO, marketing digital, tráfego pago, automação, e-commerce, hospedagem",
  },
  "/corpad-consultoria": {
    title: "CORPAD Consultoria | Gestão, Tecnologia, Dados e Estratégia",
    description:
      "Consultoria empresarial para organizar processos, apoiar decisões, melhorar resultados e conectar gestão, tecnologia, dados e estratégia.",
    h1: "CORPAD Consultoria",
    intro:
      "A CORPAD Consultoria ajuda empresas a transformar desafios de gestão, tecnologia e operação em prioridades claras, processos organizados e decisões melhores.",
    sections: [
      ["Consultoria empresarial", "Assessoria empresarial, assessoria em T.I., inteligência de dados, servidores em nuvem, telefonia em nuvem e BPO financeiro."],
      ["Metodologia", "Diagnóstico, planejamento, implementação, monitoramento e evolução contínua para melhorar controle, eficiência e resultado."],
      ["Contexto local e nacional", "Atendimento consultivo para empresas de Monte Alto, São Paulo e Brasil, com atuação digital e foco em operações empresariais."],
    ],
    keywords: "CORPAD Consultoria, consultoria empresarial, assessoria empresarial, assessoria em TI, inteligência de dados, BPO financeiro, servidores em nuvem",
  },
  "/portfolio": {
    title: "Portfólio CORPAD Digital | Projetos Digitais para Empresas",
    description:
      "Projetos digitais desenvolvidos pela CORPAD Digital para empresas: sites, portais, landing pages e experiências com foco em crescimento.",
    h1: "Portfólio CORPAD Digital",
    intro:
      "Uma seleção de projetos desenvolvidos para apresentar marcas, serviços e ofertas com mais clareza, credibilidade e presença digital.",
    sections: [
      ["Projetos reais", "Sites institucionais, portais, landing pages e páginas comerciais criadas para empresas de diferentes segmentos."],
      ["Objetivo", "Cada projeto combina comunicação, design, performance, navegação e chamadas de contato para apoiar crescimento."],
    ],
    keywords: "portfólio CORPAD, projetos digitais, sites para empresas, landing pages, portais empresariais",
  },
  "/clientes": {
    title: "Clientes CORPAD | Empresas e Projetos Atendidos",
    description:
      "Empresas que confiaram na CORPAD para construir presença digital, comunicação, portais, landing pages e estruturas comerciais.",
    h1: "Clientes CORPAD",
    intro:
      "Marcas de diferentes segmentos contaram com a CORPAD para construir presença digital, organizar comunicação e fortalecer sua estrutura online.",
    sections: [
      ["Segmentos atendidos", "Saúde, educação, varejo, associações, serviços, B2B, empresas locais e operações digitais."],
      ["Prova de confiança", "Mais de 20 anos desenvolvendo soluções digitais e consultivas para empresas que precisam evoluir com tecnologia."],
    ],
    keywords: "clientes CORPAD, empresas atendidas, projetos digitais, presença digital, sites empresariais",
  },
  "/blog": {
    title: "Blog CORPAD | Tecnologia, Marketing, Gestão e Crescimento",
    description:
      "Conteúdos sobre sites, marketing digital, automação, tecnologia, cloud, gestão empresarial e consultoria para empresas.",
    h1: "Blog CORPAD",
    intro:
      "Artigos da CORPAD sobre presença digital, tecnologia, gestão, automação, infraestrutura, marketing e crescimento empresarial.",
    sections: [
      ["Categorias", "Automação, digital, consultoria, cloud, marketing, gestão e tecnologia."],
      ["Objetivo editorial", "Responder dúvidas práticas de empresas e apoiar decisões sobre presença digital, operação e crescimento."],
    ],
    keywords: "blog CORPAD, marketing digital, automação, consultoria empresarial, tecnologia, cloud, gestão",
  },
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function organizationJsonLd() {
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
      postalCode: "15910-000",
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
      { "@type": "City", name: "Monte Alto" },
      { "@type": "City", name: "Ribeirão Preto" },
    ],
    knowsAbout: [
      "criação de sites",
      "marketing digital",
      "tráfego pago",
      "automação",
      "consultoria empresarial",
      "infraestrutura em nuvem",
      "inteligência de dados",
      "BPO financeiro",
      "SEO",
      "GEO",
      "AEO",
    ],
  };
}

function pageJsonLd(page, path) {
  return [
    organizationJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": path === "/blog" ? "Blog" : path === "/portfolio" ? "CollectionPage" : "WebPage",
      "@id": `${siteUrl}${path === "/" ? "" : path}#webpage`,
      name: page.title,
      headline: page.h1,
      description: page.description,
      url: `${siteUrl}${path === "/" ? "/" : path}`,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#organization` },
      about: page.sections.map(([title]) => ({ "@type": "Thing", name: title })),
      mentions: ["Monte Alto", "Ribeirão Preto", "São Paulo", "Brasil", "CORPAD"],
      primaryImageOfPage: defaultImage,
    },
  ];
}

function renderPage(page, path) {
  return `
    <main class="service-page service-ssr-page">
      <header class="navbar">
        <a class="brand" href="/" aria-label="Página inicial">CORPAD</a>
        <nav class="nav-links" aria-label="Navegação principal">
          <a href="/corpad-digital">CORPAD Digital</a>
          <a href="/corpad-consultoria">CORPAD Consultoria</a>
          <a href="/portfolio">Portfólio</a>
          <a href="/clientes">Clientes</a>
          <a href="/blog">Blog</a>
        </nav>
      </header>
      <article class="service-ssr-content">
        <p class="section-kicker">CORPAD</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.intro)}</p>
        ${page.sections
          .map(
            ([title, body]) => `
              <section>
                <h2>${escapeHtml(title)}</h2>
                <p>${escapeHtml(body)}</p>
              </section>
            `,
          )
          .join("\n")}
        <section aria-label="Respostas rápidas">
          <h2>Respostas rápidas</h2>
          <article>
            <h3>Onde a CORPAD atende?</h3>
            <p>A CORPAD atende empresas em Monte Alto, região de Ribeirão Preto, estado de São Paulo e todo o Brasil por canais digitais.</p>
          </article>
          <article>
            <h3>Quais áreas a CORPAD cobre?</h3>
            <p>A CORPAD atua com soluções digitais, consultoria empresarial, tecnologia, dados, infraestrutura, marketing, automação e crescimento.</p>
          </article>
        </section>
      </article>
    </main>
  `.trim();
}

export function getStaticPageForHead(pathname) {
  return pages[pathname] || null;
}

export function injectStaticPage(html, pathname) {
  const page = getStaticPageForHead(pathname);

  if (!page) {
    return html;
  }

  const url = `${siteUrl}${pathname === "/" ? "/" : pathname}`;
  const jsonLdText = JSON.stringify(pageJsonLd(page, pathname)).replace(/</g, "\\u003c");
  const headTags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(page.keywords)}" />`,
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
    `<meta name="geo.placename" content="Monte Alto, São Paulo, Brasil" />`,
    `<meta name="geo.position" content="-21.2616;-48.4969" />`,
    `<meta name="ICBM" content="-21.2616, -48.4969" />`,
    `<meta name="coverage" content="Brasil, São Paulo, Monte Alto, Ribeirão Preto" />`,
    `<meta name="subject" content="${escapeHtml(page.h1)}" />`,
    `<script id="corpad-page-jsonld" type="application/ld+json">${jsonLdText}</script>`,
  ].join("\n    ");

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|keywords|robots|coverage|target|subject|geo\.[^"']+|ICBM|og:[^"']+|twitter:[^"']+)["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
    .replace(/<div id=["']root["']>[\s\S]*<\/div>\s*(?=<\/body>)/i, `<div id="root">${renderPage(page, pathname)}</div>\n    `)
    .replace("</head>", `    ${headTags}\n  </head>`);
}
