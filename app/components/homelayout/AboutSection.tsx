import Image from "next/image";
import Link from "next/link";
import {
  LuArrowRight,
  LuCctv,
  LuShield,
  LuShieldCheck,
  LuUserCheck,
  LuUsers,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { site } from "@/data";

const iconMap: Record<string, IconType> = {
  shield: LuShield,
  "shield-check": LuShieldCheck,
  "user-shield": LuUserCheck,
  cctv: LuCctv,
  users: LuUsers,
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
        className={`text-xs font-bold uppercase tracking-[0.2em] sm:text-[13px] ${color}`}
      >
        {text}
      </span>

      {center && <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />}
    </div>
  );
}

function DotPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute opacity-60 [background-image:radial-gradient(#9db4e8_1.6px,transparent_1.6px)] [background-size:14px_14px] ${className}`}
    />
  );
}

const boxStyles = [
  "bg-[#06194a] text-white",
  "bg-[#fdb913] text-[#06194a]",
  "bg-[#fdb913] text-[#06194a]",
  "bg-[#06194a] text-white",
];

export default function SecurityAbout({ hideButton = false }: { hideButton?: boolean }) {
  const a = site.about;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f3f7ff] to-[#e9f0ff] py-8 md:py-12">
      <DotPattern className="right-4 top-6 hidden h-28 w-28 sm:block" />
      <DotPattern className="bottom-4 left-4 hidden h-24 w-24 sm:block" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
        {/* Content */}
        <div className="relative order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
          {/* Experience badge - desktop */}
          <div className="absolute right-0 top-0 hidden items-center gap-3 rounded-xl border-b-4 border-[#fdb913] bg-[#06194a] px-4 py-3 text-left text-white shadow-lg lg:flex">
            <Icon
              name={a.experienceBadge.icon}
              size={34}
              className="text-[#fdb913]"
            />

            <div>
              <div className="text-2xl font-bold leading-none text-[#fdb913] lg:text-4xl">
                {a.experienceBadge.number}
                <span className="text-[#fdb913]">
                  {a.experienceBadge.suffix}
                </span>
              </div>

              <div className="mt-1 text-[13px] text-white/80">
                {a.experienceBadge.label}
              </div>
            </div>
          </div>

          <SectionLabel text={a.badge} tone="yellow" center />

          <h2 className="mt-3 text-3xl font-extrabold text-[#06194a] sm:text-4xl lg:text-left lg:text-[50px]">
            {a.title.normal}
            <span className="block text-[#fdb913]">
              {a.title.highlighted}
            </span>
          </h2>

          {a.paragraphs.map((p) => (
            <p
              key={p}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-base lg:text-left"
            >
              {p}
            </p>
          ))}

          {/* Feature cards */}
          <div className="mt-8 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
            {a.features.map((f, i) => (
              <div
                key={f.id}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 text-left shadow-[0_6px_24px_rgba(10,47,143,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ${boxStyles[i % boxStyles.length]}`}
                >
                  <Icon name={f.icon} size={34} />

                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#fdb913] text-[12px] font-bold text-[#06194a]">
                    {f.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold leading-snug text-[#06194a]">
                    {f.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!hideButton && (
            <Link
              href={a.button.href}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#fdb913] py-2 pl-6 pr-2 text-base font-bold text-[#06194a] shadow-md transition-all duration-300 hover:bg-[#06194a] hover:text-white"
            >
              {a.button.label}

              <span className="flex items-center justify-center rounded-full text-[#06194a]">
                <LuArrowRight size={26} />
              </span>
            </Link>
          )}
        </div>

        {/* Image */}
        <div className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:max-w-none">
          {/* Experience badge - mobile/tablet */}
          <div className="absolute -right-2 -top-5 z-20 flex items-center gap-3 rounded-xl border-b-4 border-[#fdb913] bg-[#06194a] px-4 py-3 text-left text-white shadow-lg sm:-right-3 sm:-top-6 lg:hidden">
            <Icon
              name={a.experienceBadge.icon}
              size={34}
              className="text-[#fdb913]"
            />

            <div>
              <div className="text-2xl font-bold leading-none text-[#fdb913]">
                {a.experienceBadge.number}
                <span className="text-[#fdb913]">
                  {a.experienceBadge.suffix}
                </span>
              </div>

              <div className="mt-1 text-[13px] text-white/80">
                {a.experienceBadge.label}
              </div>
            </div>
          </div>

          {/* Yellow/Navy image decorations */}
          <div className="absolute -right-5 top-8 hidden h-[70%] w-full rotate-6 rounded-3xl bg-gradient-to-r from-[#031941] via-[#fdb913] to-[#fdb913] sm:block sm:right-0" />

          <div className="absolute -top-3 left-4 hidden h-[42%] w-1/2 -rotate-6 rounded-3xl bg-[#073b66] sm:block sm:-bottom-9 sm:left-5" />

          {/* Image */}
          <div className="relative h-[300px] overflow-hidden rounded-3xl border-4 border-white shadow-xl sm:h-[500px]">
            <Image
              src={a.image.src}
              alt={a.image.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}