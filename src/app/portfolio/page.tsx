import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InnerHero } from "@/components/InnerHero";
import { PortfolioSection } from "@/components/PortfolioSection";
import { PORTFOLIO_ITEMS_FULL } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Design Centura – Logo, Branding & Web",
  description:
    "A curated selection of logos, branding and website projects created by DesignCentura.",
};

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <InnerHero
          eyebrow="Portfolio"
          title={
            <>
              Custom Logo Design, <span>Branding &amp; Website</span> Solutions.
            </>
          }
          lead="Witness our team’s unconventional creativity for yourself. We set the bar so high that you won’t be satisfied with any service but ours."
        />
        <PortfolioSection items={PORTFOLIO_ITEMS_FULL} />
      </main>
      <SiteFooter />
    </>
  );
}
