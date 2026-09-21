/**
 * Cuts the site's logo PNGs straight from the high-resolution brand sheet.
 *
 *   node scripts/make-logos.mjs [--force]
 *
 * Existing files in public/brand are never overwritten without --force.
 *
 * Source: "../docs and logos/1.png" (kept outside the repo) (2048×2048, artwork on plain white). The white
 * is turned into transparency; every artwork pixel keeps its original colour and
 * nothing is ever redrawn — the sheet is only cropped into pieces.
 *
 * Output: public/brand/*.png, public/brand/icons/*.png, src/app/icon.png.
 */
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "..", "docs and logos", "1.png");
const OUT = path.join(ROOT, "public", "brand");

/* ------------------------------------------------------- background removal */

/**
 * Is this pixel clearly artwork (not a blend with the white page)? Dark ink and
 * strongly coloured ink both qualify; pale, washed-out pixels do not — those
 * are anti-aliased edges, handled separately below.
 */
function isCore(r, g, b) {
  const min = Math.min(r, g, b);
  const sat = Math.max(r, g, b) - min;
  return min < 120 || sat > 55;
}

/**
 * The artwork casts a soft grey shadow where the W crosses the T. It is
 * near-neutral and mid-light — not ink, not paper — and is stored as
 * semi-transparent black so it darkens whatever is behind it instead of
 * showing up as a grey blotch on dark backgrounds.
 */
function isShadow(r, g, b) {
  const max = Math.max(r, g, b);
  // No ink in the logo is this washed out: the navy already sits around 67.
  return max - Math.min(r, g, b) <= 30 && max < 252;
}

/**
 * Loads the sheet with the white background turned into transparency.
 *
 * Core pixels keep their exact colour. Edge pixels are a mix of ink and white:
 * each takes the colour of the nearest core pixel, and its opacity is how far
 * it sits along white → that ink colour. This keeps edges smooth without
 * leaving a pale fringe.
 */
async function loadSheet() {
  const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const count = width * height;
  const rgba = Buffer.alloc(count * 4);

  const source = new Int32Array(count).fill(-1);
  let frontier = [];
  for (let p = 0; p < count; p++) {
    if (isCore(data[p * 3], data[p * 3 + 1], data[p * 3 + 2])) {
      source[p] = p;
      frontier.push(p);
      rgba[p * 4] = data[p * 3];
      rgba[p * 4 + 1] = data[p * 3 + 1];
      rgba[p * 4 + 2] = data[p * 3 + 2];
      rgba[p * 4 + 3] = 255;
    }
  }

  // Grow out from the core by a few pixels; that covers the anti-aliased rim.
  const edges = [];
  for (let ring = 0; ring < 3 && frontier.length; ring++) {
    const next = [];
    for (const p of frontier) {
      const x = p % width;
      const y = (p - x) / width;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const n = ny * width + nx;
        if (source[n] !== -1) continue;
        if (isShadow(data[n * 3], data[n * 3 + 1], data[n * 3 + 2])) continue;
        source[n] = source[p];
        edges.push(n);
        next.push(n);
      }
    }
    frontier = next;
  }

  const WHITE = 255;
  for (const p of edges) {
    const ink = source[p];
    let dot = 0, lengthSq = 0;
    for (let c = 0; c < 3; c++) {
      const inkC = data[ink * 3 + c] - WHITE;
      dot += (data[p * 3 + c] - WHITE) * inkC;
      lengthSq += inkC * inkC;
    }
    const coverage = lengthSq > 0 ? Math.max(0, Math.min(1, dot / lengthSq)) : 0;
    if (coverage < 0.03) continue;
    rgba[p * 4] = data[ink * 3];
    rgba[p * 4 + 1] = data[ink * 3 + 1];
    rgba[p * 4 + 2] = data[ink * 3 + 2];
    rgba[p * 4 + 3] = Math.round(coverage * 255);
  }

  // Whatever is left and neutral is shadow: black, as opaque as it is dark.
  for (let p = 0; p < count; p++) {
    if (source[p] !== -1) continue;
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
    if (!isShadow(r, g, b)) continue;
    const coverage = (255 - Math.max(r, g, b)) / 255;
    if (coverage < 0.02) continue;
    rgba[p * 4 + 3] = Math.round(coverage * 255);
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

/**
 * Dark-background version.
 *
 * Navy ink (the T, the wordmark and the labels) becomes solid white, coloured
 * ink (the W, icons and tagline) is kept and lifted slightly, and the artwork's
 * soft grey drop shadow is dropped — a shadow means nothing on a dark ground,
 * and keeping it leaves a grey smear where the W crosses the T.
 */
function toLight({ rgba, width, height }) {
  const out = Buffer.from(rgba);
  for (let o = 0; o < out.length; o += 4) {
    if (out[o + 3] === 0) continue;
    const r = out[o], g = out[o + 1], b = out[o + 2];
    const sat = Math.max(r, g, b) - Math.min(r, g, b);

    // Green separates the two inks: navy stays at or below ~36, while the W's
    // darkest blue facet starts at ~47.
    const navy = Math.max(0, Math.min(1, (46 - g) / 14));
    if (navy > 0.5) {
      out[o] = out[o + 1] = out[o + 2] = 255;
      continue;
    }
    if (sat > 55) {
      for (let c = 0; c < 3; c++) out[o + c] = Math.round(out[o + c] + (255 - out[o + c]) * 0.2);
      continue;
    }
    out[o + 3] = 0; // shadow / washed-out pixel
  }
  return { rgba: out, width, height };
}

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
// Sheet rows: mark, TAILORED, WEB DESIGNERS, icon glyphs, icon labels, tagline.
if (bands.length !== 6) throw new Error(`expected 6 bands on the sheet, found ${bands.length}`);
const [markBand, wordBand, subBand, glyphBand, labelBand, taglineBand] = bands;

await mkdir(path.join(OUT, "icons"), { recursive: true });

/**
 * Refuse to clobber logos that are already there. They may have been edited or
 * replaced by hand, and regenerating would silently destroy that work.
 * Pass --force to overwrite deliberately.
 */
const FORCE = process.argv.includes("--force");
if (!FORCE) {
  const existing = [];
  for (const name of ["logo-mark", "logo-wordmark", "logo-stacked", "logo-full", "logo-horizontal"]) {
    for (const variant of ["", "-light"]) {
      const file = path.join(OUT, `${name}${variant}.png`);
      try {
        await access(file);
        existing.push(path.basename(file));
      } catch {
        /* not there yet — fine */
      }
    }
  }
  if (existing.length) {
    console.error(
      `Refusing to overwrite ${existing.length} existing logo file(s) in public/brand.
` +
        `If you really want to regenerate them, re-run with --force:
` +
        `  node scripts/make-logos.mjs --force`,
    );
    process.exit(1);
  }
}

const regions = {
  "logo-mark": crop(sheet, markBand),
  "logo-wordmark": crop(sheet, span(wordBand, subBand)),
  "logo-stacked": crop(sheet, span(markBand, wordBand, subBand)),
  "logo-full": crop(sheet, span(markBand, wordBand, subBand, glyphBand, labelBand, taglineBand)),
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
const glyphs = crop(sheet, glyphBand);
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
