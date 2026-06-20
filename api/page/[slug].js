import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { injectStaticPage } from "../../lib/pageHead.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.join(__dirname, "../../dist/index.html");

const pathBySlug = {
  home: "/",
  "corpad-digital": "/corpad-digital",
  "corpad-consultoria": "/corpad-consultoria",
  portfolio: "/portfolio",
  clientes: "/clientes",
  blog: "/blog",
};

export default function handler(request, response) {
  try {
    const slug = String(request.query?.slug || "home").replace(/^\/+|\/+$/g, "");
    const pathname = pathBySlug[slug] || `/${slug}`;
    const html = injectStaticPage(fs.readFileSync(indexPath, "utf8"), pathname);

    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
    response.status(200).send(html);
  } catch (error) {
    console.error("Failed to render static page", error);
    response.status(500).send("Internal Server Error");
  }
}
