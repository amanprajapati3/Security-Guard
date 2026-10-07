"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/data";

/* Inline brand icons (no dependency on lucide brand icons) */
const socialIcons: Record<string, ReactNode> = {
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  youtube: (
    <>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
};

const contactIcons: Record<string, ReactNode> = {
  "map-pin": <MapPin size={16} />,
  phone: <Phone size={16} />,
  mail: <Mail size={16} />,
  clock: <Clock size={16} />,
};

export default function SecurityFooter() {
  const { footer } = site;

  return (
    <footer className="relative isolate overflow-hidden text-white">
      {/* Background image (full width) */}
      <Image src={footer.bgImage} alt="" fill sizes="100vw" className="-z-30 object-cover" />
      {/* Blue gradient cover */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-l from-[#041627]/95 via-[#041627]/95 to-[#030d2b]/95" />
      {/* Soft yellow glow, top-left */}
      <div className="absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#fdb913]/10 blur-3xl" />

      {/* Main grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
        {/* Brand */}
        <div>
          <Link href="/" aria-label={footer.logoAlt}>
            <Image
              src="/logo.png"
              alt={footer.logoAlt}
              width={200}
              height={60}
              className="h-14 w-auto md:h-24"
            />
          </Link>
          <p className="mt-0 max-w-xs text-sm leading-relaxed text-white">
            {footer.desc}
          </p>
        </div>

        {/* Link columns */}
        {footer.columns.map((col) => (
          <div key={col.title}>
            <h3 className="relative mb-5 pb-3 text-lg font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-[#fdb913]">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-white transition-all duration-300 hover:translate-x-1 hover:text-[#fdb913]"
                  >
                    <ChevronRight size={14} className="text-[#fdb913]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h3 className="relative mb-5 pb-3 text-lg font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-[#fdb913]">
            {footer.footerContact.title}
          </h3>
          <ul className="space-y-4">
            {footer.footerContact.items.map((item) => (
              <li key={item.icon} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-l-2 border-l-white bg-blue-500 text-[#fdb913]">
                  {contactIcons[item.icon]}
                </span>
                <div className="pt-0.5 text-sm leading-relaxed text-white">
                  {item.lines.map((line) =>
                    "href" in line && line.href ? (
                      <a
                        key={line.text}
                        href={line.href}
                        className="block transition-colors hover:text-[#fdb913]"
                      >
                        {line.text}
                      </a>
                    ) : (
                      <span key={line.text} className="block">
                        {line.text}
                      </span>
                    ),
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Social */}
          <div className="mt-6 flex items-center gap-3">
            {footer.socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full  text-white border border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:bg-[#fdb913] hover:text-[#06194a]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {socialIcons[s.label]}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#031244]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-white/80 sm:flex-row sm:text-[13px]">
          <p>
            {footer.copyright.prefix} {footer.copyright.brand}
            {footer.copyright.suffix}
          </p>
        </div>
      </div>
    </footer>
  );
}