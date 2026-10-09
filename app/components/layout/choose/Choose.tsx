import {
  LuShieldCheck,
  LuCctv,
  LuShield,
  LuUsers,
  LuSettings,
  LuHandshake,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { site } from "@/data";
import ScrollReveal from "../../shared/ScrollReveal";

/* Maps icon strings to react-icons */
const iconMap: Record<string, IconType> = {
  "shield-check": LuShieldCheck,
  cctv: LuCctv,
  shield: LuShield,
  users: LuUsers,
  settings: LuSettings,
  handshake: LuHandshake,
};

function Icon({
  name,
  size = 28,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? LuShieldCheck;
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

export default function WhyChooseUs() {
  const w = site.whyChooseUs;

  return (
    <ScrollReveal direction="none" duration={0.6}>
    <section className="relative overflow-hidden bg-white pb-8 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <ScrollReveal as="div" direction="up" className="max-w-3xl">
          <SectionLabel text={w.badge} />
          <h2 className="mt-1 text-3xl font-bold leading-tight text-[#06194a] sm:text-4xl lg:text-[42px]">
            {w.title.normal} <span className="text-[#0a3a9c]">{w.title.highlighted}</span>
          </h2>
          <p className="mt-1 text-base leading-relaxed text-slate-600">
            {w.desc}
          </p>
        </ScrollReveal>

        {/* Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {w.items.map((item, i) => (
            <ScrollReveal
              as="article"
              key={item.id}
              direction="none"
              index={i}
              staggerChildren={0.1}
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-7 shadow-[0_4px_25px_rgba(10,47,143,0.06)] border border-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_35px_rgba(10,47,143,0.12)]"
            >
              <div>
                {/* Icon & Title Header */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e3ebfb] text-[#06194a] shadow-inner transition-transform duration-300 group-hover:scale-105">
                    <Icon name={item.icon} size={38} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl  pr-20 min-h-12 font-bold text-[#06194a] leading-snug">
                      {item.title}
                    </h3>
                    <div className="mt-1 h-0.5 w-10 bg-[#fdb913]" />
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-900">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
    </ScrollReveal>
  );
}