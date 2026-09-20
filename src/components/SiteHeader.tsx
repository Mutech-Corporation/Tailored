"use client";

import { useEffect, useState } from "react";
import Image from "@/components/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface HeaderLink extends NavLink {
  /** Other paths that should light this item up (e.g. service detail pages). */
  also?: string[];
}

const NAV_LINKS: HeaderLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    also: ["/logo-design", "/web-design", "/animated-videos"],
  },
  { label: "Work", href: "/portfolio" },
  { label: "AI Solutions", href: "/ai-agent" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const CTA = { label: "Start a Project", href: "/contact" };

/** Strips the deploy base path and trailing slash so hrefs compare cleanly. */
function normalize(pathname: string): string {
  const withoutBase = pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length)
    : pathname;
  return withoutBase.replace(/\/+$/, "") || "/";
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const current = normalize(usePathname());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the drawer when the viewport grows back into desktop range.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const isActive = (link: HeaderLink) =>
    current === link.href || (link.also?.includes(current) ?? false);

  return (
    <header
      id="mainNav"
      className={cn(
        "fixed inset-x-0 top-0 z-[1050] transition-[background-color,box-shadow,padding] duration-200",
        scrolled
          ? "bg-white py-2 shadow-[0_6px_24px_rgba(11,16,51,0.08)]"
          : "bg-transparent py-4",
      )}
    >
      <div className="dc-container flex items-center justify-between gap-4">
        <Link href="/" className="relative z-10 flex shrink-0 items-center">
          <Image
            src={scrolled ? "/brand/logo-horizontal.png" : "/brand/logo-horizontal-light.png"}
            alt={SITE.name}
            width={234}
            height={40}
            priority
            className="h-9 w-auto max-[400px]:h-7"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-[14px] font-medium whitespace-nowrap transition-colors",
                      scrolled
                        ? active
                          ? "text-[#2563eb]"
                          : "text-[#111633] hover:text-[#2563eb]"
                        : active
                          ? "text-white"
                          : "text-white/75 hover:text-white",
                      active &&
                        "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[linear-gradient(90deg,#2563eb,#7c3aed)]",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={CTA.href} className="dc-submit-btn ml-3 whitespace-nowrap shadow-[0_8px_24px_rgba(124,58,237,0.35)]">
            {CTA.label}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobileNav"
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "relative z-[1060] flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
            scrolled || open ? "bg-[#0b1033] text-white" : "bg-white/10 text-white",
          )}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[1039] bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav
        id="mobileNav"
        aria-label="Main"
        className={cn(
          "fixed top-0 left-0 z-[1040] flex h-[100dvh] w-[280px] flex-col bg-[#0b1033] px-6 pt-6 pb-8 text-white transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Image
          src="/brand/logo-horizontal-light.png"
          alt={SITE.name}
          width={234}
          height={40}
          className="mb-8 h-8 w-auto self-start"
        />
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-[15px] font-medium",
                    active ? "bg-white/10 text-white" : "text-white/75 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href={CTA.href}
          onClick={() => setOpen(false)}
          className="dc-submit-btn mt-6 text-center"
        >
          {CTA.label}
        </Link>
      </nav>
    </header>
  );
}
