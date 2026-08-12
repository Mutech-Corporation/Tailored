import type { Service } from "@/types";

/**
 * #services — four cards. Note that cards 02 and 04 ship pre-activated on the
 * target: they render in the gradient state at rest, producing an alternating
 * checkerboard. That is intentional in the source markup, not a bug.
 */
const SERVICES: Service[] = [
  {
    number: "01.",
    title: "Logo Design",
    description:
      "Impact‑driven logo concepts designed to help your business stand out. Clean vector marks, modern styles, and clear usage guidelines.",
    active: false,
  },
  {
    number: "02.",
    title: "Brand Identity",
    description:
      "Brand systems built for consistency—color palettes, typography and stationery templates to keep everything cohesive.",
    active: true,
  },
  {
    number: "03.",
    title: "Website Design",
    description:
      "Responsive websites built for credibility, SEO and conversions. Designed for clarity, mobile‑friendly browsing and strong engagement.",
    active: false,
  },
  {
    number: "04.",
    title: "Social & Digital",
    description:
      "Social media posts, ads and digital creatives that represent your brand consistently across channels.",
    active: true,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#f7f8fc] py-18">
      <div className="dc-container">
        <div className="mx-auto mb-12 w-3/4 text-center max-[767.98px]:w-full">
          <p className="dc-eyebrow">What we offer</p>
          <h2 className="dc-section-title">
            Services <span className="text-[#196bff]">Tailored</span> For Your{" "}
            <span className="text-[#196bff]">Brand</span>.
          </h2>
          <p className="dc-section-subtitle">
            Inspired by agencies like DesignCentura, we cover everything from
            concept sketches to launch-ready digital assets, keeping your brand
            design under one roof.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <article
              key={service.number}
              data-active={service.active}
              className="group h-full rounded-[18px] border border-[rgba(15,23,42,0.04)] bg-white p-8 px-6 shadow-[0_15px_40px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-[180ms] ease-out hover:-translate-y-1 hover:border-transparent hover:bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#2e83ff_100%)] hover:text-white hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)] data-[active=true]:border-transparent data-[active=true]:bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#2e83ff_100%)] data-[active=true]:text-white data-[active=true]:shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="mb-[0.4rem] text-[0.78rem] font-bold tracking-[0.16em] text-[#1769ff] uppercase group-hover:text-white group-data-[active=true]:text-white">
                {service.number}
              </div>
              <h3 className="mb-[0.4rem] font-bold">{service.title}</h3>
              <p className="text-[0.92rem] text-[#5b5b5b] group-hover:text-white group-data-[active=true]:text-white">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
