import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ReviewsMasonry } from "@/components/ReviewsMasonry";

export const metadata: Metadata = {
  title: "Design Centura – Logo, Branding & Web",
  description:
    "Read real customer reviews of Design Centura. Explore testimonials from Trustpilot, Google, Facebook and more.",
};

export default function ReviewsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/*
          The target reuses `#stats` here — so this header inherits the stats
          band's gradient and white text rather than the usual `.hero` banner.
        */}
        <section
          id="stats"
          className="bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] pt-32 pb-14 text-white"
        >
          <div className="dc-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="dc-eyebrow">Reviews</p>
              <h1 className="dc-section-title">
                See What People <span className="text-[#ffb400]">Love About</span>{" "}
                Us
              </h1>
              <p className="mt-3 text-[0.98rem] opacity-90">
                At DesignCentura, we&rsquo;ve helped over 10,000 businesses
                worldwide create their brand identity &mdash; and we&rsquo;re
                proud to maintain a 4.9★ average rating across Google, Trustpilot,
                and Facebook. Below you&rsquo;ll find hundreds of verified reviews
                from real clients who trusted DesignCentura for logo design,
                website design, marketing and branding services.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 py-12">
          <div className="dc-container">
            {/*
              The target ships five filter buttons, but every one except "All"
              has its label inside an HTML comment, so only "All" is usable.
              Reproduced as the single active pill it effectively renders as.
            */}
            <div className="mb-8 flex flex-wrap justify-center">
              <button
                type="button"
                className="mr-2 mb-2 rounded-md border border-[#6c757d] bg-[#6c757d] px-3 py-1 text-sm text-white"
              >
                All
              </button>
            </div>
            <ReviewsMasonry />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
