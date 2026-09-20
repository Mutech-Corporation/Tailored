/**
 * Cuts the site's logo PNGs straight from the high-resolution brand sheet.
 *
 *   node scripts/make-logos.mjs
 *
 * Source: "docs and logos/AI_gen_image.png" (2048×2048). Its transparency is
 * painted on (a grey checkerboard), so the checker is measured and removed:
 * every pixel keeps its original colour, edge pixels get the background mixed
 * back out, and the artwork itself is never redrawn — only cropped.
 *
 * Output: public/brand/*.png, public/brand/icons/*.png, src/app/icon.png.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "docs and logos", "AI_gen_image.png");
const OUT = path.join(ROOT, "public", "brand");

/* ------------------------------------------------------- background removal */

/** Opacity 0–1: the checkerboard is neutral and light, the artwork is not. */
function inkAlpha(r, g, b) {
  const min = Math.min(r, g, b);
  const sat = Math.max(r, g, b) - min;
  const colourful = (sat - 16) / 22;
  const dark = (150 - min) / 40;
  return Math.max(0, Math.min(1, Math.max(colourful, dark)));
}

/** Separable box blur of `value` weighted by `weight` (an inpainting average). */
function weightedBlur(value, weight, width, height, radius) {
  const tmpV = new Float32Array(width * height);
  const tmpW = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    let sumV = 0, sumW = 0;
    for (let x = -radius; x <= radius; x++) {
      const i = y * width + Math.min(width - 1, Math.max(0, x));
      sumV += value[i]; sumW += weight[i];
    }
    for (let x = 0; x < width; x++) {
      tmpV[y * width + x] = sumV;
      tmpW[y * width + x] = sumW;
      const out = y * width + Math.min(width - 1, Math.max(0, x - radius));
      const add = y * width + Math.min(width - 1, Math.max(0, x + radius + 1));
      sumV += value[add] - value[out];
      sumW += weight[add] - weight[out];
    }
  }
  const outV = new Float32Array(width * height);
  const outW = new Float32Array(width * height);
  for (let x = 0; x < width; x++) {
    let sumV = 0, sumW = 0;
    for (let y = -radius; y <= radius; y++) {
      const i = Math.min(height - 1, Math.max(0, y)) * width + x;
      sumV += tmpV[i]; sumW += tmpW[i];
    }
    for (let y = 0; y < height; y++) {
      outV[y * width + x] = sumV;
      outW[y * width + x] = sumW;
      const out = Math.min(height - 1, Math.max(0, y - radius)) * width + x;
      const add = Math.min(height - 1, Math.max(0, y + radius + 1)) * width + x;
      sumV += tmpV[add] - tmpV[out];
      sumW += tmpW[add] - tmpW[out];
    }
  }
  return { value: outV, weight: outW };
}

/**
 * Loads the sheet with the checkerboard turned into transparency. Edge pixels
 * are un-mixed against the local background colour so no grey fringe is left.
 */
async function loadSheet() {
  const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const count = width * height;

  const alpha = new Float32Array(count);
  for (let p = 0; p < count; p++) {
    alpha[p] = inkAlpha(data[p * 3], data[p * 3 + 1], data[p * 3 + 2]);
  }

  // Estimate the background behind every pixel from nearby background-only
  // pixels (the checker alternates ~41px, so a 20px radius always sees both).
  const bgWeight = new Float32Array(count);
  const channels = [new Float32Array(count), new Float32Array(count), new Float32Array(count)];
  for (let p = 0; p < count; p++) {
    const w = 1 - alpha[p];
    bgWeight[p] = w;
    for (let c = 0; c < 3; c++) channels[c][p] = data[p * 3 + c] * w;
  }
  const blurred = channels.map((channel) => weightedBlur(channel, bgWeight, width, height, 20));

  const rgba = Buffer.alloc(count * 4);
  for (let p = 0; p < count; p++) {
    const a = alpha[p];
    rgba[p * 4 + 3] = Math.round(a * 255);
    if (a === 0) continue;
    for (let c = 0; c < 3; c++) {
      const observed = data[p * 3 + c];
      if (a >= 0.995) {
        rgba[p * 4 + c] = observed;
        continue;
      }
      const w = blurred[c].weight[p];
      const bg = w > 1 ? blurred[c].value[p] / w : 224;
      // observed = a*ink + (1-a)*bg  →  ink = (observed - (1-a)*bg) / a
      rgba[p * 4 + c] = Math.max(0, Math.min(255, Math.round((observed - (1 - a) * bg) / a)));
    }
  }
  return { rgba, width, height };
}

/* ------------------------------------------------------------- geometry */

/** Rows of artwork separated by blank gaps. */
function rowBands({ rgba, width, height }, minGap = 12, minRows = 5) {
  const bands = [];
  let run = null;
  for (let y = 0; y < height; y++) {
    let count = 0, x0 = width, x1 = 0;
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > 128) {
        count++;
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
      }
    }
    if (count > 2) {
      if (!run) run = { y0: y, y1: y, x0, x1 };
      else { run.y1 = y; run.x0 = Math.min(run.x0, x0); run.x1 = Math.max(run.x1, x1); }
    } else if (run && y - run.y1 > minGap) {
      bands.push(run);
      run = null;
    }
  }
  if (run) bands.push(run);
  return bands.filter((b) => b.y1 - b.y0 >= minRows);
}

/** Columns of artwork inside a band; `mergeGap` keeps one icon together. */
function columnGroups({ rgba, width, height }, { minWidth = 30, mergeGap = 45 } = {}) {
  const groups = [];
  let run = null;
  for (let x = 0; x < width; x++) {
    let count = 0;
    for (let y = 0; y < height; y++) if (rgba[(y * width + x) * 4 + 3] > 140) count++;
    if (count > 0) {
      if (!run) run = { x0: x, x1: x };
      else run.x1 = x;
    } else if (run) {
      groups.push(run);
      run = null;
    }
  }
  if (run) groups.push(run);
  const merged = [];
  for (const g of groups) {
    const last = merged[merged.length - 1];
    if (last && g.x0 - last.x1 <= mergeGap) last.x1 = g.x1;
    else merged.push({ ...g });
  }
  return merged.filter((g) => g.x1 - g.x0 >= minWidth);
}

function crop({ rgba, width }, box) {
  const w = box.x1 - box.x0 + 1;
  const h = box.y1 - box.y0 + 1;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    const from = ((box.y0 + y) * width + box.x0) * 4;
    rgba.copy(out, y * w * 4, from, from + w * 4);
  }
  return { rgba: out, width: w, height: h };
}

const span = (...boxes) => ({
  x0: Math.min(...boxes.map((b) => b.x0)),
  x1: Math.max(...boxes.map((b) => b.x1)),
  y0: Math.min(...boxes.map((b) => b.y0)),
  y1: Math.max(...boxes.map((b) => b.y1)),
});

/* -------------------------------------------------------------- variants */

/** Dark-background version: navy ink → white, mid blues lifted slightly. */
function toLight({ rgba, width, height }) {
  const out = Buffer.from(rgba);
  for (let o = 0; o < out.length; o += 4) {
    if (out[o + 3] === 0) continue;
    const [r, g, b] = [out[o], out[o + 1], out[o + 2]];
    const max = Math.max(r, g, b);
    // Navy ink (dark, not strongly blue-dominant) becomes flat white so the T
    // reads cleanly on dark; the W's vivid blue/violet facets keep their colour.
    const navy = b - r < 115;
    const t = navy ? Math.max(0, Math.min(1, (165 - max) / 25)) : 0;
    for (let c = 0; c < 3; c++) {
      const lifted = out[o + c] + (255 - out[o + c]) * 0.2;
      out[o + c] = Math.round(lifted * (1 - t) + 255 * t);
    }
  }
  return { rgba: out, width, height };
}

/**
 * The source gradients carry fine grain, which makes plain PNGs several times
 * larger for no visible gain; a 256-colour palette is visually identical here.
 */
const PNG = { compressionLevel: 9, palette: true, colours: 256, dither: 0.5 };

const toPng = ({ rgba, width, height }) =>
  sharp(rgba, { raw: { width, height, channels: 4 } }).png(PNG);

const trimmed = (img) => toPng(img).trim({ threshold: 1 });

/**
 * Output sizes. The sheet is 2048px, far larger than anything on the page, so
 * each file is scaled down (lanczos) — still 3–6x the displayed size for
 * high-density screens, without shipping needlessly heavy images.
 */
const SIZES = {
  "logo-mark": { height: 520 },
  "logo-wordmark": { width: 1100 },
  "logo-stacked": { width: 1000 },
  "logo-full": { width: 1100 },
  horizontal: { height: 220 },
  icon: { height: 180 },
};

const save = (img, size, file) =>
  trimmed(img).resize({ ...size, fit: "inside", kernel: "lanczos3" }).png(PNG).toFile(file);

/** Mark + wordmark lockup, matching the sheet's own proportions. */
async function horizontal(mark, wordmark, file) {
  const markBuf = await trimmed(mark).toBuffer();
  const wordBuf = await trimmed(wordmark).toBuffer();
  const markMeta = await sharp(markBuf).metadata();
  const wordMeta = await sharp(wordBuf).metadata();
  const scale = (markMeta.height * 0.78) / wordMeta.height;
  const word = await sharp(wordBuf)
    .resize({ width: Math.round(wordMeta.width * scale), height: Math.round(wordMeta.height * scale) })
    .toBuffer();
  const wordSized = await sharp(word).metadata();
  const gap = Math.round(markMeta.height * 0.2);
  const width = markMeta.width + gap + wordSized.width;
  const height = Math.max(markMeta.height, wordSized.height);
  // Compose first, then scale (sharp resizes the canvas before compositing).
  const lockup = await sharp({
    create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: markBuf, left: 0, top: Math.round((height - markMeta.height) / 2) },
      { input: word, left: markMeta.width + gap, top: Math.round((height - wordSized.height) / 2) },
    ])
    .png()
    .toBuffer();
  await sharp(lockup)
    .resize({ ...SIZES.horizontal, fit: "inside", kernel: "lanczos3" })
    .png(PNG)
    .toFile(file);
}

/* ------------------------------------------------------------------ main */

const sheet = await loadSheet();
const bands = rowBands(sheet);
const [markBand, wordBand, subBand, iconBand, taglineBand] = bands;
if (bands.length < 5) throw new Error(`expected 5 bands on the sheet, found ${bands.length}`);

await mkdir(path.join(OUT, "icons"), { recursive: true });

const regions = {
  "logo-mark": crop(sheet, markBand),
  "logo-wordmark": crop(sheet, span(wordBand, subBand)),
  "logo-stacked": crop(sheet, span(markBand, wordBand, subBand)),
  "logo-full": crop(sheet, span(markBand, wordBand, subBand, iconBand, taglineBand)),
};

for (const [name, region] of Object.entries(regions)) {
  await save(region, SIZES[name], path.join(OUT, `${name}.png`));
  await save(toLight(region), SIZES[name], path.join(OUT, `${name}-light.png`));
}

await horizontal(regions["logo-mark"], regions["logo-wordmark"], path.join(OUT, "logo-horizontal.png"));
await horizontal(
  toLight(regions["logo-mark"]),
  toLight(regions["logo-wordmark"]),
  path.join(OUT, "logo-horizontal-light.png"),
);

// Service icons: the glyph row only (labels stay as page text).
const ICON_NAMES = ["websites", "logos", "marketing", "animation"];
const glyphs = crop(sheet, { ...iconBand, y1: iconBand.y0 + Math.round((iconBand.y1 - iconBand.y0) * 0.62) });
const columns = columnGroups(glyphs);
if (columns.length !== ICON_NAMES.length) {
  throw new Error(`expected ${ICON_NAMES.length} icons, found ${columns.length}`);
}
for (let i = 0; i < ICON_NAMES.length; i++) {
  const icon = crop(glyphs, { x0: columns[i].x0, x1: columns[i].x1, y0: 0, y1: glyphs.height - 1 });
  await save(icon, SIZES.icon, path.join(OUT, "icons", `${ICON_NAMES[i]}.png`));
  await save(toLight(icon), SIZES.icon, path.join(OUT, "icons", `${ICON_NAMES[i]}-light.png`));
}

// App icon (Next.js `app/icon.png`): the light mark on a navy tile.
const tile = await trimmed(toLight(regions["logo-mark"]))
  .resize({ width: 400, height: 400, fit: "inside" })
  .toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#0b1033" } })
  .composite([{ input: tile, gravity: "centre" }])
  .png(PNG)
  .toFile(path.join(ROOT, "src", "app", "icon.png"));

console.log("Logo PNGs written to", OUT);
