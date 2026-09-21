/**
 * Removes a flat background colour from an image, with a tolerance you control.
 *
 *   node scripts/remove-bg.mjs <input> [output] [options]
 *
 * Options:
 *   --tolerance <0-100>  How different from the background a pixel may be and
 *                        still count as background (default 8). Raise it if a
 *                        pale halo survives; lower it if the artwork erodes.
 *   --bg <hex|auto>      Background colour (default: auto, read from the corners).
 *   --soft <0-100>       Width of the fade between background and artwork
 *                        (default 12). This is what keeps edges smooth instead
 *                        of jagged. Set 0 for a hard cut.
 *   --shrink <px>        Shave this many pixels off the outer edge (default 0).
 *                        Use 1 when a hairline of the old background survives.
 *   --keep-shadow        Keep soft grey shading as semi-transparent black
 *                        instead of removing it.
 *   --trim               Crop away fully transparent margins.
 *
 * Examples:
 *   node scripts/remove-bg.mjs logo.png
 *   node scripts/remove-bg.mjs logo.png out.png --tolerance 15 --soft 20 --trim
 */
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

const positional = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));
const input = positional[0];
if (!input) {
  console.error("Usage: node scripts/remove-bg.mjs <input> [output] [--tolerance 8] [--bg auto] [--soft 12] [--keep-shadow] [--trim]");
  process.exit(1);
}
const output = positional[1] ?? input.replace(/(\.[a-z]+)?$/i, "-nobg.png");
const tolerance = Number(flag("tolerance", 8));
const soft = Number(flag("soft", 12));
const keepShadow = has("keep-shadow");
const shrink = Number(flag("shrink", 0));

const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const at = (p) => [data[p * 3], data[p * 3 + 1], data[p * 3 + 2]];

// Background colour: given, or the most common colour among the four corners.
let background;
const bgFlag = flag("bg", "auto");
if (bgFlag !== "auto") {
  const hex = bgFlag.replace("#", "");
  background = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
} else {
  const corners = [0, width - 1, (height - 1) * width, height * width - 1].map(at);
  background = [0, 1, 2].map((c) => Math.round(corners.reduce((sum, p) => sum + p[c], 0) / corners.length));
}

// Distance in colour from the background, as a percentage of the largest
// possible distance, so `tolerance` and `soft` read as familiar percentages.
const SCALE = 441.67 / 100; // √(255² × 3) per percent
const distance = (r, g, b) =>
  Math.sqrt((r - background[0]) ** 2 + (g - background[1]) ** 2 + (b - background[2]) ** 2) / SCALE;

const rgba = Buffer.alloc(width * height * 4);
let cleared = 0;
for (let p = 0; p < width * height; p++) {
  const [r, g, b] = at(p);
  const d = distance(r, g, b);
  let alpha;
  if (d <= tolerance) alpha = 0;
  else if (soft > 0 && d < tolerance + soft) alpha = (d - tolerance) / soft;
  else alpha = 1;

  if (alpha === 0) {
    cleared++;
    continue;
  }

  if (!keepShadow) {
    // Un-mix the background out of partly covered pixels so no pale rim is left.
    const unmixed = [0, 1, 2].map((c) =>
      Math.max(0, Math.min(255, Math.round(([r, g, b][c] - (1 - alpha) * background[c]) / alpha))),
    );
    // If what is left is still basically the background colour, it was never
    // artwork — that is the hairline people see as leftover white.
    if (distance(...unmixed) <= tolerance) {
      cleared++;
      continue;
    }
    for (let c = 0; c < 3; c++) rgba[p * 4 + c] = unmixed[c];
  } else {
    rgba[p * 4] = r;
    rgba[p * 4 + 1] = g;
    rgba[p * 4 + 2] = b;
  }
  rgba[p * 4 + 3] = Math.round(alpha * 255);
}

// Optional shave: alpha becomes the minimum over a small neighbourhood, which
// pulls the edge inwards by `shrink` pixels (separable, so it stays fast).
if (shrink > 0) {
  const radius = Math.round(shrink);
  const readAlpha = (x, y) => rgba[(y * width + x) * 4 + 3];
  const pass = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let min = 255;
      for (let d = -radius; d <= radius; d++) {
        const nx = Math.min(width - 1, Math.max(0, x + d));
        min = Math.min(min, readAlpha(nx, y));
      }
      pass[y * width + x] = min;
    }
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let min = 255;
      for (let d = -radius; d <= radius; d++) {
        const ny = Math.min(height - 1, Math.max(0, y + d));
        min = Math.min(min, pass[ny * width + x]);
      }
      rgba[(y * width + x) * 4 + 3] = min;
    }
  }
}

let image = sharp(rgba, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 });
if (has("trim")) image = image.trim({ threshold: 1 });
await image.toFile(output);

const percent = ((cleared / (width * height)) * 100).toFixed(1);
console.log(
  `${path.basename(output)}  background #${background.map((v) => v.toString(16).padStart(2, "0")).join("")}  ` +
    `tolerance ${tolerance}  soft ${soft}${shrink ? `  shrink ${shrink}` : ""}  → ${percent}% of pixels made transparent`,
);
