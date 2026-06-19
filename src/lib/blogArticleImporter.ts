import type { BlogPostInput } from "./blogPosts";
import { slugify } from "./blogPosts";

const defaultWhatsappUrl = "https://wa.me/5516996094649";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function extractBetween(text: string, start: string, end?: string) {
  const normalizedText = normalizeText(text);
  const normalizedStart = normalizeText(start);
  const startIndex = normalizedText.indexOf(normalizedStart);
  if (startIndex === -1) return "";

  const contentStart = startIndex + start.length;
  const endIndex = end ? normalizedText.indexOf(normalizeText(end), contentStart) : -1;
  return text.slice(contentStart, endIndex === -1 ? undefined : endIndex).trim();
}

function extractField(text: string, label: string) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const normalizedLabel = normalizeText(label);
  const startIndex = lines.findIndex((line) => normalizeText(line).startsWith(`${normalizedLabel}:`));

  if (startIndex === -1) return "";

  const firstLine = lines[startIndex].slice(lines[startIndex].indexOf(":") + 1).trim();
  const values = firstLine ? [firstLine] : [];

  for (const line of lines.slice(startIndex + 1)) {
    const trimmed = line.trim();

    if (!trimmed) break;
    if (/^[A-ZÀ-Ú0-9 /()_-]+:\s*/.test(trimmed)) break;
    if (/^=+$/.test(trimmed)) break;

    values.push(trimmed);
  }

  return values.join(" ").replace(/\s+/g, " ").trim();
}

function extractAnyField(text: string, labels: string[]) {
  for (const label of labels) {
    const value = extractField(text, label);

    if (value) {
      return value;
    }
  }

  return "";
}

function cleanHeading(value: string) {
  return value.replace(/^H[1-6]:\s*/i, "").replace(/\s+/g, " ").trim();
}

function normalizeUrlSlug(value: string, title: string) {
  return (value || slugify(title)).replace(/^\/?blog\//, "").replace(/^\//, "");
}

function convertArticleBody(rawArticle: string) {
  const lines = rawArticle.replace(/\r\n/g, "\n").split("\n");
  const output: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      output.push(paragraph.join(" ").replace(/\s+/g, " ").trim());
      paragraph = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const normalizedLine = normalizeText(line);

    if (!line) {
      flushParagraph();
      continue;
    }

    if (/^[-=]+$/.test(line) || normalizedLine === "introducao" || /^bloco\s+\d+/.test(normalizedLine)) {
      continue;
    }

    if (/^H1:\s*/i.test(line)) {
      flushParagraph();
      continue;
    }

    if (/^H2:\s*/i.test(line)) {
      flushParagraph();
      output.push(`## ${cleanHeading(line)}`);
      continue;
    }

    if (/^H3:\s*/i.test(line)) {
      flushParagraph();
      output.push(`### ${cleanHeading(line)}`);
      continue;
    }

    if (/^- /.test(line)) {
      flushParagraph();
      output.push(line);
      continue;
    }

    const bracketUrl = line.match(/^\[(https?:\/\/[^\]]+)\]$/);
    if (bracketUrl) {
      flushParagraph();
      output.push(`[${bracketUrl[1]}](${bracketUrl[1]})`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();

  return output.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

function createExcerpt(articleContent: string, fallback: string) {
  const plainContent = articleContent
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  const firstParagraph = plainContent
    .split("\n")
    .map((line) => line.trim())
    .find(
      (line) =>
        line &&
        !line.startsWith("#") &&
        !line.startsWith("- ") &&
        !line.startsWith("[") &&
        !/\.corpad-article|--teal|--text-|--border|^\s*\/\*/i.test(line),
    );

  return (fallback || firstParagraph || "").slice(0, 260).trim();
}

function extractCtaUrl(text: string) {
  const conclusion = extractBetween(text, "H2: Conclusão", "================================================================");
  const match = conclusion.match(/\[(https?:\/\/[^\]]+)\]/);
  return match?.[1] ?? defaultWhatsappUrl;
}

function isHtmlArticle(text: string) {
  return /<(?:!doctype\s+html|html|head|body|article|main|div|section|style|script|link|h1|h2|p|a)\b/i.test(text);
}

function extractShadowDomTemplate(text: string) {
  const assignmentIndex = text.search(/\broot\.innerHTML\s*=\s*`/);

  if (assignmentIndex === -1) {
    return "";
  }

  const templateStart = text.indexOf("`", assignmentIndex);
  if (templateStart === -1) {
    return "";
  }

  const templateEnd = text.indexOf("`;", templateStart + 1);
  if (templateEnd === -1) {
    return "";
  }

  return text.slice(templateStart + 1, templateEnd).trim();
}

function findMatchingBrace(value: string, openIndex: number) {
  let depth = 0;

  for (let index = openIndex; index < value.length; index += 1) {
    const char = value[index];

    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return -1;
}

function scopeSelector(selector: string, scope: string) {
  return selector
    .split(",")
    .map((part) => {
      const trimmed = part.trim();

      if (!trimmed || trimmed.startsWith(scope)) {
        return trimmed;
      }

      if (trimmed.startsWith(":host")) {
        return `${scope}${trimmed.slice(":host".length)}`;
      }

      return `${scope} ${trimmed}`;
    })
    .join(", ");
}

function scopeCss(css: string, scope: string): string {
  let output = "";
  let index = 0;

  while (index < css.length) {
    const openIndex = css.indexOf("{", index);

    if (openIndex === -1) {
      output += css.slice(index);
      break;
    }

    const selector = css.slice(index, openIndex).trim();
    const closeIndex = findMatchingBrace(css, openIndex);

    if (closeIndex === -1) {
      output += css.slice(index);
      break;
    }

    const body = css.slice(openIndex + 1, closeIndex);

    if (selector.startsWith("@media") || selector.startsWith("@supports")) {
      output += `${selector} {${scopeCss(body, scope)}}`;
    } else if (selector.startsWith("@")) {
      output += `${selector} {${body}}`;
    } else {
      output += `${scopeSelector(selector, scope)} {${body}}`;
    }

    index = closeIndex + 1;
  }

  return output;
}

function buildScopedShadowContent(templateHtml: string) {
  const scope = "corpad-shadow-article";
  const document = new DOMParser().parseFromString(templateHtml, "text/html");
  const assets = Array.from(document.querySelectorAll("link[rel='stylesheet'], link[rel='preconnect']"))
    .map((element) => {
      element.remove();
      return element.outerHTML;
    });
  const styles = Array.from(document.querySelectorAll("style")).map((style) => {
    const scopedStyle = `<style>${scopeCss(style.textContent ?? "", `.${scope}`)}</style>`;
    style.remove();
    return scopedStyle;
  });
  const bodyHtml = document.body.innerHTML.trim();

  return [...assets, ...styles, `<div class="${scope}">${bodyHtml}</div>`].filter(Boolean).join("\n").trim();
}

function extractMetaContent(document: Document, selector: string) {
  return document.querySelector(selector)?.getAttribute("content")?.trim() ?? "";
}

function extractCanonicalSlug(document: Document, fallbackTitle: string) {
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";

  if (!canonical) {
    return slugify(fallbackTitle);
  }

  try {
    return normalizeUrlSlug(new URL(canonical).pathname, fallbackTitle);
  } catch {
    return normalizeUrlSlug(canonical, fallbackTitle);
  }
}

export function normalizeImportedHtmlArticleContent(sourceText: string) {
  const shadowTemplate = extractShadowDomTemplate(sourceText);

  if (shadowTemplate) {
    return buildScopedShadowContent(shadowTemplate);
  }

  const document = new DOMParser().parseFromString(sourceText, "text/html");
  const headAssets = Array.from(document.head.querySelectorAll("style, link[rel='stylesheet'], link[rel='preconnect']"))
    .map((element) => element.outerHTML)
    .join("\n");
  const articleBody = document.querySelector(".article-body");
  const embeddedArticle = document.querySelector(".corpad-article");
  const article = document.querySelector("article");
  const main = document.querySelector("main");
  const source = embeddedArticle ?? articleBody ?? article ?? main ?? document.body;

  source.querySelectorAll("script").forEach((script) => script.remove());
  const sourceHtml = embeddedArticle ? source.outerHTML : source.innerHTML;

  return [headAssets, sourceHtml.trim()].filter(Boolean).join("\n").trim();
}

function extractHtmlContent(document: Document, sourceText = "") {
  return normalizeImportedHtmlArticleContent(sourceText || document.documentElement.outerHTML);
}

function extractFirstLink(document: Document) {
  const link = Array.from(document.querySelectorAll("a[href]"))
    .map((anchor) => anchor.getAttribute("href")?.trim() ?? "")
    .find((href) => href.startsWith("http"));

  return link || defaultWhatsappUrl;
}

function importHtmlArticleModel(text: string, basePost: BlogPostInput): BlogPostInput {
  const document = new DOMParser().parseFromString(text, "text/html");
  const shadowTemplate = extractShadowDomTemplate(text);
  const contentDocument = shadowTemplate
    ? new DOMParser().parseFromString(shadowTemplate, "text/html")
    : document;
  const metaTitle = document.querySelector("title")?.textContent?.trim() || basePost.metaTitle;
  const title = contentDocument.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() || metaTitle || basePost.title;
  const metaDescription =
    extractMetaContent(document, 'meta[name="description"]') ||
    extractMetaContent(document, 'meta[property="og:description"]') ||
    contentDocument.querySelector(".subtitle")?.textContent?.replace(/\s+/g, " ").trim() ||
    basePost.metaDescription;
  const content = extractHtmlContent(document, text);
  const keyword =
    extractMetaContent(document, 'meta[name="keywords"]') ||
    contentDocument.querySelector(".article-tag, .tag")?.textContent?.replace(/\s+/g, " ").trim() ||
    basePost.keyword;

  return {
    ...basePost,
    title,
    subtitle: metaDescription || basePost.subtitle,
    slug: extractCanonicalSlug(document, metaTitle || title),
    excerpt: createExcerpt(content, metaDescription || basePost.excerpt),
    content,
    metaTitle: metaTitle || title,
    metaDescription,
    keyword,
    ctaLabel: "Falar com a CORPAD Digital",
    ctaUrl: extractFirstLink(document),
    ctaText: "Sua empresa precisa de um site profissional com foco em resultado?",
    status: "draft",
  };
}

export function importBlogArticleModel(text: string, basePost: BlogPostInput): BlogPostInput {
  if (isHtmlArticle(text)) {
    return importHtmlArticleModel(text, basePost);
  }

  const metaTitle = extractField(text, "TITLE TAG") || basePost.metaTitle;
  const h1 = cleanHeading(extractField(text, "H1"));
  const title = h1 || metaTitle || basePost.title;
  const metaDescription = extractField(text, "META DESCRIPTION") || basePost.metaDescription;
  const slug = normalizeUrlSlug(extractField(text, "URL SLUG"), metaTitle || title);
  const primaryKeyword = extractField(text, "KEYWORD PRINCIPAL");
  const secondaryKeywords = extractAnyField(text, ["KEYWORDS SECUNDÁRIAS", "KEYWORDS SECUNDARIAS"]);
  const keyword = [primaryKeyword, secondaryKeywords].filter(Boolean).join(", ") || basePost.keyword;
  const articleBlock = extractBetween(text, "BLOCO 3", "BLOCO 4");
  const articleStart = articleBlock.includes("H1:") ? articleBlock.slice(articleBlock.indexOf("H1:")) : articleBlock;
  const content = convertArticleBody(articleStart);
  const excerpt = createExcerpt(content, metaDescription || basePost.excerpt);

  return {
    ...basePost,
    title,
    subtitle: metaDescription || basePost.subtitle,
    slug,
    excerpt,
    content,
    metaTitle: metaTitle || title,
    metaDescription,
    keyword,
    ctaLabel: "Falar com a CORPAD Digital",
    ctaUrl: extractCtaUrl(text),
    ctaText: "Sua empresa precisa de um site profissional com foco em resultado?",
    status: "draft",
  };
}
