/**
 * Renders the site's logo PNGs from the traced SVGs.
 *
 *   node scripts/make-logo-svg.mjs   # trace docs and logos/AI_gen_image.png → SVG
 *   node scripts/make-logos.mjs      # this file: SVG → PNG used by the site
 *
 * Rendering from the vectors keeps edges crisp at any output size. Each logo
 * comes in a full-colour version for light backgrounds and a `-light` version
 * (navy ink turned white) for dark ones.
 *
 * Output: public/brand/*.png, public/brand/icons/*.png and src/app/icon.png.
 */
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SVG_DIR = path.join(ROOT, "public", "brand", "svg");
const OUT = path.join(ROOT, "public", "brand");

/** Renders an SVG to PNG at a target width or height. */
async function render(svgName, size) {
  const svg = await readFile(path.join(SVG_DIR, `${svgName}.svg`));
  return sharp(svg, { density: 600 })
    .resize({ ...size, fit: "inside" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function write(buffer, ...target) {
  await sharp(buffer).toFile(path.join(OUT, ...target));
}

/** Mark + wordmark side by side — the header/footer lockup. */
async function horizontal(variant, height) {
  const mark = await render(`logo-mark${variant}`, { height });
  const word = await render(`logo-wordmark${variant}`, { height: Math.round(height * 0.72) });
  const markMeta = await sharp(mark).metadata();
  const wordMeta = await sharp(word).metadata();
  const gap = Math.round(height * 0.22);
  const width = markMeta.width + gap + wordMeta.width;
  const canvasHeight = Math.max(markMeta.height, wordMeta.height);
  return sharp({
    create: { width, height: canvasHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: mark, left: 0, top: Math.round((canvasHeight - markMeta.height) / 2) },
      { input: word, left: markMeta.width + gap, top: Math.round((canvasHeight - wordMeta.height) / 2) },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

await mkdir(path.join(OUT, "icons"), { recursive: true });

for (const variant of ["", "-light"]) {
  await write(await render(`logo-mark${variant}`, { height: 600 }), `logo-mark${variant}.png`);
  await write(await render(`logo-stacked${variant}`, { width: 1200 }), `logo-stacked${variant}.png`);
  await write(await render(`logo-full${variant}`, { width: 1400 }), `logo-full${variant}.png`);
  await write(await horizontal(variant, 260), `logo-horizontal${variant}.png`);

  for (const icon of ["websites", "logos", "marketing", "animation"]) {
    const buffer = await render(path.join("icons", `${icon}${variant}`), { height: 220 });
    await write(buffer, "icons", `${icon}${variant}.png`);
  }
}

// App icon (Next.js `app/icon.png` convention): the light mark on a navy tile.
const markTile = await render("logo-mark-light", { width: 400, height: 400 });
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#0b1033" } })
  .composite([{ input: markTile, gravity: "centre" }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, "src", "app", "icon.png"));

console.log("Logo PNGs written to", OUT);
