import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InnerHero } from "@/components/InnerHero";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on branding, websites, AI automation and digital growth from Tailored Web Designers.",
};

/** No posts yet — the page stays reachable but shows an honest empty state. */
export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <InnerHero
          eyebrow="Blog"
          title={
            <>
              Insights &amp; <span>Ideas</span>
            </>
          }
          lead="Practical thinking on branding, websites, AI and growth."
        />

        <section className="py-16">
          <div className="dc-container text-center">
            <h2 className="dc-section-title">Articles are on the way.</h2>
            <p className="dc-section-subtitle mx-auto mb-6 max-w-xl">
              We&rsquo;re preparing our first posts. In the meantime, tell us
              about your project and we&rsquo;ll share ideas directly.
            </p>
            <Link href="/contact" className="dc-submit-btn">
              Start a Project
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
