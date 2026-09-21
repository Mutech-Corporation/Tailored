"use client";

/*
 * Plain <img> is deliberate here: ten of the 66 items are animated GIFs, and
 * next/image would freeze them on the first frame.
 */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { assetPath } from "@/lib/asset-path";
import { PORTFOLIO_FILTERS, PORTFOLIO_ITEMS } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import type { PortfolioCategory, PortfolioItem } from "@/types";

/** Cards per page — three full rows on desktop. */
const PAGE_SIZE = 9;

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
  const [page, setPage] = useState(0);
  /** Which way the next page should slide in from. */
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((item) => item.category === activeFilter),
    [activeFilter, items]
  );

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const visibleItems = filteredItems.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE,
  );

  const goToPage = (next: number) => {
    if (next === currentPage || next < 0 || next >= pageCount) return;
    setDirection(next > currentPage ? "next" : "previous");
    setPage(next);
    // Only scroll when the grid has moved off the top of the screen, so the
    // page never jumps under the visitor while the cards are already in view.
    const top = gridRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const changeFilter = (filter: PortfolioCategory | "all") => {
    setActiveFilter(filter);
    setDirection("next");
    setPage(0);
  };

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
                onClick={() => changeFilter(filter.category)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* overflow-x-clip so the cards slide in from outside without a scrollbar */}
        <div ref={gridRef} className="scroll-mt-28 overflow-x-clip">
          <div
            // Remounting on page/filter change replays the slide-in animation.
            key={`${activeFilter}-${currentPage}`}
            className={cn(
              "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
              "animate-in fade-in duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none",
              direction === "next" ? "slide-in-from-right-12" : "slide-in-from-left-12",
            )}
          >
          {visibleItems.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              aria-label={`View ${item.alt}`}
              // The card lifts (tw-lift); the inner frame clips the image zoom so
              // the lift shadow on ::after isn't clipped with it.
              className="tw-lift group cursor-pointer rounded-[18px] text-left shadow-[0_15px_40px_rgba(15,23,42,0.12)] [--tw-lift-shadow:0_30px_60px_-18px_rgba(76,29,149,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7c3aed]"
              onClick={() => setActiveItem(item)}
            >
              <span className="relative block overflow-hidden rounded-[18px] bg-[#eceaf8]">
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

        {pageCount > 1 && (
          <nav
            aria-label="Portfolio pages"
            className="mt-10 flex items-center justify-center gap-4"
          >
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 0}
              onClick={() => goToPage(currentPage - 1)}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(11,16,51,0.12)] text-[#0b1033] transition-colors duration-300 hover:border-[#2563eb] hover:text-[#2563eb] disabled:pointer-events-none disabled:opacity-30"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <ul className="flex items-center gap-2">
              {Array.from({ length: pageCount }, (_, index) => {
                const active = index === currentPage;
                return (
                  <li key={index}>
                    <button
                      type="button"
                      aria-label={`Page ${index + 1} of ${pageCount}`}
                      aria-current={active ? "true" : undefined}
                      onClick={() => goToPage(index)}
                      className={cn(
                        "h-2.5 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        active
                          ? "w-8 bg-[linear-gradient(90deg,#2563eb,#7c3aed)]"
                          : "w-2.5 bg-[rgba(11,16,51,0.18)] hover:bg-[rgba(37,99,235,0.45)]",
                      )}
                    />
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage === pageCount - 1}
              onClick={() => goToPage(currentPage + 1)}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(11,16,51,0.12)] text-[#0b1033] transition-colors duration-300 hover:border-[#2563eb] hover:text-[#2563eb] disabled:pointer-events-none disabled:opacity-30"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </nav>
        )}

        <p className="mt-4 text-center text-[0.85rem] text-[#6b7280]">
          Showing {currentPage * PAGE_SIZE + 1}&ndash;
          {currentPage * PAGE_SIZE + visibleItems.length} of {filteredItems.length}
        </p>
      </div>

      {activeItem && (
        // Above the fixed header (z-1050) and the back-to-top button.
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#0b1033]/70 p-4 backdrop-blur-sm animate-in fade-in-0 duration-300"
          onClick={() => setActiveItem(null)}
        >
          {/*
            The dialog shrink-wraps the image, so the rounded corners belong to
            the picture itself rather than to a letterboxed black frame.
          */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.alt}
            className="relative max-w-[1140px] overflow-hidden rounded-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] animate-in fade-in-0 zoom-in-95 duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] max-[576px]:rounded-[14px]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={assetPath(activeItem.src)}
              alt={activeItem.alt}
              className="block h-auto max-h-[85vh] w-auto max-w-full object-contain"
            />
            <button
              type="button"
              aria-label="Close"
              className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => setActiveItem(null)}
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
