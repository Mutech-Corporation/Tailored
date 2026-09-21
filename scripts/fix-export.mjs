/**
 * Post-build fix for `output: "export"` (runs after `next build`).
 *
 * Next.js 16 writes each page's client-navigation payload as
 * `out/<page>/__next.<page>/__PAGE__.txt`, but the router requests
 * `out/<page>/__next.<page>.__PAGE__.txt`. On a static host such as GitHub
 * Pages that request 404s and every link click falls back to a full page load.
 * Copying each nested payload to the flat name the router asks for fixes it.
 */
import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "out");
let copied = 0;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      // Flatten one level: __next.contact/__PAGE__.txt → __next.contact.__PAGE__.txt
      for (const file of await readdir(full, { withFileTypes: true })) {
        if (file.isFile() && file.name.endsWith(".txt")) {
          await copyFile(path.join(full, file.name), path.join(dir, `${entry.name}.${file.name}`));
          copied++;
        }
      }
    }
    await walk(full);
  }
}

await walk(OUT);
console.log(`fix-export: flattened ${copied} navigation payload file(s)`);
