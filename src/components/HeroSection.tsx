import Link from "next/link";
import { assetPath } from "@/lib/asset-path";

const DISCIPLINES = ["Branding", "Websites", "AI Automation", "Video", "SEO", "Digital Marketing"];

/** #home — full-viewport hero: background video, navy scrim, headline and two CTAs. */
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0b1033] pt-28 pb-20 text-white max-[767.98px]:pt-32 max-[767.98px]:pb-14"
    >
      <div className="absolute inset-0 z-[1] h-full w-full overflow-hidden">
        <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src={assetPath("/videos/banner-video.mp4")} type="video/mp4" />
        </video>
      </div>

      {/* Navy → violet scrim keeps the video on-brand and the text readable. */}
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(115deg,rgba(11,16,51,0.94)_0%,rgba(30,27,94,0.82)_50%,rgba(76,29,149,0.55)_100%)]" />
      <div
        aria-hidden
        className="absolute -right-40 -bottom-40 z-[2] size-[520px] rounded-full bg-[#7c3aed] opacity-30 blur-[140px]"
      />

      <div className="dc-container relative z-[9]">
        <div className="max-w-[820px]">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.75rem] font-semibold tracking-[0.2em] text-white/85 uppercase backdrop-blur">
            <span className="size-1.5 rounded-full bg-[#a78bfa]" />
            Design &middot; Develop &middot; Grow
          </p>

          <h1 className="mb-6 text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.04] font-extrabold tracking-[-0.02em]">
            We Build Brands That{" "}
            <span className="tw-gradient-text-light">Move Business Forward.</span>
          </h1>

          <p className="mb-9 max-w-[640px] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-white/80">
            Branding, websites, AI automation, video, SEO, and digital marketing
            &mdash; all under one creative team.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="dc-submit-btn px-8 py-4 text-[0.9rem] shadow-[0_14px_40px_rgba(124,58,237,0.45)]"
            >
              Start a Project
            </Link>
            <Link
              href="/#work"
              className="inline-block rounded-full border border-white/35 bg-white/5 px-8 py-4 text-[0.9rem] font-semibold tracking-[0.1em] text-white uppercase backdrop-blur transition-colors hover:border-white hover:bg-white/15"
            >
              View Our Work
            </Link>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-white/60">
            {DISCIPLINES.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-white/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
