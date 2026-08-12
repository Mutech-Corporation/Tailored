import type { ReactNode } from "react";

interface InnerHeroProps {
  /** Small pill above the heading, e.g. "About Us" / "Pricing" / "Legal". */
  eyebrow: string;
  /** Heading. Pass a fragment when part of it is accent-coloured. */
  title: ReactNode;
  /** Optional lead paragraph below the heading. */
  lead?: ReactNode;
}

/**
 * The banner every inner page opens with. On the homepage `.hero` is a
 * full-viewport video; inner pages re-declare it as a fixed-height gradient:
 *
 *   min-height: unset !important;
 *   padding: 8rem 0 6rem;
 *   background: radial-gradient(circle at top left,#3a8dff 0,#0340b3 45%,#02142e 100%);
 *
 * terms-and-condition and privacy-policy use `.tc-hero` / `.pp-hero` instead,
 * but render the identical eyebrow + heading + lead shape.
 */
export function InnerHero({ eyebrow, title, lead }: InnerHeroProps) {
  return (
    <section
      id="home"
      className="flex items-center bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] pt-32 pb-24 text-white max-[767.98px]:pt-[7.2rem] max-[767.98px]:pb-12"
    >
      <div className="dc-container">
        <div className="flex justify-center text-center">
          <div className="w-full lg:w-2/3">
            <p className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-[rgba(148,163,184,0.6)] bg-white/12 px-[0.9rem] py-[0.3rem] text-[0.75rem] font-medium text-[#e5e7eb]">
              {eyebrow}
            </p>
            <h1 className="mb-4 text-[clamp(2.4rem,3.2vw,2.8rem)] leading-[1.1] font-semibold [&_span]:text-[#ffb400] max-[767.98px]:text-[2.1rem]">
              {title}
            </h1>
            {lead ? (
              <p className="mb-0 text-[0.98rem] opacity-90 max-[576px]:text-[1.2rem]">
                {lead}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
