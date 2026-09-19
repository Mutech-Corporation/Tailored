"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Section-level blocks: headings, intro rows, grids, CTAs. */
const BLOCK_SELECTOR = "main section .dc-container > *";
/** Wrappers whose children should reveal one by one instead of as a whole. */
const GROUP_CLASSES = ["grid", "space-y-8", "space-y-16"];
const STAGGER_MS = 80;
const MAX_STAGGER_STEPS = 5;

function collectTargets(): HTMLElement[] {
  const targets: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>(BLOCK_SELECTOR).forEach((block) => {
    const isGroup =
      GROUP_CLASSES.some((name) => block.classList.contains(name)) &&
      block.children.length > 1;
    if (isGroup) {
      Array.from(block.children).forEach((child, index) => {
        if (child instanceof HTMLElement) {
          child.style.setProperty(
            "--tw-reveal-delay",
            `${Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS}ms`,
          );
          targets.push(child);
        }
      });
    } else {
      targets.push(block);
    }
  });
  return targets;
}

/**
 * Fades sections and cards up as they scroll into view.
 *
 * Only elements that start below the fold are hidden, and only after
 * hydration, so nothing the visitor can already see ever flashes, and the
 * page stays fully visible without JavaScript. Animates opacity/transform only
 * and stops observing each element once it has been revealed.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const fold = window.innerHeight;
    for (const el of collectTargets()) {
      if (el.classList.contains("tw-reveal")) continue;
      if (el.getBoundingClientRect().top < fold) continue; // already on screen
      el.classList.add("tw-reveal");
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
