import fs from "fs";
import path from "path";
import { getBlogPostForHead, injectBlogArticlePage } from "../../lib/blogHead.js";

function getIndexHtml() {
  const distIndexPath = path.join(process.cwd(), "dist", "index.html");
  const sourceIndexPath = path.join(process.cwd(), "index.html");
  const indexPath = fs.existsSync(distIndexPath) ? distIndexPath : sourceIndexPath;

  return fs.readFileSync(indexPath, "utf8");
}

export default async function handler(request, response) {
  if (request.method && request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    response.status(405).end("Method Not Allowed");
    return;
  }

  const slug = String(request.query?.slug || "").replace(/^\/+|\/+$/g, "");
  const html = getIndexHtml();
  const post = await getBlogPostForHead(slug);

  if (!post) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.status(200).send(html);
    return;
  }

  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  response.status(200).send(injectBlogArticlePage(html, post));
}
