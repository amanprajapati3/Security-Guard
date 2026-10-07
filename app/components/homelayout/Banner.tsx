"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuArrowRight, LuCheck, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { site } from "@/data";

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
    tone === "yellow" ? "text-[#fdb913]" : tone === "white" ? "text-white" : "text-[#06194a]";
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />
      <span className={`text-xs font-bold uppercase tracking-[0.2em] sm:text-[13px] lg:text-lg ${color}`}>
        {text}
      </span>
      {center && <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />}
    </div>
  );
}

export default function SecurityBanner() {
  const { slides, autoplay, interval } = site.banner;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const total = slides.length;

  const go = (i: number) => setActive((i + total) % total);

  useEffect(() => {
    if (!autoplay || paused || total < 2) return;

    const t = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, interval);

    return () => clearInterval(t);
  }, [autoplay, paused, interval, total]);

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#06194a] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;

        const dx = e.changedTouches[0].clientX - touchX.current;

        if (Math.abs(dx) > 50) {
          go(active + (dx < 0 ? 1 : -1));
        }

        touchX.current = null;
      }}
    >
      <div className="w-full overflow-hidden">
        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="relative w-full min-w-0 min-h-[600px] shrink-0 overflow-hidden sm:min-h-[640px] lg:min-h-[720px]"
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-[75%_top] lg:object-[right_top]"
              />

              <div className="absolute inset-0 bg-[#06194a]/65 lg:hidden" />

              <div className="absolute inset-0 hidden bg-gradient-to-r from-[#06194a] via-[#06194a]/45 to-transparent lg:block" />

              <div className="relative mx-auto flex h-full max-w-7xl items-center overflow-hidden px-4 pb-24 pt-36 sm:px-6 lg:px-8 lg:pb-28 lg:pt-44">
                <div className="w-full max-w-xl min-w-0">
                  <SectionLabel text={slide.badge} tone="yellow" />

                  <h1 className="mt-0 text-4xl font-bold leading-[0.9] sm:ml-10 sm:text-5xl lg:text-6xl xl:text-[68px]">
                    <span className="block">{slide.title.normal}</span>
                    <span className="block text-[#fdb913]">
                      {slide.title.highlighted}
                    </span>
                    <span className="block">{slide.title.postTitle}</span>
                  </h1>

                  <ul className="mt-5 grid w-full  sm:max-w-[460px] grid-cols-1 gap-y-2 sm:ml-10 sm:grid-cols-4 sm:gap-x-0">
                    {slide.highlights.map((h) => (
                      <li
                        key={h.id}
                        className="flex min-w-0  items-center gap-2 text-sm font-medium"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fdb913] text-[#06194a]">
                          <LuCheck size={12} strokeWidth={3.5} />
                        </span>

                        <span className="min-w-0 break-words">
                          {h.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:ml-10 sm:text-base">
                    {slide.desc.plain}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 sm:ml-10">
                    {slide.buttons.map((btn) =>
                      btn.variant === "primary" ? (
                        <Link
                          key={btn.label}
                          href={btn.href}
                          className="inline-flex items-center gap-3 rounded-full bg-[#fdb913] px-8 text-sm font-bold text-[#06194a] shadow-lg transition-all duration-300 hover:bg-white sm:text-base"
                        >
                          {btn.label}

                          <span className="flex items-center justify-center rounded-full text-[#06194a]">
                            <LuArrowRight size={26} />
                          </span>
                        </Link>
                      ) : (
                        <Link
                          key={btn.label}
                          href={btn.href}
                          className="inline-flex items-center rounded-full border px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#06194a] sm:text-base"
                        >
                          {btn.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#06194a]/70 text-white backdrop-blur transition-colors hover:bg-[#fdb913] hover:text-[#06194a] sm:flex lg:left-6"
          >
            <LuChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#06194a]/70 text-white backdrop-blur transition-colors hover:bg-[#fdb913] hover:text-[#06194a] sm:flex lg:right-6"
          >
            <LuChevronRight size={22} />
          </button>

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-[#fdb913]"
                    : "w-2 bg-white/80 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}