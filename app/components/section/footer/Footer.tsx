"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoMail } from "react-icons/io5";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { site } from "@/data";

const socialIcons: Record<string, ReactNode> = {
  facebook: <FaFacebookF size={16} />,
  instagram: <FaInstagram size={16} />,
  linkedin: <FaLinkedinIn size={16} />,
  youtube: <FaYoutube size={16} />,
};

const contactIcons: Record<string, ReactNode> = {
  "map-pin": <FaMapMarkerAlt size={16} />,
  phone: <FaPhoneAlt size={16} />,
  mail: <IoMail size={16} />,
  clock: <GoClockFill size={16} />,
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
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_auto_1.4fr]">
        {/* Brand */}
        <div className="sm:border-r sm:border-r-[#033044]">
          <Link href="/" aria-label={footer.logoAlt}>
            <Image
              src="/logo.png"
              alt={footer.logoAlt}
              width={200}
              height={60}
              className="h-14 w-auto sm:h-16 lg:h-20"
            />
          </Link>
          <p className="mt-0 max-w-[260px] text-sm leading-relaxed text-white">
            {footer.desc}
          </p>
        </div>

        {/* Link columns */}
        <div className="lg:justify-self-center">
          <h3 className="relative mb-5 pb-3 text-lg font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-[#fdb913]">
            {footer.columns.length === 2 ? "Useful Links" : footer.columns[0]?.title}
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
            {footer.columns.flatMap((col) => col.links).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1.5 text-sm text-white transition-all duration-300 hover:translate-x-1 hover:text-[#fdb913]"
              >
                <ChevronRight size={14} className="text-[#fdb913]" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

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
                className="flex h-9 w-9 items-center justify-center rounded-full text-white border border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:bg-[#fdb913] hover:text-[#06194a]"
              >
                {socialIcons[s.label] || null}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#08244e]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-white/80 sm:flex-row sm:text-[15px]">
          <p>
            {footer.copyright.prefix} {footer.copyright.brand}
            {footer.copyright.suffix}
          </p>
        </div>
      </div>
    </footer>
  );
}