"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LuPhone,
  LuMail,
  LuMapPin,
  LuInstagram,
  LuLinkedin,
  LuGlobe,
  LuTwitter,
  LuArrowRight,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { site } from "@/data";
import ScrollReveal from "../../shared/ScrollReveal";

/* Maps icon strings to react-icons */
const iconMap: Record<string, IconType> = {
  phone: LuPhone,
  mail: LuMail,
  location: LuMapPin,
  instagram: LuInstagram,
  linkedin: LuLinkedin,
  pinterest: LuGlobe,
  twitter: LuTwitter,
};

function Icon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? LuPhone;
  return <Cmp size={size} className={className} />;
}

/* Small eyebrow section label with yellow bar */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />
      <span className="text-xs font-bold uppercase sm:text-[13px] lg:text-[15px] text-[#06194a]">
        {text}
      </span>
    </div>
  );
}

export default function ContactPage() {
  const c = site.contact;

  return (
    <div className="min-h-screen bg-white">
      
      {/* Main Contact Section */}
      <ScrollReveal direction="none" duration={0.6}>
      <section className="relative overflow-hidden bg-white py-8 md:py-12">
        {/* Top-Right Blue Dot Grid — 5 × 5 */}{" "}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1 grid grid-cols-5 gap-2 sm:right-10"
      >
        {" "}
        {Array.from({ length: 25 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-[#06194a]/40"
          />
        ))}{" "}
      </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Row: Intro Content & Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-9">
            {/* Left Column: Heading, Description & Socials */}
            <ScrollReveal as="div" direction="right" mobileDirection="up" className="lg:col-span-5">
              <SectionLabel text={c.badge} />
              <h2 className="mt-1 text-3xl font-bold leading-tight text-[#06194a] sm:text-4xl lg:text-[49px]">
                {c.title.normal}{" "}
                <span className="text-[#fdb913]">{c.title.highlighted}</span>
                <span className="block">{c.title.postTitle}</span>
              </h2>
              <p className="mt-1 text-base leading-relaxed text-slate-600">
                {c.desc}
              </p>

              {/* Social Media Icons */}
              <div className="mt-6 flex items-center gap-3">
                {c.socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#06194a] text-white transition-all duration-300 hover:bg-[#fdb913] hover:text-[#06194a] shadow-sm"
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </ScrollReveal>

            {/* Right Column: Info Cards Grid */}
            <div className="lg:col-span-7 z-20 grid gap-4 sm:grid-cols-2">
              {c.infoCards.map((card, idx) => {
                const isLocation = card.icon === "location";
                return (
                  <ScrollReveal
                    as="div"
                    key={idx}
                    direction="up"
                    index={idx}
                    staggerChildren={0.1}
                    className={`flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_25px_rgba(10,47,143,0.06)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(10,47,143,0.12)] ${
                      isLocation ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fdb913] text-[#06194a] shadow-inner">
                      <Icon name={card.icon} size={24} />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {card.label}
                      </span>
                      <p className="mt-1 text-base sm:text-lg font-bold text-[#06194a]">
                        {card.value}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Google Map & Message Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Google Map Embed */}
            <ScrollReveal as="div" direction="right" mobileDirection="up" className="lg:col-span-6 overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(10,47,143,0.08)] border border-slate-100 min-h-[420px]">
              <iframe
                title="Google Map Location"
                src={c.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </ScrollReveal>

            {/* Right Column: Send Us Message Form */}
            <ScrollReveal as="div" direction="left" mobileDirection="up" className="lg:col-span-6 rounded-2xl bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(10,47,143,0.08)] border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#06194a]">
                  {c.form.title.normal}{" "}
                  <span className="text-[#fdb913]">
                    {c.form.title.highlighted}
                  </span>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500">
                  {c.form.desc}
                </p>

                {/* Form Fields */}
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-[#06194a] placeholder-slate-400 focus:border-[#06194a] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-[#06194a] placeholder-slate-400 focus:border-[#06194a] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder="E-mail"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-[#06194a] placeholder-slate-400 focus:border-[#06194a] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone no"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-[#06194a] placeholder-slate-400 focus:border-[#06194a] focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      placeholder="Message"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-[#06194a] placeholder-slate-400 focus:border-[#06194a] focus:bg-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-fill-tl [--btn-fill:#06194a] [--btn-hover:#fdb913] inline-flex items-center justify-between gap-4 rounded-full bg-[#fdb913] px-7 py-3.5 text-sm font-bold text-[#06194a] shadow-md hover:scale-[1.02]"
                  >
                    <span>Send Message</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#06194a] text-[#fdb913]">
                      <LuArrowRight size={14} />
                    </span>
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
