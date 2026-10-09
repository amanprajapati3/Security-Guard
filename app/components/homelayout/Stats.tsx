"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuBuilding2, LuMapPin, LuShieldCheck, LuUsers } from "react-icons/lu";
import type { IconType } from "react-icons";
import { getStats, site } from "@/data";
import ScrollReveal from "../shared/ScrollReveal";

/* Maps the icon strings used in siteData.json to react-icons */
const iconMap: Record<string, IconType> = {
  users: LuUsers,
  building: LuBuilding2,
  "map-pin": LuMapPin,
  "shield-check": LuShieldCheck,
};

function Icon({
  name,
  size = 10,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? LuShieldCheck;
  return <Cmp size={size} className={className} />;
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
      className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}
    >
      <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />
      <span
        className={`text-sm font-bold uppercase tracking-[0.2em] sm:text-[13px]  ${color}`}
      >
        {text}
      </span>
    </div>
  );
}

/* Counts up once when the card scrolls into view */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      <span className="text-[#fdb913]">{suffix}</span>
    </span>
  );
}

export default function SecurityStats() {
  const s = site.stats;
  const stats = getStats();

  return (
    <ScrollReveal direction="none" duration={0.6}>
    <section className="relative isolate overflow-hidden py-8 md:py-12 my-12 text-white ">
      <Image
        src={s.bgImage}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(6,25,74,0.25) 18%, rgba(6,25,74,0.85) 35%, rgba(6,25,74,0.9) 50%, rgba(6,25,74,0.85) 65%, rgba(6,25,74,0.25) 82%, transparent 100%)",
        }}
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal as="div" direction="up" className="mx-auto max-w-2xl text-center">
          <SectionLabel text={s.badge} tone="white" center />
          <h2 className="mt-3 text-3xl font-bold  sm:text-4xl lg:text-[44px]">
            {s.title.normal}
            <span className="block text-[#fdb913]">{s.title.highlighted}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-base">
            {s.desc}
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-4 lg:grid-cols-4">
          {stats.map((st, i) => (
            <ScrollReveal
              as="div"
              key={st.id}
              direction="none"
              index={i}
              staggerChildren={0.12}
              className="relative rounded-xl border border-white/25 bg-[#0c3052]/80 px-3 py-4 text-center backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 sm:px-12"
            >
              {/* Centered Icon */}
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full  shadow-lg ${
                  i % 2 === 0
                    ? "bg-[#fdb913] text-[#062c4b]"
                    : "bg-[#1d5fe0] text-white"
                }`}
              >
                <Icon name={st.icon} size={36} />
              </div>

              {/* Number */}
              <div className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
                <CountUp to={st.number} suffix={st.suffix} />
              </div>

              {/* Label */}
              <div className="mt-1 text-sm  text-white sm:text-base">
                {st.label}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}
