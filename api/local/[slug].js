import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getLocalPageForHead, injectLocalPage } from "../../lib/localHead.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.join(__dirname, "../../dist/index.html");

export default function handler(request, response) {
  if (request.method && request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    response.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const slug = String(request.query?.slug || "").replace(/^\/+|\/+$/g, "");
    const page = getLocalPageForHead(slug);
    const indexHtml = fs.readFileSync(indexPath, "utf8");
    const html = page ? injectLocalPage(indexHtml, page) : indexHtml;

    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
    response.status(200).send(html);
  } catch (error) {
    console.error("Failed to render local landing page", error);
    response.status(500).send("Internal Server Error");
  }
}
