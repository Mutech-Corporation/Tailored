# Versions

Every step of the rebrand is a git tag, so any version can be viewed or restored.

| Tag | What it contains |
| --- | --- |
| `original-clone-v1` | Original site before the rebrand |
| `v2-phase-1` | Competitor references removed, editable site config |
| `v2-phase-2` | New visual identity (TW logo, navy/blue/violet palette, fonts) |
| `v2-phase-3` | New navigation and `/services` page |
| `v2-phase-4` | New homepage (hero, services, case studies, pricing) |
| `v2-phase-5` | Pricing page with Custom Work add-ons |
| `v2-phase-6` / `v2.0.0` | Inner page clean-up, CI fixes |

## Going back

```bash
# Look at an old version (read-only)
git checkout v2-phase-3

# Return to the latest work
git checkout rebrand-tailored

# Undo a specific commit on the current branch (keeps history)
git revert <commit-hash>
```

## Where to edit things

| What | File |
| --- | --- |
| Company name, phone, emails, address, socials | `src/config/site.json` |
| Starter / Growth / Scale plans and prices | `src/data/plans.ts` (set `price` to show a price instead of "Get a Quote") |
| Add-on (Custom Work) packages and prices | `src/data/pricing-page.ts` |
| Case studies (currently placeholders) | `src/data/case-studies.ts` |
| Services list | `src/data/services.ts` |
| Logo SVGs (extra, traced — not used by the site) | `node scripts/make-logo-svg.mjs` from `docs and logos/AI_gen_image.png` → `public/brand/svg/` |
| Remove a background from any image | `node scripts/remove-bg.mjs <input> [output] --tolerance 8 --soft 12 [--shrink 1] [--trim]` |
| Logo PNGs (used by the site) | `node scripts/make-logos.mjs` crops `docs and logos/1.png` → `public/brand/` and `src/app/icon.png` |

## Checking the site locally before pushing

```bash
# Quick editing preview (hot reload, no /Tailored prefix): http://localhost:3000
npm run dev

# Exactly how GitHub Pages will serve it: http://localhost:4173/Tailored/
npm run preview:pages
```

Stop either one with Ctrl+C in its terminal.

## Source images and the old logo set

The logo scripts read from the `docs and logos/` folder, which is kept out of
git (it holds the original brand sheets). The previous logo PNGs live outside
the repository in `../backup-brand-logos-v1/`.
