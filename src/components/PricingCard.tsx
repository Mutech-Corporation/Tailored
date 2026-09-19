import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types";

interface PricingCardProps {
  plan: PricingPlan;
}

/**
 * Shared by the homepage's tabbed pricing and the standalone /pricing page.
 *
 * Featured cards sit 6px higher at rest and need `overflow: visible` so the
 * "Recommended" pill can hang above the border. That pill is a real element
 * here; the target draws it with `::before` — and its content is the last of
 * three competing declarations, which is why it reads "Recommended" rather
 * than the "Most Popular" ribbon the two earlier rules describe.
 */
export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={cn(
        // Border colour changes on hover (not width), so nothing shifts.
        "tw-lift flex flex-col rounded-[20px] border border-[rgba(37,99,235,0.3)] bg-white px-[1.7rem] py-[2.1rem]",
        "shadow-[0_16px_40px_rgba(15,23,42,0.12)] hover:border-[#1d4ed8]",
        "max-[767.98px]:px-[1.4rem] max-[767.98px]:py-[1.8rem]",
        plan.featured &&
          "!border-2 !border-[#1d4ed8] -translate-y-1.5",
      )}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 z-[3] -translate-x-1/2 rounded-full bg-[#1d4ed8] px-3.5 py-1 text-[0.72rem] tracking-[0.15em] whitespace-nowrap text-white uppercase shadow-[0_6px_14px_rgba(29,78,216,0.28)]">
          Recommended
        </span>
      )}

      <p className="mb-[0.1rem] text-[0.92rem] font-bold tracking-[0.16em] text-[#7c3aed] uppercase">
        {plan.name}
      </p>
      <p className="mb-[0.8rem] text-[1.7rem] font-semibold text-[#1d4ed8]">
        {plan.price}
      </p>

      <ul className="m-0 mb-[1.3rem] list-none p-0 text-[0.9rem] text-[#4b5563]">
        {plan.features.map((feature, index) => (
          <li
            key={`${feature.text}-${index}`}
            className="mb-[0.35rem] flex gap-[0.45rem]"
          >
            {/*
              `heading` and `noCheck` are independent flags. The source is
              inconsistent — some bold group headers still show a tick — so they
              are followed literally rather than normalised.
            */}
            {!feature.noCheck && (
              <span className="mt-[0.1rem] text-[0.8rem] text-[#1D4ED8]">✔</span>
            )}
            {feature.heading ? (
              <b>{feature.text}</b>
            ) : (
              <span>{feature.text}</span>
            )}
          </li>
        ))}
      </ul>

      <Link
        href="/contact?plan=custom"
        data-package={plan.packageId}
        className="mt-auto block w-full rounded-full border border-[#1d4ed8] bg-[#1d4ed8] px-[1.3rem] py-[0.7rem] text-center text-[0.82rem] font-semibold tracking-[0.12em] text-white uppercase transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#7c3aed] hover:bg-[#7c3aed]"
      >
        Get Started
      </Link>
    </div>
  );
}
