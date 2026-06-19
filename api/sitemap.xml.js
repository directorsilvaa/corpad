import { generateSitemapXml } from "../lib/sitemap.js";

export default async function handler(request, response) {
  if (request.method && request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    response.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const xml = await generateSitemapXml();

    response.setHeader("Content-Type", "application/xml; charset=utf-8");
    response.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    response.status(200).send(xml);
  } catch (error) {
    console.error("Failed to generate sitemap.xml", error);
    response.status(500).send("Internal Server Error");
  }
}
