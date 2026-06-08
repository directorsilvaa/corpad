import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
const distPath = path.join(__dirname, "dist");

app.use(
  "/assets",
  express.static(path.join(distPath, "assets"), {
    maxAge: "1y",
    immutable: true,
  }),
);

app.use(
  express.static(distPath, {
    maxAge: 0,
  }),
);

app.use((_request, response) => {
  response.setHeader("Cache-Control", "no-store");
  response.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`CORPAD running on port ${port}`);
});
