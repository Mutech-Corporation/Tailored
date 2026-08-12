import type { PortfolioItem, PricingPlan } from "@/types";

export interface AnimationService {
  /** Label in the section's jump list. */
  navLabel: string;
  title: string;
  description: string;
  image: string;
}

/**
 * animated-videos.php. Note that large parts of this page's source — a
 * six-card services grid and a six-step "how it works" band — are wrapped in
 * HTML comments and never render, so they are not reproduced here.
 *
 * All four service blocks genuinely share the same body copy upstream.
 */
const SHARED_SERVICE_COPY =
  "Here we ensure you get the best voice-over services from our highly qualified professionals to grab the attention of the viewers. We strive hard to deliver you effective vocals for all 2D and 3D animated explainer videos with a skillful voice that evokes the audience’s interest and makes it appealing. We have voice-over narrators who are highly proficient in creating a natural feel to the video that makes it more captivating for listeners.";

export const ANIM_SERVICES: AnimationService[] = [
  {
    navLabel: "2d Animation",
    title: "2D Animation",
    description: SHARED_SERVICE_COPY,
    image: "/images/2dani1.webp",
  },
  {
    navLabel: "3D Animation",
    title: "3D Animation",
    description: SHARED_SERVICE_COPY,
    image: "/images/3danim1.webp",
  },
  {
    // "Whiteborad" is the target's own typo in the jump list.
    navLabel: "Whiteborad Animation",
    title: "White Board Animation",
    description: SHARED_SERVICE_COPY,
    image: "/images/wh1ani.webp",
  },
  {
    navLabel: "Explainer Videos",
    title: "Explainer Video",
    description: SHARED_SERVICE_COPY,
    image: "/images/exp1.gif",
  },
];

/** The ten showcase items. Every card carries the same caption upstream. */
export const ANIM_PORTFOLIO: PortfolioItem[] = [
  { category: "animated logo", src: "/images/desd1.webp", alt: "Agora Sneakers" },
  ...Array.from({ length: 9 }, (_, i) => ({
    category: "animated logo" as const,
    src: `/images/desd${i + 2}.gif`,
    alt: "Agora Sneakers",
  })),
];

/** animated-videos.php pricing: four packages. */
export const ANIM_PRICING: PricingPlan[] = [
  {
    name: "Bronze",
    price: "$499",
    featured: false,
    packageId: "Logo Design-Bronze-USD-499-0",
    features: [
      { text: "Up to 60 seconds of animation", heading: false, noCheck: false },
      { text: "Scriptwriting support", heading: false, noCheck: false },
      { text: "Basic storyboard", heading: false, noCheck: false },
      { text: "Simple graphic elements", heading: false, noCheck: false },
      { text: "Professional voiceover", heading: false, noCheck: false },
      { text: "Royalty-free background music", heading: false, noCheck: false },
      { text: "HD output formats", heading: false, noCheck: false },
    ],
  },
  {
    name: "Silver",
    price: "$799",
    featured: false,
    packageId: "Logo Design-Silver-USD-799-0",
    features: [
      { text: "Up to 60 seconds", heading: false, noCheck: false },
      { text: "Full script development", heading: false, noCheck: false },
      { text: "Detailed storyboard", heading: false, noCheck: false },
      { text: "Enhanced illustrations", heading: false, noCheck: false },
      { text: "Professional voiceover", heading: false, noCheck: false },
      { text: "Royalty-free music", heading: false, noCheck: false },
      { text: "Multiple delivery formats", heading: false, noCheck: false },
    ],
  },
  {
    name: "Gold",
    price: "$999",
    featured: false,
    packageId: "Logo Design-Basic-USD-999-0",
    features: [
      { text: "Up to 60 seconds", heading: false, noCheck: false },
      { text: "Concept-driven script", heading: false, noCheck: false },
      { text: "Advanced storyboard", heading: false, noCheck: false },
      { text: "Custom illustrations", heading: false, noCheck: false },
      { text: "Voiceover in selected accent", heading: false, noCheck: false },
      { text: "Royalty-free soundtrack", heading: false, noCheck: false },
      { text: "HD & social formats", heading: false, noCheck: false },
    ],
  },
  {
    name: "Platinum",
    price: "$1499",
    featured: false,
    packageId: "Logo Design-Platinum-USD-1499-0",
    features: [
      { text: "Up to 60 seconds", heading: false, noCheck: false },
      { text: "Strategic scriptwriting", heading: false, noCheck: false },
      { text: "Premium storyboard", heading: false, noCheck: false },
      { text: "High-detail illustrations", heading: false, noCheck: false },
      { text: "Professional voiceover", heading: false, noCheck: false },
      { text: "Enhanced effects + transitions", heading: false, noCheck: false },
      { text: "Multiple export formats", heading: false, noCheck: false },
    ],
  },
];
