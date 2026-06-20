const defaultSiteUrl = "https://corpad.com.br";
const defaultImage = `${defaultSiteUrl}/logo.png?v=20260618`;

const services = {
  "servidores-em-nuvem": {
    navLabel: "Servidores em nuvem",
    metaTitle: "Servidores em Nuvem | CORPAD Consultoria",
    metaDescription:
      "Servidores VPS, dedicados e infraestrutura em nuvem com alta performance, baixa latência, segurança e presença no Brasil, América do Norte e Europa.",
    intro:
      "Infraestrutura VPS, servidores dedicados e soluções em nuvem para empresas que precisam de desempenho, disponibilidade, segurança e simplicidade para operar sem travar o crescimento.",
    sections: [
      ["Performance sem excesso de complexidade", "Ambientes planejados para entregar velocidade, estabilidade e custo adequado ao momento da empresa."],
      ["Baixa latência para operar melhor", "Servidores no Brasil e presença internacional ajudam estratégias locais e globais."],
      ["Segurança para serviços críticos", "Anti-DDoS, conectividade redundante e ambientes robustos ajudam a manter serviços disponíveis."],
    ],
    process: ["Entendimento da aplicação", "Escolha da infraestrutura", "Configuração e segurança", "Testes e publicação", "Evolução da operação"],
  },
  "assessoria-empresarial": {
    navLabel: "Assessoria empresarial",
    metaTitle: "Assessoria Empresarial | CORPAD Consultoria",
    metaDescription:
      "Assessoria empresarial para organizar processos, apoiar decisões e melhorar a performance da empresa.",
    intro:
      "A assessoria empresarial transforma desafios de gestão em prioridades claras, processos organizados e decisões mais bem sustentadas.",
    sections: [
      ["Gestão com clareza", "Identificação de gargalos, indicadores e prioridades para a empresa crescer com mais direção."],
      ["Processos mais organizados", "Estruturação de rotinas, responsabilidades e fluxos para reduzir retrabalho."],
      ["Acompanhamento consultivo", "Estratégia e execução trabalhando juntas para que o planejamento avance."],
    ],
    process: ["Levantamento do momento atual", "Identificação de problemas", "Definição de prioridades", "Apoio na implementação", "Monitoramento de resultados"],
  },
  "assessoria-em-ti": {
    navLabel: "Assessoria em T.I.",
    metaTitle: "Assessoria em T.I. | CORPAD Consultoria",
    metaDescription:
      "Assessoria em tecnologia da informação para empresas que precisam de segurança, produtividade e estabilidade operacional.",
    intro:
      "A CORPAD avalia a estrutura de tecnologia da empresa e orienta melhorias para aumentar segurança, produtividade e confiabilidade.",
    sections: [
      ["T.I. como apoio ao negócio", "Tecnologia precisa facilitar a rotina, proteger informações e sustentar crescimento."],
      ["Mais segurança e padronização", "Avaliamos acessos, ferramentas, rotinas e riscos para propor estrutura mais confiável."],
      ["Decisões técnicas mais seguras", "A assessoria ajuda a empresa a investir melhor em tecnologia."],
    ],
    process: ["Análise do ambiente de T.I.", "Mapeamento de riscos", "Recomendação de melhorias", "Apoio na implementação", "Acompanhamento técnico"],
  },
  "inteligencia-de-dados": {
    navLabel: "Inteligência de dados",
    metaTitle: "Inteligência de Dados | CORPAD Consultoria",
    metaDescription:
      "Inteligência de dados, dashboards e indicadores para apoiar decisões empresariais com mais clareza.",
    intro:
      "Transformamos informações dispersas em indicadores, dashboards e leituras gerenciais para decisões com mais segurança.",
    sections: [
      ["Dados que ajudam a decidir", "Informação organizada vira visão prática para a gestão."],
      ["Indicadores relevantes", "Definimos métricas úteis para operação, financeiro, vendas e produtividade."],
      ["Acompanhamento contínuo", "Dashboards ajudam a identificar tendências, problemas e oportunidades."],
    ],
    process: ["Mapeamento das fontes", "Definição de indicadores", "Tratamento dos dados", "Criação de dashboards", "Leitura gerencial"],
  },
  "telefonia-em-nuvem": {
    navLabel: "Telefonia em nuvem",
    metaTitle: "Telefonia em Nuvem | CORPAD Consultoria",
    metaDescription:
      "Telefonia em nuvem para empresas que precisam melhorar atendimento, mobilidade e controle das comunicações.",
    intro:
      "Telefonia em nuvem moderniza a comunicação corporativa, melhora atendimento e permite controle sobre chamadas, ramais e rotinas comerciais.",
    sections: [
      ["Comunicação sem depender do escritório", "Equipes atendem com mobilidade mantendo padrão profissional."],
      ["Controle e organização", "Distribuição de ramais, acompanhamento de chamadas e ajustes conforme necessidade."],
      ["Mais eficiência no atendimento", "Estrutura moderna reduz perdas de contato e direciona clientes com mais rapidez."],
    ],
    process: ["Diagnóstico do atendimento", "Definição de ramais", "Configuração da telefonia", "Testes de chamadas", "Ajustes operacionais"],
  },
  "bpo-financeiro": {
    navLabel: "BPO financeiro",
    metaTitle: "BPO Financeiro | CORPAD Consultoria",
    metaDescription:
      "BPO financeiro para organizar rotinas financeiras, melhorar previsibilidade e apoiar a gestão da empresa.",
    intro:
      "O BPO financeiro apoia rotinas financeiras para que a empresa tenha mais controle, previsibilidade e tempo para focar no crescimento.",
    sections: [
      ["Financeiro organizado", "Rotinas estruturadas reduzem atrasos, improvisos e falta de visibilidade."],
      ["Previsibilidade para gerir melhor", "Dados financeiros claros apoiam pagamentos, recebimentos, investimentos e crescimento."],
      ["Mais tempo para o negócio", "A gestão ganha tempo e informação para focar em decisões estratégicas."],
    ],
    process: ["Diagnóstico financeiro", "Organização de entradas e saídas", "Padronização de processos", "Acompanhamento do caixa", "Relatórios gerenciais"],
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

function jsonLd(service, slug, siteUrl) {
  const url = `${siteUrl}/corpad-consultoria/servicos/${slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "CORPAD",
      url: siteUrl,
      logo: defaultImage,
      telephone: "+55-16-99609-4649",
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
      areaServed: ["Brasil", "São Paulo", "Monte Alto", "Ribeirão Preto"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.navLabel,
      description: service.metaDescription,
      provider: { "@id": `${siteUrl}/#organization` },
      serviceType: service.navLabel,
      category: "Consultoria empresarial, tecnologia, gestão e dados",
      areaServed: "Brasil",
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: service.metaTitle,
      description: service.metaDescription,
      url,
      inLanguage: "pt-BR",
      mainEntity: { "@id": `${url}#service` },
      about: service.sections.map(([title]) => ({ "@type": "Thing", name: title })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${url}#processo`,
      name: `Como funciona ${service.navLabel}`,
      step: service.process.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step,
        text: step,
      })),
    },
  ];
}

function render(service, slug) {
  return `
    <main class="service-page consulting-service-page">
      <header class="navbar">
        <a class="brand" href="/corpad-consultoria" aria-label="Página inicial">CORPAD Consultoria</a>
        <nav class="nav-links" aria-label="Navegação principal">
          <a href="/corpad-consultoria#sobre">Sobre</a>
          <a href="/corpad-consultoria#solucoes">Serviços</a>
          <a href="/clientes">Clientes</a>
          <a href="/blog">Blog</a>
          <a href="/corpad-consultoria#contato">Contato</a>
        </nav>
      </header>
      <article class="service-ssr-content">
        <p class="section-kicker">CORPAD Consultoria</p>
        <h1>${escapeHtml(service.navLabel)}</h1>
        <p>${escapeHtml(service.intro)}</p>
        <section aria-label="Resumo para mecanismos de busca e inteligências artificiais">
          <h2>${escapeHtml(service.navLabel)} com contexto para SEO, GEO e AEO</h2>
          <p>${escapeHtml(service.metaDescription)}</p>
          <p>A CORPAD atende empresas em Monte Alto, região de Ribeirão Preto, São Paulo e todo o Brasil com atuação consultiva e digital.</p>
        </section>
        ${service.sections
          .map(
            ([title, body]) => `
              <section>
                <h2>${escapeHtml(title)}</h2>
                <p>${escapeHtml(body)}</p>
              </section>
            `,
          )
          .join("\n")}
        <section aria-label="Processo">
          <h2 id="processo">Como funciona</h2>
          <ol>
            ${service.process.map((step) => `<li>${escapeHtml(step)}</li>`).join("\n")}
          </ol>
        </section>
      </article>
    </main>
  `.trim();
}

export function getConsultingServiceForHead(slug) {
  return services[slug] || null;
}

export function listConsultingServiceSlugs() {
  return Object.keys(services);
}

export function injectConsultingServicePage(html, slug, service) {
  if (!service) {
    return html;
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/corpad-consultoria/servicos/${slug}`;
  const jsonLdText = JSON.stringify(jsonLd(service, slug, siteUrl)).replace(/</g, "\\u003c");
  const headTags = [
    `<title>${escapeHtml(service.metaTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(service.metaDescription)}" />`,
    `<meta name="keywords" content="${escapeHtml(`${service.navLabel}, consultoria empresarial, tecnologia, gestão, dados, CORPAD Consultoria, Monte Alto, São Paulo, GEO, AEO`)}" />`,
    `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(service.metaTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(service.metaDescription)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(defaultImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="geo.region" content="BR-SP" />`,
    `<meta name="geo.placename" content="Monte Alto, São Paulo, Brasil" />`,
    `<meta name="geo.position" content="-21.2616;-48.4969" />`,
    `<meta name="ICBM" content="-21.2616, -48.4969" />`,
    `<script id="corpad-page-jsonld" type="application/ld+json">${jsonLdText}</script>`,
  ].join("\n    ");

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|keywords|robots|geo\.[^"']+|ICBM|og:[^"']+|twitter:[^"']+)["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
    .replace(/<div id=["']root["']>[\s\S]*<\/div>\s*(?=<\/body>)/i, `<div id="root">${render(service, slug)}</div>\n    `)
    .replace("</head>", `    ${headTags}\n  </head>`);
}
