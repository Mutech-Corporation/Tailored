/**
 * Credibility strip. Replaces the old stats band — swap in real numbers here
 * once they exist.
 */
const PILLARS = [
  { title: "Brand Strategy", text: "Positioning and identity built on insight." },
  { title: "Creative Design", text: "Visuals and motion people remember." },
  { title: "AI & Automation", text: "Smarter systems that save time." },
  { title: "Digital Growth", text: "SEO, ads and CRO that drive results." },
];

export function StatsSection() {
  return (
    <section
      id="pillars"
      className="bg-[radial-gradient(circle_at_top_left,#4338ca_0,#1e1b5e_45%,#0b1033_100%)] py-14 text-white"
    >
      <div className="dc-container">
        <div className="grid gap-px overflow-hidden rounded-[22px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="bg-[#0b1033]/60 px-6 py-8 text-center">
              <div className="tw-gradient-text-light mb-2 text-[1.35rem] font-bold">
                {pillar.title}
              </div>
              <p className="text-[0.9rem] text-white/70">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
