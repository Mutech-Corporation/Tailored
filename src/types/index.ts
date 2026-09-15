import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export type PortfolioCategory = "logo" | "branding" | "web" | "animated logo";

export interface PortfolioItem {
  category: PortfolioCategory;
  src: string;
  alt: string;
}

export interface PortfolioFilter {
  label: string;
  /** "all" is the pseudo-category that clears the filter. */
  category: PortfolioCategory | "all";
}

export interface FaqItem {
  id: string;
  question: string;
  /** Rendered as rich text — the source wraps key phrases in <strong>. */
  answer: ReactNode;
}

export interface PricingFeature {
  text: string;
  /** Bold group header such as "More Features:". */
  heading: boolean;
  /** `li.not` — suppresses the ✔ bullet. */
  noCheck: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: PricingFeature[];
  /** Renders the "Recommended" pill and the raised resting position. */
  featured: boolean;
  /** Verbatim `data-package` value from the target's Buy Now button. */
  packageId: string;
}

export type PricingTabId = "logo" | "branding" | "web" | "bundle";

export interface PricingTab {
  id: PricingTabId;
  label: string;
  plans: PricingPlan[];
}

export interface ContactInfo {
  label: string;
  value: string;
  href?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
