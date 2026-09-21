import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InnerHero } from "@/components/InnerHero";
import { PricingSection } from "@/components/PricingSection";
import { AddOnPackages } from "@/components/AddOnPackages";
import { FaqSection } from "@/components/FaqSection";
import { PRICING_GROUPS } from "@/data/pricing-page";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Starter, Growth and Scale packages for branding, websites, growth and AI, plus custom add-on packages.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <InnerHero
          eyebrow="Pricing"
          title={
            <>
              Packages Built Around <span>Your Stage of Growth</span>
            </>
          }
          lead="Start with a package, then add exactly what you need. Every project gets a clear quote before work begins."
        />

        <PricingSection showHeading={false} customHref="#custom-work" />

        <section id="custom-work" className="scroll-mt-20 py-20">
          <div className="dc-container">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="dc-eyebrow">Custom Work</p>
              <h2 className="dc-section-title">
                Add-On <span className="tw-gradient-text">Packages</span>
              </h2>
              <p className="dc-section-subtitle">
                Need something specific? Choose an add-on on its own or combine
                several into a custom package.
              </p>
            </div>

            <AddOnPackages groups={PRICING_GROUPS} />

            <p className="mt-12 text-center text-[0.95rem] text-[#6b7280]">
              Can&rsquo;t find the right fit?{" "}
              <Link href="/contact?plan=custom" className="font-semibold text-[#2563eb] hover:text-[#7c3aed]">
                Let&rsquo;s build a package together &rarr;
              </Link>
            </p>
          </div>
        </section>

        <div className="bg-[#f6f6fd] [&>section]:py-16">
          <FaqSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
