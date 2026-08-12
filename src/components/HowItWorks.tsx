import Image from "@/components/Image";

export interface HowStep {
  icon: string;
  step: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  steps: HowStep[];
  className?: string;
}

/** `.how-section` — the three/six-step process band on the marketing pages. */
export function HowItWorks({
  eyebrow,
  title,
  lead,
  steps,
  className,
}: HowItWorksProps) {
  return (
    <section id="how-it-works" className={className ?? "py-20"}>
      <div className="dc-container">
        <div className="mx-auto mb-12 w-full text-center lg:max-w-[66%]">
          <p className="dc-eyebrow">{eyebrow}</p>
          <h2 className="dc-section-title">{title}</h2>
          <p className="dc-section-subtitle">{lead}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((item) => (
            <article
              key={item.title}
              className="h-full rounded-[18px] border border-[rgba(15,23,42,0.04)] bg-white p-8 shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
            >
              <Image
                src={item.icon}
                alt=""
                width={56}
                height={56}
                className="mb-4 h-14 w-14"
              />
              <div className="mb-[0.4rem] text-[0.78rem] font-bold tracking-[0.16em] text-[#1769ff] uppercase">
                {item.step}
              </div>
              <h3 className="mb-[0.4rem] font-bold">{item.title}</h3>
              <p className="text-[0.92rem] text-[#5b5b5b]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
