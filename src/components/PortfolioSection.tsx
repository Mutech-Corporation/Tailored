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
            Featured <span className="text-[#196bff]">Portfolio</span>
          </h2>
          <p className="dc-section-subtitle">
            A curated selection of logos, branding and website projects
            created by DesignCentura.
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
              className="group cursor-pointer overflow-hidden rounded-[18px] bg-black shadow-[0_15px_40px_rgba(15,23,42,0.12)]"
              onClick={() => setActiveItem(item)}
            >
              <img
                src={assetPath(item.src)}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-[280px] w-full object-cover transition-[transform,opacity] duration-300 ease-in-out group-hover:scale-[1.06] group-hover:opacity-90 max-[767.98px]:h-full"
              />
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
