import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InnerHero } from "@/components/InnerHero";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Creative, digital, growth and AI services: brand identity, logo design, websites, e-commerce, SEO, PPC, AI chatbots and automation.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <InnerHero
          eyebrow="Services"
          title={
            <>
              Creative. Digital. Growth. <span>AI.</span>
            </>
          }
          lead="Everything your brand needs, from the first sketch to the systems that keep it growing, delivered by one team."
        />

        <ServicesSection showHeading={false} />

        <section className="py-16">
          <div className="dc-container">
            <div className="flex flex-col items-center justify-between gap-6 rounded-[24px] bg-[radial-gradient(circle_at_top_left,#4338ca_0,#1e1b5e_45%,#0b1033_100%)] px-8 py-10 text-white md:flex-row md:px-12">
              <div>
                <h2 className="mb-2 text-[1.8rem] leading-tight font-bold">
                  Not sure where to start?
                </h2>
                <p className="text-white/80">
                  Tell us about your business and we&rsquo;ll recommend the right mix.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="dc-submit-btn">
                  Start a Project
                </Link>
                <Link
                  href="/pricing"
                  className="inline-block rounded-full border border-white/40 px-6 py-[0.6rem] text-[0.82rem] font-semibold tracking-[0.1em] text-white uppercase transition-colors hover:bg-white/10"
                >
                  See Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
