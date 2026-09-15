import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/ContactSection";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Tailored Web Designers. Tell us about your brand, website, growth or AI goals and we’ll reply with a tailored proposal.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Opens straight onto the contact shell (no hero banner), FAQ underneath. */}
        <div className="[&>section]:pt-32 [&>section]:pb-0">
          <ContactSection
            title={
              <>
                Let&rsquo;s start your project.
                <br /> We&rsquo;ll take it from here.
              </>
            }
            lead="Tell us about your brand, website, growth or AI goals. We’ll reply with a tailored proposal, timeline and clear next steps."
          />
        </div>
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
