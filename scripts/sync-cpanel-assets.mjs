import { access, cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distAssets = path.join(root, "dist", "assets");
const rootAssets = path.join(root, "assets");
const publicAssets = path.join(root, "public", "assets");
const cpanelPublicAssets = process.env.HOME
  ? path.join(process.env.HOME, "public_html", "assets")
  : null;

await rm(rootAssets, { recursive: true, force: true });
await rm(publicAssets, { recursive: true, force: true });
await cp(distAssets, rootAssets, { recursive: true });
await cp(distAssets, publicAssets, { recursive: true });

if (cpanelPublicAssets) {
  try {
    await access(path.dirname(cpanelPublicAssets));
    await rm(cpanelPublicAssets, { recursive: true, force: true });
    await cp(distAssets, cpanelPublicAssets, { recursive: true });
    console.log("Synced dist/assets to ~/public_html/assets.");
  } catch {
    console.log("Skipped ~/public_html/assets sync because public_html was not found.");
  }
}

console.log("Synced dist/assets to assets and public/assets for cPanel static serving.");
