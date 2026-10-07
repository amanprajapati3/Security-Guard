import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
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
        className={`text-sm font-semibold uppercase sm:text-[14px] text-white}`}
      >
        {text}
      </span>
      {center && <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />}
    </div>
  );
}

export default function SecurityCta() {
  const c = site.cta;

  return (
    <section className="relative isolate overflow-hidden bg-[#06194a] text-white">
      <Image
        src={c.bgImage}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[75%_center]"
      />
      {/* Mobile: flat overlay. Desktop: fade from the left */}
      <div className="absolute inset-0 -z-10 bg-[#06194a] md:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#06194a] via-[#052658]/80 to-transparent md:block" />
      {/* Yellow diagonal stripe */}

      <div className="absolute -right-4 top-0 -z-10 hidden h-full w-16 -skew-x-[20deg] bg-[#fdb913] lg:block xl:right-[6%]" />
      <div className="absolute hidden md:flex right-10 top-1/2 z-10 h-[300px] w-[300px] -translate-y-1/2">
        <Image
          src={c.image}
          alt="ctaimage"
          fill
          sizes="200px"
          className="object-contain"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="max-w-xl">
          <SectionLabel text={c.badge} tone="yellow" />
          <h2 className="mt-1 text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">
            {c.title.normal}{" "}
            <span className="text-[#fdb913]">{c.title.highlighted}</span>
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            {c.desc}
          </p>

          <Link
            href={c.button.href}
            className="mt-3 inline-flex items-center gap-3 rounded-full bg-[#fdb913] py-2 pl-6 pr-2 text-sm font-bold text-[#06194a] shadow-lg transition-all duration-300 hover:bg-white sm:text-base"
          >
            {c.button.label}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#06194a] text-white">
              <LuArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
