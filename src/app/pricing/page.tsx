import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InnerHero } from "@/components/InnerHero";
import { PricingCard } from "@/components/PricingCard";
import { PRICING_GROUPS } from "@/data/pricing-page";

export const metadata: Metadata = {
  title: "Design Centura – Logo, Branding & Web",
  description:
    "Get high-quality design and development services at fair prices, built to increase your business value.",
};

/**
 * pricing.php lists nine plan groups (30 cards) stacked down the page, rather
 * than the homepage's four-tab switcher.
 *
 * Known gap: the target also swaps the navbar's `#mainMenu` for a `#pricingMenu`
 * of anchors to these nine groups once you scroll past 150px. SiteHeader is
 * shared with every other page and does not implement that.
 */
export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <InnerHero
          eyebrow="Pricing"
          title={
            <>
              Custom Logo Design, <span>Branding &amp; Website</span> Solutions.
            </>
          }
          lead="Design Centura is essentially an institution where simple ideas are converted into brilliant and passionate products."
        />

        {PRICING_GROUPS.map((group, index) => (
          <section
            key={group.id}
            id={group.id}
            className={index === 0 ? "py-12" : "pt-0 pb-12"}
          >
            <div className="dc-container">
              <div className="mx-auto mb-8 w-full text-center lg:max-w-[66%]">
                <p className="dc-eyebrow">{group.eyebrow}</p>
                <h2 className="dc-section-title">{group.title}</h2>
                {group.subtitle ? (
                  <p className="dc-section-subtitle">{group.subtitle}</p>
                ) : null}
              </div>

              {/*
                Two of the nine groups hold a single card; those render centred
                and narrower rather than stretched across the full row.
              */}
              <div
                className={
                  group.plans.length === 1
                    ? "mx-auto max-w-md"
                    : "grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4"
                }
              >
                {group.plans.map((plan) => (
                  <PricingCard key={plan.packageId || plan.name} plan={plan} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
