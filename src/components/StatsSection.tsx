import type { Stat } from "@/types";

const STATS: Stat[] = [
  { value: "580+", label: "Happy clients" },
  { value: "95%", label: "Client satisfaction" },
  { value: "180+", label: "Projects delivered" },
  { value: "10+", label: "Years experience" },
];

/** #stats — dark gradient band. */
export function StatsSection() {
  return (
    <section
      id="stats"
      className="bg-[radial-gradient(circle_at_top_left,#4338ca_0,#1e1b5e_45%,#0b1033_100%)] py-14 text-white"
    >
      <div className="dc-container">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-[2.1rem] font-extrabold">{stat.value}</div>
              <div className="text-[0.9rem] tracking-[0.16em] uppercase opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
