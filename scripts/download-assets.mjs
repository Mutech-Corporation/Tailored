#!/usr/bin/env node
/**
 * Downloads every binary asset referenced by https://www.designcentura.com/
 * into public/. Run with: node scripts/download-assets.mjs
 */
import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = "https://www.designcentura.com";
const ROOT = join(import.meta.dirname, "..", "public");

/** @type {Array<{ from: string, to: string }>} */
const ASSETS = [
  // Brand marks
  { from: "/img/DesignCentura_final-01.svg", to: "images/logo-01.svg" },
  { from: "/img/DesignCentura_final-02.svg", to: "images/logo-02.svg" },
  { from: "/img/DesignCentura_final-03.svg", to: "images/logo-03.svg" },
  { from: "/img/fav-final.png", to: "seo/favicon.png" },

  // Inline CSS background icons (url(../img/...) in style.css)
  { from: "/img/pencil.svg", to: "images/pencil.svg" },
  { from: "/img/check.svg", to: "images/check.svg" },

  // Portfolio: static logo showcase (masonry). 9 is absent upstream, as on the
  // live site — its markup skips it too.
  ...[1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map(
    (n) => ({ from: `/img/logo/${n}.webp`, to: `images/logo/${n}.webp` }),
  ),

  // Portfolio: animated logo showcase (8 and 11 are absent upstream)
  ...[1, 2, 3, 4, 5, 6, 7, 9, 10, 12].map((n) => ({
    from: `/img/animated_logo/gif${n}.gif`,
    to: `images/animated_logo/gif${n}.gif`,
  })),

  // Portfolio: branding tab
  ...Array.from({ length: 18 }, (_, i) => ({
    from: `/img/branding/${i + 1}.webp`,
    to: `images/branding/${i + 1}.webp`,
  })),

  // Portfolio: web design tab
  ...Array.from({ length: 8 }, (_, i) => ({
    from: `/img/web/${i + 1}.webp`,
    to: `images/web/${i + 1}.webp`,
  })),

  // Fancybox full-size logo sources
  ...Array.from({ length: 9 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { from: `/img/logo/logo-${n}.jpg`, to: `images/logo/logo-${n}.jpg` };
  }),

  // About section illustration
  { from: "/img/about-side-2.webp", to: "images/about-side-2.webp" },

  // Testimonial video posters
  ...Array.from({ length: 4 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      from: `/images/video-thumbnail${n}.webp`,
      to: `images/video-thumbnail${n}.webp`,
    };
  }),

  // Video
  { from: "/img/banner-video.mp4", to: "videos/banner-video.mp4" },
  ...Array.from({ length: 4 }, (_, i) => ({
    from: `/images/videoplayback${i + 1}.mp4`,
    to: `videos/videoplayback${i + 1}.mp4`,
  })),

  // ---- Inner pages (about, pricing, portfolio, contact, reviews, terms,
  // privacy, and the four marketing pages) ----

  // Page banners / hero art
  { from: "/img/lbanner.webp", to: "images/lbanner.webp" },
  { from: "/img/webhomebanner.webp", to: "images/webhomebanner.webp" },
  { from: "/img/wbimage.webp", to: "images/wbimage.webp" },
  { from: "/img/logodesign-side.webp", to: "images/logodesign-side.webp" },
  { from: "/img/banner-video2.mp4", to: "videos/banner-video2.mp4" },

  // Branding showcase strip
  ...Array.from({ length: 7 }, (_, i) => ({
    from: `/img/br${i + 1}.webp`,
    to: `images/br${i + 1}.webp`,
  })),

  // Animated-video page art
  { from: "/img/2dani1.webp", to: "images/2dani1.webp" },
  { from: "/img/3danim1.webp", to: "images/3danim1.webp" },
  { from: "/img/wh1ani.webp", to: "images/wh1ani.webp" },
  { from: "/img/exp1.gif", to: "images/exp1.gif" },

  // Design showcase — desd1 is a webp, desd2..desd10 are gifs
  { from: "/img/desd1.webp", to: "images/desd1.webp" },
  ...Array.from({ length: 9 }, (_, i) => ({
    from: `/img/desd${i + 2}.gif`,
    to: `images/desd${i + 2}.gif`,
  })),

  // Web-design process icons
  ...[
    "webicon_CreativeDirection",
    "webicon_ExplorationRefinement",
    "webicon_FinalFilesBrand",
    "webicons_Sitemap",
    "webicons_testing",
    "webicons_UIDesign",
  ].map((n) => ({ from: `/img/${n}.svg`, to: `images/${n}.svg` })),

  // Portfolio entries referenced only by inner pages.
  // `/img/logo/09.webp` is referenced by portfolio.php but 404s upstream — the
  // target ships that broken <img>. Not downloaded; the page falls back to 9-L.
  { from: "/img/logo/9-L.jpg", to: "images/logo/9-L.jpg" },
  { from: "/img/testi/testi1.jpg", to: "images/testi/testi1.jpg" },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";

async function download({ from, to }) {
  const dest = join(ROOT, to);
  try {
    const existing = await stat(dest);
    if (existing.size > 0) return { to, status: "skipped", bytes: existing.size };
  } catch {
    // not cached yet — fall through and fetch
  }

  const res = await fetch(ORIGIN + from, { headers: { "User-Agent": UA } });
  if (!res.ok) return { to, status: `HTTP ${res.status}`, bytes: 0 };

  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return { to, status: "ok", bytes: buf.length };
}

const results = [];
for (let i = 0; i < ASSETS.length; i += 4) {
  const batch = ASSETS.slice(i, i + 4);
  results.push(...(await Promise.all(batch.map(download))));
}

let failed = 0;
for (const r of results) {
  const ok = r.status === "ok" || r.status === "skipped";
  if (!ok) failed++;
  console.log(
    `${ok ? "✓" : "✗"} ${r.to.padEnd(38)} ${r.status.padEnd(8)} ${(r.bytes / 1024).toFixed(1)} KB`,
  );
}
console.log(`\n${results.length - failed}/${results.length} assets available.`);
if (failed) process.exitCode = 1;
