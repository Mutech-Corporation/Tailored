export interface BenefitStat {
  value: string;
  label: string;
}

export interface BenefitCardData {
  title: string;
  description: string;
  stats: [BenefitStat, BenefitStat];
}

/** `.benefit-card` — one of three AI-benefits cards, each with a 2-up stat grid. */
export function BenefitCard({ title, description, stats }: BenefitCardData) {
  return (
    <div className="h-full rounded-2xl border border-[#dfe3e8] bg-white px-6 py-8 shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#196bff] hover:shadow-[0_12px_30px_rgb(28_106_252/10%)]">
      <h3 className="mb-4 text-[1.25rem] font-bold text-[#1b1b1b] max-[575.98px]:text-[1.1rem]">
        {title}
      </h3>
      <p className="mb-6 text-[0.95rem] leading-[1.6] font-semibold text-black max-[575.98px]:text-[0.9rem]">
        {description}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 lg:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-xl bg-[linear-gradient(135deg,rgb(29_106_252/13%)_0%,rgb(29_106_252/23%)_100%)] px-4 py-6 text-center sm:px-3 sm:py-5 lg:px-4 lg:py-6 before:pointer-events-none before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,42,64,0.03)_10px,rgba(255,42,64,0.03)_20px)] before:opacity-50"
          >
            <div className="relative mb-2 text-[1.75rem] leading-[1.2] font-extrabold text-[#196bff] lg:text-[2rem]">
              {stat.value}
            </div>
            <div className="relative text-[0.75rem] leading-[1.4] font-semibold text-[#1b1b1b]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
