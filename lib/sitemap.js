import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { listConsultingServiceSlugs } from "./consultingHead.js";
import { loadDotEnv } from "./env.js";
import { listLocalPageSlugs } from "./localHead.js";
import { listServicePageSlugs } from "./serviceHead.js";

loadDotEnv();

const defaultSiteUrl = "https://corpad.com.br";

const staticPages = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/corpad-digital", changefreq: "monthly", priority: "0.9" },
  { path: "/corpad-consultoria", changefreq: "monthly", priority: "0.9" },
  { path: "/portfolio", changefreq: "monthly", priority: "0.7" },
  { path: "/clientes", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/termos-de-uso", changefreq: "yearly", priority: "0.4" },
];

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
  return {
    ...post,
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

function listLocalPublishedBlogPosts() {
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
      .sort((a, b) => Date.parse(b.updated_at || b.published_at || b.created_at) - Date.parse(a.updated_at || a.published_at || a.created_at));
  } catch (error) {
    console.error("Failed to load local blog posts for sitemap.xml", error);
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

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toDateOnly(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10) : date.toISOString().slice(0, 10);
}

async function listPublishedBlogPosts() {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  if (!supabaseUrl || !supabaseKey) {
    return listLocalPublishedBlogPosts();
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
      .select("slug, updated_at, published_at, created_at")
      .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`)
      .order("updated_at", { ascending: false })
      .abortSignal(timeout.signal);

    data = result.data ?? [];
    error = result.error;
  } catch (requestError) {
    error = requestError;
  } finally {
    timeout.clear();
  }

  if (error) {
    console.error("Failed to load blog posts for sitemap.xml", error);
    return [];
  }

  return (data ?? []).map(normalizeBlogPost);
}

function buildStaticEntries(lastmod) {
  const entries = staticPages.map((page) => ({ ...page, lastmod }));

  for (const slug of listServicePageSlugs()) {
    entries.push({
      path: `/servicos/${slug}`,
      lastmod,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  for (const slug of listConsultingServiceSlugs()) {
    entries.push({
      path: `/corpad-consultoria/servicos/${slug}`,
      lastmod,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  for (const slug of listLocalPageSlugs()) {
    entries.push({
      path: `/${slug}`,
      lastmod,
      changefreq: "monthly",
      priority: "0.85",
    });
  }

  return entries;
}

function renderUrl(entry, siteUrl) {
  const pathname = entry.path === "/" || entry.path.endsWith("/") ? entry.path : `${entry.path}/`;

  return [
    "  <url>",
    `    <loc>${escapeXml(`${siteUrl}${pathname}`)}</loc>`,
    `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
    `    <changefreq>${escapeXml(entry.changefreq)}</changefreq>`,
    `    <priority>${escapeXml(entry.priority)}</priority>`,
    "  </url>",
  ].join("\n");
}

export async function generateSitemapXml() {
  const siteUrl = getSiteUrl();
  const today = toDateOnly();
  const posts = await listPublishedBlogPosts();
  const latestPostDate = posts[0]?.updated_at || posts[0]?.published_at || posts[0]?.created_at;

  const entries = buildStaticEntries(today).map((entry) =>
    entry.path === "/blog" && latestPostDate ? { ...entry, lastmod: toDateOnly(latestPostDate) } : entry,
  );

  for (const post of posts) {
    if (!post.slug) {
      continue;
    }

    entries.push({
      path: `/blog/${post.slug}`,
      lastmod: toDateOnly(post.updated_at || post.published_at || post.created_at),
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) => renderUrl(entry, siteUrl)),
    "</urlset>",
    "",
  ].join("\n");
}
