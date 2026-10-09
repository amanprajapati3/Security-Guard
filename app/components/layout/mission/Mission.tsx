import Image from "next/image";
import {
  LuEye,
  LuShieldCheck,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { site } from "@/data";
import { RiTargetFill } from "react-icons/ri";
import ScrollReveal from "../../shared/ScrollReveal";


/* Maps icon strings to react-icons */
const iconMap: Record<string, IconType> = {
  target: RiTargetFill,
  eye: LuEye,
};

function Icon({
  name,
  size = 32,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? LuShieldCheck;
  return <Cmp size={size} className={className} />;
}

/* Small eyebrow section label */
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

export default function Mission() {
  const m = site.mission;

  return (
    <ScrollReveal direction="none" duration={0.6}>
    <section className="relative overflow-hidden bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Content, Headings, and Mission/Vision Cards */}
          <ScrollReveal as="div" direction="right" mobileDirection="up" className="lg:col-span-6 flex flex-col justify-center">
            <SectionLabel text={m.badge} />
            
            <h2 className="mt-1 text-3xl font-bold leading-tight text-[#06194a] sm:text-4xl ">
              {m.title.normal} <span className="text-[#0a3a9c]">{m.title.highlighted}</span>
            </h2>

            <p className="mt-1 text-base leading-relaxed text-slate-600">
              {m.desc}
            </p>

            {/* Mission & Vision Cards Stack */}
            <div className="mt-4 space-y-6">
              {m.items.map((item, index) => {
                const isVision = index === 1;
                return (
                  <ScrollReveal
                    as="div"
                    key={item.id}
                    direction="up"
                    index={index}
                    staggerChildren={0.12}
                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-5 p-3 rounded-2xl shadow-sm border transition-all duration-300 ${
                      isVision
                        ? "bg-[#fffcf0] border-[#fde9a2]"
                        : "bg-[#f0f4fd] border-[#d1def8]"
                    }`}
                  >
                    {/* Large Icon Container */}
                    <div className="flex h-16 lg:w-24 lg:h-24 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-[#061944] text-[#fdb913] shadow-md mx-auto sm:mx-0">
                      <Icon name={item.icon} size={44} />
                    </div>
                    <div className="hidden md:flex h-28 w-[2px] bg-gray-500"/>
                   

                    {/* Text Details */}
                    <div>
                      <h3 className="text-xl font-bold text-[#06194a] lg:text-2xl text-center sm:text-left">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-sm leading-relaxed text-slate-900 text-center sm:text-left">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right Side: Image with Top-Left Navy Frame and Bottom-Right Yellow Frame */}
          <ScrollReveal as="div" direction="left" mobileDirection="up" className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl">
              
              {/* Top-Left Dark Blue Border/Corner Frame */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#06194a] rounded-tl-2xl rounded-br-3xl z-0 pointer-events-none hidden sm:block" />

              {/* Bottom-Right Golden/Yellow Border/Corner Frame */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#fdb913] rounded-br-2xl rounded-tl-3xl z-0 pointer-events-none hidden sm:block" />

              {/* Main Image Container */}
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl bg-white aspect-[4/3] w-full">
                <Image
                  src={m.image}
                  alt={m.badge}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}