import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");
const indexPath = path.join(distPath, "index.html");
const port = process.env.PORT || 3000;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function sendFile(response, filePath, cacheControl) {
  const extension = path.extname(filePath).toLowerCase();

  response.setHeader("Content-Type", mimeTypes[extension] || "application/octet-stream");
  response.setHeader("Cache-Control", cacheControl);

  fs.createReadStream(filePath)
    .on("error", () => {
      response.writeHead(500);
      response.end("Internal Server Error");
    })
    .pipe(response);
}

function getStaticPath(urlPathname) {
  let decodedPathname = urlPathname;

  try {
    decodedPathname = decodeURIComponent(urlPathname);
  } catch {
    return null;
  }

  const requestedPath = path.normalize(path.join(distPath, decodedPathname));
  const relativePath = path.relative(distPath, requestedPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  return requestedPath;
}

const server = http.createServer((request, response) => {
  const host = request.headers.host || "";
  const requestUrl = new URL(request.url || "/", `http://${host}`);

  if (host.toLowerCase().startsWith("www.corpad.com.br")) {
    response.writeHead(301, {
      Location: `https://corpad.com.br${requestUrl.pathname}${requestUrl.search}`,
    });
    response.end();
    return;
  }

  const staticPath = getStaticPath(requestUrl.pathname);

  if (staticPath && fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
    const cacheControl = requestUrl.pathname.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : "no-cache";

    sendFile(response, staticPath, cacheControl);
    return;
  }

  response.setHeader("Cache-Control", "no-store");
  sendFile(response, indexPath, "no-store");
});

server.listen(port, () => {
  console.log(`CORPAD running on port ${port}`);
});
