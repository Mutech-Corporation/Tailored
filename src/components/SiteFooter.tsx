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
    title: "Services",
    links: [
      { label: "Brand Identity", href: "/logo-design" },
      { label: "Website Design", href: "/web-design" },
      { label: "Motion & Animation", href: "/animated-videos" },
      { label: "AI Solutions", href: "/ai-agent" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/portfolio" },
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#0b1033] text-[0.9rem] text-[#f5f5f5]">
      <div className="pt-14 pb-10 max-[767.98px]:pt-[2.7rem] max-[767.98px]:pb-[2.1rem]">
        <div className="dc-container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="mb-3">
                <Link href="/">
                  <Image
                    src="/brand/logo-horizontal-light.png"
                    alt="Tailored Web Designers"
                    width={258}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>
              <p className="m-0 leading-[1.7] text-[#d4d4d4]">
                Branding, websites, AI automation, video, SEO and digital
                marketing, all under one creative team.
              </p>
              <p className="mt-3 text-[0.72rem] font-semibold tracking-[0.3em] text-[#c4b5fd] uppercase">
                {SITE.tagline}
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
                      <Link
                        href={link.href}
                        className="text-[0.9rem] text-[#d4d4d4] no-underline hover:text-[#8b5cf6]"
                      >
                        {link.label}
                      </Link>
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
                  <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.9rem]">
                    <PhoneIcon />
                  </span>
                  <a
                    href={phoneHref()}
                    className="text-[#d4d4d4] no-underline hover:text-[#8b5cf6]"
                  >
                    {SITE.contact.phone}
                  </a>
                </li>
                <li className="mb-[0.55rem] flex items-start gap-[0.55rem] text-[#d4d4d4]">
                  <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.9rem]">
                    <EnvelopeIcon />
                  </span>
                  <a
                    href={mailHref()}
                    className="text-[#d4d4d4] no-underline hover:text-[#8b5cf6]"
                  >
                    {SITE.contact.email}
                  </a>
                </li>
                <li className="mb-[0.55rem] flex items-start gap-[0.55rem] text-[#d4d4d4]">
                  <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.9rem]">
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

      <div className="border-t border-white/10 bg-[#070a24] py-[0.7rem] text-[0.85rem] text-[#c0c0c0] max-[767.98px]:text-center">
        <div className="dc-container">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div>
              <Link
                href="/terms-and-condition"
                className="text-[#e5e5e5] no-underline hover:text-[#8b5cf6]"
              >
                Terms and Condition
              </Link>
              <span className="mx-2">|</span>
              <Link
                href="/privacy-policy"
                className="text-[#e5e5e5] no-underline hover:text-[#8b5cf6]"
              >
                Privacy Policy
              </Link>
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
