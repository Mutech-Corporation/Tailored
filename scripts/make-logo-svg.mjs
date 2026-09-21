/**
 * Traces the high-resolution brand sheet into real SVG paths (and matching PNGs).
 *
 *   node scripts/make-logo-svg.mjs [--debug]
 *
 * Source: "docs and logos/AI_gen_image.png" (2048×2048). Its transparency is
 * fake — the checkerboard is painted in — so the neutral grey checker is
 * removed first. Each connected shape is then outlined, the outline is
 * simplified into straight segments, and filled with either a flat colour or a
 * multi-stop linear gradient sampled from the original pixels.
 *
 * Output: public/brand/svg/*.svg
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "docs and logos", "AI_gen_image.png");
const OUT = path.join(ROOT, "public", "brand", "svg");
const DEBUG = process.argv.includes("--debug");

/* ---------------------------------------------------------------- masking */

/** Opacity 0–1 for one pixel: neutral light grey is the painted checkerboard. */
function inkAlpha(r, g, b) {
  const min = Math.min(r, g, b);
  const sat = Math.max(r, g, b) - min;
  const colourful = (sat - 16) / 25;
  const dark = (165 - min) / 45;
  return Math.max(0, Math.min(1, Math.max(colourful, dark)));
}

async function loadMasked() {
  const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const rgba = Buffer.alloc(width * height * 4);
  for (let p = 0, s = 0; p < width * height; p++, s += 3) {
    const a = inkAlpha(data[s], data[s + 1], data[s + 2]);
    rgba[p * 4] = data[s];
    rgba[p * 4 + 1] = data[s + 1];
    rgba[p * 4 + 2] = data[s + 2];
    rgba[p * 4 + 3] = Math.round(a * 255);
  }
  return { rgba, width, height };
}

/* ------------------------------------------------------- region detection */

/** Rows of content separated by blank gaps, as {y0,y1,x0,x1}. */
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

/* -------------------------------------------------------------- tracing */

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

/**
 * Smoothly upscales a region before tracing. Working at 3× gives sub-pixel
 * accurate outlines, which matters for the small label text and icon strokes.
 */
async function supersample({ rgba, width, height }, factor) {
  const w = width * factor, h = height * factor;
  const data = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .resize({ width: w, height: h, kernel: "lanczos3" })
    .raw()
    .toBuffer();
  return { rgba: data, width: w, height: h, factor };
}

/**
 * Outline of a binary mask as closed loops, walking the boundary between
 * inside and outside pixels. Inner loops (holes) come out as their own loops
 * and are punched out by fill-rule="evenodd".
 */
function traceLoops(mask, width, height) {
  const inside = (x, y) => x >= 0 && y >= 0 && x < width && y < height && mask[y * width + x];
  const edges = new Map(); // "x,y" -> outgoing end points
  const add = (ax, ay, bx, by) => {
    const key = `${ax},${ay}`;
    const list = edges.get(key);
    if (list) list.push([bx, by]);
    else edges.set(key, [[bx, by]]);
  };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!inside(x, y)) continue;
      if (!inside(x, y - 1)) add(x, y, x + 1, y);
      if (!inside(x + 1, y)) add(x + 1, y, x + 1, y + 1);
      if (!inside(x, y + 1)) add(x + 1, y + 1, x, y + 1);
      if (!inside(x - 1, y)) add(x, y + 1, x, y);
    }
  }
  const loops = [];
  for (const [start, list] of edges) {
    while (list.length) {
      const loop = [start.split(",").map(Number)];
      let [cx, cy] = list.shift();
      while (`${cx},${cy}` !== start) {
        loop.push([cx, cy]);
        const next = edges.get(`${cx},${cy}`);
        if (!next || !next.length) break;
        [cx, cy] = next.shift();
      }
      if (loop.length > 3) loops.push(loop);
    }
  }
  return loops;
}

/** Ramer–Douglas–Peucker: straightens the staircase into few line segments. */
function simplify(points, epsilon) {
  if (points.length < 4) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [i, j] = stack.pop();
    let maxD = 0, maxK = -1;
    const [x1, y1] = points[i], [x2, y2] = points[j];
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    for (let k = i + 1; k < j; k++) {
      const d = Math.abs((points[k][0] - x1) * dy - (points[k][1] - y1) * dx) / len;
      if (d > maxD) { maxD = d; maxK = k; }
    }
    if (maxD > epsilon && maxK > 0) {
      keep[maxK] = 1;
      stack.push([i, maxK], [maxK, j]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

/** Total-least-squares line through points: {px,py,dx,dy} plus RMS deviation. */
function fitLine(points) {
  const n = points.length;
  let cx = 0, cy = 0;
  for (const [x, y] of points) { cx += x / n; cy += y / n; }
  let sxx = 0, sxy = 0, syy = 0;
  for (const [x, y] of points) {
    const dx = x - cx, dy = y - cy;
    sxx += dx * dx; sxy += dx * dy; syy += dy * dy;
  }
  // Principal direction = eigenvector of the largest eigenvalue.
  const t = (sxx + syy) / 2;
  const d = Math.sqrt(Math.max(0, ((sxx - syy) / 2) ** 2 + sxy * sxy));
  const l1 = t + d;
  let dx = sxy, dy = l1 - sxx;
  if (Math.hypot(dx, dy) < 1e-9) { dx = 1; dy = 0; }
  const len = Math.hypot(dx, dy);
  dx /= len; dy /= len;
  let rms = 0;
  for (const [x, y] of points) {
    const perp = (x - cx) * -dy + (y - cy) * dx;
    rms += perp * perp;
  }
  return { px: cx, py: cy, dx, dy, rms: Math.sqrt(rms / n) };
}

const intersectLines = (a, b) => {
  const den = a.dx * b.dy - a.dy * b.dx;
  if (Math.abs(den) < 1e-6) return null; // parallel
  const t = ((b.px - a.px) * b.dy - (b.py - a.py) * b.dx) / den;
  return [a.px + a.dx * t, a.py + a.dy * t];
};

const projectOnto = (line, [x, y]) => {
  const t = (x - line.px) * line.dx + (y - line.py) * line.dy;
  return [line.px + line.dx * t, line.py + line.dy * t];
};

/**
 * Turns a traced pixel staircase into clean geometry: straight runs become
 * exact lines meeting at their intersection (no wobble), while genuinely
 * curved runs keep a fine polyline.
 */
function regularize(loop, { coarse = 3, fine = 0.4, straightRms = 0.8, minStraightRun = 12 } = {}) {
  if (loop.length < 8) return loop;
  const corners = simplify(loop, coarse);
  const indexOf = new Map(loop.map(([x, y], i) => [`${x},${y}`, i]));
  const cuts = corners.map(([x, y]) => indexOf.get(`${x},${y}`)).filter((i) => i !== undefined);
  if (cuts.length < 3) return simplify(loop, fine);

  // Spans between consecutive corners, wrapping around the closed loop.
  const spans = [];
  for (let i = 0; i < cuts.length; i++) {
    const from = cuts[i];
    const to = cuts[(i + 1) % cuts.length];
    const points = [];
    for (let k = from; ; k = (k + 1) % loop.length) {
      points.push(loop[k]);
      if (k === to) break;
      if (points.length > loop.length) break;
    }
    if (points.length < 2) continue;
    const line = fitLine(points);
    // Only long, genuinely flat runs are treated as straight edges; short arcs
    // (letters like S, G, O and the icon curves) stay as fine polylines.
    let maxDev = 0;
    for (const [x, y] of points) {
      maxDev = Math.max(maxDev, Math.abs((x - line.px) * -line.dy + (y - line.py) * line.dx));
    }
    const straight = points.length >= minStraightRun && line.rms <= straightRms && maxDev <= 1.6;
    spans.push({ points, line, straight });
  }
  if (!spans.length || spans.every((s) => !s.straight)) return simplify(loop, fine);

  const out = [];
  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    const next = spans[(i + 1) % spans.length];
    if (span.straight) {
      if (next.straight) {
        const end = span.points[span.points.length - 1];
        const hit = intersectLines(span.line, next.line);
        // Reject a corner that shoots off far away (nearly parallel edges).
        const sane = hit && Math.hypot(hit[0] - end[0], hit[1] - end[1]) <= 12;
        out.push(sane ? hit : projectOnto(span.line, end));
      } else {
        out.push(projectOnto(span.line, span.points[span.points.length - 1]));
      }
    } else {
      // Curved run: keep a fine polyline, snapped onto the neighbouring line.
      const fineRun = simplify(span.points, fine);
      const start = spans[(i - 1 + spans.length) % spans.length].straight
        ? projectOnto(spans[(i - 1 + spans.length) % spans.length].line, fineRun[0])
        : fineRun[0];
      out.push(start, ...fineRun.slice(1, -1));
      if (!next.straight) out.push(fineRun[fineRun.length - 1]);
    }
  }
  return out.filter((p, i, list) => {
    const prev = list[(i - 1 + list.length) % list.length];
    return Math.hypot(p[0] - prev[0], p[1] - prev[1]) > 0.05;
  });
}

function loopArea(loop) {
  let a = 0;
  for (let i = 0, j = loop.length - 1; i < loop.length; j = i++) {
    a += loop[j][0] * loop[i][1] - loop[i][0] * loop[j][1];
  }
  return Math.abs(a) / 2;
}

/** Connected shapes of the opaque mask (4-neighbour flood fill). */
function findShapes({ rgba, width, height }, minArea) {
  const solid = new Uint8Array(width * height);
  for (let p = 0; p < width * height; p++) solid[p] = rgba[p * 4 + 3] > 140 ? 1 : 0;

  const seen = new Uint8Array(width * height);
  const shapes = [];
  const stack = new Int32Array(width * height);
  for (let start = 0; start < width * height; start++) {
    if (!solid[start] || seen[start]) continue;
    let top = 0;
    stack[top++] = start;
    seen[start] = 1;
    const pixels = [];
    while (top > 0) {
      const i = stack[--top];
      const x = i % width;
      const y = (i - x) / width;
      pixels.push({ x, y, c: [rgba[i * 4], rgba[i * 4 + 1], rgba[i * 4 + 2]] });
      if (x + 1 < width && solid[i + 1] && !seen[i + 1]) { seen[i + 1] = 1; stack[top++] = i + 1; }
      if (x > 0 && solid[i - 1] && !seen[i - 1]) { seen[i - 1] = 1; stack[top++] = i - 1; }
      if (y + 1 < height && solid[i + width] && !seen[i + width]) { seen[i + width] = 1; stack[top++] = i + width; }
      if (y > 0 && solid[i - width] && !seen[i - width]) { seen[i - width] = 1; stack[top++] = i - width; }
    }
    if (pixels.length >= minArea) shapes.push(pixels);
  }
  return shapes;
}

const hex = ([r, g, b]) =>
  "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");

/**
 * Paint for one shape: a multi-stop linear gradient sampled along the direction
 * the colour actually ramps, or a flat fill when the shape is near-uniform.
 */
function shapePaint(pixels) {
  const n = pixels.length;
  const mean = [0, 0, 0];
  let mx = 0, my = 0;
  for (const p of pixels) {
    mx += p.x / n; my += p.y / n;
    for (let c = 0; c < 3; c++) mean[c] += p.c[c] / n;
  }
  // Direction of strongest colour change: per-channel least squares on (x, y).
  let sxx = 0, sxy = 0, syy = 0;
  const cov = [[0, 0], [0, 0], [0, 0]];
  for (const p of pixels) {
    const dx = p.x - mx, dy = p.y - my;
    sxx += dx * dx; sxy += dx * dy; syy += dy * dy;
    for (let c = 0; c < 3; c++) {
      cov[c][0] += dx * (p.c[c] - mean[c]);
      cov[c][1] += dy * (p.c[c] - mean[c]);
    }
  }
  const det = sxx * syy - sxy * sxy;
  const flat = { fill: hex(mean) };
  if (!det || n < 600) return flat;

  let gx = 0, gy = 0;
  for (const [cx, cy] of cov) {
    gx += (syy * cx - sxy * cy) / det;
    gy += (sxx * cy - sxy * cx) / det;
  }
  const mag = Math.hypot(gx, gy);
  if (!mag) return flat;
  const ux = gx / mag, uy = gy / mag;

  let tMin = Infinity, tMax = -Infinity;
  for (const p of pixels) {
    const t = (p.x - mx) * ux + (p.y - my) * uy;
    if (t < tMin) tMin = t;
    if (t > tMax) tMax = t;
  }
  if (tMax - tMin < 12) return flat;

  // Median colour per slice keeps outliers (anti-aliased edges) out of the ramp.
  const STOPS = 6;
  const bins = Array.from({ length: STOPS }, () => [[], [], []]);
  for (const p of pixels) {
    const t = ((p.x - mx) * ux + (p.y - my) * uy - tMin) / (tMax - tMin);
    const bin = Math.min(STOPS - 1, Math.floor(t * STOPS));
    for (let c = 0; c < 3; c++) bins[bin][c].push(p.c[c]);
  }
  const median = (list) => {
    if (!list.length) return null;
    const sorted = list.slice().sort((a, b) => a - b);
    return sorted[sorted.length >> 1];
  };
  const stops = [];
  bins.forEach((bin, i) => {
    const colour = [0, 1, 2].map((c) => median(bin[c]));
    if (colour.some((v) => v === null)) return;
    stops.push({ offset: (i + 0.5) / STOPS, colour });
  });
  if (stops.length < 2) return flat;

  const spread = Math.max(
    ...[0, 1, 2].map((c) => Math.max(...stops.map((s) => s.colour[c])) - Math.min(...stops.map((s) => s.colour[c]))),
  );
  if (spread < 14) return flat;

  return {
    gradient: {
      x1: mx + ux * tMin, y1: my + uy * tMin,
      x2: mx + ux * tMax, y2: my + uy * tMax,
      stops: stops.map((s) => ({ offset: +s.offset.toFixed(3), colour: hex(s.colour) })),
    },
  };
}

// Source-pixel area below which a shape is noise. The sheet is clean, so this
// only needs to exclude stray specks — thin letters like "I" must survive.
const MIN_AREA = 10;
const round = (v) => Math.round((v / SCALE) * 10) / 10;
const REGULARIZE = {
  coarse: 3 * 1.2,
  fine: 0.4 * 3,
  straightRms: 0.8 * 3,
  minStraightRun: 12 * 3,
};

const SCALE = 3;

async function buildSvg(source, { title }) {
  const region = await supersample(source, SCALE);
  const { width, height } = region;
  const defs = [];
  const paths = [];

  findShapes(region, MIN_AREA * SCALE * SCALE).forEach((pixels, index) => {
    // The sheet's thin grey dividers survive unevenly in the source; the logo
    // itself has no neutral grey, so drop near-neutral shapes.
    const avg = [0, 1, 2].map((c) => pixels.reduce((sum, p) => sum + p.c[c], 0) / pixels.length);
    if (Math.max(...avg) - Math.min(...avg) < 14 && Math.min(...avg) > 90) return;

    const mask = new Uint8Array(width * height);
    for (const p of pixels) mask[p.y * width + p.x] = 1;

    const loops = traceLoops(mask, width, height)
      .filter((loop) => loopArea(loop) >= MIN_AREA * SCALE * SCALE)
      .map((loop) => regularize(loop, REGULARIZE))
      .filter((loop) => loop.length > 2 && loopArea(loop) >= MIN_AREA * SCALE * SCALE);
    if (!loops.length) return;

    const d = loops
      .map((loop) => "M" + loop.map(([x, y]) => `${round(x)} ${round(y)}`).join("L") + "Z")
      .join("");

    const paint = shapePaint(pixels);
    let fill = paint.fill;
    if (paint.gradient) {
      const id = `g${index}`;
      const { x1, y1, x2, y2, stops } = paint.gradient;
      defs.push(
        `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${round(x1)}" y1="${round(y1)}" x2="${round(x2)}" y2="${round(y2)}">` +
        stops.map((s) => `<stop offset="${s.offset}" stop-color="${s.colour}"/>`).join("") +
        "</linearGradient>",
      );
      fill = `url(#${id})`;
    }
    paths.push(`<path fill="${fill}" fill-rule="evenodd" d="${d}"/>`);
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(width)} ${round(height)}" role="img" aria-label="${title}">` +
    (defs.length ? `<defs>${defs.join("")}</defs>` : "") +
    paths.join("") +
    "</svg>\n";
}

/* ------------------------------------------------------------------ main */

const sheet = await loadMasked();
await mkdir(OUT, { recursive: true });

const bands = rowBands(sheet);
if (DEBUG) console.log(bands.map((b, i) => `${i}: ${JSON.stringify(b)}`).join("\n"));

// Sheet order: mark, TAILORED, WEB DESIGNERS, icon row + labels, tagline.
const [mark, wordmark, sub, icons, tagline] = bands;
const span = (...list) => ({
  x0: Math.min(...list.map((b) => b.x0)),
  x1: Math.max(...list.map((b) => b.x1)),
  y0: Math.min(...list.map((b) => b.y0)),
  y1: Math.max(...list.map((b) => b.y1)),
});

/** Splits a band into columns of content, ignoring the thin grey dividers. */
function columnGroups(region, minWidth) {
  const { rgba, width, height } = region;
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
  // Merge parts of the same icon (e.g. the megaphone's detached sound lines);
  // only the wide gaps between icons survive.
  const merged = [];
  for (const g of groups) {
    const last = merged[merged.length - 1];
    if (last && g.x0 - last.x1 <= 45) last.x1 = g.x1;
    else merged.push({ ...g });
  }
  return merged.filter((g) => g.x1 - g.x0 >= minWidth);
}

/** Dark navy ink → white, for placing a logo on a dark background. */
function toLightVariant(svg) {
  return svg.replace(/#([0-9a-f]{6})/gi, (match, value) => {
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    const max = Math.max(r, g, b);
    // True navy only — dark blue facets of the W must keep their colour.
    if (max < 95 && b < 115) return "#ffffff";
    // Lift the mid-tone blues a little so they hold up on navy.
    const lift = (v) => Math.round(v + (255 - v) * 0.22).toString(16).padStart(2, "0");
    return max < 190 ? `#${lift(r)}${lift(g)}${lift(b)}` : match;
  });
}

const REGIONS = [
  { name: "logo-mark", box: mark, title: "Tailored Web Designers mark" },
  { name: "logo-wordmark", box: span(wordmark, sub), title: "Tailored Web Designers" },
  { name: "logo-stacked", box: span(mark, wordmark, sub), title: "Tailored Web Designers" },
  { name: "logo-full", box: span(mark, wordmark, sub, icons, tagline), title: "Tailored Web Designers — Websites, Logos, Marketing, Animation" },
];

for (const { name, box, title } of REGIONS) {
  const region = crop(sheet, box);
  const svg = await buildSvg(region, { title });
  await writeFile(path.join(OUT, `${name}.svg`), svg);
  await writeFile(path.join(OUT, `${name}-light.svg`), toLightVariant(svg));
  console.log(`${name}: ${region.width}×${region.height}, svg ${(svg.length / 1024).toFixed(0)}KB`);
}

// The four service icons, cut from the icon band (labels stay as page text).
const ICON_NAMES = ["websites", "logos", "marketing", "animation"];
const iconBand = crop(sheet, { ...icons, y1: icons.y0 + Math.round((icons.y1 - icons.y0) * 0.62) });
const iconColumns = columnGroups(iconBand, 30);
if (iconColumns.length !== ICON_NAMES.length) {
  console.warn(`icons: expected ${ICON_NAMES.length} columns, found ${iconColumns.length}`);
}
await mkdir(path.join(OUT, "icons"), { recursive: true });
for (let i = 0; i < Math.min(iconColumns.length, ICON_NAMES.length); i++) {
  const col = iconColumns[i];
  const region = crop(iconBand, { x0: col.x0, x1: col.x1, y0: 0, y1: iconBand.height - 1 });
  const svg = await buildSvg(region, { title: ICON_NAMES[i] });
  await writeFile(path.join(OUT, "icons", `${ICON_NAMES[i]}.svg`), svg);
  await writeFile(path.join(OUT, "icons", `${ICON_NAMES[i]}-light.svg`), toLightVariant(svg));
  console.log(`icon ${ICON_NAMES[i]}: ${region.width}×${region.height}, svg ${(svg.length / 1024).toFixed(0)}KB`);
}
