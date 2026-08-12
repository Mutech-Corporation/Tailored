"use client";

import { useState } from "react";
import { PRICING_TABS } from "@/data/pricing";
import { PricingCard } from "@/components/PricingCard";
import type { PricingTabId } from "@/types";

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<PricingTabId>("logo");

  const currentTab = PRICING_TABS.find((tab) => tab.id === activeTab) ?? PRICING_TABS[0];

  return (
    <section id="pricing" className="bg-[#f5f6fb] py-[4.5rem]">
      <div className="dc-container">
        <div className="mx-auto mb-6 w-full text-center lg:max-w-[66%]">
          <p className="dc-eyebrow">Pricing</p>
          <h2 className="dc-section-title">Plans &amp; Pricing</h2>
          <p className="dc-section-subtitle">
            Get high-quality design and development services at fair prices, built to
            increase your business value.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="dc-pill-bar">
            {PRICING_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className="dc-pill"
                data-active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
          {currentTab.plans.map((plan) => (
            <PricingCard key={plan.packageId} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
