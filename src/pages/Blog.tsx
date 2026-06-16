import Image from "../components/ui/vite-image";
import {
  ArrowLeft,
  BarChart3,
  BriefcaseBusiness,
  ChevronDown,
  Clock3,
  Cloud,
  Globe2,
  Megaphone,
  MessageCircle,
  PenLine,
  Search,
  Server,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { servicePages } from "../data/servicePages";
import {
  BlogPost,
  defaultBlogSettings,
  getBlogSettings,
  getBlogPostBySlug,
  listBlogPosts,
  registerBlogLead,
  registerBlogView,
} from "../lib/blogPosts";
import { faqJsonLd, organizationJsonLd, usePageSeo } from "../lib/seo";

const whatsappUrl =
  `https://wa.me/5516996094649?text=${encodeURIComponent("Ola, tudo bem? Acessei o blog da CORPAD e gostaria de conversar sobre uma solucao para minha empresa.")}`;

const allCategorySlug = "todos";

const defaultCategories: Array<{
  title: string;
  description: string;
  slug: string;
  Icon: LucideIcon;
}> = [
  {
    title: "Automacao",
    description: "Fluxos, sistemas e rotinas para ganhar produtividade.",
    slug: "automacao",
    Icon: Server,
  },
  {
    title: "Digital",
    description: "Sites, presenca online, conversao e marca.",
    slug: "digital",
    Icon: Globe2,
  },
  {
    title: "Consultoria",
    description: "Gestao, processos, diagnostico e operacao.",
    slug: "consultoria",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Cloud",
    description: "Infraestrutura, servidores e seguranca.",
    slug: "cloud",
    Icon: Cloud,
  },
  {
    title: "Marketing",
    description: "Trafego, campanhas e crescimento comercial.",
    slug: "marketing",
    Icon: Megaphone,
  },
  {
    title: "Gestao",
    description: "Indicadores, prioridades e decisao.",
    slug: "gestao",
    Icon: BarChart3,
  },
  {
    title: "Tecnologia",
    description: "Automacao, sistemas e ferramentas.",
    slug: "tecnologia",
    Icon: Server,
  },
];

const defaultCategoryBySlug = new Map(defaultCategories.map((category) => [category.slug, category]));

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getCategorySlug(category: string) {
  return normalize(category).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function getReadingTime(content: string) {
  const words = stripHtmlForSummary(content).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function formatPostDate(value: string | null) {
  if (!value) return "Novo artigo";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getArticleDisplayTitle(post: BlogPost) {
  if (post.title.includes("|") && post.subtitle && !isCssLeak(post.subtitle)) {
    return post.subtitle;
  }

  return post.title;
}

function stripHtmlForSummary(value: string) {
  return value
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isCssLeak(value: string) {
  return /\.corpad-article|--teal|--text-|--border|escopado em|\/\*|^\s*\}/i.test(value);
}

function getCleanPostSummary(post: BlogPost) {
  const candidates = [post.subtitle, post.excerpt, stripHtmlForSummary(post.content)];
  const summary = candidates
    .map((candidate) => candidate.replace(/\s+/g, " ").trim())
    .find((candidate) => candidate && !isCssLeak(candidate));

  return summary || "";
}

function getReadableArticleLines(post: BlogPost) {
  if (isHtmlContent(post.content)) {
    const document = new DOMParser().parseFromString(post.content, "text/html");
    return Array.from(document.body.querySelectorAll("h2, h3, p, li"))
      .map((element) => {
        const text = element.textContent?.replace(/\s+/g, " ").trim() ?? "";

        if (!text) return "";
        if (element.tagName === "H2") return `## ${text}`;
        if (element.tagName === "H3") return `### ${text}`;
        if (element.tagName === "LI") return `- ${text}`;
        return text;
      })
      .filter(Boolean);
  }

  const displayTitle = normalize(getArticleDisplayTitle(post));
  const subtitleParts = new Set(
    getArticleDisplayTitle(post)
      .split(/\s{2,}|\n/)
      .map((part) => normalize(part.trim()))
      .filter(Boolean),
  );
  const lines = post.content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !/^[-=]{6,}$/.test(line));
  const output: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;

    const text = paragraph.join(" ").replace(/\s+/g, " ").trim();
    const normalizedText = normalize(text);

    if (text && normalizedText !== displayTitle && !subtitleParts.has(normalizedText)) {
      output.push(text);
    }

    paragraph = [];
  };

  lines.forEach((line) => {
    const normalizedLine = normalize(line);

    if (normalizedLine === displayTitle || subtitleParts.has(normalizedLine)) {
      return;
    }

    if (line.startsWith("## ") || line.startsWith("### ") || line.startsWith("- ") || line.startsWith("> ")) {
      flushParagraph();
      output.push(line);
      return;
    }

    if (/^!\[(.*)\]\((https?:\/\/.+)\)$/.test(line) || /^\[video:(https?:\/\/.+)\]$/.test(line) || /^\[cta\](.+)\[\/cta\]$/.test(line)) {
      flushParagraph();
      output.push(line);
      return;
    }

    paragraph.push(line);
  });

  flushParagraph();
  return output;
}

function extractFaqsFromContent(post: BlogPost) {
  const lines = getReadableArticleLines(post);
  const faqStart = lines.findIndex((line) => normalize(line).includes("perguntas frequentes"));

  if (faqStart === -1) {
    return [];
  }

  const faqs: Array<{ question: string; answer: string }> = [];
  let question = "";
  let answerLines: string[] = [];

  const flush = () => {
    const answer = answerLines.join(" ").replace(/\s+/g, " ").trim();

    if (question && answer) {
      faqs.push({ question, answer });
    }

    question = "";
    answerLines = [];
  };

  for (const line of lines.slice(faqStart + 1)) {
    if (line.startsWith("## ") && !normalize(line).includes("perguntas frequentes")) {
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

function getPostKeywords(post: BlogPost) {
  return post.keyword
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function renderInlineText(value: string) {
  const parts = value.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g);

  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);

    if (!linkMatch) {
      return part;
    }

    return (
      <a href={linkMatch[2]} target="_blank" rel="noreferrer" key={`${linkMatch[2]}-${index}`}>
        {linkMatch[1]}
      </a>
    );
  });
}

function isHtmlContent(value: string) {
  return /<\/?(?:p|h[1-6]|a|ul|ol|li|table|div|section|article|blockquote|img|iframe)\b/i.test(value);
}

function hasEmbeddedArticleHeader(value: string) {
  if (!isHtmlContent(value)) return false;

  const document = new DOMParser().parseFromString(value, "text/html");
  const embeddedArticle = document.querySelector(".corpad-article, .article-body, article");

  return Boolean(embeddedArticle?.querySelector("h1"));
}

function sanitizeHtmlContent(value: string) {
  const template = document.createElement("template");
  template.innerHTML = value;

  template.content.querySelectorAll("script, object, embed").forEach((element) => element.remove());

  template.content.querySelectorAll<HTMLElement>("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const content = attribute.value.trim().toLowerCase();

      if (name.startsWith("on") || content.startsWith("javascript:")) {
        element.removeAttribute(attribute.name);
      }
    });

    if (element.tagName === "A") {
      const anchor = element as HTMLAnchorElement;
      if (anchor.href) {
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
      }
    }
  });

  return template.innerHTML;
}

function renderArticleBlocks(post: BlogPost) {
  const lines = getReadableArticleLines(post);
  const blocks = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (line.startsWith("## ")) {
      blocks.push(<h2 key={`${line}-${index}`}>{line.replace("## ", "")}</h2>);
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={`${line}-${index}`}>{line.replace("### ", "")}</h3>);
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];

      while (lines[index]?.startsWith("- ")) {
        items.push(lines[index].replace("- ", ""));
        index += 1;
      }

      index -= 1;
      blocks.push(
        <ul key={`${line}-${index}`}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.startsWith("> ")) {
      blocks.push(<blockquote key={`${line}-${index}`}>{line.replace("> ", "")}</blockquote>);
      continue;
    }

    const imageMatch = line.match(/^!\[(.*)\]\((https?:\/\/.+)\)$/);
    if (imageMatch) {
      blocks.push(<img key={`${line}-${index}`} src={imageMatch[2]} alt={imageMatch[1]} />);
      continue;
    }

    const videoMatch = line.match(/^\[video:(https?:\/\/.+)\]$/);
    if (videoMatch) {
      blocks.push(
        <iframe
          key={`${line}-${index}`}
          src={videoMatch[1]}
          title="Video incorporado"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
      continue;
    }

    const ctaMatch = line.match(/^\[cta\](.+)\[\/cta\]$/);
    if (ctaMatch) {
      blocks.push(
        <a className="blog-inline-cta" href={post.ctaUrl || whatsappUrl} target="_blank" rel="noreferrer" key={`${line}-${index}`}>
          <strong>{ctaMatch[1]}</strong>
          <span>{post.ctaLabel || "Falar com um consultor"}</span>
        </a>
      );
      continue;
    }

    blocks.push(<p key={`${line}-${index}`}>{renderInlineText(line)}</p>);
  }

  return blocks;
}

function renderArticleContent(post: BlogPost) {
  if (isHtmlContent(post.content)) {
    return (
      <div
        className="blog-article-content blog-article-content-html"
        dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(post.content) }}
      />
    );
  }

  return <div className="blog-article-content">{renderArticleBlocks(post)}</div>;
}

function initializeRichArticleContent(root: HTMLElement) {
  const cleanups: Array<() => void> = [];

  root.querySelectorAll<HTMLButtonElement>(".ca-faq-btn, .faq-btn").forEach((button) => {
    const handleClick = () => {
      const item = button.closest<HTMLElement>(".ca-faq-item, .faq-item");
      const body = item?.querySelector<HTMLElement>(".ca-faq-body, .faq-body");
      if (!item || !body) return;

      const isOpen = item.classList.contains("is-open");
      root.querySelectorAll<HTMLElement>(".ca-faq-item.is-open, .faq-item.is-open").forEach((openItem) => {
        openItem.classList.remove("is-open");
        openItem.querySelector<HTMLButtonElement>(".ca-faq-btn, .faq-btn")?.setAttribute("aria-expanded", "false");
        const openBody = openItem.querySelector<HTMLElement>(".ca-faq-body, .faq-body");
        if (openBody) openBody.style.maxHeight = "0";
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        body.style.maxHeight = `${body.scrollHeight}px`;
      }
    };

    button.addEventListener("click", handleClick);
    cleanups.push(() => button.removeEventListener("click", handleClick));
  });

  const fadeElements = Array.from(root.querySelectorAll<HTMLElement>(".ca-fade, .fade-in"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    fadeElements.forEach((element) => observer.observe(element));
    cleanups.push(() => observer.disconnect());
  } else {
    fadeElements.forEach((element) => element.classList.add("is-visible"));
  }

  return () => cleanups.forEach((cleanup) => cleanup());
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [settings, setSettings] = useState(defaultBlogSettings);
  const slug = useMemo(() => {
    const pathname = window.location.pathname;
    return pathname.startsWith("/blog/") ? pathname.replace("/blog/", "") : "";
  }, []);
  const selectedCategory = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("categoria") || allCategorySlug;
  }, []);
  const seoTitle = activePost ? `${activePost.metaTitle || getArticleDisplayTitle(activePost)} | Blog CORPAD` : `${settings.title} | CORPAD`;
  const seoDescription = activePost
    ? activePost.metaDescription || getCleanPostSummary(activePost)
    : settings.description;
  const seoPath = activePost ? `/blog/${activePost.slug}` : "/blog";
  const activePostFaqs = useMemo(() => (activePost ? extractFaqsFromContent(activePost) : []), [activePost]);
  const activePostKeywords = activePost ? getPostKeywords(activePost) : [];
  const activePostHasEmbeddedHeader = activePost ? hasEmbeddedArticleHeader(activePost.content) : false;
  const pageJsonLd = activePost
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: activePost.metaTitle || getArticleDisplayTitle(activePost),
          description: seoDescription,
          url: `https://corpad.com.br${seoPath}`,
          image: activePost.coverImage || "https://corpad.com.br/logo.png",
          author: {
            "@type": "Organization",
            name: activePost.authorName || "CORPAD Digital",
          },
          publisher: organizationJsonLd(),
          datePublished: activePost.publishedAt ?? activePost.createdAt,
          dateModified: activePost.updatedAt,
          inLanguage: "pt-BR",
          keywords: activePostKeywords,
          about: activePostKeywords.map((keyword) => ({
            "@type": "Thing",
            name: keyword,
          })),
          mentions: [
            {
              "@type": "Organization",
              name: "CORPAD Digital",
              url: "https://corpad.com.br",
            },
          ],
          isPartOf: {
            "@type": "Blog",
            name: "Blog CORPAD",
            url: "https://corpad.com.br/blog",
          },
          mainEntityOfPage: `https://corpad.com.br${seoPath}`,
        },
        ...(activePostFaqs.length > 0 ? [faqJsonLd(activePostFaqs)] : []),
      ]
    : {
        "@context": "https://schema.org",
        "@type": "Blog",
        headline: settings.title,
        description: seoDescription,
        url: "https://corpad.com.br/blog",
        publisher: organizationJsonLd(),
      };

  usePageSeo({
    title: seoTitle,
    description: seoDescription,
    path: seoPath,
    image: activePost?.coverImage || undefined,
    type: activePost ? "article" : "website",
    jsonLd: pageJsonLd,
  });

  useEffect(() => {
    const blogSettings = getBlogSettings();
    setSettings(blogSettings);

    const loadPosts = async () => {
      setLoading(true);

      try {
        if (slug) {
          const post = await getBlogPostBySlug(slug);
          setActivePost(post);
          if (post) {
            registerBlogView(post.slug);
          }
          return;
        }

        const publishedPosts = await listBlogPosts({ publishedOnly: true });
        setPosts(publishedPosts);
      } finally {
        setLoading(false);
      }
    };

    void loadPosts();
  }, [slug]);

  useEffect(() => {
    if (!activePost || !isHtmlContent(activePost.content)) return undefined;

    const root = document.querySelector<HTMLElement>(".blog-article-content-html");
    if (!root) return undefined;

    return initializeRichArticleContent(root);
  }, [activePost]);

  const categoryCounts = useMemo(() => {
    return posts.reduce<Record<string, number>>((counts, post) => {
      const categorySlug = getCategorySlug(post.category);
      counts[categorySlug] = (counts[categorySlug] ?? 0) + 1;
      return counts;
    }, {});
  }, [posts]);

  const categories = useMemo(() => {
    const postCategories = new Map<string, string>();

    posts.forEach((post) => {
      const categorySlug = getCategorySlug(post.category);
      if (!postCategories.has(categorySlug)) {
        postCategories.set(categorySlug, post.category);
      }
    });

    if (postCategories.size === 0) {
      return defaultCategories;
    }

    return Array.from(postCategories.entries())
      .map(([categorySlug, title]) => {
        const defaultCategory = defaultCategoryBySlug.get(categorySlug);

        return {
          title,
          slug: categorySlug,
          description: defaultCategory?.description ?? "Conteudos publicados nesta categoria.",
          Icon: defaultCategory?.Icon ?? PenLine,
        };
      })
      .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = normalize(searchTerm.trim());

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === allCategorySlug || getCategorySlug(post.category) === selectedCategory;
      const matchesSearch =
        !query || normalize(`${post.title} ${post.excerpt} ${post.category}`).includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchTerm, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1, settings.postsPerPage);
  const activeCategoryTitle =
    selectedCategory === allCategorySlug
      ? "Todos os artigos"
      : categories.find((category) => category.slug === selectedCategory)?.title ?? "Artigos";

  if (slug) {
    return (
      <main className="blog-page blog-clean-page">
        <BlogNavbar />

        {loading ? (
          <section className="blog-clean-hero">
            <span>Blog CORPAD</span>
            <h1>Carregando artigo</h1>
          </section>
        ) : activePost ? (
          <article className="blog-article">
            <div className="blog-article-kicker">
              <a className="blog-back-link" href="/blog">
                <ArrowLeft size={15} /> Voltar para o blog
              </a>
              <span>{activePost.category}</span>
            </div>
            {!activePostHasEmbeddedHeader && (
              <>
                <h1>{getArticleDisplayTitle(activePost)}</h1>
                <p>{getCleanPostSummary(activePost)}</p>
                <div className="blog-article-meta" aria-label="Informacoes do artigo">
                  <small>{formatPostDate(activePost.publishedAt)}</small>
                  {settings.showReadingTime && (
                    <small>
                      <Clock3 size={14} /> {getReadingTime(activePost.content)} min de leitura
                    </small>
                  )}
                  {settings.showAuthor && <small>{activePost.authorName}</small>}
                </div>
              </>
            )}
            {activePost.coverImage && (
              <img
                src={activePost.coverImage}
                alt={activePost.imageAlt || ""}
                className="blog-article-cover"
              />
            )}
            {renderArticleContent(activePost)}
            {settings.showAuthor && (
              <aside className="blog-article-author">
                {activePost.authorPhoto ? (
                  <img src={activePost.authorPhoto} alt="" />
                ) : (
                  <span className="blog-author-fallback" aria-hidden="true">
                    {activePost.authorName.slice(0, 1)}
                  </span>
                )}
                <div>
                  <strong>{activePost.authorName}</strong>
                  <span>{activePost.authorRole}</span>
                  <p>{activePost.authorBio}</p>
                </div>
              </aside>
            )}
            <a
              className="blog-article-cta"
              href={activePost.ctaUrl || settings.defaultCtaUrl || whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => registerBlogLead(activePost.slug)}
            >
              <span>{activePost.ctaText || settings.description}</span>
              <strong>{activePost.ctaLabel || settings.defaultCta}</strong>
            </a>
          </article>
        ) : (
          <section className="blog-clean-hero">
            <span>Blog CORPAD</span>
            <h1>Artigo nao encontrado</h1>
            <p>Este conteudo nao existe ou ainda nao foi publicado.</p>
          </section>
        )}
      </main>
    );
  }

  return (
    <main className="blog-page blog-clean-page">
      <BlogNavbar />

      <section
        className="blog-magazine-hero"
        style={
          settings.bannerImage
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(248, 251, 255, 0.96), rgba(248, 251, 255, 0.72)), url(${settings.bannerImage})`,
              }
            : undefined
        }
      >
        <div className="blog-magazine-copy">
          <span>
            <PenLine size={15} /> Blog CORPAD
          </span>
          <h1>{settings.title}</h1>
          <p>{settings.description}</p>
        </div>

        <form className="blog-search-panel" role="search" onSubmit={(event) => event.preventDefault()}>
          <Search size={20} />
          <label htmlFor="blog-search">Buscar artigo</label>
          <input
            id="blog-search"
            type="search"
            value={searchTerm}
            placeholder="Digite um tema, servico ou categoria"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </form>
      </section>

      <nav className="blog-filter-bar" aria-label="Filtros de categoria">
        <a className={selectedCategory === allCategorySlug ? "active" : ""} href="/blog">
          Todos <strong>{posts.length}</strong>
        </a>
        {categories.map(({ title, slug: categorySlug }) => (
          <a
            className={selectedCategory === categorySlug ? "active" : ""}
            href={`/blog?categoria=${categorySlug}`}
            key={categorySlug}
          >
            {title} <strong>{categoryCounts[categorySlug] ?? 0}</strong>
          </a>
        ))}
      </nav>

      {loading ? (
        <section className="blog-clean-empty" aria-label="Status do blog">
          <PenLine size={24} />
          <strong>Carregando artigos</strong>
          <p>Buscando os conteudos publicados.</p>
        </section>
      ) : posts.length > 0 ? (
        <section className="blog-magazine-layout" aria-label="Artigos publicados">
          <div className="blog-feed">
            <div className="blog-feed-heading">
              <span>{activeCategoryTitle}</span>
              <h2>{filteredPosts.length} conteudos encontrados</h2>
            </div>

            {featuredPost ? (
              <>
                <a className="blog-featured-card" href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.coverImage ? (
                    <img src={featuredPost.coverImage} alt="" />
                  ) : (
                    <div className="blog-card-fallback" aria-hidden="true">
                      <PenLine size={34} />
                    </div>
                  )}
                  <div>
                    <span>{featuredPost.category}</span>
                    <h2>{featuredPost.title}</h2>
                    <p>{getCleanPostSummary(featuredPost)}</p>
                    <small>
                      {formatPostDate(featuredPost.publishedAt)}
                      <i />
                      {getReadingTime(featuredPost.content)} min de leitura
                    </small>
                  </div>
                </a>

                <div className="blog-post-grid">
                  {secondaryPosts.map((post) => (
                    <a className="blog-post-card" href={`/blog/${post.slug}`} key={post.id}>
                      {post.coverImage ? (
                        <img src={post.coverImage} alt="" />
                      ) : (
                        <div className="blog-card-fallback" aria-hidden="true">
                          <PenLine size={24} />
                        </div>
                      )}
                      <span>{post.category}</span>
                      <h2>{post.title}</h2>
                      <p>{getCleanPostSummary(post)}</p>
                      <small>
                        {formatPostDate(post.publishedAt)}
                        <i />
                        {getReadingTime(post.content)} min
                      </small>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <section className="blog-clean-empty blog-filter-empty" aria-label="Sem resultados">
                <Search size={24} />
                <strong>Nenhum artigo nesse filtro</strong>
                <p>Tente outra categoria ou busque por um termo mais amplo.</p>
              </section>
            )}
          </div>

          <aside className="blog-sidebar" aria-label="Categorias do blog">
            <section className="blog-sidebar-card">
              <PenLine size={22} />
              <h2>Categorias</h2>
              <p>Filtre por area e encontre conteudos alinhados ao que sua empresa precisa resolver.</p>
            </section>

            <section className="blog-category-list">
              {categories.map(({ title, description, slug: categorySlug, Icon }) => (
                <a
                  className={selectedCategory === categorySlug ? "active" : ""}
                  href={`/blog?categoria=${categorySlug}`}
                  key={title}
                >
                  <Icon size={22} strokeWidth={2.2} />
                  <span>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </span>
                  <em>{categoryCounts[categorySlug] ?? 0}</em>
                </a>
              ))}
            </section>
          </aside>
        </section>
      ) : (
        <section className="blog-clean-empty" aria-label="Status do blog">
          <PenLine size={24} />
          <strong>Nenhum artigo publicado ainda</strong>
          <p>Enquanto isso, a estrutura ja esta separada por categorias.</p>
        </section>
      )}
    </main>
  );
}

function BlogNavbar() {
  return (
    <header className="navbar blog-navbar">
      <a className="brand" href="/" aria-label="Pagina inicial">
        <Image
          className="brand-logo"
          src="/logo.png"
          alt="Logo CORPAD"
          width={1500}
          height={390}
          priority
        />
      </a>

      <nav className="nav-links" aria-label="Navegacao principal">
        <a href="/corpad-digital#sobre">Sobre</a>
        <div className="nav-menu">
          <a className="nav-menu-trigger" href="/corpad-digital#servicos">
            Servicos <ChevronDown size={14} strokeWidth={2.2} />
          </a>
          <div className="nav-submenu" aria-label="Servicos">
            {servicePages.map((item) => (
              <a href={`/servicos/${item.slug}`} key={item.slug}>
                {item.navLabel}
              </a>
            ))}
          </div>
        </div>
        <a href="/portfolio">Portfolio</a>
        <a href="/clientes">Clientes</a>
        <a className="active" href="/blog" aria-current="page">
          Blog
        </a>
        <a href="/corpad-digital#contato">Contato</a>
      </nav>

      <div className="nav-actions">
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          WhatsApp <MessageCircle size={15} />
        </a>
      </div>
    </header>
  );
}
