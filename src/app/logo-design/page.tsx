import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PortfolioSection } from "@/components/PortfolioSection";
import { PricingTabs } from "@/components/PricingTabs";
import { HowItWorks, type HowStep } from "@/components/HowItWorks";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { PORTFOLIO_ITEMS_FULL } from "@/data/portfolio";
import { LOGO_FAQS, LOGO_PRICING_TABS } from "@/data/logo-design";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Logo Design Services for Startups & Enterprises",
  description:
    "Work with Design Centura to build a strategic, memorable logo that scales effortlessly across print, digital platforms, and social media.",
};

const STEPS: HowStep[] = [
  {
    icon: "/images/webicon_CreativeDirection.svg",
    step: "Step One",
    title: "Discovery & Creative Direction",
    description:
      "We review your logo brief, study competitors and clarify brand positioning. Together we define the tone, style and design goals so every concept moves your brand in the right direction.",
  },
  {
    icon: "/images/webicon_ExplorationRefinement.svg",
    step: "Step Two",
    title: "Concept Exploration & Refinement",
    description:
      "Our designers create multiple custom logo routes with strong typography, icons and color ideas. You select your favorites and we refine them through rounds of feedback and revisions.",
  },
  {
    icon: "/images/webicon_FinalFilesBrand.svg",
    step: "Step Three",
    title: "Final Files & Brand-Ready Delivery",
    description:
      "Once approved, we prepare logo files for print, web and social platforms. You receive organized folders, usage guidance and add-on options to extend your new identity across collateral.",
  },
];

export default function LogoDesignPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* .banner-section#logo-banner */}
        <section
          id="logo-banner"
          className="bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] pt-32 pb-20 text-white max-[767.98px]:pt-[7.2rem] max-[767.98px]:pb-12"
        >
          <div className="dc-container">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-3 flex w-fit items-center gap-2 rounded-full border border-[rgba(148,163,184,0.6)] bg-white/12 px-[0.9rem] py-[0.3rem] text-[0.75rem] font-medium text-[#e5e7eb]">
                  Design Centura · Logo Design Studio
                </p>
                <h1 className="mb-4 text-[clamp(2.4rem,3.2vw,2.8rem)] leading-[1.1] font-semibold max-[767.98px]:text-[2.1rem]">
                  Custom Logo Design &amp; Brand-Ready Visual Identity Systems
                </h1>
                <p className="mb-6 text-[0.98rem] opacity-90">
                  Work with Design Centura to build a strategic, memorable logo
                  that scales effortlessly across print, digital platforms, and
                  social media.
                </p>
                <Link href="#portfolio" className="dc-submit-btn">
                  View Logo Portfolio
                </Link>
              </div>
              <div className="text-center lg:text-right">
                <Image
                  src="/images/lbanner.webp"
                  alt="Logo design showcase"
                  width={720}
                  height={540}
                  priority
                  className="inline-block h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* .about-section#about-logo-design — image left, copy right */}
        <section id="about-logo-design" className="py-20">
          <div className="dc-container">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <Image
                  src="/images/logodesign-side.webp"
                  alt="Logo design process"
                  width={720}
                  height={540}
                  className="inline-block h-auto max-w-full"
                />
              </div>
              <div>
                <p className="dc-eyebrow dc-eyebrow-left">
                  About our logo design services
                </p>
                <h2 className="dc-section-title">
                  We Create Logos That Become the Foundation of Your Brand.
                </h2>
                <p className="mb-3">
                  Your logo is the first impression people form about your
                  business. At Design Centura, we develop signature logo systems
                  that clearly express your purpose, personality, and
                  positioning&mdash;captured in one distinct visual mark.
                </p>
                <ul className="dc-check-list mb-3 pl-6">
                  <li>
                    Our process starts with deep research into your market,
                    competitors, and customer profile to establish a sharp
                    creative direction.
                  </li>
                  <li>
                    Our designers then craft multiple logo concepts with
                    thoughtful typography, color systems, and symbolic structure.
                  </li>
                  <li>
                    Once approved, we deliver fully organized files&mdash;vector
                    formats, web exports, and ready-to-use versions for packaging,
                    signage, and social platforms.
                  </li>
                  <li>
                    You can also add optional brand assets like stationery, social
                    media layouts, headers, and essential style-guide elements.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <PortfolioSection items={PORTFOLIO_ITEMS_FULL} />

        <section id="pricing" className="py-12">
          <div className="dc-container">
            <div className="mx-auto mb-8 w-full text-center lg:max-w-[66%]">
              {/* "Pakages" is the target's own spelling — preserved. */}
              <p className="dc-eyebrow">Logo Pakages</p>
              <h2 className="dc-section-title">
                Logo Design And Branding Pakages
              </h2>
              <p className="dc-section-subtitle">
                We craft logos infused with bold creativity, crisp lines, and
                colors harmonized to elevate your brand effortlessly.
              </p>
            </div>
            <PricingTabs tabs={LOGO_PRICING_TABS} />
          </div>
        </section>

        <HowItWorks
          eyebrow="How It Works"
          title="A Clear, Collaborative Logo Design Process."
          lead="Design Centura follows a structured workflow so every stage of your logo project is transparent. You always know what we are designing, why we are designing it and when you will see each round."
          steps={STEPS}
        />

        <div className="[&>section]:pt-0">
          <FaqSection items={LOGO_FAQS} />
        </div>

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
