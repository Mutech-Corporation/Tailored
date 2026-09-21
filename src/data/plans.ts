/**
 * The three main packages (homepage + top of /pricing).
 *
 * `price` is empty for now, so cards show "Get a Quote". To publish a price,
 * set it, e.g. price: "$1,499" (optionally with priceNote: "one-time").
 */
export interface Plan {
  id: string;
  tier: string;
  name: string;
  description: string;
  features: string[];
  price?: string;
  priceNote?: string;
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    tier: "Starter",
    name: "Brand Essentials",
    description: "The foundations for a new or refreshed brand.",
    features: ["Logo", "Brand colors", "Typography", "Social profile kit"],
    price: "",
  },
  {
    id: "growth",
    tier: "Growth",
    name: "Digital Launch",
    description: "Everything you need to launch online with confidence.",
    features: ["Brand identity", "Website", "Social media kit", "SEO setup"],
    price: "",
    featured: true,
  },
  {
    id: "scale",
    tier: "Scale",
    name: "Business Growth",
    description: "A complete brand, digital and AI engine for growth.",
    features: ["Branding", "Website", "SEO", "PPC", "AI chatbot", "Marketing automation"],
    price: "",
  },
];
