"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { getHeaderNav, site } from "@/data"; 

const YELLOW = "#fdb913";

export default function SecurityHeader() {
  const pathname = usePathname();
  const { topbar, header } = site;
  const nav = getHeaderNav();
  const button = header.buttons[0];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* sticky background after scrolling past the topbar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close drawer on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* lock body scroll + Esc to close */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Wrapper is fixed so topbar + header stay pinned while scrolling (hero needs ~ pt-32 so content clears it) */}
      <div className="fixed inset-x-0 top-0 z-50">
        {/*  Topbar  */}
        <div className="border-b  border-white/10 bg-[#11203d] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:text-[13px]">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href={topbar.emailHref}
                className="hidden sm:text-base text-sm border-r pr-5 border-white/40 text-lg items-center gap-2 transition-colors hover:text-[#fdb913] sm:flex"
              >
                <Mail size={20} className="text-[#ffffff]" />
                {topbar.email}
              </a>
              <a
                href={topbar.phoneHref}
                className="flex sm:text-base text-sm items-center gap-2 transition-colors hover:text-[#fdb913]"
              >
                <Phone size={20} className="text-[#fcfcfc]" />
                {topbar.phone}
              </a>
            </div>
            <div className="flex sm:text-base text-sm items-center gap-2">
              <Clock size={20} className="text-[#fcfbf9]" />
              <span>{topbar.supportText}</span>
            </div>
          </div>
        </div>

        {/* ───────── Header (transparent, turns navy when scrolled) ───────── */}
        <header
          className={`z-50 w-full transition-all duration-300 ${
            scrolled
              ? "bg-[#06194a]/95 shadow-lg backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
            {/* Logo */}
            <Link href="/" aria-label={header.site.logo.alt} className="shrink-0">
              <Image
                src="/logo.png"
                alt={header.site.logo.alt}
                width={190}
                height={56}
                priority
                className="h-14 w-auto sm:h-16 lg:h-20"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:block" aria-label="Main navigation">
              <ul className="flex items-center gap-8 text-sm md:text-lg font-semibold text-white">
                {nav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.label} className="group relative">
                      <Link
                        href={item.href}
                        className={`relative flex items-center gap-1 py-2 transition-colors hover:text-[#fdb913] ${
                          active ? "text-[#fdb913]" : ""
                        }`}
                      >
                        {item.label}
                        {/* {item.children && (
                          <ChevronDown
                            size={14}
                            className="transition-transform duration-300 group-hover:rotate-180"
                          />
                        )} */}
                        <span
                          className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#fdb913] transition-all duration-300 ${
                            active ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </Link>

                      {/* {item.children && (
                        <ul className="invisible absolute left-0 top-full z-50 w-72 translate-y-2 rounded-lg border border-white/10 bg-[#06194a] py-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-5 py-2.5 text-[13px] text-white/90 transition-colors hover:bg-white/5 hover:pl-6 hover:text-[#fdb913]"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )} */}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right side: CTA + menu icon */}
            <div className="flex items-center gap-3">
              <Link
                href={button.href}
                className="hidden items-center gap-2 rounded-full bg-[#fdb913] px-5 py-2.5 text-sm lg:text-lg font-semibold text-[#06194a] shadow-md transition-all duration-300 hover:bg-white sm:inline-flex"
              >
                {button.label}
                <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={header.mobileMenu.openLabel}
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-[#fdb913] hover:text-[#06194a] xl:hidden"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* ───────── Mobile / tablet drawer (outside header so backdrop-blur can't trap it) ───────── */}
      <div
        className={`fixed inset-0 z-[100] xl:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel slides in from the left */}
        <aside
          className={`absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-gradient-to-b from-[#0a2f8f] to-[#06194a] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Image
              src="/logo.png"
              alt={header.site.logo.alt}
              width={160}
              height={48}
              className="h-11 w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={header.mobileMenu.closeLabel}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/30 text-white transition-colors hover:bg-[#fdb913] hover:text-[#06194a]"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="space-y-1">
              {nav.map((item, i) => {
                const active = isActive(item.href);
                const isOpen = expanded === item.label;
                return (
                  <li
                    key={item.label}
                    style={{ transitionDelay: open ? `${150 + i * 50}ms` : "0ms" }}
                    className={`border-b border-white/10 transition-all duration-500 ${
                      open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={`flex-1 py-3 text-[15px] font-medium transition-colors hover:text-[#fdb913] ${
                          active ? "text-[#fdb913]" : "text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          aria-label={`Toggle ${item.label}`}
                          aria-expanded={isOpen}
                          className="flex h-9 w-9 items-center justify-center text-white"
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-[#fdb913]" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {item.children && (
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <ul className="overflow-hidden pl-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block border-l border-white/20 py-2 pl-4 text-sm text-white/80 transition-colors hover:border-[#fdb913] hover:text-[#fdb913]"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-4 border-t border-white/10 px-5 py-5">
            <Link
              href={button.href}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#fdb913] px-5 py-3 text-sm font-semibold text-[#06194a] transition-colors hover:bg-white"
            >
              {button.label}
              <ArrowRight size={16} />
            </Link>
            <div className="space-y-2 text-sm text-white/80">
              <a href={topbar.phoneHref} className="flex items-center gap-2 hover:text-[#fdb913]">
                <Phone size={14} style={{ color: YELLOW }} />
                {topbar.phone}
              </a>
              <a href={topbar.emailHref} className="flex items-center gap-2 hover:text-[#fdb913]">
                <Mail size={14} style={{ color: YELLOW }} />
                {topbar.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}