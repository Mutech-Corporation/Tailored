"use client";

import { useEffect, useState } from "react";
import Image from "@/components/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { assetPath } from "@/lib/asset-path";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "AI Agent", href: "/ai-agent" },
  { label: "Logo Design", href: "/logo-design" },
  { label: "Web Design", href: "/web-design" },
  { label: "Animation", href: "/animated-videos" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

/*
 * The target ships `data-bs-spy="scroll"`, but every nav link points at a
 * separate page rather than a `#hash`, so Bootstrap's ScrollSpy never matches
 * anything and is effectively inert. What actually highlights a link upstream
 * is a small script that compares each href against the current path.
 *
 * An earlier version of this component drove the highlight from an
 * IntersectionObserver over the homepage's section ids, which lit up the wrong
 * item on inner pages (scrolling past `#about` on /pricing highlighted "About
 * Us") and never marked the current page. Matching on pathname is both correct
 * and what the target does.
 */

function navLinkClassName(isActive: boolean, scrolled: boolean): string {
  return cn(
    "px-2 py-2 text-[14px] font-normal uppercase max-[1024px]:whitespace-nowrap max-[1024px]:text-[12px]",
    // Desktop (>=992px): color depends on scroll + active state.
    scrolled
      ? isActive
        ? "lg:text-[#196bff]"
        : "lg:text-black"
      : isActive
        ? "lg:text-[#ffb400]"
        : "lg:text-white",
    // Phone drawer (<768px): the target forces white links / amber active with
    // `!important` once scrolled, and the drawer stays blue — so colors are
    // constant here regardless of scroll state.
    isActive ? "max-[767.98px]:text-[#ffb400]" : "max-[767.98px]:text-white",
    // Tablet drawer (768–991.98px): `.scrolled1` turns the drawer white, so the
    // links follow the same scroll logic as desktop.
    scrolled
      ? isActive
        ? "min-[768px]:max-[991.98px]:text-[#196bff]"
        : "min-[768px]:max-[991.98px]:text-black"
      : isActive
        ? "min-[768px]:max-[991.98px]:text-[#ffb400]"
        : "min-[768px]:max-[991.98px]:text-white",
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Trigger scrolled mode on ANY scroll, not a threshold. Evaluate once on
  // mount so a restored scroll position renders correctly.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force the drawer closed once the viewport grows back into desktop range.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close the drawer on Escape.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header
      id="mainNav"
      className={cn(
        "fixed inset-x-0 top-0 z-[1050] py-2",
        scrolled ? "bg-white shadow-[1px_1px_17px_#00000014]" : "bg-transparent",
      )}
    >
      <div className="dc-container flex items-center justify-between">
        <Link href="/" className="relative z-10 flex items-center">
          <Image
            src="/images/logo-03.svg"
            alt="Designcentura"
            width={200}
            height={40}
            priority
            className={cn("h-auto w-full max-w-[200px]", scrolled ? "hidden" : "block")}
          />
          <Image
            src="/images/logo-01.svg"
            alt="Designcentura"
            width={200}
            height={40}
            priority
            className={cn(
              "h-auto w-full max-w-[200px] max-[1024px]:max-w-[169px]",
              scrolled ? "block" : "hidden",
            )}
          />
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navbarNav"
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "relative z-[1060] flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden",
            scrolled && "bg-[#196bff]",
          )}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>

        {open && (
          <div
            className="fixed inset-0 z-[1039] bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}

        <nav
          id="navbarNav"
          className={cn(
            "flex items-center gap-1",
            "max-[991.98px]:fixed max-[991.98px]:top-0 max-[991.98px]:left-0 max-[991.98px]:z-[1040] max-[991.98px]:h-[100vh] max-[991.98px]:w-[260px] max-[991.98px]:flex-col max-[991.98px]:items-start max-[991.98px]:justify-start max-[991.98px]:gap-0 max-[991.98px]:bg-[#196bff] max-[991.98px]:px-6 max-[991.98px]:pt-[70px] max-[991.98px]:transition-transform max-[991.98px]:duration-300 max-[991.98px]:ease-in-out",
            // `.scrolled1` — the drawer goes white once scrolled, but only above
            // the 767.98px phone breakpoint, where a later rule forces it blue again.
            scrolled && "min-[768px]:max-[991.98px]:bg-white",
            open ? "max-[991.98px]:translate-x-0" : "max-[991.98px]:-translate-x-full",
          )}
        >
          {open && (
            /*
             * `.mobile-whitelogo` / `.sidebarblacklogo` — the target keeps both in
             * the DOM and lets CSS pick one. The dark mark is needed in the
             * 768–991.98px band once scrolled, where the drawer turns white.
             */
            <Image
              src={
                scrolled
                  ? "/images/logo-01.svg"
                  : "/images/logo-02.svg"
              }
              alt="Designcentura"
              width={200}
              height={40}
              className={cn(
                "mb-6 h-auto w-full max-w-[190px] lg:hidden max-[650px]:mt-[-3rem] max-[650px]:mb-8 max-[650px]:max-w-[190px]",
                // Below 768px the drawer stays blue, so invert the dark mark back
                // to white — mirroring the target's filter on `.sidebarblacklogo`.
                scrolled && "max-[767.98px]:brightness-0 max-[767.98px]:invert",
              )}
            />
          )}
          <ul className="flex items-center gap-1 max-[991.98px]:w-full max-[991.98px]:flex-col max-[991.98px]:items-start max-[991.98px]:gap-1">
            {NAV_LINKS.map((link) => {
              const normalizedPathname = pathname.replace(BASE_PATH, "") || "/";
              const isActive = normalizedPathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={navLinkClassName(isActive, scrolled)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
