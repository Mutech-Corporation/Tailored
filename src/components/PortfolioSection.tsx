"use client";

/*
 * Plain <img> is deliberate here: ten of the 66 items are animated GIFs, and
 * next/image would freeze them on the first frame.
 */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { assetPath } from "@/lib/asset-path";
import { PORTFOLIO_FILTERS, PORTFOLIO_ITEMS } from "@/data/portfolio";
import type { PortfolioCategory, PortfolioItem } from "@/types";

interface PortfolioSectionProps {
  /** Defaults to the homepage's 66 items; portfolio.php passes its own 67. */
  items?: PortfolioItem[];
}

export function PortfolioSection({
  items = PORTFOLIO_ITEMS,
}: PortfolioSectionProps = {}) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory | "all">(
    "logo"
  );
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filteredItems = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((item) => item.category === activeFilter),
    [activeFilter, items]
  );

  useEffect(() => {
    if (!activeItem) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  return (
    <section id="portfolio" className="bg-white py-[4.5rem]">
      <div className="dc-container">
        <div className="mb-6 text-center">
          <div className="dc-eyebrow">Our work</div>
          <h2 className="dc-section-title">
            Featured <span className="text-[#2563eb]">Portfolio</span>
          </h2>
          <p className="dc-section-subtitle">
            A curated selection of logos, branding and website projects
            created by our team.
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="dc-pill-bar">
            {PORTFOLIO_FILTERS.map((filter) => (
              <button
                key={filter.category}
                type="button"
                className="dc-pill"
                data-active={activeFilter === filter.category}
                onClick={() => setActiveFilter(filter.category)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              aria-label={`View ${item.alt}`}
              // The card lifts (tw-lift); the inner frame clips the image zoom so
              // the lift shadow on ::after isn't clipped with it.
              className="tw-lift group cursor-pointer rounded-[18px] text-left shadow-[0_15px_40px_rgba(15,23,42,0.12)] [--tw-lift-shadow:0_30px_60px_-18px_rgba(76,29,149,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7c3aed]"
              onClick={() => setActiveItem(item)}
            >
              <span className="relative block overflow-hidden rounded-[18px] bg-black">
                <img
                  src={assetPath(item.src)}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-[280px] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-focus-visible:scale-[1.08] max-[767.98px]:h-full motion-reduce:transition-none"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-end justify-between bg-[linear-gradient(to_top,rgba(11,16,51,0.78),rgba(11,16,51,0.1)_55%,transparent)] p-5 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <span className="translate-y-2 text-[0.8rem] font-semibold tracking-[0.18em] text-white uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
                    View
                  </span>
                  <span className="flex size-10 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-[1140px] bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-0 top-0 m-4 text-white"
              onClick={() => setActiveItem(null)}
            >
              <CloseIcon className="h-6 w-6" />
            </button>
            <img
              src={assetPath(activeItem.src)}
              alt={activeItem.alt}
              className="max-h-[85vh] w-full rounded-[10px] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
