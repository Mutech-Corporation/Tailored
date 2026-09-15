import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { PLANS } from "@/data/plans";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  /** Hide the section heading when the page already has one (e.g. /pricing). */
  showHeading?: boolean;
  /** Where "Let's build a package" points; /pricing links to its add-ons. */
  customHref?: string;
}

/** #pricing — Starter / Growth / Scale plus a custom-package call to action. */
export function PricingSection({
  showHeading = true,
  customHref = "/pricing#custom-work",
}: PricingSectionProps) {
  return (
    <section id="pricing" className="scroll-mt-20 bg-[#f6f6fd] py-20">
      <div className="dc-container">
        {showHeading && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="dc-eyebrow">Pricing</p>
            <h2 className="dc-section-title">
              Simple Packages. <span className="tw-gradient-text">Serious Results.</span>
            </h2>
            <p className="dc-section-subtitle">
              Pick the stage your business is at. Every package is tailored to
              your goals, so we&rsquo;ll send a clear quote before we start.
            </p>
          </div>
        )}

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-[24px] p-8 transition-[transform,box-shadow] duration-200 hover:-translate-y-1.5",
                plan.featured
                  ? "bg-[radial-gradient(circle_at_top_left,#4338ca_0,#1e1b5e_45%,#0b1033_100%)] text-white shadow-[0_28px_70px_rgba(67,56,202,0.35)] lg:-my-3 lg:py-11"
                  : "border border-[rgba(11,16,51,0.08)] bg-white shadow-[0_16px_40px_rgba(11,16,51,0.07)]",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,#2563eb,#7c3aed)] px-4 py-1 text-[0.7rem] font-semibold tracking-[0.18em] whitespace-nowrap text-white uppercase shadow-[0_8px_20px_rgba(124,58,237,0.4)]">
                  Most Popular
                </span>
              )}

              <p
                className={cn(
                  "mb-1 text-[0.78rem] font-bold tracking-[0.2em] uppercase",
                  plan.featured ? "text-[#c4b5fd]" : "text-[#7c3aed]",
                )}
              >
                {plan.tier}
              </p>
              <h3 className="mb-2 text-[1.6rem] leading-tight font-bold">{plan.name}</h3>
              <p className={cn("mb-6 text-[0.92rem]", plan.featured ? "text-white/70" : "text-[#6b7280]")}>
                {plan.description}
              </p>

              <div className="mb-6">
                {plan.price ? (
                  <p className="text-[2.2rem] leading-none font-extrabold">
                    {plan.price}
                    {plan.priceNote && (
                      <span className={cn("ml-2 text-[0.85rem] font-medium", plan.featured ? "text-white/60" : "text-[#6b7280]")}>
                        {plan.priceNote}
                      </span>
                    )}
                  </p>
                ) : (
                  <p className={cn("text-[1.7rem] leading-none font-bold", !plan.featured && "tw-gradient-text")}>
                    Get a Quote
                  </p>
                )}
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[0.95rem]">
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full text-[0.8rem]",
                        plan.featured ? "bg-white/15 text-white" : "bg-[#ede9fe] text-[#7c3aed]",
                      )}
                    >
                      <CheckIcon />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/contact?plan=${plan.id}`}
                className={cn(
                  "mt-auto block rounded-full px-6 py-3.5 text-center text-[0.85rem] font-semibold tracking-[0.1em] uppercase transition-colors",
                  plan.featured
                    ? "bg-white text-[#0b1033] hover:bg-[#ede9fe]"
                    : "border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white",
                )}
              >
                {plan.price ? "Get Started" : "Get a Quote"}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-dashed border-[#c4b5fd] bg-white px-8 py-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-[1.15rem] font-bold text-[#0b1033]">Need something custom?</p>
            <p className="text-[0.92rem] text-[#6b7280]">
              Mix services and add-ons into a package built around your goals.
            </p>
          </div>
          <Link href={customHref} className="dc-submit-btn whitespace-nowrap">
            Let&rsquo;s build a package &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
