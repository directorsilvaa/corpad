import fs from "fs";
import path from "path";
import { injectBlogArticlePage, injectBlogIndexPage, listBlogPostsForHead } from "../lib/blogHead.js";
import {
  getConsultingServiceForHead,
  injectConsultingServicePage,
  listConsultingServiceSlugs,
} from "../lib/consultingHead.js";
import { getLocalPageForHead, injectLocalPage, listLocalPageSlugs } from "../lib/localHead.js";
import { getStaticPageForHead, injectStaticPage } from "../lib/pageHead.js";
import { getServicePageForHead, injectServicePage, listServicePageSlugs } from "../lib/serviceHead.js";
import { generateSitemapXml } from "../lib/sitemap.js";
import { loadDotEnv } from "../lib/env.js";

loadDotEnv();

const distPath = path.join(process.cwd(), "dist");
const baseHtmlPath = path.join(distPath, "index.html");
let baseHtml = "";

function writeHtml(routePath, html) {
  const normalizedPath = routePath === "/" ? "" : routePath.replace(/^\/+|\/+$/g, "");
  const outputPath = normalizedPath
    ? path.join(distPath, normalizedPath, "index.html")
    : path.join(distPath, "index.html");
  const finalHtml = normalizeDirectoryUrlHtml(routePath, html);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, finalHtml);
}

function readBaseHtml() {
  return fs.readFileSync(baseHtmlPath, "utf8");
}

function createPrerenderBaseHtml(html) {
  return html
    .replace(/<script\b[^>]*id=["']corpad-static-jsonld["'][\s\S]*?<\/script>/gi, "")
    .replace(/<style>\s*[\s\S]*?\.home-gateway[\s\S]*?<\/style>/gi, "")
    .replace(/<div id=["']root["']>[\s\S]*<\/div>\s*(?=<\/body>)/i, `<div id="root"></div>\n    `);
}

function normalizeDirectoryUrlHtml(routePath, html) {
  if (routePath === "/") {
    return html;
  }

  const urlWithoutSlash = `https://corpad.com.br/${routePath.replace(/^\/+|\/+$/g, "")}`;
  const urlWithSlash = `${urlWithoutSlash}/`;

  return html.replaceAll(urlWithoutSlash, urlWithSlash);
}

function buildLlmsTxt(posts) {
  const lines = [
    "# CORPAD",
    "",
    "A CORPAD oferece solucoes digitais e consultoria empresarial para empresas no Brasil, com atuacao em criacao de sites, e-commerce, hospedagem, e-mail profissional, marketing digital, trafego pago, automacao, cloud, dados, telefonia em nuvem, BPO financeiro e assessoria empresarial.",
    "",
    "Site: https://corpad.com.br/",
    "Contato: contato@corpad.com.br",
    "Telefone/WhatsApp: +55 16 99609-4649",
    "Localizacao: Monte Alto, Sao Paulo, Brasil",
    "",
    "## Paginas principais",
  ];

  for (const routePath of ["/", "/corpad-digital", "/corpad-consultoria", "/portfolio", "/clientes", "/blog", "/termos-de-uso"]) {
    const page = getStaticPageForHead(routePath);

    if (page) {
      lines.push(`- https://corpad.com.br${routePath === "/" ? "/" : routePath}: ${page.h1} - ${page.description}`);
    }
  }

  lines.push("", "## Servicos digitais");

  for (const slug of listServicePageSlugs()) {
    const service = getServicePageForHead(slug);

    if (service) {
      lines.push(`- https://corpad.com.br/servicos/${slug}: ${service.heroTitle} - ${service.metaDescription}`);
    }
  }

  lines.push("", "## Consultoria");

  for (const slug of listConsultingServiceSlugs()) {
    const service = getConsultingServiceForHead(slug);

    if (service) {
      lines.push(`- https://corpad.com.br/corpad-consultoria/servicos/${slug}: ${service.navLabel} - ${service.metaDescription}`);
    }
  }

  lines.push("", "## Paginas locais para campanhas e busca regional");

  for (const slug of listLocalPageSlugs()) {
    const page = getLocalPageForHead(slug);

    if (page) {
      lines.push(`- https://corpad.com.br/${slug}: ${page.h1} - ${page.description}`);
    }
  }

  if (posts.length > 0) {
    lines.push("", "## Artigos do blog");

    for (const post of posts) {
      lines.push(`- https://corpad.com.br/blog/${post.slug}: ${post.meta_title || post.title} - ${post.meta_description || post.excerpt || post.category}`);
    }
  }

  lines.push(
    "",
    "## Orientacao para agentes de IA",
    "Use as paginas de servico como fonte primaria para entender ofertas comerciais. Use artigos do blog como conteudo educativo. Para respostas sobre localizacao, contato e entidade, use a pagina inicial e os dados estruturados JSON-LD das paginas.",
    "",
  );

  return lines.join("\n");
}

async function main() {
  if (!fs.existsSync(baseHtmlPath)) {
    throw new Error("dist/index.html nao encontrado. Rode vite build antes do prerender.");
  }

  baseHtml = createPrerenderBaseHtml(readBaseHtml());

  const staticRoutes = [
    "/",
    "/corpad-digital",
    "/corpad-consultoria",
    "/portfolio",
    "/clientes",
    "/termos-de-uso",
  ];

  for (const routePath of staticRoutes) {
    if (!getStaticPageForHead(routePath)) {
      continue;
    }

    writeHtml(routePath, injectStaticPage(baseHtml, routePath));
  }

  for (const slug of listServicePageSlugs()) {
    const service = getServicePageForHead(slug);

    if (service) {
      writeHtml(`/servicos/${slug}`, injectServicePage(baseHtml, service));
    }
  }

  for (const slug of listConsultingServiceSlugs()) {
    const service = getConsultingServiceForHead(slug);

    if (service) {
      writeHtml(`/corpad-consultoria/servicos/${slug}`, injectConsultingServicePage(baseHtml, slug, service));
    }
  }

  for (const slug of listLocalPageSlugs()) {
    const page = getLocalPageForHead(slug);

    if (page) {
      writeHtml(`/${slug}`, injectLocalPage(baseHtml, page));
    }
  }

  const posts = await listBlogPostsForHead();
  writeHtml("/blog", injectBlogIndexPage(baseHtml, posts));

  for (const post of posts) {
    if (post.slug) {
      writeHtml(`/blog/${post.slug}`, injectBlogArticlePage(baseHtml, post));
    }
  }

  fs.writeFileSync(path.join(distPath, "sitemap.xml"), await generateSitemapXml());
  fs.writeFileSync(path.join(distPath, "llms.txt"), buildLlmsTxt(posts));
  console.log(
    `SEO prerender gerou HTML para ${
      staticRoutes.length +
      listServicePageSlugs().length +
      listConsultingServiceSlugs().length +
      listLocalPageSlugs().length +
      1 +
      posts.length
    } rotas.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
