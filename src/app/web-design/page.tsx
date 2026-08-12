import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PortfolioSection } from "@/components/PortfolioSection";
import { PricingCard } from "@/components/PricingCard";
import { HowItWorks, type HowStep } from "@/components/HowItWorks";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { WEB_FAQS, WEB_PORTFOLIO, WEB_PRICING } from "@/data/web-design";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Top Website Design Company for Modern Brands",
  description:
    "Design Centura builds responsive, SEO-friendly websites that load fast, tell your brand story clearly and convert visitors into leads, bookings and sales across every device.",
};

const STEPS: HowStep[] = [
  {
    icon: "/images/webicons_Sitemap.svg",
    step: "Step One",
    title: "Discovery, Sitemap & Wireframes",
    description:
      "We review your offers, audience and analytics, then define sitemap, page goals and wireframes. This phase ensures the site structure supports content, SEO and lead flows before design begins.",
  },
  {
    icon: "/images/webicons_UIDesign.svg",
    step: "Step Two",
    title: "UI Design, Content & Interactions",
    description:
      "Designers craft high-fidelity layouts with clear messaging, visual hierarchy and on-brand imagery. We refine copy, calls-to-action and micro interactions so every page supports conversions.",
  },
  {
    icon: "/images/webicons_testing.svg",
    step: "Step Three",
    title: "Development, Testing & Launch",
    description:
      "Developers build the site on the chosen platform, implement SEO basics, connect forms and analytics, then test across browsers and devices. After launch, we provide training and support.",
  },
];

const BANNER_POINTS = [
  "Fully responsive layouts for mobile, tablet and desktop",
  "Optimized for search, speed and conversions",
  "Built on scalable, easy-to-manage platforms",
];

export default function WebDesignPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          id="web-banner"
          className="bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] pt-32 pb-20 text-white max-[767.98px]:pt-[7.2rem] max-[767.98px]:pb-12"
        >
          <div className="dc-container">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-3 flex w-fit items-center gap-2 rounded-full border border-[rgba(148,163,184,0.6)] bg-white/12 px-[0.9rem] py-[0.3rem] text-[0.75rem] font-medium text-[#e5e7eb]">
                  Design Centura · Web Design Studio
                </p>
                <h1 className="mb-4 text-[clamp(2.4rem,3.2vw,2.8rem)] leading-[1.1] font-semibold max-[767.98px]:text-[2.1rem]">
                  Conversion-Focused Web Design and Modern Development.
                </h1>
                <p className="mb-6 text-[0.98rem] opacity-90">
                  Design Centura builds responsive, SEO-friendly websites that
                  load fast, tell your brand story clearly and convert visitors
                  into leads, bookings and sales across every device.
                </p>
                <div className="mb-6 flex flex-wrap gap-3">
                  <Link href="#contact" className="dc-submit-btn">
                    Get a Custom Website Proposal
                  </Link>
                  <Link href="#web-portfolio" className="dc-submit-btn">
                    View Web Design Portfolio
                  </Link>
                </div>
                <ul className="space-y-1 text-[0.92rem] opacity-90">
                  {BANNER_POINTS.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-right">
                <Image
                  src="/images/wbimage.webp"
                  alt="Website design showcase"
                  width={720}
                  height={540}
                  priority
                  className="inline-block h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about-web-design" className="py-20">
          <div className="dc-container">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <Image
                  src="/images/webhomebanner.webp"
                  alt="Web design process"
                  width={720}
                  height={540}
                  className="inline-block h-auto max-w-full"
                />
              </div>
              <div>
                <p className="dc-eyebrow dc-eyebrow-left">
                  About Our Web Design &amp; Development Services
                </p>
                <h2 className="dc-section-title">
                  We Design Websites That Act as Your Best Salesperson.
                </h2>
                <p className="mb-3">
                  Your website is where prospects decide if they trust your brand.
                  Design Centura crafts UX-led websites that look premium, explain
                  your offer clearly and guide visitors toward taking action
                  without friction.
                </p>
                <ul className="dc-check-list mb-3 pl-6">
                  <li>
                    We start by understanding your goals, product, audience and
                    analytics to map a structure that supports your sales funnels
                    and content strategy.
                  </li>
                  <li>
                    Our designers create interface layouts with strong hierarchy,
                    clean typography and on-brand visuals for desktop, tablet and
                    mobile screens.
                  </li>
                  <li>
                    Developers turn approved designs into fast, secure, SEO-ready
                    pages using platforms like WordPress or custom front-end
                    frameworks.
                  </li>
                  <li>
                    You receive an easy-to-manage website with training, launch
                    support and optional ongoing optimization and maintenance.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div id="web-portfolio">
          <PortfolioSection items={WEB_PORTFOLIO} />
        </div>

        <section id="pricing" className="py-12">
          <div className="dc-container">
            <div className="mx-auto mb-8 w-full text-center lg:max-w-[66%]">
              <p className="dc-eyebrow">{WEB_PRICING.eyebrow}</p>
              <h2 className="dc-section-title">{WEB_PRICING.title}</h2>
            </div>
            <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
              {WEB_PRICING.plans.map((plan) => (
                <PricingCard key={plan.packageId || plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </section>

        <HowItWorks
          eyebrow="How It Works"
          title="A Clear, Collaborative Web Design Process."
          lead="Design Centura follows a proven workflow so your website project stays on track. Each phase is transparent, collaborative and focused on launching a site that aligns with your goals and brand."
          steps={STEPS}
        />

        <div className="[&>section]:pt-0">
          <FaqSection items={WEB_FAQS} />
        </div>

        {/* .contact-modern.section-padding — 80px block padding on this page */}
        <div className="[&>section]:py-20">
          <ContactSection title="Share your website brief. We will take it from here." />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
