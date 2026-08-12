import type { ReactNode } from "react";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}

/**
 * Shared chrome for terms-and-condition and privacy-policy. The target styles
 * these with two identical rule sets under different prefixes (`.tc-*` /
 * `.pp-*`), so one component covers both.
 *
 * The hero carries `margin-top: 58px` to clear the fixed navbar — these are the
 * only pages that reserve space for it rather than sliding underneath.
 */
export function LegalPage({ eyebrow, title, intro, children }: LegalPageProps) {
  return (
    <>
      <section className="mt-[58px] border-b border-[#e5e7eb] bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] py-14 max-[767.98px]:pt-10 max-[767.98px]:pb-[2.7rem]">
        <div className="dc-container">
          {/*
            Both colours below look under-contrasted on the dark gradient, but
            they are what the target ships: the eyebrow is var(--primary-blue)
            and the intro is var(--text-muted).
          */}
          <p className="mb-[0.4rem] text-[0.78rem] font-semibold tracking-[0.18em] text-[#1769ff] uppercase">
            {eyebrow}
          </p>
          <h1 className="mb-[0.4rem] text-[2rem] font-extrabold text-white">
            {title}
          </h1>
          <p className="m-0 text-[0.95rem] text-[#6b7280]">{intro}</p>
        </div>
      </section>

      <section className="pt-12 pb-14">
        <div className="dc-container">
          <div className="mx-auto max-w-[900px] rounded-[18px] border border-[#e5e7eb] bg-white px-[2.2rem] py-8 shadow-[0_12px_35px_rgba(15,23,42,0.04)] max-[767.98px]:px-[1.4rem] max-[767.98px]:py-6">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

/** `.tc-heading` / `.pp-heading` */
export function LegalHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 text-[1.25rem] font-bold">{children}</h2>;
}

/** `.tc-subheading` / `.pp-subheading` */
export function LegalSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-[1.8rem] mb-[0.6rem] text-base font-semibold text-[#1769ff]">
      {children}
    </h3>
  );
}

/** `.tc-list` / `.pp-list` */
export function LegalList({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-[0.6rem] list-disc pl-[1.1rem] [&>li]:mb-[0.35rem] [&>li]:text-[0.95rem] [&>li]:text-[#6b7280]">
      {children}
    </ul>
  );
}

export function LegalText({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-[0.95rem] text-[#6b7280]">{children}</p>;
}

/** `.tc-note` / `.pp-note` */
export function LegalNote({ children }: { children: ReactNode }) {
  return <p className="mt-[0.8rem] text-[0.9rem] text-[#6b7280]">{children}</p>;
}

/**
 * `.tc-highlight-box` / `.pp-highlight-box`. Its background is
 * `var(--primary-blue-soft)`, a variable the site never defines — so upstream
 * the box renders transparent. Reproduced as-is.
 */
export function LegalHighlight({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-xl px-4 py-[0.9rem] text-[0.9rem] text-[#1f2933]">
      {children}
    </div>
  );
}

export function LegalDivider() {
  return <hr className="my-6 border-t border-[#e5e7eb]" />;
}
