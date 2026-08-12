import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PortfolioSection } from "@/components/PortfolioSection";
import { PricingCard } from "@/components/PricingCard";
import {
  ANIM_PORTFOLIO,
  ANIM_PRICING,
  ANIM_SERVICES,
} from "@/data/animated-videos";

export const metadata: Metadata = {
  title: "Custom Video Animation Services for Brands & Startups",
  description:
    "At DesignCentura, we create animations that simplify complex ideas, highlight your brand message, and keep your audience engaged from start to finish.",
};

export default function AnimatedVideosPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* .hero.section-padding — background video, same treatment as the homepage */}
        <section className="relative flex items-center overflow-hidden py-20 text-white max-[767.98px]:pt-[6.2rem] max-[767.98px]:pb-8">
          <div className="absolute inset-0 z-[1] h-full w-full overflow-hidden">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/banner-video2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 z-[2] bg-black/55" />

          <div className="dc-container relative z-[9]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-[rgba(148,163,184,0.6)] bg-white/12 px-[0.9rem] py-[0.3rem] text-[0.75rem] font-medium text-[#e5e7eb]">
                Animation &amp; Motion Design Studio
              </p>
              <h1 className="mb-4 text-[clamp(2.4rem,3.2vw,2.8rem)] leading-[1.1] font-semibold max-[767.98px]:text-[2.1rem]">
                Animated Videos That Bring Your Story to Life
              </h1>
              <p className="mb-6 text-[0.98rem] opacity-90">
                At DesignCentura, we create animations that simplify complex
                ideas, highlight your brand message, and keep your audience
                engaged from start to finish. Our animation team blends
                creativity, clarity, and industry-level precision to produce
                visuals that communicate powerfully across digital platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="#pricing" className="dc-submit-btn">
                  View Packages
                </a>
                <a href="#portfolio" className="dc-submit-btn">
                  Explore Work
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services — a jump list followed by four alternating blocks */}
        <section id="services" className="py-20">
          <div className="dc-container">
            <h2 className="dc-section-title mb-6 text-center">Our Services</h2>

            <ul className="mb-12 flex flex-wrap justify-center gap-3">
              {ANIM_SERVICES.map((service) => (
                <li key={service.navLabel}>
                  <a
                    href={`#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="dc-pill inline-block"
                  >
                    {service.navLabel}
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-16">
              {ANIM_SERVICES.map((service, index) => (
                <div
                  key={service.title}
                  id={service.title.toLowerCase().replace(/\s+/g, "-")}
                  className="grid items-center gap-8 lg:grid-cols-2"
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                    <h2 className="dc-section-title">{service.title}</h2>
                    <p className="mb-6 text-[0.95rem] text-[#5b5b5b]">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a href="#pricing" className="dc-submit-btn">
                        View Packages
                      </a>
                      <a href="#portfolio" className="dc-submit-btn">
                        Explore Work
                      </a>
                    </div>
                  </div>
                  <div
                    className={
                      index % 2 === 1
                        ? "text-center lg:order-1 lg:text-left"
                        : "text-center lg:text-right"
                    }
                  >
                    {/*
                      exp1.gif is animated, so this stays a plain <img> for that
                      entry; the rest are stills and use next/image.
                    */}
                    {service.image.endsWith(".gif") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="inline-block h-auto max-w-full"
                      />
                    ) : (
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={720}
                        height={540}
                        className="inline-block h-auto max-w-full"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[#f5f7fb] py-20">
          <div className="dc-container">
            <div className="mx-auto mb-8 w-full text-center lg:max-w-[66%]">
              <p className="dc-eyebrow">Plans &amp; Pricing</p>
              <h2 className="dc-section-title">
                Choose the Animated Video Package That Fits Your Brand
              </h2>
            </div>
            <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
              {ANIM_PRICING.map((plan) => (
                <PricingCard key={plan.packageId || plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </section>

        <PortfolioSection items={ANIM_PORTFOLIO} />

        <section className="pt-0 pb-20">
          <div className="dc-container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="dc-section-title">
                Ready to Create Your Animated Video?
              </h2>
              <p className="dc-section-subtitle mb-6">
                Bring your ideas to the screen with DesignCentura&rsquo;s expert
                animation team. We deliver visual content that engages, explains,
                and elevates your brand.
              </p>
              <a href="#pricing" className="dc-submit-btn">
                Get Started Today
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
