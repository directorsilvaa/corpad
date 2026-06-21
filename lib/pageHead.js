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
    faqs: [
      ["A CORPAD Digital cria sites personalizados?", "Sim. Cada site personalizado e desenvolvido de acordo com a identidade, os objetivos e as necessidades da empresa."],
      ["Voces tambem fazem campanhas de trafego pago?", "Sim. Criamos, gerenciamos e otimizamos campanhas em Google Ads, Instagram, Facebook, TikTok e LinkedIn."],
      ["Posso contratar apenas um servico?", "Sim. Voce pode contratar uma solucao especifica ou combinar diferentes servicos conforme a necessidade da empresa."],
      ["A CORPAD oferece suporte apos a entrega?", "Sim. Dependendo do servico contratado, a CORPAD oferece suporte, acompanhamento tecnico e melhorias continuas."],
      ["Voces desenvolvem lojas virtuais?", "Sim. Criamos e-commerces com estrutura para venda, organizacao de produtos, estoque e otimizacao para buscadores."],
      ["A automacao serve para qualquer empresa?", "A automacao pode ser aplicada em diferentes tipos de negocio, principalmente quando existem tarefas repetitivas, integracao entre sistemas ou processos manuais que consomem muito tempo."],
    ],
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
  "/termos-de-uso": {
    title: "Termos de Uso | CORPAD",
    description:
      "Termos de uso da CORPAD para acesso ao site, canais digitais, conteúdos, serviços, responsabilidades e contato.",
    h1: "Termos de Uso da CORPAD",
    intro:
      "Esta página apresenta as condições gerais de uso do site da CORPAD, seus conteúdos, canais de contato e informações institucionais.",
    sections: [
      ["Uso do site", "O acesso ao site da CORPAD deve respeitar as finalidades informativas, comerciais e institucionais apresentadas nas páginas públicas."],
      ["Conteúdos e serviços", "As informações sobre soluções digitais, consultoria, tecnologia e atendimento podem ser atualizadas para refletir a evolução dos serviços."],
      ["Contato", "Dúvidas sobre termos de uso, privacidade ou atendimento podem ser encaminhadas pelos canais oficiais da CORPAD."],
    ],
    keywords: "termos de uso CORPAD, condições de uso, site CORPAD, privacidade, atendimento",
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

function splitKeywords(value) {
  return String(value ?? "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function getPageFaqs(page, path) {
  if (page.faqs?.length > 0) {
    return page.faqs;
  }

  return [
    [
      `O que encontro na pagina ${page.h1}?`,
      `${page.h1} apresenta informacoes sobre ${page.description}`,
    ],
    [
      "A CORPAD atende empresas fora de Monte Alto?",
      "Sim. A CORPAD atende empresas em Monte Alto, regiao de Ribeirao Preto, Sao Paulo e todo o Brasil por canais digitais e consultivos.",
    ],
    [
      "Como falar com a CORPAD?",
      "O contato pode ser feito pelo e-mail contato@corpad.com.br ou pelo WhatsApp +55 16 99609-4649.",
    ],
    [
      "Essa pagina esta preparada para Google e mecanismos de IA?",
      "Sim. A pagina tem HTML pre-renderizado, titulo, descricao, canonical, Open Graph, contexto local, respostas diretas e dados estruturados Schema.org.",
    ],
    [
      "Qual e o proximo passo?",
      path === "/blog"
        ? "Leia os conteudos do blog e fale com a equipe para entender quais solucoes fazem sentido para sua empresa."
        : "O primeiro passo e conversar com a equipe da CORPAD para explicar o objetivo, o momento da empresa e a solucao desejada.",
    ],
  ];
}

function organizationJsonLd(page) {
  const knowsAbout = splitKeywords(page?.keywords).slice(0, 12);
  const makesOffer = page?.sections?.slice(0, 6).map(([title, body]) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: title,
      description: body,
      areaServed: "Brasil",
    },
  }));

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
      { "@type": "Country", name: "Brasil" },
      { "@type": "AdministrativeArea", name: "São Paulo" },
      { "@type": "City", name: "Monte Alto" },
      { "@type": "City", name: "Ribeirão Preto" },
    ],
    knowsAbout: knowsAbout.length > 0 ? knowsAbout : ["CORPAD", "soluções digitais", "consultoria empresarial"],
    makesOffer: makesOffer?.length > 0 ? makesOffer : undefined,
  };
}

function pageJsonLd(page, path) {
  const url = `${siteUrl}${path === "/" ? "/" : path}`;

  const graph = [
    organizationJsonLd(page),
    {
      "@context": "https://schema.org",
      "@type": path === "/blog" ? "Blog" : path === "/portfolio" ? "CollectionPage" : "WebPage",
      "@id": `${siteUrl}${path === "/" ? "" : path}#webpage`,
      name: page.title,
      headline: page.h1,
      description: page.description,
      url,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#organization` },
      about: page.sections.map(([title]) => ({ "@type": "Thing", name: title })),
      mentions: ["Monte Alto", "Ribeirão Preto", "São Paulo", "Brasil", "CORPAD"],
      primaryImageOfPage: defaultImage,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".service-ssr-content > p", "[aria-label='Respostas rápidas']"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
        ...(path === "/" ? [] : [{ "@type": "ListItem", position: 2, name: page.h1, item: url }]),
      ],
    },
  ];

  if (path === "/") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "CORPAD",
      url: `${siteUrl}/`,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#organization` },
      about: [
        { "@type": "Service", name: "CORPAD Digital", url: `${siteUrl}/corpad-digital/` },
        { "@type": "Service", name: "CORPAD Consultoria", url: `${siteUrl}/corpad-consultoria/` },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Solucoes CORPAD",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "CORPAD Digital",
              description: "Criacao de sites, e-commerce, marketing digital, trafego pago, hospedagem, e-mail profissional e automacao.",
              url: `${siteUrl}/corpad-digital/`,
              provider: { "@id": `${siteUrl}/#organization` },
              areaServed: "Brasil",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "CORPAD Consultoria",
              description: "Consultoria empresarial, tecnologia, dados, infraestrutura, telefonia em nuvem, BPO financeiro e assessoria empresarial.",
              url: `${siteUrl}/corpad-consultoria/`,
              provider: { "@id": `${siteUrl}/#organization` },
              areaServed: "Brasil",
            },
          },
        ],
      },
    });
  }

  const faqs = getPageFaqs(page, path);

  if (faqs.length > 0) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}${path === "/" ? "" : path}#faq`,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    });
  }

  return graph;
}

function renderPage(page, path) {
  const faqs = getPageFaqs(page, path);

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
        ${
          faqs.length > 0
            ? `
        <section aria-label="Perguntas frequentes">
          <h2>Perguntas frequentes</h2>
          ${faqs
            .map(
              ([question, answer]) => `
          <article>
            <h3>${escapeHtml(question)}</h3>
            <p>${escapeHtml(answer)}</p>
          </article>
              `,
            )
            .join("\n")}
        </section>
        `
            : ""
        }
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
