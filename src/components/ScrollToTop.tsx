"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Floating "back to top" button, shown once the visitor has scrolled past
 * roughly one screen.
 *
 * It sits one slot above the bottom-right corner so a chat widget can take
 * that corner later without overlapping — see --tw-fab-* in globals.css.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    // Coalesce scroll events to one check per frame.
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "tw-fab fixed z-[1000] flex size-12 items-center justify-center rounded-full text-white max-[576px]:size-11",
        "bg-[linear-gradient(135deg,#2563eb,#7c3aed)] shadow-[0_12px_30px_-6px_rgba(124,58,237,0.55)]",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7c3aed]",
        visible ? "is-visible" : "pointer-events-none",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
