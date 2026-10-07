"use client";

import Image from "next/image";
import { useState } from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuBuilding2,
  LuQuote,
  LuShield,
  LuStar,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { getTestimonials, site } from "@/data";

/* Maps the icon strings used in siteData.json to react-icons */
const iconMap: Record<string, IconType> = {
  shield: LuShield,
  building: LuBuilding2,
};

function Icon({
  name,
  size = 12,
  className,
  strokeWidth = 2,
}: {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = iconMap[name] ?? LuShield;

  return (
    <Cmp
      size={size}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}

/* Small "—— LABEL ——" eyebrow used above every section heading */
function SectionLabel({
  text,
  tone = "navy",
  center = false,
}: {
  text: string;
  tone?: "navy" | "yellow" | "white";
  center?: boolean;
}) {
  const color =
    tone === "yellow"
      ? "text-[#fdb913]"
      : tone === "white"
        ? "text-white"
        : "text-[#06194a]";

  return (
    <div
      className={`flex items-center gap-3 ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />

      <span
        className={`text-sm font-bold uppercase  sm:text-[15px]  ${color}`}
      >
        {text}
      </span>

      
    </div>
  );
}

/* Dotted decoration used on light sections */
function DotPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute opacity-60 [background-image:radial-gradient(#9db4e8_1.6px,transparent_1.6px)] [background-size:14px_14px] ${className}`}
    />
  );
}

export default function SecurityTestimonial() {
  const t = site.testimonial;
  const items = getTestimonials();

  const [active, setActive] = useState(0);

  const total = items.length;

  const go = (index: number) => {
    setActive((index + total) % total);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f3f7ff] to-[#e9f0ff] pb-8 md:pb-12">

      <DotPattern className="left-4 top-6 hidden h-28 w-28 sm:block" />

      <DotPattern className="bottom-6 right-4 hidden h-28 w-28 sm:block" />

      <Icon
        name="shield"
        size={280}
        strokeWidth={1}
        className="pointer-events-none absolute -right-10 top-10 hidden text-[#dce7fb] lg:block"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel text={t.badge} center />

          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#06194a] sm:text-4xl lg:text-[44px]">
            {t.title.normal}{" "}
            <span className="text-[#fdb913]">
              {t.title.highlighted}
            </span>
          </h2>

          <p className="mt-2 text-base leading-relaxed text-slate-600 sm:text-base">
            {t.desc}
          </p>
        </div>

        {/*  SLIDER  */}
        <div className="relative mt-12">

          {/* Viewport */}
          <div className="overflow-hidden rounded-3xl">

            {/* Sliding Track */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${active * 100}%)`,
              }}
            >

              {items.map((it) => (
                <article
                  key={it.id}
                  className="w-full shrink-0"
                >
                  <div className="grid items-center gap-6 rounded-3xl bg-white p-4 shadow-[0_20px_60px_rgba(10,47,143,0.15)] sm:p-6 md:grid-cols-[300px_1fr] md:gap-10 lg:grid-cols-[340px_1fr]">

                    {/* Photo */}
                    <div className="relative mx-auto w-full  max-w-xs lg:max-w-[500px]">
                      <div className="absolute -top-3 -left-5 h-3/4 w-1/2 rounded-2xl  bg-[#3077e0]" />
                      <div className="relative h-[300px] border-white border-2 overflow-hidden rounded-2xl bg-white">

                        <Image
                          src={it.image}
                          alt={it.name}
                          fill
                          sizes="(max-width: 768px) 80vw, 340px"
                          className="object-cover object-top"
                        />

                      </div>
                    </div>

                    {/* Text */}
                    <div className="relative md:pr-4">

                      <LuQuote
                        aria-hidden
                        size={52}
                        className="absolute right-0 top-0 hidden fill-[#9db1da] text-[#9db1da] md:block"
                      />

                      {/* Stars */}
                      {/* <div className="flex gap-1">
                        {Array.from({ length: it.rating }).map((_, k) => (
                          <LuStar
                            key={k}
                            size={18}
                            className="fill-[#fdb913] text-[#fdb913]"
                          />
                        ))}
                      </div> */}

                      {/* Quote */}
                      <p className="mt-4 text-sm leading-relaxed text-slate-800 sm:text-base md:pr-12">
                        {it.quote}
                      </p>

                      {/* Person */}
                      <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-5">

                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e9f0ff] text-[#0a3a9c]">
                          <Icon
                            name={it.companyIcon}
                            size={29}
                          />
                        </span>

                        <div>
                          <h3 className="text-base font-bold text-[#06194a]">
                            {it.name}
                          </h3>

                          <p className="text-sm text-slate-600">
                            {it.designation}
                          </p>

                          <p className="text-sm text-slate-500">
                            {it.company}
                          </p>
                        </div>

                      </div>
                    </div>

                  </div>
                </article>
              ))}

            </div>
          </div>

          {/*  DESKTOP ARROWS  */}

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label="Previous testimonial"
                className="absolute -left-15 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#06194a] shadow-lg transition-all duration-300 hover:bg-[#fdb913] md:flex"
              >
                <LuArrowLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label="Next testimonial"
                className="absolute -right-15 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a3a9c] text-white shadow-lg transition-all duration-300 hover:bg-[#fdb913] hover:text-[#06194a] md:flex"
              >
                <LuArrowRight size={20} />
              </button>
            </>
          )}
        </div>

        {/*  DOTS + MOBILE ARROWS  */}

        {total > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">

            {/* Mobile Previous */}
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#06194a] shadow md:hidden"
            >
              <LuArrowLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 bg-[#1d5fe0]"
                      : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            {/* Mobile Next */}
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a3a9c] text-white shadow md:hidden"
            >
              <LuArrowRight size={18} />
            </button>

          </div>
        )}

      </div>
    </section>
  );
}