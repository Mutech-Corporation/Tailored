import Image from "next/image";

/** #about — two-column intro; text left, mockup right. */
export function AboutSection() {
  return (
    <section id="about" className="pt-20 pb-14">
      <div className="dc-container">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          <div>
            <p className="dc-eyebrow dc-eyebrow-left">About the Brand</p>
            <h2 className="dc-section-title">
              We Bring <span className="text-[#196bff]">Brands</span> into the{" "}
              <span className="text-[#196bff]">Digital World</span>.
            </h2>
            <p className="mb-3">
              DesignCentura builds strong visual identities&mdash;combining logo
              design, brand systems and digital experiences&mdash;so you can show
              up online with clarity and consistency.
            </p>
            <p className="mb-3">
              We help startups and established businesses build unique brand
              identities that attract loyal customers and elevate digital
              presence. Every touchpoint is crafted with strategy, purpose and
              modern design. Fast turnarounds with structured revision cycles.
            </p>
            <ul className="dc-check-list mb-3 pl-6">
              <li>Dedicated project managers &amp; creative team.</li>
              <li>Packages for logos, branding, websites &amp; social media.</li>
              <li>Fast turnarounds with structured revision cycles.</li>
            </ul>
            <Link href="#contact" className="dc-submit-btn">
              Discuss a project
            </Link>
          </div>

          <div className="text-center lg:text-right">
            <Image
              src="/images/about-side-2.webp"
              alt="Brand identity mockup"
              width={720}
              height={540}
              className="inline-block h-auto max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
