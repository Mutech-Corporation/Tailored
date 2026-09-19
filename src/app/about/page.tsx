import type { Metadata } from "next";
import Image from "@/components/Image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InnerHero } from "@/components/InnerHero";
import { ServicesSection } from "@/components/ServicesSection";

import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Tailored Web Designers is one creative team for branding, websites, AI automation, video, SEO and digital marketing.",
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
              One Creative Team. <span>Every Part</span> of Your Brand.
            </>
          }
          lead="Branding, websites, AI automation, video, SEO and digital marketing, designed and built together so everything works as one."
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
                  We Bring <span className="text-[#2563eb]">Brands</span> into the{" "}
                  <span className="text-[#2563eb]">Digital World</span>.
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
                <Link href="/contact" className="dc-submit-btn">
                  Discuss a project
                </Link>
              </div>

              {/* Brand panel — same full logo as the homepage About section. */}
              <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,#4338ca_0,#1e1b5e_45%,#0b1033_100%)] p-10 shadow-[0_30px_80px_rgba(11,16,51,0.35)] max-[576px]:p-7">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px]"
                />
                <Image
                  src="/brand/logo-full-light.png"
                  alt="Tailored Web Designers — Websites, Logos, Marketing, Animation. Design, Develop, Grow."
                  width={870}
                  height={784}
                  className="relative mx-auto h-auto w-full max-w-[460px]"
                />
              </div>
            </div>
          </div>
        </section>

        <ServicesSection />
      </main>
      <SiteFooter />
    </>
  );
}
