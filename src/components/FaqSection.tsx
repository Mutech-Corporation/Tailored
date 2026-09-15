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
    question: "What services does Tailored Web Designers offer?",
    answer: (
      <>
        We cover four areas: <strong>Creative</strong> (brand identity, logos,
        motion, social design), <strong>Digital</strong> (websites, e-commerce,
        UI/UX, landing pages), <strong>Growth</strong> (SEO, PPC, social media
        marketing, conversion optimization) and <strong>AI</strong> (chatbots,
        customer support, automation and custom tools).
      </>
    ),
  },
  {
    id: "two",
    question: "How much does a project cost?",
    answer: (
      <>
        Every business is different, so we prepare a{" "}
        <strong>tailored quote</strong> based on your goals and scope. Choose a
        package as a starting point or ask us to build a custom one.
      </>
    ),
  },
  {
    id: "three",
    question: "How long does a project take?",
    answer: (
      <>
        Timelines depend on scope. A brand identity usually takes a couple of
        weeks, while a full website or AI solution can take longer. You&rsquo;ll
        get a <strong>clear timeline</strong> with your proposal.
      </>
    ),
  },
  {
    id: "four",
    question: "Can you work with my existing brand or website?",
    answer: (
      <>
        Yes. Whether you need a <strong>brand refresh</strong>, a{" "}
        <strong>website redesign</strong> or AI added to your current tools, we
        build on what you already have.
      </>
    ),
  },
  {
    id: "five",
    question: "Will I own the final files?",
    answer: (
      <>
        Yes. Once the project is complete you receive all{" "}
        <strong>final source files</strong> and full ownership of the work we
        create for you.
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
              Frequently Asked <span className="tw-gradient-text">Questions</span>
            </h2>
            <p className="dc-section-subtitle">
              Common questions clients ask before starting a project with us.
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
                            ? "bg-[radial-gradient(circle_at_top_left,#4338ca_0,#1e1b5e_45%,#0b1033_100%)] text-white"
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
