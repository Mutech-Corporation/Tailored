import Link from "next/link";
import Image from "@/components/Image";
import { CASE_STUDIES } from "@/data/case-studies";
import { cn } from "@/lib/utils";

const VISUAL_GRADIENTS = [
  "bg-[linear-gradient(135deg,#1e1b5e_0%,#2563eb_100%)]",
  "bg-[linear-gradient(135deg,#0b1033_0%,#7c3aed_100%)]",
  "bg-[linear-gradient(135deg,#2563eb_0%,#7c3aed_100%)]",
];

/** #work — case-study cards: Brand → Challenge → What We Built → Result. */
export function CaseStudiesSection() {
  return (
    <section id="work" className="scroll-mt-20 bg-white py-20">
      <div className="dc-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="dc-eyebrow">Selected Work</p>
          <h2 className="dc-section-title">
            Real brands. Real problems.{" "}
            <span className="tw-gradient-text">Better digital experiences.</span>
          </h2>
        </div>

        <div className="space-y-8">
          {CASE_STUDIES.map((study, index) => (
            <article
              key={study.number}
              className="grid overflow-hidden rounded-[26px] border border-[rgba(11,16,51,0.07)] bg-white shadow-[0_18px_50px_rgba(11,16,51,0.08)] lg:grid-cols-[5fr_7fr]"
            >
              {/* Visual */}
              <div
                className={cn(
                  "relative flex min-h-[260px] flex-col justify-between p-8 text-white",
                  VISUAL_GRADIENTS[index % VISUAL_GRADIENTS.length],
                  index % 2 === 1 && "lg:order-2",
                )}
              >
                {study.image && (
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(min-width: 992px) 40vw, 100vw"
                    className="object-cover opacity-40 mix-blend-luminosity"
                  />
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_55%)]"
                />
                <span className="relative text-[0.8rem] font-semibold tracking-[0.25em] text-white/70 uppercase">
                  Project {study.number}
                </span>
                <div className="relative">
                  <span
                    aria-hidden
                    className="mb-2 block text-[5.5rem] leading-none font-extrabold text-white/15"
                  >
                    {study.number}
                  </span>
                  <h3 className="mb-4 text-[1.9rem] leading-tight font-bold">{study.title}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {study.services.map((service) => (
                      <li
                        key={service}
                        className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.78rem] font-medium"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Story */}
              <ol className="grid gap-px bg-[rgba(11,16,51,0.06)] sm:grid-cols-2">
                {[
                  { label: "Brand", text: study.brand },
                  { label: "Challenge", text: study.challenge },
                  { label: "What We Built", text: study.built },
                  { label: "Result", text: study.result },
                ].map((step, stepIndex) => (
                  <li
                    key={step.label}
                    className={cn(
                      "bg-white p-7",
                      step.label === "Result" && "bg-[#f6f5ff]",
                    )}
                  >
                    <p className="mb-2 flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.18em] text-[#7c3aed] uppercase">
                      <span className="flex size-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563eb,#7c3aed)] text-[0.7rem] text-white">
                        {stepIndex + 1}
                      </span>
                      {step.label}
                    </p>
                    <p className="text-[0.95rem] leading-relaxed text-[#374151]">{step.text}</p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/portfolio" className="dc-submit-btn">
            Explore More Work
          </Link>
        </div>
      </div>
    </section>
  );
}
