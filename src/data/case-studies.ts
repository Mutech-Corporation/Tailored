/**
 * Homepage "Selected Work" case studies.
 *
 * PLACEHOLDERS — replace brand, challenge, build and result with real projects
 * (and add an `image` path under public/ if you have one).
 */
export interface CaseStudy {
  number: string;
  title: string;
  /** Services delivered, shown as tags. */
  services: string[];
  brand: string;
  challenge: string;
  built: string;
  result: string;
  image?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    number: "01",
    title: "Brand Transformation",
    services: ["Logo", "Website", "Marketing"],
    brand: "Client name — industry",
    challenge: "An outdated identity and website that no longer reflected the business or attracted the right customers.",
    built: "A new brand identity, a conversion-focused website and a launch campaign across social and search.",
    result: "Add the measurable outcome here, e.g. growth in enquiries or traffic.",
  },
  {
    number: "02",
    title: "AI Customer Assistant",
    services: ["AI Chatbot", "Automation", "Dashboard"],
    brand: "Client name — industry",
    challenge: "A support team overwhelmed by repetitive questions and slow response times outside business hours.",
    built: "A 24/7 AI chatbot trained on company knowledge, automated ticket routing and a reporting dashboard.",
    result: "Add the measurable outcome here, e.g. response time or tickets resolved automatically.",
  },
  {
    number: "03",
    title: "E-commerce Growth",
    services: ["Website", "SEO", "PPC"],
    brand: "Client name — industry",
    challenge: "An online store with steady traffic but low conversions and rising advertising costs.",
    built: "A faster, redesigned storefront, technical and on-page SEO, and restructured Google Ads campaigns.",
    result: "Add the measurable outcome here, e.g. conversion rate or return on ad spend.",
  },
];
