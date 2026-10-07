"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuBuilding2, LuCalendar, LuCheck, LuFactory, LuHotel, LuHouse, LuLandmark, LuPlane, LuSchool, LuShoppingBag, LuStethoscope, LuTruck, LuWarehouse } from "react-icons/lu";
import type { IconType } from "react-icons";
import PageBanner from "../components/shared/Banner";
import SecurityCta from "../components/homelayout/CTA";
import { getIndustries, site, type SecurityIndustryItem } from "@/data";

const iconMap: Record<string, IconType> = { check: LuCheck, building: LuBuilding2, home: LuHouse, factory: LuFactory, hospital: LuStethoscope, school: LuSchool, "shopping-bag": LuShoppingBag, hotel: LuHotel, landmark: LuLandmark, truck: LuTruck, calendar: LuCalendar, plane: LuPlane, warehouse: LuWarehouse };

function Icon({ name, size = 10, className }: { name: string; size?: number; className?: string }) {
  const Cmp = iconMap[name] ?? LuCheck;
  return <Cmp size={size} className={className} />;
}

function IndustryCard({ item, index, inTrack }: { item: SecurityIndustryItem; index: number; inTrack: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-xl bg-white text-[#06194a] shadow-xl ${inTrack ? "w-full shrink-0 snap-start sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)]" : "w-full"}`}>
      <div className="relative h-44 overflow-hidden sm:h-52">
        <Image src={item.image} alt={item.title} fill sizes="(max-width: 639px) 90vw, (max-width: 767px) 45vw, (max-width: 1023px) 30vw, 20vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="relative px-4 pb-5 pt-0">
        <span className={`relative z-10 -mt-5 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white shadow-md ${index % 2 === 1 ? "bg-[#fdb913] text-[#06194a]" : "bg-[#06194a] text-white"}`}>
          <Icon name={item.icon} size={32} />
        </span>
        <h3 className="mr-10 mt-2 text-[17px] font-bold leading-snug">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.description}</p>
      </div>
    </article>
  );
}

export default function IndustriesPage() {
  const d = site.industries;
  const items = getIndustries();

  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  /* Mobile/tablet cards per page: <640 = 1, <768 = 2, else 3 (desktop uses a grid) */
  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerPage(1);
      else if (width < 768) setCardsPerPage(2);
      else setCardsPerPage(3);
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / cardsPerPage));
  const currentPage = Math.min(page, totalPages - 1);

  const updatePage = () => {
    const container = track.current;
    if (!container) return;
    const pageWidth = container.clientWidth + 16;
    setPage(Math.min(Math.max(Math.round(container.scrollLeft / pageWidth), 0), totalPages - 1));
  };

  const scrollToPage = (index: number) => {
    const container = track.current;
    if (!container) return;
    const safeIndex = Math.max(0, Math.min(index, totalPages - 1));
    container.scrollTo({ left: safeIndex * (container.clientWidth + 16), behavior: "smooth" });
    setPage(safeIndex);
  };

  return (
    <>
      <PageBanner title={d.banner.title} image={d.banner.image} items={d.banner.items} />

      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading: badge + title */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />
              <span className="text-xs font-bold uppercase text-[#06194a] sm:text-[13px] lg:text-[17px]">{d.heading.badge}</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#06194a] sm:text-4xl lg:text-[49px]">{d.heading.title}</h2>
          </div>

          {/* Mobile + tablet: horizontal scroll with bottom dots */}
          <div className="mt-12 lg:hidden">
            <div ref={track} onScroll={updatePage} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {items.map((it, i) => (
                <IndustryCard key={it.id} item={it} index={i} inTrack />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} type="button" aria-label={`Go to page ${i + 1}`} onClick={() => scrollToPage(i)} className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? "w-6 bg-[#fdb913]" : "w-2 bg-gray-200"}`} />
                ))}
              </div>
            )}
          </div>

          {/* Desktop: grid, 4 cards per row */}
          <div className="mt-12 hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
            {items.map((it, i) => (
              <IndustryCard key={it.id} item={it} index={i} inTrack={false} />
            ))}
          </div>
        </div>
      </section>
      <SecurityCta/>
    </>
  );
}
