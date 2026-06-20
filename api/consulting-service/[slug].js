import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getConsultingServiceForHead, injectConsultingServicePage } from "../../lib/consultingHead.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.join(__dirname, "../../dist/index.html");

export default function handler(request, response) {
  try {
    const slug = String(request.query?.slug || "").replace(/^\/+|\/+$/g, "");
    const service = getConsultingServiceForHead(slug);
    const html = service
      ? injectConsultingServicePage(fs.readFileSync(indexPath, "utf8"), slug, service)
      : fs.readFileSync(indexPath, "utf8");

    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
    response.status(200).send(html);
  } catch (error) {
    console.error("Failed to render consulting service page", error);
    response.status(500).send("Internal Server Error");
  }
}
