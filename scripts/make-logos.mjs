/**
 * Cuts the site's logo files out of two prepared brand sheets.
 *
 *   node scripts/make-logos.mjs [--force]
 *
 * Sources (already transparent — nothing is removed, converted or redrawn here;
 * the sheets are only cropped, trimmed and scaled):
 *
 *   ../docs and logos/1_nobg.png         dark/colour ink → files for light backgrounds
 *   ../docs and logos/1_nobg_white2.png  white ink       → "-light" files for dark backgrounds
 *
 * Output: public/brand/*.png, public/brand/icons/*.png, src/app/icon.png.
 * Existing files are never overwritten without --force.
 */
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SHEETS = path.join(ROOT, "..", "docs and logos");
const OUT = path.join(ROOT, "public", "brand");

const VARIANTS = [
  { suffix: "", sheet: "1_nobg.png" },
  { suffix: "-light", sheet: "1_nobg_white2.png" },
];

const ICON_NAMES = ["websites", "logos", "marketing", "animation"];

/** Output sizes — ample for high-density screens without shipping heavy files. */
const SIZES = {
  "logo-mark": { height: 520 },
  "logo-wordmark": { width: 1100 },
  "logo-stacked": { width: 1000 },
  "logo-full": { width: 1100 },
  horizontal: { height: 220 },
  icon: { height: 180 },
};

/** The sheets' gradients carry fine grain; a 256-colour palette is identical here. */
const PNG = { compressionLevel: 9, palette: true, colours: 256, dither: 0.5 };

async function loadSheet(file) {
  const { data, info } = await sharp(path.join(SHEETS, file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { rgba: data, width: info.width, height: info.height };
}

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
    for (let y = 0; y < height; y++) if (rgba[(y * width + x) * 4 + 3] > 128) count++;
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

const toPng = ({ rgba, width, height }) => sharp(rgba, { raw: { width, height, channels: 4 } }).png(PNG);
const trimmed = (img) => toPng(img).trim({ threshold: 1 });
const save = (img, size, file) =>
  trimmed(img).resize({ ...size, fit: "inside", kernel: "lanczos3" }).png(PNG).toFile(file);

/** Mark + wordmark side by side, in the sheet's own proportions. */
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
  // Compose first, then scale: sharp resizes the canvas before compositing.
  const lockup = await sharp({
    create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: markBuf, left: 0, top: Math.round((height - markMeta.height) / 2) },
      { input: word, left: markMeta.width + gap, top: Math.round((height - wordSized.height) / 2) },
    ])
    .png()
    .toBuffer();
  await sharp(lockup).resize({ ...SIZES.horizontal, fit: "inside", kernel: "lanczos3" }).png(PNG).toFile(file);
}

await mkdir(path.join(OUT, "icons"), { recursive: true });

/**
 * Refuse to clobber logos that are already there — they may have been edited by
 * hand, and regenerating would silently destroy that work.
 */
if (!process.argv.includes("--force")) {
  const existing = [];
  for (const name of ["logo-mark", "logo-wordmark", "logo-stacked", "logo-full", "logo-horizontal"]) {
    for (const { suffix } of VARIANTS) {
      const file = path.join(OUT, `${name}${suffix}.png`);
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
      `Refusing to overwrite ${existing.length} existing logo file(s) in public/brand.\n` +
        "If you really want to regenerate them, re-run with --force:\n" +
        "  node scripts/make-logos.mjs --force",
    );
    process.exit(1);
  }
}

for (const { suffix, sheet } of VARIANTS) {
  const source = await loadSheet(sheet);
  const bands = rowBands(source);
  // Sheet rows: mark, TAILORED, WEB DESIGNERS, icon glyphs, icon labels, tagline.
  if (bands.length !== 6) {
    throw new Error(`${sheet}: expected 6 rows of artwork, found ${bands.length}`);
  }
  const [markBand, wordBand, subBand, glyphBand, labelBand, taglineBand] = bands;

  const regions = {
    "logo-mark": crop(source, markBand),
    "logo-wordmark": crop(source, span(wordBand, subBand)),
    "logo-stacked": crop(source, span(markBand, wordBand, subBand)),
    "logo-full": crop(source, span(markBand, wordBand, subBand, glyphBand, labelBand, taglineBand)),
  };

  for (const [name, region] of Object.entries(regions)) {
    await save(region, SIZES[name], path.join(OUT, `${name}${suffix}.png`));
  }
  await horizontal(regions["logo-mark"], regions["logo-wordmark"], path.join(OUT, `logo-horizontal${suffix}.png`));

  // Service icons: the glyph row only (labels stay as page text).
  const glyphs = crop(source, glyphBand);
  const columns = columnGroups(glyphs);
  if (columns.length !== ICON_NAMES.length) {
    throw new Error(`${sheet}: expected ${ICON_NAMES.length} icons, found ${columns.length}`);
  }
  for (let i = 0; i < ICON_NAMES.length; i++) {
    const icon = crop(glyphs, { x0: columns[i].x0, x1: columns[i].x1, y0: 0, y1: glyphs.height - 1 });
    await save(icon, SIZES.icon, path.join(OUT, "icons", `${ICON_NAMES[i]}${suffix}.png`));
  }

  console.log(`${sheet} → mark, wordmark, stacked, full, horizontal and ${ICON_NAMES.length} icons${suffix ? " (-light)" : ""}`);
}

// App icon (Next.js `app/icon.png`): the white mark on a navy tile.
const tile = await sharp(path.join(OUT, "logo-mark-light.png"))
  .resize({ width: 400, height: 400, fit: "inside" })
  .toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#0b1033" } })
  .composite([{ input: tile, gravity: "centre" }])
  .png(PNG)
  .toFile(path.join(ROOT, "src", "app", "icon.png"));

console.log("Logo files written to", OUT);
