/**
 * The four service groups (Creative, Digital, Growth, AI). Shared by the
 * homepage services section and the /services page.
 */
export interface ServiceItem {
  title: string;
  description: string;
  /** Detail page when one exists. */
  href?: string;
}

export interface ServiceGroup {
  id: "creative" | "digital" | "growth" | "ai";
  label: string;
  summary: string;
  items: ServiceItem[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "creative",
    label: "Creative",
    summary: "Identities and visuals that make your brand instantly recognisable.",
    items: [
      {
        title: "Brand Identity",
        description: "Colour, typography and guidelines that keep every touchpoint consistent.",
        href: "/logo-design",
      },
      {
        title: "Logo Design",
        description: "Distinctive, scalable marks built on strategy, not trends.",
        href: "/logo-design",
      },
      {
        title: "Motion & Animation",
        description: "Explainers, logo animations and motion graphics that hold attention.",
        href: "/animated-videos",
      },
      {
        title: "Social Media Design",
        description: "On-brand post, story and ad creative for every channel.",
      },
    ],
  },
  {
    id: "digital",
    label: "Digital",
    summary: "Fast, modern websites and interfaces designed to convert.",
    items: [
      {
        title: "Website Design",
        description: "Responsive, SEO-ready websites that tell your story clearly.",
        href: "/web-design",
      },
      {
        title: "E-commerce",
        description: "Online stores with smooth checkout and easy product management.",
        href: "/web-design",
      },
      {
        title: "UI/UX",
        description: "Research-led interfaces for apps, dashboards and platforms.",
      },
      {
        title: "Landing Pages",
        description: "Focused campaign pages built to turn clicks into leads.",
      },
    ],
  },
  {
    id: "growth",
    label: "Growth",
    summary: "Marketing that brings the right people to your business.",
    items: [
      {
        title: "SEO",
        description: "Technical, on-page and content SEO to get you found.",
      },
      {
        title: "Google Ads / PPC",
        description: "Paid search and display campaigns managed for return on spend.",
      },
      {
        title: "Social Media Marketing",
        description: "Content, community and paid social that grows your audience.",
      },
      {
        title: "Conversion Optimization",
        description: "Testing and UX improvements that turn more visitors into customers.",
      },
    ],
  },
  {
    id: "ai",
    label: "AI",
    summary: "Practical AI that saves time and serves customers around the clock.",
    items: [
      {
        title: "AI Chatbots",
        description: "Website and messaging chatbots trained on your business.",
        href: "/ai-agent",
      },
      {
        title: "AI Customer Support",
        description: "Instant answers, ticket triage and hand-off to your team.",
        href: "/ai-agent",
      },
      {
        title: "AI Automation",
        description: "Workflows that remove repetitive work across your tools.",
        href: "/ai-agent",
      },
      {
        title: "Custom AI Tools",
        description: "Bespoke assistants and internal tools built around your data.",
        href: "/ai-agent",
      },
    ],
  },
];
