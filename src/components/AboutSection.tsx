import Image from "@/components/Image";
import Link from "next/link";

const PANEL_ITEMS = ["Websites", "Logos", "Marketing", "Animation"];

/** #about — intro copy on the left, brand panel on the right. */
export function AboutSection() {
  return (
    <section id="about" className="overflow-x-clip pt-20 pb-16">
      <div className="dc-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="dc-eyebrow dc-eyebrow-left">About Tailored</p>
            <h2 className="dc-section-title">
              One Creative Team for Your{" "}
              <span className="tw-gradient-text">Whole Brand</span>.
            </h2>
            <p className="mb-3 text-[#374151]">
              Tailored Web Designers brings branding, websites, AI automation, video,
              SEO and digital marketing together under one creative team&mdash;so
              your business shows up with clarity and consistency everywhere.
            </p>
            <p className="mb-5 text-[#374151]">
              No juggling agencies or freelancers. Strategy, design, development and
              growth work side by side, so every touchpoint is built with the same
              goal: moving your business forward.
            </p>
            <ul className="dc-check-list mb-7 space-y-1 pl-6 text-[#374151]">
              <li>A dedicated project lead and creative team.</li>
              <li>Brand, web, growth and AI under one roof.</li>
              <li>Clear timelines and structured feedback rounds.</li>
            </ul>
            <Link href="/contact" className="dc-submit-btn">
              Start a Project
            </Link>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[32px] bg-[linear-gradient(135deg,#2563eb,#7c3aed)] opacity-20 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,#4338ca_0,#1e1b5e_45%,#0b1033_100%)] p-10 text-white shadow-[0_30px_80px_rgba(11,16,51,0.35)] max-[576px]:p-7">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px]"
              />
              <Image
                src="/brand/logo-stacked-light.png"
                alt="Tailored Web Designers"
                width={440}
                height={286}
                className="relative mx-auto mb-10 h-auto w-full max-w-[340px]"
              />
              <ul className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PANEL_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center text-[0.72rem] font-semibold tracking-[0.14em] uppercase"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="relative mt-8 text-center text-[0.72rem] font-semibold tracking-[0.35em] text-[#c4b5fd] uppercase">
                Design &middot; Develop &middot; Grow
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
