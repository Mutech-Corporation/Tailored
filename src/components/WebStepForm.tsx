"use client";

import { useState, type FormEvent } from "react";
import Image from "@/components/Image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@/components/icons";
import { INDUSTRIES, INDUSTRY_PLACEHOLDER } from "@/data/industries";

interface FormValues {
  company_name: string;
  slogan: string;
  industry: string;
  keyword: string;
  email: string;
  phone: string;
}

interface Step {
  title: string;
  name: keyof FormValues;
  type: "text" | "email" | "tel" | "select";
  placeholder: string;
}

/** Six steps, titles and placeholders verbatim from web-step.php. */
const STEPS: Step[] = [
  { title: "Enter Your Company Name", name: "company_name", type: "text", placeholder: "Company Name" },
  { title: "Enter Slogan", name: "slogan", type: "text", placeholder: "Slogan (optional)" },
  { title: "Select Industry", name: "industry", type: "select", placeholder: INDUSTRY_PLACEHOLDER },
  { title: "Enter Your Keyword", name: "keyword", type: "text", placeholder: "Your Keyword" },
  { title: "Enter Your Email Address", name: "email", type: "email", placeholder: "Your Email Address" },
  { title: "Enter Your Phone Number (Optional)", name: "phone", type: "tel", placeholder: "Phone Number (Optional)" },
];

/** `.form-control-custom` / `.form-select-custom` */
const FIELD_CLASS =
  "w-full rounded-[15px] border-2 border-white/30 bg-white/15 px-[25px] py-[18px] text-[1.1rem] text-white backdrop-blur-[10px] transition-all duration-300 outline-none placeholder:text-white/70 focus:border-white focus:bg-white/25 focus:shadow-[0_0_20px_rgba(255,255,255,0.3)] max-[768px]:px-5 max-[768px]:py-[15px] max-[768px]:text-base";

/** `.nav-arrow` */
const ARROW_CLASS =
  "flex size-[60px] items-center justify-center rounded-full border-2 border-white/40 bg-white/20 text-[1.5rem] text-white backdrop-blur-[10px] transition-all duration-300 hover:scale-110 hover:bg-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-white/20 disabled:hover:shadow-none max-[768px]:size-[50px] max-[768px]:text-[1.2rem] max-[576px]:size-[45px]";

/**
 * web-step.php — a full-screen six-step wizard.
 *
 * Each step upstream is its own `.step-container` occupying the whole viewport,
 * with the logo top-left, the field centred, chevron arrows pinned to the
 * vertical middle at the screen edges, and dots along the bottom. It carries no
 * site header or footer.
 *
 * The page's timer widget and its "Step N of 6" pill are both commented out in
 * the source, so neither is reproduced.
 */
export function WebStepForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [index, setIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<FormValues>({
    // The homepage hero hands the typed name over as a query param.
    company_name: searchParams.get("business_name") ?? "",
    slogan: "",
    industry: "",
    keyword: "",
    email: "",
    phone: "",
  });

  const step = STEPS[index];
  const isLast = index === STEPS.length - 1;

  const setValue = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  /** Only step 5 (email) is validated upstream. */
  const validate = () => {
    if (index !== 4) return true;
    const email = values.email.trim();
    if (!email) {
      setError("Please enter your email address.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    if (isLast) {
      // The target POSTs to its CRM and then lands on thank-you.php.
      router.push("/thank-you");
      return;
    }
    setIndex((current) => current + 1);
  };

  return (
    <form
      id="multiStepForm"
      onSubmit={handleSubmit}
      noValidate
      className="relative flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,#3a8dff_0,#0340b3_45%,#02142e_100%)] text-white"
    >
      {/* .header-section */}
      <div className="flex items-center justify-between px-[30px] py-5 max-[768px]:px-5 max-[768px]:py-[15px] max-[576px]:px-[15px] max-[576px]:py-3">
        <Link href="/">
          <Image
            src="/images/logo-02.svg"
            alt="Design Centura logo"
            width={200}
            height={40}
            priority
            className="h-auto w-full max-w-[200px]"
          />
        </Link>
      </div>

      {/* .main-content */}
      <div className="flex flex-1 items-center justify-center p-5">
        <div className="w-full max-w-[600px] text-center">
          <h2 className="mb-[30px] text-[2rem] font-semibold [text-shadow:2px_2px_4px_rgba(0,0,0,0.2)] max-[768px]:mb-[25px] max-[768px]:text-[1.5rem] max-[576px]:text-[1.3rem]">
            {step.title}
          </h2>

          {step.type === "select" ? (
            <div className="relative">
              <select
                name={step.name}
                value={values.industry}
                onChange={(event) => setValue("industry", event.target.value)}
                className={`${FIELD_CLASS} cursor-pointer appearance-none pr-12 [&>option]:bg-[#1e3a8a] [&>option]:text-white`}
              >
                <option value="">{step.placeholder}</option>
                {INDUSTRIES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-white"
              />
            </div>
          ) : (
            <input
              type={step.type}
              name={step.name}
              value={values[step.name]}
              placeholder={step.placeholder}
              onChange={(event) => setValue(step.name, event.target.value)}
              className={FIELD_CLASS}
            />
          )}

          {error && (
            <p role="alert" className="mt-4 text-sm text-[#ffb400]">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* .navigation-section — pinned to the vertical middle, edge to edge */}
      <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-between px-6">
        <button
          type="button"
          aria-label="Previous step"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(current - 1, 0))}
          className={ARROW_CLASS}
        >
          <ChevronDownIcon className="size-6 rotate-90" />
        </button>
        <button type="submit" aria-label={isLast ? "Submit" : "Next step"} className={ARROW_CLASS}>
          <ChevronDownIcon className="size-6 -rotate-90" />
        </button>
      </div>

      {/* .step-indicator */}
      <div className="pb-[30px] text-center">
        <div className="mt-[15px] flex justify-center gap-3">
          {STEPS.map((item, dotIndex) => (
            <span
              key={item.name}
              aria-hidden
              className={`size-3 rounded-full transition-all duration-300 ${
                dotIndex === index
                  ? "scale-[1.3] bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </form>
  );
}
