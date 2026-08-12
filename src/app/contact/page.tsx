import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";
import { FaqSection } from "@/components/FaqSection";
import type { FaqItem } from "@/types";

export const metadata: Metadata = {
  title: "Design Centura – Logo, Branding & Web",
  description:
    "Tell us if you need a logo, brand identity, website or a full bundle. We’ll reply with packages, timelines and simple next steps.",
};

/**
 * contact.php asks the same five questions as the homepage but rewords every
 * answer, so it gets its own set rather than reusing the homepage's.
 */
const CONTACT_FAQS: FaqItem[] = [
  {
    id: "one",
    question: "How long does a logo design project take?",
    answer:
      "Most logo concepts are delivered within 3–5 business days, and revisions depend on your feedback speed. A complete brand identity usually takes 7–10 days.",
  },
  {
    id: "two",
    question: "Do you provide multiple logo concepts?",
    answer:
      "Yes. Every package includes multiple unique concepts created from scratch. You choose the one you like, and we refine it until it’s perfect.",
  },
  {
    id: "three",
    question: "Will I receive all final files after the project?",
    answer:
      "Absolutely. You will receive all essential formats — AI, EPS, PDF, PNG, JPG, and SVG — so you can use your design for web, print, and branding.",
  },
  {
    id: "four",
    question: "Do you also design websites?",
    answer:
      "Yes. We provide complete website design services including UI/UX, landing pages, and WordPress development, fully responsive on all devices.",
  },
  {
    id: "five",
    question: "Can you work with my existing brand or improve it?",
    answer:
      "Of course. We can enhance your existing brand, update your colors/typography, or create a fresh modern identity while keeping your core style intact.",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/*
          The target opens straight onto the contact shell here (no hero banner)
          with `pb-0`, then runs the FAQ underneath.
        */}
        <div className="[&>section]:pb-0">
          <ContactSection lead="Tell us if you need a logo, brand identity, website or a full bundle. We’ll reply with packages, timelines and simple next steps." />
        </div>
        <FaqSection items={CONTACT_FAQS} />
      </main>
      <SiteFooter />
    </>
  );
}
