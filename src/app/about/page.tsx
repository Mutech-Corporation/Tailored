import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InnerHero } from "@/components/InnerHero";
import { ServicesSection } from "@/components/ServicesSection";
import { ReviewsMasonry } from "@/components/ReviewsMasonry";

export const metadata: Metadata = {
  title: "Design Centura – Logo, Branding & Web",
  description:
    "Read real customer reviews of Design Centura. Explore testimonials from Trustpilot, Google, Facebook and more.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <InnerHero
          eyebrow="About Us"
          title={
            <>
              Custom Logo Design, <span>Branding &amp; Website</span> Solutions.
            </>
          }
          lead="Design Centura is essentially an institution where simple ideas are converted into brilliant and passionate products."
        />

        {/*
          Same layout as the homepage's #about, but the body copy differs — so
          this is a page-local block rather than a reuse of AboutSection.
        */}
        <section id="about" className="pt-20 pb-14">
          <div className="dc-container">
            <div className="grid items-center gap-6 lg:grid-cols-2">
              <div>
                <p className="dc-eyebrow dc-eyebrow-left">About the studio</p>
                <h2 className="dc-section-title">
                  We Bring <span className="text-[#196bff]">Brands</span> into the{" "}
                  <span className="text-[#196bff]">Digital World</span>.
                </h2>
                <p className="mb-3">
                  We help startups and established businesses build strong visual
                  identities &ndash; from logo and stationery to websites and
                  digital campaigns &ndash; so they can show up consistently
                  across every channel.
                </p>
                <p className="mb-3">
                  Strategy, design, and development work together here. Every
                  logo, landing page, and banner is crafted with your audience and
                  market in mind.
                </p>
                <ul className="dc-check-list mb-3 pl-6">
                  <li>Dedicated project managers &amp; creative team.</li>
                  <li>
                    Packages for logos, branding, websites &amp; social media.
                  </li>
                  <li>Fast turnarounds with structured revision cycles.</li>
                </ul>
                <a href="/contact" className="dc-submit-btn">
                  Discuss a project
                </a>
              </div>

              <div className="text-center lg:text-right">
                <Image
                  src="/images/about-side-2.webp"
                  alt="Brand identity mockup"
                  width={720}
                  height={540}
                  className="inline-block h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />

        <section className="mt-12 py-12">
          <div className="dc-container">
            <div className="mb-6 text-center">
              <p className="dc-eyebrow">What we offer</p>
              {/* "Testimonails" is the target's own typo — preserved. */}
              <h2 className="dc-section-title">Client Testimonails</h2>
              <p className="dc-section-subtitle">
                Inspired by agencies like DesignCentura, we cover everything from
                concept sketches to launch-ready digital assets, keeping your
                brand design under one roof.
              </p>
            </div>
            <ReviewsMasonry />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
