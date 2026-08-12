"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import type { FaqItem } from "@/types";

/**
 * #faqs-sec — the target uses a Bootstrap accordion with `data-bs-parent`,
 * which makes it single-open: expanding one collapses the rest. Item 1 is open
 * on load. Bootstrap JS is not available here, so the collapse is reimplemented
 * with a grid-rows transition (animates to auto height without measuring).
 */
const FAQS: FaqItem[] = [
  {
    id: "one",
    question: "How long does a logo design project take?",
    answer: (
      <>
        Most initial logo concepts are delivered within{" "}
        <strong>3&ndash;5 business days</strong>. Revision timelines depend on
        your feedback speed. A complete branding package typically takes{" "}
        <strong>7&ndash;10 business days</strong>.
      </>
    ),
  },
  {
    id: "two",
    question: "Do you provide multiple logo concepts?",
    answer: (
      <>
        Yes. Every project includes{" "}
        <strong>multiple custom-made logo concepts</strong>, giving you several
        creative directions to choose from before we refine your selected style.
      </>
    ),
  },
  {
    id: "three",
    question: "Will I receive all final files after the project?",
    answer: (
      <>
        Absolutely. You&rsquo;ll receive a complete set of final deliverables
        including <strong>AI, PDF, EPS, SVG, PNG, and JPG</strong> &ndash; ready
        for printing, digital use, and all branding needs.
      </>
    ),
  },
  {
    id: "four",
    question: "Do you design websites?",
    answer: (
      <>
        Yes. We create{" "}
        <strong>modern, mobile-responsive, SEO-ready websites</strong> tailored
        to your business&mdash; including landing pages, corporate sites,
        eCommerce layouts, and WordPress development.
      </>
    ),
  },
  {
    id: "five",
    question: "Can you work with my existing brand or improve it?",
    answer: (
      <>
        Yes, we can. Whether you need a <strong>logo refresh</strong>, a complete
        brand upgrade, or a <strong>website redesign</strong>, we enhance your
        existing identity while keeping its core essence intact.
      </>
    ),
  },
];

interface FaqSectionProps {
  /** Defaults to the homepage set; contact.php reuses the same questions with
   *  reworded answers, so it passes its own. */
  items?: FaqItem[];
}

export function FaqSection({ items = FAQS }: FaqSectionProps = {}) {
  const [openId, setOpenId] = useState<string | null>("one");

  return (
    <section id="faqs-sec" className="py-18">
      <div className="dc-container">
        <div className="mb-6 flex justify-center">
          <div className="w-full text-center lg:w-3/4">
            <p className="dc-eyebrow">FAQs</p>
            <h2 className="dc-section-title">
              Frequently Asked <span className="text-[#196bff]">Questions</span>
            </h2>
            <p className="dc-section-subtitle">
              Here are some common questions clients ask before starting their
              design project with us.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full lg:w-2/3">
            <div className="overflow-hidden rounded-[0.375rem] border border-[#dee2e6]">
              {items.map((faq, index) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={
                      index > 0 ? "border-t border-[#dee2e6]" : undefined
                    }
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${faq.id}`}
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                        className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-base transition-colors ${
                          isOpen
                            ? "bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] text-white"
                            : "bg-white text-[#212529]"
                        }`}
                      >
                        <span>{faq.question}</span>
                        <ChevronDownIcon
                          className={`size-5 shrink-0 transition-transform duration-200 ease-in-out ${
                            isOpen ? "-rotate-180" : ""
                          }`}
                        />
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${faq.id}`}
                      className={`grid transition-[grid-template-rows] duration-[350ms] ease-in-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 py-4">{faq.answer}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
