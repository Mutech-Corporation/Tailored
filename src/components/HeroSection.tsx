/**
 * #home — full-viewport hero over a looping background video.
 *
 * The target stacks three layers: the video (z-1), a 55% black scrim (z-2), and
 * a translucent content card (z-9) that is only 50% wide on desktop.
 */
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] pt-24 pb-16 text-white max-[767.98px]:pt-[7.2rem] max-[767.98px]:pb-8"
    >
      {/* Layer 1 — background video */}
      <div className="absolute inset-0 z-[1] h-full w-full overflow-hidden">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/banner-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Layer 2 — scrim */}
      <div className="absolute inset-0 z-[2] bg-black/55" />

      {/* Layer 3 — content card */}
      <div className="relative z-[9] mx-auto w-1/2 rounded-[2rem] bg-black/30 p-8 max-[767.98px]:px-0 max-[767.98px]:pt-16 max-[767.98px]:pb-12 max-[576px]:w-[95%]">
        <div className="dc-container">
          <div className="text-center">
            <p className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-[rgba(148,163,184,0.6)] bg-white/12 px-[0.9rem] py-[0.3rem] text-[0.75rem] font-medium text-[#e5e7eb]">
              Is it logo design you&rsquo;re looking for?
            </p>

            <h1 className="mb-4 text-[clamp(2.4rem,3.2vw,2.8rem)] leading-[1.1] font-semibold max-[767.98px]:text-[2.1rem]">
              Online <span className="text-[#ffb400]">Logo Maker</span> &amp;{" "}
              <span className="text-[#ffb400]">Custom Design Services</span>.
            </h1>

            <p className="mb-4 text-[0.98rem] opacity-90 max-[576px]:text-[1.2rem]">
              Get a Custom Logo Made in 03:00 minutes. Try Now
            </p>

            {/*
              The pencil glyph is a ::before background-image on the target; here it
              is a positioned element so the input keeps its own left padding.
            */}
            <form
              action="/web-step"
              method="get"
              className="relative mx-auto flex w-full max-w-[32.5rem] flex-wrap items-center justify-center gap-2"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-[1.8rem] left-6 z-[1] h-[23px] w-[23px] max-w-[1.325rem] -translate-y-1/2 bg-[url('/images/pencil.svg')] bg-contain bg-center bg-no-repeat max-[576px]:top-[1.4rem] max-[576px]:left-[1.3rem] max-[576px]:h-4 max-[576px]:w-4"
              />
              <label htmlFor="business_name" className="sr-only">
                Business name
              </label>
              {/*
                `bg-white` is explicit: Tailwind's preflight resets form controls
                to a transparent background, which made this field disappear into
                the dark hero instead of reading as the white pill the target has.
              */}
              <input
                type="text"
                id="business_name"
                name="business_name"
                placeholder="Enter Your Business Name"
                className="w-full rounded-[2.5rem] border-none bg-white py-[1.2rem] pr-10 pl-14 text-[#1b1b1b] outline-none max-[576px]:py-[0.8rem] max-[576px]:pr-[1.7rem] max-[576px]:pl-[3.255rem]"
              />
              <button
                type="submit"
                className="absolute right-2 rounded-[2.5rem] border-none bg-[#196BFF] px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#ffb400] hover:text-black max-[576px]:relative max-[576px]:right-0 max-[576px]:mx-auto max-[576px]:block max-[576px]:w-full"
              >
                Get&apos;s started
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
