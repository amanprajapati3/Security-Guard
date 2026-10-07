"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getTeamMembers, site, type SecurityTeamMember } from "@/data";

/* Hover design: navy overlay + yellow outer border + navy inner frame +
   yellow L bracket on every corner, each pointing in its own direction. */
function HoverFrame({ name, position }: { name: string; position: string }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#06194a]/95 via-[#06194a]/60 to-[#06194a]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      >
        <span className="absolute inset-[4px] border-[5px] border-[#fdb913]" />
        <span className="absolute inset-[12px] border-[20px] border-[#06194a]" />
        <span className="absolute left-[25px] top-[25px] h-7  w-7  border-l-[4px] border-t-[4px] border-[#fdb913] sm:h-9 sm:w-9 sm:h-9 sm:w-9" />
        <span className="absolute right-[25px] top-[25px] h-7  w-7  border-r-[4px] border-t-[4px] border-[#fdb913] sm:h-9 sm:w-9 sm:h-9 sm:w-9" />
        <span className="absolute bottom-[25px] left-[25px] h-7  w-7  border-b-[4px] border-l-[4px] border-[#fdb913] sm:h-9 sm:w-9 sm:h-9 sm:w-9" />
        <span className="absolute bottom-[25px] right-[25px] h7 9 w-7  border-b-[4px] border-r-[4px] border-[#fdb913] sm:h-9 sm:w-9 sm:h-9 sm:w-9" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-6 pb-7 pt-24 text-center opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <h3 className="text-xl font-extrabold leading-tight text-white sm:text-2xl">
          {name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-white sm:text-base">
          {position}
        </p>
      </div>
    </>
  );
}

function TeamCard({
  member,
  inTrack = false,
}: {
  member: SecurityTeamMember;
  inTrack?: boolean;
}) {
  return (
    <Link
      href={`/team/${member.slug}`}
      id={member.slug}
      data-slug={member.slug}
      className={`group block ${inTrack ? "w-full shrink-0 snap-start" : "w-full"}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 transition-all duration-500 group-hover:shadow-[0_20px_45px_rgba(6,25,74,0.30)]">
        <Image
          src={member.image}
          alt={`${member.name} - ${member.position}`}
          fill
          sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 23vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <HoverFrame name={member.name} position={member.position} />
      </div>
    </Link>
  );
}

export default function Team() {
  const d = site.team;
  const members = getTeamMembers();

  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  /* Mobile only: one card per "page", so every card gets its own dot. */
  const totalPages = members.length;

  const updatePage = () => {
    const container = track.current;
    if (!container) return;
    const pageWidth = container.clientWidth + 20;
    setPage(
      Math.min(
        Math.max(Math.round(container.scrollLeft / pageWidth), 0),
        totalPages - 1,
      ),
    );
  };

  const scrollToPage = (index: number) => {
    const container = track.current;
    if (!container) return;
    const safeIndex = Math.max(0, Math.min(index, totalPages - 1));
    container.scrollTo({
      left: safeIndex * (container.clientWidth + 20),
      behavior: "smooth",
    });
    setPage(safeIndex);
  };

  useEffect(() => {
    const onResize = () => setPage(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading: badge + title */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />
            <span className="text-xs font-bold uppercase text-[#06194a] sm:text-[13px] lg:text-[17px]">
              {d.heading.badge}
            </span>
          </div>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#06194a] sm:text-4xl lg:text-[49px]">
            {d.heading.title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-[#fdb913]">
              {d.heading.title.split(" ").slice(-2).join(" ")}
            </span>
          </h2>{" "}
        </div>

        {/* Mobile: horizontal scroll with dots */}
        <div className="mt-12 sm:hidden">
          <div
            ref={track}
            onScroll={updatePage}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {members.map((member) => (
              <TeamCard key={member.slug} member={member} inTrack />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to team member ${i + 1}`}
                  onClick={() => scrollToPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-[#fdb913]" : "w-2 bg-gray-200 hover:bg-gray-300"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tablet: 2 per row, Desktop: 4 per row (4-4) */}
        <div className="mt-12 hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {members.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
