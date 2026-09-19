import Link from "next/link";
import { SERVICE_GROUPS, type ServiceGroup } from "@/data/services";
import { cn } from "@/lib/utils";

const GROUP_ICONS: Record<ServiceGroup["id"], React.ReactNode> = {
  // Pen nib — Creative
  creative: (
    <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  ),
  // Browser window — Digital
  digital: (
    <>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M2 8h20M6 5.5h.01M9 5.5h.01M6 12h7M6 16h4M16 12h2v4h-2z" />
    </>
  ),
  // Trend line — Growth
  growth: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  // Spark / chip — AI
  ai: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z" />
    </>
  ),
};

interface ServicesSectionProps {
  /** Hide the section heading when the page already has one (e.g. /services). */
  showHeading?: boolean;
  className?: string;
}

/** Four service groups — Creative, Digital, Growth, AI — each with four services. */
export function ServicesSection({ showHeading = true, className }: ServicesSectionProps) {
  return (
    <section id="services" className={cn("bg-[#f6f6fd] py-20", className)}>
      <div className="dc-container">
        {showHeading && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="dc-eyebrow">What we do</p>
            <h2 className="dc-section-title">
              Everything Your Brand Needs to{" "}
              <span className="tw-gradient-text">Grow</span>.
            </h2>
            <p className="dc-section-subtitle">
              Four disciplines, one team. From brand identity to AI automation,
              we plan, design and build it together, so it all works as one.
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICE_GROUPS.map((group, index) => (
            <article
              key={group.id}
              id={group.id}
              className="tw-lift group flex h-full scroll-mt-28 flex-col rounded-[22px] border border-[rgba(11,16,51,0.06)] bg-white p-8 shadow-[0_15px_40px_rgba(11,16,51,0.06)] max-[576px]:p-6"
            >
              <span
                aria-hidden
                // Slides in from the left on hover and exits to the right on
                // leave (origin flips), so the motion always reads left → right.
                className="absolute inset-x-6 top-0 h-1 origin-right scale-x-0 rounded-b-full bg-[linear-gradient(90deg,#2563eb,#7c3aed)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <div className="mb-5 flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563eb,#7c3aed)] text-white shadow-[0_10px_24px_rgba(124,58,237,0.3)]">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {GROUP_ICONS[group.id]}
                  </svg>
                </span>
                <div>
                  <p className="text-[0.72rem] font-bold tracking-[0.2em] text-[#7c3aed] uppercase">
                    0{index + 1}
                  </p>
                  <h3 className="text-[1.5rem] leading-tight font-bold text-[#0b1033]">
                    {group.label}
                  </h3>
                </div>
              </div>
              <p className="mb-5 text-[0.95rem] text-[#5b5f7a]">{group.summary}</p>

              <ul className="grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => {
                  const body = (
                    <>
                      <span className="flex items-center justify-between gap-2 font-semibold text-[#111633]">
                        {item.title}
                        {item.href && (
                          <span aria-hidden className="text-[#2563eb] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:translate-x-1">
                            &rarr;
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-[0.84rem] leading-snug text-[#6b7280]">
                        {item.description}
                      </span>
                    </>
                  );
                  const itemClass =
                    "group/item block h-full rounded-xl border border-[rgba(11,16,51,0.06)] bg-[#fafaff] p-3.5 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";
                  return (
                    <li key={item.title}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={cn(itemClass, "hover:border-[#c7d2fe] hover:bg-white")}
                        >
                          {body}
                        </Link>
                      ) : (
                        <div className={itemClass}>{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
