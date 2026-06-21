import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { loadDotEnv } from "./env.js";

loadDotEnv();

const defaultSiteUrl = "https://corpad.com.br";
const defaultImage = `${defaultSiteUrl}/logo.png?v=20260618`;

function getSiteUrl() {
  return (process.env.SITE_URL || defaultSiteUrl).replace(/\/+$/, "");
}

function getSupabaseConfig() {
  const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim();
  const supabaseKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    ""
  ).trim();

  return { supabaseUrl, supabaseKey };
}

function getLocalBlogPostsPath() {
  const candidates = [
    path.join(process.cwd(), "dist", "data", "blog-posts.json"),
    path.join(process.cwd(), "public", "data", "blog-posts.json"),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function normalizeBlogPost(post) {
  if (!post) {
    return null;
  }

  return {
    ...post,
    cover_image: post.cover_image ?? post.coverImage ?? null,
    image_alt: post.image_alt ?? post.imageAlt ?? "",
    author_name: post.author_name ?? post.authorName ?? "Equipe CORPAD",
    author_photo: post.author_photo ?? post.authorPhoto ?? "",
    author_role: post.author_role ?? post.authorRole ?? "",
    author_bio: post.author_bio ?? post.authorBio ?? "",
    meta_title: post.meta_title ?? post.metaTitle ?? post.title ?? "",
    meta_description: post.meta_description ?? post.metaDescription ?? post.excerpt ?? "",
    cta_label: post.cta_label ?? post.ctaLabel ?? "",
    cta_url: post.cta_url ?? post.ctaUrl ?? "",
    cta_text: post.cta_text ?? post.ctaText ?? "",
    published_at: post.published_at ?? post.publishedAt ?? null,
    created_at: post.created_at ?? post.createdAt ?? new Date().toISOString(),
    updated_at: post.updated_at ?? post.updatedAt ?? post.published_at ?? post.publishedAt ?? post.created_at ?? post.createdAt ?? new Date().toISOString(),
  };
}

function isPublishedPost(post, now = new Date()) {
  const status = post?.status ?? "draft";
  const publishedAt = post?.published_at ?? post?.publishedAt;

  if (status === "published") {
    return true;
  }

  return status === "scheduled" && publishedAt && new Date(publishedAt) <= now;
}

function listLocalBlogPosts() {
  const postsPath = getLocalBlogPostsPath();

  if (!postsPath) {
    return [];
  }

  try {
    const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
    const now = new Date();

    return (Array.isArray(posts) ? posts : [])
      .map(normalizeBlogPost)
      .filter((post) => post?.slug && isPublishedPost(post, now))
      .sort((a, b) => Date.parse(b.published_at || b.created_at) - Date.parse(a.published_at || a.created_at));
  } catch (error) {
    console.error("Failed to load local blog posts for SEO", error);
    return [];
  }
}

function withTimeoutSignal(milliseconds = 4000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), milliseconds);

  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeoutId),
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHtml(value) {
  return String(value ?? "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDescription(post) {
  return post.meta_description || post.excerpt || post.subtitle || stripHtml(post.content).slice(0, 155);
}

function getKeywords(post) {
  return String(post.keyword || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function getWordCount(post) {
  return stripHtml(post.content).split(/\s+/).filter(Boolean).length;
}

function getReadingTime(post) {
  return Math.max(1, Math.ceil(getWordCount(post) / 180));
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "America/Sao_Paulo",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function isHtmlContent(value) {
  return /<\/?(?:p|h[1-6]|a|ul|ol|li|table|div|section|article|blockquote|img|iframe)\b/i.test(String(value ?? ""));
}

function sanitizeArticleHtml(value) {
  return String(value ?? "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed\b[^>]*>[\s\S]*?<\/embed>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*(["']).*?\1/gi, "")
    .replace(/\s+(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, "");
}

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getPlainArticleLines(post) {
  return String(post.content ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^[-=]{6,}$/.test(line));
}

function renderPlainArticleContent(post) {
  const lines = getPlainArticleLines(post);
  const html = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      html.push(`<ul>${listItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("- ")) {
      listItems.push(line.replace(/^- /, ""));
      continue;
    }

    flushList();

    if (line.startsWith("## ")) {
      html.push(`<h2>${escapeHtml(line.replace(/^## /, ""))}</h2>`);
    } else if (line.startsWith("### ")) {
      html.push(`<h3>${escapeHtml(line.replace(/^### /, ""))}</h3>`);
    } else if (line.startsWith("> ")) {
      html.push(`<blockquote>${escapeHtml(line.replace(/^> /, ""))}</blockquote>`);
    } else {
      html.push(`<p>${escapeHtml(line)}</p>`);
    }
  }

  flushList();
  return html.join("\n");
}

function renderArticleContent(post) {
  if (isHtmlContent(post.content)) {
    return sanitizeArticleHtml(post.content);
  }

  return renderPlainArticleContent(post);
}

function extractFaqsFromPlainContent(post) {
  const lines = getPlainArticleLines(post);
  const faqStart = lines.findIndex((line) => normalizeText(line).includes("perguntas frequentes"));

  if (faqStart === -1) {
    return [];
  }

  const faqs = [];
  let question = "";
  let answerLines = [];

  const flush = () => {
    const answer = answerLines.join(" ").replace(/\s+/g, " ").trim();

    if (question && answer) {
      faqs.push({ question, answer });
    }

    question = "";
    answerLines = [];
  };

  for (const line of lines.slice(faqStart + 1)) {
    if (line.startsWith("## ") && !normalizeText(line).includes("perguntas frequentes")) {
      break;
    }

    if (line.endsWith("?")) {
      flush();
      question = line.replace(/^#+\s*/, "");
      continue;
    }

    if (question && !line.startsWith("#")) {
      answerLines.push(line.replace(/^- /, ""));
    }
  }

  flush();
  return faqs.slice(0, 10);
}

function getOrganizationJsonLd(siteUrl, contextKeywords = []) {
  const knowsAbout = [
    ...contextKeywords,
    "criacao de sites",
    "marketing digital",
    "trafego pago",
    "automacao de processos",
    "consultoria empresarial",
    "infraestrutura em nuvem",
    "e-mail profissional",
    "SEO",
    "GEO",
    "AEO",
  ]
    .filter(Boolean)
    .filter((item, index, list) => list.indexOf(item) === index)
    .slice(0, 16);

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
      availableLanguage: "Portuguese",
    },
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
      {
        "@type": "Country",
        name: "Brasil",
      },
      {
        "@type": "AdministrativeArea",
        name: "Sao Paulo",
      },
    ],
    knowsAbout,
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Criação de sites profissionais",
          areaServed: "Brasil",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Consultoria empresarial e tecnologia",
          areaServed: "Brasil",
        },
      },
    ],
  };
}

function getArticleJsonLd(post, siteUrl, url, title, description, image, keywords) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta_title || post.title,
    alternativeHeadline: post.subtitle || undefined,
    description,
    url,
    image,
    author: {
      "@type": "Organization",
      name: post.author_name || "CORPAD Digital",
    },
    publisher: getOrganizationJsonLd(siteUrl, keywords),
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    inLanguage: "pt-BR",
    articleSection: post.category,
    wordCount: getWordCount(post),
    timeRequired: `PT${getReadingTime(post)}M`,
    keywords,
    about: keywords.map((keyword) => ({
      "@type": "Thing",
      name: keyword,
    })),
    mainEntity: {
      "@type": "Thing",
      name: post.keyword || post.category || title,
    },
    mentions: [
      {
        "@type": "Organization",
        name: "CORPAD Digital",
        url: siteUrl,
      },
    ],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".blog-article h1", ".blog-article > p"],
    },
    isPartOf: {
      "@type": "Blog",
      name: "Blog CORPAD",
      url: `${siteUrl}/blog`,
    },
    mainEntityOfPage: url,
  };
}

function getBreadcrumbJsonLd(post, siteUrl, url) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.meta_title || post.title,
        item: url,
      },
    ],
  };
}

function getFaqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export async function getBlogPostForHead(slug) {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (!slug || !supabaseUrl || !supabaseKey) {
    return listLocalBlogPosts().find((post) => post.slug === slug) || null;
  }

  const now = new Date().toISOString();
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  let data = null;
  let error = null;
  const timeout = withTimeoutSignal();

  try {
    const result = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`)
      .abortSignal(timeout.signal)
      .maybeSingle();

    data = result.data;
    error = result.error;
  } catch (requestError) {
    error = requestError;
  } finally {
    timeout.clear();
  }

  if (error) {
    console.error("Failed to load blog post head", error);
    return null;
  }

  return normalizeBlogPost(data);
}

export async function listBlogPostsForHead() {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (!supabaseUrl || !supabaseKey) {
    return listLocalBlogPosts();
  }

  const now = new Date().toISOString();
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  let data = [];
  let error = null;
  const timeout = withTimeoutSignal();

  try {
    const result = await supabase
      .from("blog_posts")
      .select("slug, title, subtitle, excerpt, category, cover_image, image_alt, content, author_name, published_at, created_at, updated_at, meta_title, meta_description, keyword")
      .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`)
      .order("published_at", { ascending: false })
      .limit(24)
      .abortSignal(timeout.signal);

    data = result.data ?? [];
    error = result.error;
  } catch (requestError) {
    error = requestError;
  } finally {
    timeout.clear();
  }

  if (error) {
    console.error("Failed to load blog posts for SSR index", error);
    return [];
  }

  return (data ?? []).map(normalizeBlogPost).filter(Boolean);
}

function getBlogIndexJsonLd(posts, siteUrl) {
  const url = `${siteUrl}/blog`;
  const faqs = getBlogIndexFaqs();

  return [
    getOrganizationJsonLd(siteUrl, posts.flatMap((post) => [post.category, ...getKeywords(post)])),
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${url}#blog`,
      name: "Blog CORPAD",
      headline: "Blog CORPAD",
      description: "Conteudos sobre tecnologia, marketing digital, automacao, gestao, cloud e crescimento empresarial.",
      url,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#organization` },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.meta_title || post.title,
        description: getDescription(post),
        url: `${siteUrl}/blog/${post.slug}`,
        datePublished: post.published_at || post.created_at,
        dateModified: post.updated_at,
        author: {
          "@type": "Organization",
          name: post.author_name || "CORPAD Digital",
        },
        image: post.cover_image || defaultImage,
        articleSection: post.category,
        keywords: getKeywords(post),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: "Blog CORPAD",
      headline: "Blog CORPAD",
      description: "Conteudos sobre tecnologia, marketing digital, automacao, gestao, cloud e crescimento empresarial.",
      url,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#organization` },
      mainEntity: { "@id": `${url}#blog` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".service-ssr-content > p", "[aria-label='Perguntas frequentes do blog']"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#posts`,
      name: "Artigos publicados no Blog CORPAD",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.meta_title || post.title,
        url: `${siteUrl}/blog/${post.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ];
}

function getBlogIndexFaqs() {
  return [
    [
      "Sobre quais temas o Blog CORPAD publica?",
      "O Blog CORPAD publica conteudos sobre sites, marketing digital, automacao, tecnologia, cloud, gestao empresarial, consultoria e crescimento para empresas.",
    ],
    [
      "Os artigos do blog ajudam em SEO, GEO e AEO?",
      "Sim. Os artigos sao estruturados com titulo, descricao, conteudo rastreavel, dados de artigo, respostas diretas e contexto para mecanismos de busca e ferramentas de IA.",
    ],
    [
      "Como encontrar conteudos novos do blog?",
      "As novas publicacoes aparecem no indice do blog, no sitemap.xml e nas paginas dinamicas de artigo quando estao publicadas ou agendadas para uma data ja atingida.",
    ],
    [
      "Como falar com a CORPAD depois de ler um artigo?",
      "O contato pode ser feito pelo WhatsApp +55 16 99609-4649 ou pelo e-mail contato@corpad.com.br.",
    ],
  ];
}

function renderBlogIndexHtml(posts) {
  const faqs = getBlogIndexFaqs();

  return `
    <main class="blog-page blog-clean-page blog-ssr-page">
      <header class="navbar blog-navbar">
        <a class="brand" href="/" aria-label="Pagina inicial">CORPAD</a>
        <nav class="nav-links" aria-label="Navegacao principal">
          <a href="/corpad-digital#sobre">Sobre</a>
          <a href="/corpad-digital#servicos">Servicos</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/clientes">Clientes</a>
          <a class="active" href="/blog" aria-current="page">Blog</a>
          <a href="/corpad-digital#contato">Contato</a>
        </nav>
      </header>
      <section class="service-ssr-content">
        <p class="section-kicker">Blog CORPAD</p>
        <h1>Conteudos sobre tecnologia, marketing, gestao e crescimento</h1>
        <p>Artigos da CORPAD para empresas que querem melhorar presenca digital, automacao, infraestrutura, atendimento, marketing e gestao com conteudo rastreavel para Google, mecanismos de resposta e inteligencias artificiais.</p>
        <section aria-label="Artigos publicados">
          <h2>Artigos publicados</h2>
          ${
            posts.length > 0
              ? posts
                  .map(
                    (post) => `
                      <article>
                        <h3><a href="/blog/${escapeHtml(post.slug)}">${escapeHtml(post.meta_title || post.title)}</a></h3>
                        <p>${escapeHtml(getDescription(post))}</p>
                        <p>${escapeHtml([post.category, `${getReadingTime(post)} min de leitura`].filter(Boolean).join(" | "))}</p>
                      </article>
                    `,
                  )
                  .join("\n")
              : `<p>Nenhum artigo publicado foi encontrado no momento.</p>`
          }
        </section>
        <section aria-label="Perguntas frequentes do blog">
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
      </section>
    </main>
  `.trim();
}

export function injectBlogIndexPage(html, posts) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog`;
  const title = "Blog CORPAD | Tecnologia, Marketing, Gestao e Crescimento";
  const description = "Conteudos sobre sites, marketing digital, automacao, tecnologia, cloud, gestao empresarial e consultoria para empresas.";
  const jsonLdText = JSON.stringify(getBlogIndexJsonLd(posts, siteUrl)).replace(/</g, "\\u003c");
  const headTags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="keywords" content="blog CORPAD, marketing digital, automacao, consultoria empresarial, tecnologia, cloud, gestao, SEO, GEO, AEO" />`,
    `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(defaultImage)}" />`,
    `<meta property="og:site_name" content="CORPAD" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(defaultImage)}" />`,
    `<script id="corpad-page-jsonld" type="application/ld+json">${jsonLdText}</script>`,
  ].join("\n    ");

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|keywords|robots|geo\.[^"']+|ICBM|og:[^"']+|twitter:[^"']+|article:[^"']+)["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
    .replace(/<div id=["']root["']>[\s\S]*<\/div>\s*(?=<\/body>)/i, `<div id="root">${renderBlogIndexHtml(posts)}</div>\n    `)
    .replace("</head>", `    ${headTags}\n  </head>`);
}

export function injectBlogArticleHead(html, post) {
  if (!post) {
    return html;
  }

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${post.slug}`;
  const title = `${post.meta_title || post.title} | Blog CORPAD`;
  const description = getDescription(post);
  const image = post.cover_image || defaultImage;
  const keywords = getKeywords(post);
  const tags = [post.category, ...keywords].filter(Boolean);
  const faqs = extractFaqsFromPlainContent(post);
  const jsonLd = [
    getOrganizationJsonLd(siteUrl, keywords),
    getArticleJsonLd(post, siteUrl, url, title, description, image, keywords),
    getBreadcrumbJsonLd(post, siteUrl, url),
    ...(faqs.length > 0 ? [getFaqJsonLd(faqs)] : []),
  ];
  const jsonLdText = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  const headTags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    keywords.length > 0 ? `<meta name="keywords" content="${escapeHtml(keywords.join(", "))}" />` : "",
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:site_name" content="CORPAD" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    post.published_at || post.created_at
      ? `<meta property="article:published_time" content="${escapeHtml(post.published_at || post.created_at)}" />`
      : "",
    post.updated_at ? `<meta property="article:modified_time" content="${escapeHtml(post.updated_at)}" />` : "",
    post.author_name ? `<meta property="article:author" content="${escapeHtml(post.author_name)}" />` : "",
    post.category ? `<meta property="article:section" content="${escapeHtml(post.category)}" />` : "",
    ...tags.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}" />`),
    `<meta name="geo.region" content="BR-SP" />`,
    `<meta name="geo.placename" content="Monte Alto, Sao Paulo, Brasil" />`,
    `<meta name="geo.position" content="-21.2616;-48.4969" />`,
    `<meta name="ICBM" content="-21.2616, -48.4969" />`,
    `<script id="corpad-page-jsonld" type="application/ld+json">${jsonLdText}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|keywords|geo\.[^"']+|ICBM|og:[^"']+|twitter:[^"']+|article:[^"']+)["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
    .replace("</head>", `    ${headTags}\n  </head>`);
}

export function renderBlogArticleHtml(post) {
  const description = getDescription(post);
  const publishedDate = formatDate(post.published_at || post.created_at);
  const readingTime = getReadingTime(post);
  const image = post.cover_image || "";
  const author = post.author_name || "Equipe CORPAD";
  const category = post.category || "Blog";

  return `
    <main class="blog-page blog-clean-page blog-ssr-page">
      <header class="navbar blog-navbar">
        <a class="brand" href="/" aria-label="Pagina inicial">CORPAD</a>
        <nav class="nav-links" aria-label="Navegacao principal">
          <a href="/corpad-digital#sobre">Sobre</a>
          <a href="/corpad-digital#servicos">Servicos</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/clientes">Clientes</a>
          <a class="active" href="/blog" aria-current="page">Blog</a>
          <a href="/corpad-digital#contato">Contato</a>
        </nav>
      </header>
      <article class="blog-article">
        <nav class="blog-article-kicker" aria-label="Breadcrumb">
          <a class="blog-back-link" href="/blog">Voltar para o blog</a>
          <span>${escapeHtml(category)}</span>
        </nav>
        <h1>${escapeHtml(post.title)}</h1>
        <p>${escapeHtml(description)}</p>
        <div class="blog-article-meta" aria-label="Informacoes do artigo">
          ${publishedDate ? `<small>${escapeHtml(publishedDate)}</small>` : ""}
          <small>${readingTime} min de leitura</small>
          <small>${escapeHtml(author)}</small>
        </div>
        ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(post.image_alt || post.title)}" class="blog-article-cover" />` : ""}
        <div class="blog-article-content">
          ${renderArticleContent(post)}
        </div>
      </article>
    </main>
  `.trim();
}

export function injectBlogArticlePage(html, post) {
  const htmlWithHead = injectBlogArticleHead(html, post);
  const articleHtml = renderBlogArticleHtml(post);

  return htmlWithHead.replace(/<div id=["']root["']>[\s\S]*<\/div>\s*(?=<\/body>)/i, `<div id="root">${articleHtml}</div>\n    `);
}
