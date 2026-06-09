import { cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distAssets = path.join(root, "dist", "assets");
const publicAssets = path.join(root, "public", "assets");

await rm(publicAssets, { recursive: true, force: true });
await cp(distAssets, publicAssets, { recursive: true });

console.log("Synced dist/assets to public/assets for cPanel static serving.");
