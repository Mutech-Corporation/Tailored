import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What clients say about working with Tailored Web Designers.",
};

/**
 * Client reviews will be published here once collected. The previous review
 * content (src/data/reviews.ts) was not ours, so it is intentionally not rendered.
 */
export default function ReviewsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-[radial-gradient(circle_at_top_left,#4338ca_0,#1e1b5e_45%,#0b1033_100%)] pt-32 pb-14 text-white">
          <div className="dc-container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="dc-eyebrow">Reviews</p>
              <h1 className="dc-section-title">Client Reviews</h1>
              <p className="mt-3 text-[0.98rem] opacity-90">
                We&rsquo;re collecting feedback from the brands we work with.
                Verified reviews will appear here soon.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="dc-container text-center">
            <p className="dc-section-subtitle mx-auto mb-6 max-w-xl">
              Want to see the kind of work we do in the meantime?
            </p>
            <Link href="/portfolio" className="dc-submit-btn">
              View Our Work
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
