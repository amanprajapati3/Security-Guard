"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuBuilding2, LuCalendar, LuCheck, LuFactory, LuHotel, LuHouse, LuLandmark, LuPlane, LuSchool, LuShoppingBag, LuStethoscope, LuTruck, LuWarehouse } from "react-icons/lu";
import type { IconType } from "react-icons";
import { getIndustries, site } from "@/data";

const iconMap: Record<string, IconType> = { check: LuCheck, building: LuBuilding2, home: LuHouse, factory: LuFactory, hospital: LuStethoscope, school: LuSchool, "shopping-bag": LuShoppingBag, hotel: LuHotel, landmark: LuLandmark, truck: LuTruck, calendar: LuCalendar, plane: LuPlane, warehouse: LuWarehouse };

const arrowBtn = "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-[#0a3a9c] transition-colors hover:bg-[#0a3a9c] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gray-300 disabled:hover:text-[#0a3a9c]";

function Icon({ name, size = 10, className, strokeWidth }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const Cmp = iconMap[name] ?? LuCheck;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} />;
}

function SectionLabel({ text, center = false }: { text: string; tone?: "navy" | "yellow" | "white"; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-white sm:text-[15px]">{text}</span>
    </div>
  );
}

export default function SecurityIndustries() {
  const d = site.industries;
  const items = getIndustries();

  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  /* Responsive cards per page: <640 = 1, <768 = 2, <1024 = 3, else 4 */
  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerPage(1);
      else if (width < 768) setCardsPerPage(2);
      else if (width < 1024) setCardsPerPage(3);
      else setCardsPerPage(4);
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / cardsPerPage));

  /* Clamped page, stays valid when the breakpoint changes totalPages */
  const currentPage = Math.min(page, totalPages - 1);

  const updatePage = () => {
    const container = track.current;
    if (!container) return;
    const pageWidth = container.clientWidth + 16;
    const next = Math.round(container.scrollLeft / pageWidth);
    setPage(Math.min(Math.max(next, 0), totalPages - 1));
  };

  const scrollToPage = (index: number) => {
    const container = track.current;
    if (!container) return;
    const safeIndex = Math.max(0, Math.min(index, totalPages - 1));
    container.scrollTo({ left: safeIndex * (container.clientWidth + 16), behavior: "smooth" });
    setPage(safeIndex);
  };

  const scrollDir = (dir: 1 | -1) => scrollToPage(Math.max(0, Math.min(currentPage + dir, totalPages - 1)));

  const atStart = currentPage === 0;
  const atEnd = currentPage === totalPages - 1;

  return (
    <section className="relative isolate overflow-hidden bg-[#06194a] py-16 sm:py-20 lg:bg-white lg:py-24">
      {/* Mobile + tablet background (< lg) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 lg:hidden">
        <div className="absolute inset-0 bg-[#06194a]" />
        <div className="absolute bottom-0 left-0 h-[220px] w-full bg-[#0a3a9c]" style={{ clipPath: "polygon(0 55%, 18% 45%, 38% 30%, 58% 18%, 78% 8%, 100% 0, 100% 100%, 0 100%)" }} />
        <div className="absolute bottom-0 left-0 h-[45%] w-[70%] opacity-30" style={{ background: "radial-gradient(circle at 50% 70%, rgba(22,91,180,0.9), transparent 70%)" }} />
      </div>

      {/* Desktop background (lg+) */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block" viewBox="0 0 1366 620" preserveAspectRatio="none">
<path d=" M 0 0 L 985 0 C 965 42 940 82 915 120 C 875 185 825 250 760 320 C 690 395 610 455 520 510 C 425 568 345 602 270 620 L 0 620 Z " fill="#06194a" />        <path d="M 0 620 L 0 605 C 105 575 205 540 300 505 C 345 488 385 475 420 468 C 395 505 345 555 270 620 Z" fill="#0a3a9c" />
      </svg>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 z-0 hidden h-[42%] w-[32%] opacity-20 lg:block" style={{ background: "radial-gradient(circle at 70% 60%, rgba(22,91,180,0.8), transparent 65%)" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-12 lg:px-8">
        {/* Left content */}
        <div className="text-center lg:text-left">
          <SectionLabel text={d.badge} tone="yellow" center />
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-left lg:text-[38px]">
            {d.title.normal}
            <span className="block text-[#fdb913]">{d.title.highlighted}</span>
            <span className="block">{d.title.postTitle}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white lg:mx-0">{d.desc}</p>

          <ul className="mx-auto mt-5 w-fit space-y-2.5 text-left text-white lg:mx-0">
            {d.features.map((f) => (
              <li key={f.id} className="flex items-center gap-3 text-sm font-medium">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fdb913] text-[#06194a]">
                  <Icon name="check" size={12} strokeWidth={3.5} />
                </span>
                {f.title}
              </li>
            ))}
          </ul>

          <Link href={d.button.href} className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#fdb913] py-2 pl-6 pr-2 text-sm font-bold text-[#06194a] shadow-lg transition-all duration-300 hover:bg-white">
            {d.button.label}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#06194a] text-white">
              <LuArrowRight size={16} />
            </span>
          </Link>
        </div>

        {/* Cards */}
        <div className="min-w-0">
          <div ref={track} onScroll={updatePage} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((it, i) => (
              <article key={it.id} className="group w-full shrink-0 snap-start overflow-hidden rounded-xl bg-white text-[#06194a] shadow-xl sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)]">
                <div className="relative h-44 overflow-hidden sm:h-52 lg:h-48">
                  <Image src={it.image} alt={it.title} fill sizes="(max-width: 639px) 90vw, (max-width: 767px) 45vw, (max-width: 1023px) 30vw, 20vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="relative px-4 pb-5 pt-0">
                  <span className={`relative z-10 -mt-5 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white shadow-md ${i % 2 === 1 ? "bg-[#fdb913] text-[#06194a]" : "bg-[#06194a] text-white"}`}>
                    <Icon name={it.icon} size={32} />
                  </span>
                  <h3 className="mr-10 mt-2 text-[17px] font-bold leading-snug">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{it.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination dots (centered) + arrows (right) */}
          <div className="relative mt-5 flex items-center justify-center">
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} type="button" aria-label={`Go to page ${i + 1}`} onClick={() => scrollToPage(i)} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? "w-6 bg-[#fdb913]" : "w-2 bg-gray-200"}`} />
                ))}
              </div>
            )}

            <div className="absolute right-0 hidden gap-3 sm:flex">
              <button type="button" onClick={() => scrollDir(-1)} disabled={atStart} aria-label="Previous" className={arrowBtn}>
                <LuArrowLeft size={18} />
              </button>
              <button type="button" onClick={() => scrollDir(1)} disabled={atEnd} aria-label="Next" className={arrowBtn}>
                <LuArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
