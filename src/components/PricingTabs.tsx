"use client";

import { useState } from "react";
import { PricingCard } from "@/components/PricingCard";
import type { PricingTab } from "@/types";

interface PricingTabsProps {
  tabs: PricingTab[];
}

/**
 * Pill-switched pricing panes. The target declares no transition between panes,
 * so the swap is instant.
 */
export function PricingTabs({ tabs }: PricingTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <>
      <div className="mb-10 flex justify-center">
        <div className="dc-pill-bar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className="dc-pill"
              data-active={activeId === tab.id}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
        {current?.plans.map((plan) => (
          <PricingCard key={plan.packageId || plan.name} plan={plan} />
        ))}
      </div>
    </>
  );
}
