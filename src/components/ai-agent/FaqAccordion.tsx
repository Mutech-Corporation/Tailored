"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import type { FaqItem } from "@/types";

/**
 * `#faqs-sec` on ai-agent.php splits its ten questions across two columns
 * (`col-lg-6`), but every item shares one Bootstrap accordion parent, so
 * expanding one collapses every other item in *both* columns — not just its
 * own column. `.brand-faq .accordion-button:not(.collapsed)` paints the open
 * button with the site's dark radial-gradient hero background.
 */
interface FaqAccordionProps {
  items: FaqItem[];
}

function FaqColumn({
  items,
  openId,
  onToggle,
}: {
  items: FaqItem[];
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-[0.375rem] border border-[#dee2e6]">
      {items.map((faq, index) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className={index > 0 ? "border-t border-[#dee2e6]" : undefined}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`ai-faq-panel-${faq.id}`}
                onClick={() => onToggle(faq.id)}
                className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold transition-colors duration-300 ${
                  isOpen
                    ? "bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] text-white"
                    : "bg-white text-[#1b1b1b]"
                }`}
              >
                <span>{faq.question}</span>
                <ChevronDownIcon
                  className={`size-4 shrink-0 transition-transform duration-300 ease-in-out ${
                    isOpen ? "-rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={`ai-faq-panel-${faq.id}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 py-4 text-base leading-[1.6] text-[#212529]">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-6">
      <FaqColumn items={left} openId={openId} onToggle={toggle} />
      <FaqColumn items={right} openId={openId} onToggle={toggle} />
    </div>
  );
}
