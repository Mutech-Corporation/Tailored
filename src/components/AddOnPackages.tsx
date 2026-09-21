"use client";

import { useState } from "react";
import { PricingCard } from "@/components/PricingCard";
import type { PricingGroup } from "@/data/pricing-page";
import { cn } from "@/lib/utils";

interface AddOnPackagesProps {
  groups: PricingGroup[];
}

/** "Custom Work" add-on packages, switched by category pills. */
export function AddOnPackages({ groups }: AddOnPackagesProps) {
  const [activeId, setActiveId] = useState(groups[0]?.id ?? "");
  const group = groups.find((item) => item.id === activeId) ?? groups[0];

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Add-on categories">
        {groups.map((item) => {
          const active = item.id === group?.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.8rem] font-semibold tracking-[0.06em] transition-colors",
                active
                  ? "border-transparent bg-[linear-gradient(135deg,#2563eb,#7c3aed)] text-white shadow-[0_8px_20px_rgba(124,58,237,0.3)]"
                  : "border-[rgba(11,16,51,0.12)] bg-white text-[#374151] hover:border-[#a5b4fc] hover:text-[#2563eb]",
              )}
            >
              {item.eyebrow}
            </button>
          );
        })}
      </div>

      {group && (
        <div role="tabpanel">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h3 className="mb-2 text-[1.6rem] font-bold text-[#0b1033]">{group.title}</h3>
            <p className="text-[0.95rem] text-[#6b7280]">{group.subtitle}</p>
          </div>
          <div
            className={
              group.plans.length === 1
                ? "mx-auto max-w-md"
                : "grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4"
            }
          >
            {group.plans.map((plan) => (
              <PricingCard key={plan.packageId || plan.name} plan={plan} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
