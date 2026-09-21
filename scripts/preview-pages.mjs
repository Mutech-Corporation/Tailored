/**
 * Local preview that behaves like GitHub Pages.
 *
 *   npm run preview:pages
 *
 * Builds the static export with the /Tailored base path (same as the deploy
 * workflow), then serves out/ at http://localhost:4173/Tailored/.
 * Pass --no-build to serve the existing out/ folder without rebuilding.
 */
import { spawnSync } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const BASE = "/Tailored";
const PORT = Number(process.env.PORT) || 4173;

if (!process.argv.includes("--no-build")) {
  console.log(`Building with base path ${BASE}...`);
  const result = spawnSync("npm", ["run", "build"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
    env: { ...process.env, NEXT_PUBLIC_BASE_PATH: BASE },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};

function resolveFile(urlPath) {
  const pathname = decodeURIComponent(urlPath.split("?")[0]);
  if (pathname !== BASE && !pathname.startsWith(`${BASE}/`)) return null;
  let file = path.join(OUT, pathname.slice(BASE.length) || "/");
  if (!file.startsWith(OUT)) return null;
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  return existsSync(file) ? file : null;
}

http
  .createServer((req, res) => {
    if (req.url === "/" || req.url === "") {
      res.writeHead(302, { location: `${BASE}/` });
      return res.end();
    }
    const file = resolveFile(req.url);
    if (!file) {
      const notFound = path.join(OUT, "404.html");
      res.writeHead(404, { "content-type": TYPES[".html"] });
      return existsSync(notFound) ? createReadStream(notFound).pipe(res) : res.end("404");
    }
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`\nGitHub Pages preview: http://localhost:${PORT}${BASE}/`);
    console.log("Press Ctrl+C to stop.");
  });
