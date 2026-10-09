import Image from "next/image";
import Link from "next/link";
import {
  LuArrowRight,
  LuCctv,
  LuDoorClosed,
  LuFootprints,
  LuShield,
  LuShieldCheck,
  LuUserCheck,
  LuUsers,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { getHomeServices, site } from "@/data";
import ScrollReveal from "../shared/ScrollReveal";

/* Maps the icon strings used in siteData.json to react-icons */
const iconMap: Record<string, IconType> = {
  "user-shield": LuUserCheck,
  cctv: LuCctv,
  "door-closed": LuDoorClosed,
  users: LuUsers,
  footprints: LuFootprints,
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
    tone === "yellow" ? "text-[#fdb913]" : tone === "white" ? "text-white" : "text-[#06194a]";
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />
      <span className={`text-xs font-bold uppercase  sm:text-[13px] lg:text-[17px] ${color}`}>
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

export default function SecurityServices() {
  const s = site.services;
  const services = getHomeServices();

  return (
    <ScrollReveal direction="none" duration={0.6}>
    <section className="relative overflow-hidden bg-white py-8 md:py-12">
      <DotPattern className="left-4 top-10 hidden h-28 w-28 sm:block" />
      <DotPattern className="right-6 top-28 hidden h-24 w-32 lg:block" />
      <LuShield
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute -right-16 top-24 hidden text-[#e3ebfb] lg:block"
        size={300}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <ScrollReveal as="div" direction="up" className="mx-auto max-w-4xl text-center">
          <SectionLabel text={s.badge} center />
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#06194a] sm:text-4xl lg:text-[49px]">
            {s.title.normal} <span className="text-[#fdb913]">{s.title.highlighted}</span>
            <span className="block">{s.title.postTitle}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{s.desc}</p>
        </ScrollReveal>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, i) => {
            const yellow = i % 2 === 1;
            return (
              <ScrollReveal
                as="article"
                key={item.id}
                direction="none"
                index={i}
                staggerChildren={0.1}
                className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(10,47,143,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(10,47,143,0.2)]"
              >
                <div className="relative h-44 overflow-hidden sm:h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="relative px-5 pb-6 text-center">
                  <span
                    className={`relative z-10 -mt-8 mx-auto flex h-16 lg:h-24 lg:w-24 w-16 items-center justify-center rounded-full border-4 border-white shadow-lg ${
                      yellow ? "bg-[#fdb913] text-[#06194a]" : "bg-[#06194a] text-white"
                    }`}
                  >
                    <Icon name={item.icon} size={40}  />
                  </span>
                  <h3 className="mt-3 text-lg lg:text-xl font-bold text-[#06194a]">{item.title}</h3>
                  <p className="mt-2 text-sm lg:text-base min-h-20 leading-relaxed text-slate-500">{item.description}</p>
                  <Link
                    href={item.button.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm md:text-base font-bold text-[#0a3a9c] transition-colors hover:text-[#06194a]"
                  >
                    {item.button.label}
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fdb913] text-[#06194a] transition-transform duration-300 group-hover:translate-x-1">
                      <LuArrowRight size={20} />
                    </span>
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}