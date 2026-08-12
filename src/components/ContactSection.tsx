"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { SelectOption } from "@/types";

const PROJECT_TYPES: SelectOption[] = [
  { value: "Logo design", label: "Logo Design" },
  { value: "Logo + branding kit", label: "Logo + Branding Kit" },
  { value: "Website design", label: "Website Design" },
  { value: "Logo + website bundle", label: "Logo + Website Bundle" },
  { value: "Social media creatives", label: "Social Media Creatives" },
];

const BUDGETS: SelectOption[] = [
  { value: "$100 – $200", label: "$100 – $200" },
  { value: "$200 – $500", label: "$200 – $500" },
  { value: "$500 – $1,000", label: "$500 – $1,000" },
  { value: "$1,000+", label: "$1,000+" },
];

const FIELD_CLASS =
  "rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-[0.6rem] text-[0.9rem] text-[#111827] shadow-none outline-none placeholder:text-[#9ca3af] focus:border-[#3b82f6] focus:bg-white focus:shadow-[0_0_0_1px_rgba(59,130,246,0.35)]";

const LABEL_CLASS =
  "text-[0.74rem] tracking-[0.14em] text-[#6b7280] uppercase";

/**
 * #contact — the target POSTs this to contact_submit.php. There is no backend
 * in the clone, so submission validates client-side and reports success without
 * a network call.
 */
interface ContactSectionProps {
  /** web-design.php reworks this heading. */
  title?: ReactNode;
  /** contact.php rewords this paragraph; every other page uses the default. */
  lead?: string;
}

const DEFAULT_TITLE = (
  <>
    Share your project brief.
    <br /> We&rsquo;ll take it from here.
  </>
);

const DEFAULT_LEAD =
  "Tell us if you need a logo, brand identity, website or full creative package. You’ll receive a tailored proposal within 24 hours.";

export function ContactSection({
  title = DEFAULT_TITLE,
  lead = DEFAULT_LEAD,
}: ContactSectionProps = {}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#1e40af_0,#020617_55%,#000_100%)] pt-20 pb-16 text-white max-[767.98px]:pt-16 max-[767.98px]:pb-[3.4rem]"
    >
      <div className="dc-container relative z-[1]">
        <div className="rounded-[28px] border border-[rgba(148,163,184,0.5)] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.25),rgba(15,23,42,0.96))] px-[2.4rem] py-[2.6rem] shadow-[0_26px_80px_rgba(0,0,0,0.75)] backdrop-blur-[16px] max-[991.98px]:px-[1.7rem] max-[991.98px]:py-[2.2rem] max-[767.98px]:px-[1.4rem] max-[767.98px]:py-8">
          <div className="grid items-start gap-6 lg:grid-cols-3">
            {/* Left — details */}
            <div>
              <p className="mb-[0.65rem] text-[0.78rem] tracking-[0.18em] text-[#93c5fd] uppercase">
                Contact us
              </p>
              <h2 className="mb-3 text-[1.9rem] font-semibold max-[991.98px]:text-[1.7rem]">
                {title}
              </h2>
              <p className="mb-6 max-w-[360px] text-[0.95rem] text-[#e5e7eb]">
                {lead}
              </p>

              <div className="mb-6 flex flex-col gap-[0.9rem]">
                <div>
                  <span className="mb-[0.12rem] block text-[0.72rem] tracking-[0.16em] text-[#9ca3af] uppercase">
                    Email
                  </span>
                  <a
                    href="mailto:info@designcentura.com"
                    className="text-[0.95rem] text-[#e5e7eb] no-underline"
                  >
                    info@designcentura.com
                  </a>
                </div>
                <div>
                  <span className="mb-[0.12rem] block text-[0.72rem] tracking-[0.16em] text-[#9ca3af] uppercase">
                    Phone
                  </span>
                  <a
                    href="tel:323-283-8729"
                    className="text-[0.95rem] text-[#e5e7eb] no-underline"
                  >
                    323-283-8729
                  </a>
                </div>
                <div>
                  <span className="mb-[0.12rem] block text-[0.72rem] tracking-[0.16em] text-[#9ca3af] uppercase">
                    Mailing Address
                  </span>
                  <span className="text-[0.95rem] text-[#e5e7eb]">
                    560 Montgomery Street, San Francisco, CA 94111
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-[0.45rem] rounded-full border border-[rgba(96,165,250,0.7)] bg-[rgba(15,23,42,0.9)] px-[0.9rem] py-[0.45rem] text-[0.8rem] text-[#dbeafe]">
                <span className="size-[7px] rounded-full bg-[#22c55e] shadow-[0_0_0_6px_rgba(34,197,94,0.25)]" />
                <span>&nbsp; Typical response time: under 24 hours</span>
              </div>
            </div>

            {/* Right — form card */}
            <div className="lg:col-span-2">
              <div className="rounded-[20px] border border-[rgba(209,213,219,0.9)] bg-white px-[1.7rem] pt-[1.8rem] pb-[1.6rem] text-[#111827] shadow-[0_20px_70px_rgba(15,23,42,0.25)]">
                <form onSubmit={handleSubmit} noValidate className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <label className={LABEL_CLASS} htmlFor="full_name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        required
                        placeholder="Please Enter Your Name"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className={LABEL_CLASS} htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Please Enter Your Email"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className={LABEL_CLASS} htmlFor="phone">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        required
                        placeholder="Please Enter Your Contact"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className={LABEL_CLASS} htmlFor="project_type">
                        Project Type
                      </label>
                      <select
                        id="project_type"
                        name="project_type"
                        required
                        defaultValue=""
                        className={`${FIELD_CLASS} pr-9`}
                      >
                        <option value="" disabled>
                          Please Select Project Type
                        </option>
                        {PROJECT_TYPES.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={LABEL_CLASS} htmlFor="project_brief">
                      Project Brief
                    </label>
                    <textarea
                      id="project_brief"
                      name="project_brief"
                      rows={4}
                      required
                      placeholder="Describe your business, style, timeline and any reference links."
                      className={`${FIELD_CLASS} min-h-[120px] resize-y`}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <label className={LABEL_CLASS} htmlFor="budget">
                        Approx. Budget (USD)
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        required
                        defaultValue=""
                        className={`${FIELD_CLASS} pr-9`}
                      >
                        <option value="" disabled>
                          Select Range
                        </option>
                        {BUDGETS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-start gap-[0.45rem] text-[0.8rem] text-[#4b5563]">
                        <input
                          id="nda"
                          name="nda"
                          type="checkbox"
                          value="1"
                          className="mt-[0.18rem] size-[15px] rounded-[4px] border-[#d1d5db] bg-white accent-[#3b82f6]"
                        />
                        <span>
                          I&rsquo;d like to sign an NDA before sharing details.
                        </span>
                      </label>
                    </div>
                  </div>

                  {status === "sent" && (
                    <div
                      role="alert"
                      className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
                    >
                      Your brief has been sent successfully.
                    </div>
                  )}
                  {status === "error" && (
                    <div
                      role="alert"
                      className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                    >
                      Please fill in all required fields correctly.
                    </div>
                  )}

                  <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                    <small className="text-[0.78rem] text-[#6b7280]">
                      No spam, no newsletters &ndash; we only email you about this
                      project.
                    </small>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="dc-submit-btn"
                    >
                      {status === "sending" ? "Sending..." : "Send project brief"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
