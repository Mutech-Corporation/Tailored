/**
 * Builds the site's logo variants from the master brand sheet
 * ("docs and logos/image.png": TW mark, wordmark, icon row and tagline on white).
 *
 *   node scripts/make-logos.mjs
 *
 * Outputs (all transparent PNGs) into public/brand/ plus src/app/icon.png:
 *   logo-mark.png            TW mark, full colour — light backgrounds
 *   logo-mark-light.png      TW mark, navy parts turned white — dark backgrounds
 *   logo-horizontal.png      mark + TAILORED / WEB DESIGNERS — light backgrounds
 *   logo-horizontal-light.png  same, navy parts turned white — dark backgrounds
 *   logo-stacked.png         the full sheet minus the icon row, trimmed
 */
import path from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "docs and logos", "image.png");
const OUT = path.join(ROOT, "public", "brand");

// Pixel bounds measured on the 1254×1254 source sheet.
const REGIONS = {
  mark: { left: 320, top: 258, width: 608, height: 380 },
  wordmark: { left: 186, top: 663, width: 882, height: 168 },
  stacked: { left: 186, top: 258, width: 882, height: 573 },
};

/** Background "ink" below this (0–1) is treated as fully transparent. */
const NOISE_FLOOR = 0.14;
/** Visible islands smaller than this many pixels are specks, not logo. */
const MIN_ISLAND = 60;
/** An island whose strongest pixel is fainter than this is a smudge, not logo. */
const MIN_ISLAND_PEAK = 140;

/**
 * Removes stray specks: clears any connected group of visible pixels that is
 * tiny or never becomes solid. Real logo parts (letters, pixel squares) are
 * both large and opaque, so they survive.
 */
function despeckle(rgba, width, height, minIsland = MIN_ISLAND, minPeak = MIN_ISLAND_PEAK) {
  const seen = new Uint8Array(width * height);
  const stack = new Int32Array(width * height);
  const island = [];
  for (let start = 0; start < width * height; start++) {
    if (seen[start] || rgba[start * 4 + 3] === 0) continue;
    let top = 0;
    let peak = 0;
    island.length = 0;
    stack[top++] = start;
    seen[start] = 1;
    while (top > 0) {
      const i = stack[--top];
      island.push(i);
      peak = Math.max(peak, rgba[i * 4 + 3]);
      const x = i % width;
      const y = (i - x) / width;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const n = ny * width + nx;
          if (!seen[n] && rgba[n * 4 + 3] > 0) {
            seen[n] = 1;
            stack[top++] = n;
          }
        }
      }
    }
    if (island.length < minIsland || peak < minPeak) {
      for (const i of island) rgba.fill(0, i * 4, i * 4 + 4);
    }
  }
  return rgba;
}

/** White background → alpha ("colour to alpha" against white), un-premultiplied. */
function colorToAlpha(data, channels) {
  const out = Buffer.alloc((data.length / channels) * 4);
  for (let i = 0, o = 0; i < data.length; i += channels, o += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(255 - r, 255 - g, 255 - b) / 255;
    // The sheet has light-grey compression noise around every shape; anything
    // this faint is background, and the ramp above it keeps edges anti-aliased.
    const alpha = a < NOISE_FLOOR ? 0 : Math.min(1, (a - NOISE_FLOOR) / (1 - NOISE_FLOOR));
    const unmix = (c) => (alpha === 0 ? 0 : Math.max(0, Math.min(255, 255 - (255 - c) / a)));
    out[o] = unmix(r);
    out[o + 1] = unmix(g);
    out[o + 2] = unmix(b);
    out[o + 3] = Math.round(alpha * 255);
  }
  return out;
}

/**
 * Dark-background variant: the navy ink becomes white and the blue→violet
 * gradient is lifted a little so it keeps contrast on navy.
 */
function navyToWhite(rgba) {
  const out = Buffer.from(rgba);
  for (let o = 0; o < out.length; o += 4) {
    if (out[o + 3] === 0) continue;
    const b = out[o + 2];
    // navy ≈ (11,16,51); brand blue ≈ (37,99,235); violet ≈ (139,61,245).
    // The blue channel separates them far more robustly than chroma on noisy edges.
    // Faint edge pixels have unreliable colour after un-mixing; only recolour
    // pixels solid enough to trust, or corners of blue shapes flash white.
    const trust = Math.max(0, Math.min(1, (out[o + 3] - 90) / 110));
    // Only dark ink qualifies; bright pinks/violets (high red) keep their colour.
    const dark = Math.max(0, Math.min(1, (150 - Math.max(out[o], out[o + 1])) / 50));
    const t = Math.max(0, Math.min(1, (150 - b) / 50)) * trust * dark;
    for (let c = 0; c < 3; c++) {
      const lifted = out[o + c] + (255 - out[o + c]) * 0.28;
      out[o + c] = Math.round(lifted * (1 - t) + 255 * t);
    }
  }
  return out;
}

async function extract(region) {
  const { data, info } = await sharp(SOURCE)
    .extract(region)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = despeckle(colorToAlpha(data, info.channels), info.width, info.height);
  return { rgba, width: info.width, height: info.height };
}

const toPng = ({ rgba, width, height }) =>
  sharp(rgba, { raw: { width, height, channels: 4 } }).png();

async function writeTrimmed(img, file) {
  const buf = await toPng(img).toBuffer();
  await sharp(buf).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(file);
}

async function horizontal(mark, wordmark, file) {
  const markH = 190;
  const markBuf = await toPng(mark).trim({ threshold: 1 }).resize({ height: markH }).toBuffer();
  const wordBuf = await toPng(wordmark).trim({ threshold: 1 }).toBuffer();
  const markMeta = await sharp(markBuf).metadata();
  const wordMeta = await sharp(wordBuf).metadata();
  const gap = 44;
  const width = markMeta.width + gap + wordMeta.width;
  const height = Math.max(markH, wordMeta.height);
  await sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: markBuf, left: 0, top: Math.round((height - markH) / 2) },
      { input: wordBuf, left: markMeta.width + gap, top: Math.round((height - wordMeta.height) / 2) },
    ])
    .png({ compressionLevel: 9 })
    .toFile(file);
}

await mkdir(OUT, { recursive: true });

const mark = await extract(REGIONS.mark);
const wordmark = await extract(REGIONS.wordmark);
const stacked = await extract(REGIONS.stacked);
const light = (img) => ({ ...img, rgba: navyToWhite(img.rgba) });

await writeTrimmed(mark, path.join(OUT, "logo-mark.png"));
await writeTrimmed(light(mark), path.join(OUT, "logo-mark-light.png"));
await writeTrimmed(stacked, path.join(OUT, "logo-stacked.png"));
await writeTrimmed(light(stacked), path.join(OUT, "logo-stacked-light.png"));
await horizontal(mark, wordmark, path.join(OUT, "logo-horizontal.png"));
await horizontal(light(mark), light(wordmark), path.join(OUT, "logo-horizontal-light.png"));

// Service icons (Websites / Logos / Marketing / Animation) from the transparent
// sheet. Labels are rendered as real text on the site, so only the glyphs are cut.
const ICON_SOURCE = path.join(ROOT, "docs and logos", "image-nobg.png");
const ICON_ROW = { top: 878, height: 86 };
const ICONS = {
  websites: [290, 383],
  logos: [472, 566],
  marketing: [674, 756],
  animation: [859, 955],
};
const ICON_OUT = path.join(OUT, "icons");
await mkdir(ICON_OUT, { recursive: true });

/** Lifts colours toward white (for dark backgrounds) while keeping alpha. */
function lighten(rgba, amount) {
  const out = Buffer.from(rgba);
  for (let o = 0; o < out.length; o += 4) {
    for (let c = 0; c < 3; c++) out[o + c] = Math.round(out[o + c] + (255 - out[o + c]) * amount);
  }
  return out;
}

for (const [name, [x0, x1]] of Object.entries(ICONS)) {
  const { data, info } = await sharp(ICON_SOURCE)
    .extract({ left: x0, top: ICON_ROW.top, width: x1 - x0, height: ICON_ROW.height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // The sheet is already transparent; just drop its faint noise and specks.
  for (let o = 3; o < data.length; o += 4) if (data[o] < 36) data[o] = 0;
  // Icons have tiny real details (sound lines, window dots), so only drop
  // islands that are both very small and faint.
  const rgba = despeckle(data, info.width, info.height, 4, 110);
  const img = { rgba, width: info.width, height: info.height };
  await writeTrimmed(img, path.join(ICON_OUT, `${name}.png`));
  await writeTrimmed({ ...img, rgba: lighten(rgba, 0.5) }, path.join(ICON_OUT, `${name}-light.png`));
}

// Full logo: mark, wordmark, icon row with labels and tagline, from the
// transparent sheet. The light variant turns the navy ink white for dark panels.
{
  const { data, info } = await sharp(ICON_SOURCE)
    .extract({ left: 180, top: 252, width: 894, height: 806 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let o = 3; o < data.length; o += 4) {
    if (data[o] < 36) data[o] = 0;
    // The logo has no white; near-white pixels are background the removal tool
    // left behind (e.g. inside the "G" of GROW).
    if (Math.min(data[o - 3], data[o - 2], data[o - 1]) > 200) data[o] = 0;
  }
  // The sheet's thin grey dividers between icons are inconsistent (some faded
  // out), so remove all three. Source x positions, icon row y 878–964.
  for (const dividerX of [426, 612, 813]) {
    for (let y = 878 - 252; y <= 964 - 252; y++) {
      for (let x = dividerX - 180 - 3; x <= dividerX - 180 + 3; x++) data.fill(0, (y * info.width + x) * 4, (y * info.width + x) * 4 + 4);
    }
  }
  const full = { rgba: despeckle(data, info.width, info.height, 4, 110), width: info.width, height: info.height };
  await writeTrimmed(full, path.join(OUT, "logo-full.png"));
  // Small label and tagline text reads faint on navy, so firm up its alpha.
  const fullLight = light(full);
  for (let o = 3; o < fullLight.rgba.length; o += 4) fullLight.rgba[o] = Math.min(255, Math.round(fullLight.rgba[o] * 1.35));
  await writeTrimmed(fullLight, path.join(OUT, "logo-full-light.png"));
}

// App icon: the mark centred on a square navy tile (Next's `app/icon.png` convention).
const markTile = await toPng(light(mark)).trim({ threshold: 1 }).resize({ width: 400, height: 400, fit: "inside" }).toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#0b1033" } })
  .composite([{ input: markTile, gravity: "centre" }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, "src", "app", "icon.png"));

console.log("Logos written to", OUT);
