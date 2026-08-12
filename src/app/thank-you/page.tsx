import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Design Centura – Logo, Branding & Web",
  description:
    "Thank you — choose how you'd like to proceed with your Design Centura project.",
};

interface ProceedCard {
  title: string;
  description: string;
  image: string;
  cta: string;
  href: string;
}

const CARDS: ProceedCard[] = [
  {
    title: "Live Chat Support",
    description:
      "Let's talk! Share your design requirements with one of our designers to get a perfect logo that you envisioned for.",
    image: "/images/steps/chat.jpg",
    cta: "Chat With Us",
    // Upstream this opens the Zopim widget, which is out of scope — point at
    // the contact form instead of wiring a dead handler.
    href: "/contact",
  },
  {
    title: "Pricing Packages",
    description:
      "Checkout our budget friendly packages & pricing plans tailor made for startups & growing businesses of all sizes.",
    image: "/images/last-step3.webp",
    cta: "View Pricing",
    href: "/pricing",
  },
  {
    title: "Creative Portfolio",
    description:
      "Checkout our amazing logo projects that we have designed for our recent customers to give their brand an identity.",
    image: "/images/steps/portfolio.jpg",
    cta: "Visit Portfolio",
    href: "/portfolio",
  },
];

/**
 * thank-you.php — where the six-step wizard lands after submission.
 *
 * This page uses its own flat blue gradient rather than the radial one the rest
 * of the site shares.
 */
export default function ThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[linear-gradient(135deg,#1e3a8a_0%,#3b82f6_50%,#1e40af_100%)] px-20 py-28 max-[768px]:px-0 max-[768px]:pt-24 max-[768px]:pb-16">
        <div className="dc-container">
          <h1 className="mb-[50px] text-center text-[2.5rem] font-bold text-white max-[768px]:mb-[30px] max-[768px]:p-5 max-[768px]:text-[1.5rem]">
            Thank You, How Would You Like To Proceed?
          </h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <article
                key={card.title}
                className="group flex h-full flex-col overflow-hidden rounded-[15px] border-none bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-[transform,box-shadow] duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
              >
                <div className="w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-grow flex-col p-[25px]">
                  <h3 className="mb-3 text-[1.4rem] font-bold">{card.title}</h3>
                  <p className="mb-[25px] flex-grow text-[0.95rem] leading-[1.6] text-[#6b7280]">
                    {card.description}
                  </p>
                  <a
                    href={card.href}
                    className="block w-full rounded-full border-none bg-[linear-gradient(135deg,#3b82f6_0%,#1e40af_100%)] px-[30px] py-[15px] text-center text-base font-semibold text-white no-underline transition-all duration-300"
                  >
                    {card.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
