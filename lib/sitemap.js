import { createClient } from "@supabase/supabase-js";
import { listConsultingServiceSlugs } from "./consultingHead.js";
import { listServicePageSlugs } from "./serviceHead.js";

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
    return [];
  }

  const now = new Date().toISOString();
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, updated_at, published_at, created_at")
    .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to load blog posts for sitemap.xml", error);
    return [];
  }

  return data ?? [];
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

  return entries;
}

function renderUrl(entry, siteUrl) {
  return [
    "  <url>",
    `    <loc>${escapeXml(`${siteUrl}${entry.path}`)}</loc>`,
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
