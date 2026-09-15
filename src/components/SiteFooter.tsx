import Image from "@/components/Image";
import Link from "next/link";
import {
  EnvelopeIcon,
  LocationDotIcon,
  PhoneIcon,
} from "@/components/icons";
import { SITE, mailHref, phoneHref } from "@/config/site";
import type { FooterColumn } from "@/types";

const COLUMNS: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "AI Agent", href: "/ai-agent" },
      { label: "Web Design", href: "/web-design" },
      { label: "Logo Design", href: "/logo-design" },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Links",
    links: [
      { label: "Animation", href: "/animated-videos" },
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "Pricing", href: "/pricing" },
      { label: "Terms and Condition", href: "/terms-and-condition" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-black text-[0.9rem] text-[#f5f5f5]">
      <div className="pt-14 pb-10 max-[767.98px]:pt-[2.7rem] max-[767.98px]:pb-[2.1rem]">
        <div className="dc-container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="mb-3">
                <Link href="/">
                  <Image
                    src="/images/logo-02.svg"
                    alt="Tailored Web Designers"
                    width={220}
                    height={44}
                    className="h-auto w-3/5"
                  />
                </Link>
              </div>
              <p className="m-0 leading-[1.7] text-[#d4d4d4]">
                Our creative force is motivated by the goal of achieving digital
                excellence for your brand. Our design services are optimized to
                give your brand dominance in the digital fraternity.
              </p>
            </div>

            {COLUMNS.map((column) => (
              <div key={column.title} className="lg:col-span-2">
                <h4 className="mb-4 text-base font-bold text-white max-[767.98px]:mt-[0.8rem]">
                  {column.title}
                </h4>
                <ul className="m-0 list-none p-0">
                  {column.links.map((link) => (
                    <li key={link.label} className="[&+li]:mt-[0.35rem]">
                      <a
                        href={link.href}
                        className="text-[0.9rem] text-[#d4d4d4] no-underline hover:text-[#2f6bff]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-4">
              <h4 className="mb-4 text-base font-bold text-white max-[767.98px]:mt-[0.8rem]">
                Contact Us
              </h4>
              <ul className="m-0 list-none p-0">
                <li className="mb-[0.55rem] flex items-start gap-[0.55rem] text-[#d4d4d4]">
                  <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#111111] text-[0.9rem]">
                    <PhoneIcon />
                  </span>
                  <a
                    href={phoneHref()}
                    className="text-[#d4d4d4] no-underline hover:text-[#2f6bff]"
                  >
                    {SITE.contact.phone}
                  </a>
                </li>
                <li className="mb-[0.55rem] flex items-start gap-[0.55rem] text-[#d4d4d4]">
                  <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#111111] text-[0.9rem]">
                    <EnvelopeIcon />
                  </span>
                  <a
                    href={mailHref()}
                    className="text-[#d4d4d4] no-underline hover:text-[#2f6bff]"
                  >
                    {SITE.contact.email}
                  </a>
                </li>
                <li className="mb-[0.55rem] flex items-start gap-[0.55rem] text-[#d4d4d4]">
                  <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#111111] text-[0.9rem]">
                    <LocationDotIcon />
                  </span>
                  <span>
                    {SITE.contact.address}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#181818] bg-[#050505] py-[0.7rem] text-[0.85rem] text-[#c0c0c0] max-[767.98px]:text-center">
        <div className="dc-container">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div>
              <a
                href="/terms-and-condition"
                className="text-[#e5e5e5] no-underline hover:text-[#2f6bff]"
              >
                Terms and Condition
              </a>
              <span className="mx-2">|</span>
              <a
                href="/privacy-policy"
                className="text-[#e5e5e5] no-underline hover:text-[#2f6bff]"
              >
                Privacy Policy
              </a>
            </div>
            <div className="text-[#a3a3a3]">
              {SITE.name} &copy; {new Date().getFullYear()} All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
