import Image from "next/image";
import type { IconType } from "react-icons";
import {
  LuBell,
  LuBuilding2,
  LuCar,
  LuCheck,
  LuClipboardCheck,
  LuClock3,
  LuCctv,
  LuDoorClosed,
  LuHeadphones,
  LuKeyRound,
  LuMessageCircle,
  LuRadio,
  LuSettings,
  LuShield,
  LuShieldCheck,
  LuSmartphone,
  LuUserCheck,
  LuUsers,
  LuZap,
} from "react-icons/lu";
import type { SecurityServiceDetail } from "@/data";
import ScrollReveal from "../../shared/ScrollReveal";

const iconMap: Record<string, IconType> = {
  bell: LuBell,
  building: LuBuilding2,
  car: LuCar,
  cctv: LuCctv,
  clipboard: LuClipboardCheck,
  clock: LuClock3,
  door: LuDoorClosed,
  headphones: LuHeadphones,
  key: LuKeyRound,
  message: LuMessageCircle,
  radio: LuRadio,
  settings: LuSettings,
  shield: LuShield,
  "shield-check": LuShieldCheck,
  smartphone: LuSmartphone,
  "user-check": LuUserCheck,
  users: LuUsers,
  zap: LuZap,
};

function FeatureIcon({ name, size }: { name: string; size: number }) {
  const Icon = iconMap[name] ?? LuShieldCheck;
  return <Icon aria-hidden="true" size={size} strokeWidth={2.2} />;
}

function ImageFrame({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative isolate mx-1 my-2">
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-2 h-16 w-2/5 rounded-tr-2xl border-r-[7px] border-t-[7px] border-[#0878f9] sm:-right-2 sm:-top-2 sm:h-20"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-2 -left-1 h-16 w-2/5 rounded-bl-2xl border-b-[7px] border-l-[7px] border-[#0878f9] sm:-bottom-2 sm:-left-2 sm:h-20"
      />
      <div className="relative aspect-[1.42] overflow-hidden rounded-xl bg-slate-100 shadow-[0_12px_35px_rgba(6,25,74,0.12)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function ServiceDetail({ detail }: { detail: SecurityServiceDetail }) {
  return (
    <>
      <ScrollReveal direction="none" duration={0.6}>
      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-8">
          <ScrollReveal as="div" direction="right" mobileDirection="up" className="min-w-0">
            <h2 className="text-3xl font-extrabold leading-[1.06] tracking-tight text-[#09295f] sm:text-4xl lg:text-[58px]">
              <span className="block">{detail.title.normal}</span>
              <span className="block text-[#0878f9]">{detail.title.highlighted}</span>
            </h2>
            <span className="mt-4 block h-[3px] w-12 bg-[#fdb913]" />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {detail.description}
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-y-4 sm:grid-cols-4 lg:mt-10">
              {detail.benefits.map((benefit, index) => (
                <ScrollReveal
                  as="li"
                  key={benefit.label}
                  direction="up"
                  index={index}
                  staggerChildren={0.08}
                  className={`flex min-w-0 flex-col items-center gap-2 px-2 text-center ${
                    index > 0 ? "border-l border-slate-200" : ""
                  }`}
                >
                  <span className="flex h-14  w-14 items-center justify-center rounded-full bg-[#edf5ff] text-[#0878f9] sm:h-20 sm:w-20">
                    <FeatureIcon name={benefit.icon} size={40} />
                  </span>
                  <span className="max-w-28 text-base font-bold leading-snug text-[#09295f] sm:text-lg">
                    {benefit.label}
                  </span>
                </ScrollReveal>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal as="div" direction="left">
            <ImageFrame
              src={detail.heroImage}
              alt={detail.heroImageAlt}
              priority
            />
          </ScrollReveal>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal direction="none" duration={0.6}>
      <section className="bg-white pb-10 pt-2 sm:pb-14 lg:pb-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <ScrollReveal as="div" direction="right" mobileDirection="up">
            <ImageFrame
              src={detail.overviewImage}
              alt={detail.overviewImageAlt}
            />
          </ScrollReveal>

          <ScrollReveal as="div" direction="left" mobileDirection="up" className="min-w-0">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#09295f] sm:text-4xl lg:text-5xl">
              {detail.overviewTitle}
            </h2>
            <span className="mt-3 block h-[3px] w-12 bg-[#fdb913]" />
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {detail.overviewDescription}
            </p>
            <ul className="mt-5 space-y-2.5">
              {detail.overviewPoints.map((point, index) => (
                <ScrollReveal
                  as="li"
                  key={point}
                  direction="up"
                  index={index}
                  staggerChildren={0.08}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3b005] text-white">
                    <LuCheck size={20} strokeWidth={3} />
                  </span>
                  {point}
                </ScrollReveal>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal direction="none" duration={0.6}>
      <section className="bg-[#f2f7fe] py-9 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal as="div" direction="up">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#09295f] sm:text-4xl lg:text-5xl ">
            {detail.featuresTitle}
          </h2>
          <span className="mt-3 block h-[3px] w-12 bg-[#fdb913]" />
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {detail.featuresDescription}
          </p>
          </ScrollReveal>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {detail.features.map((feature, index) => (
              <ScrollReveal
                as="article"
                key={feature.title}
                direction="up"
                index={index}
                staggerChildren={0.08}
                className="flex min-h-24 items-center gap-4 rounded-lg border border-white bg-white p-4 shadow-[0_4px_16px_rgba(6,25,74,0.05)] sm:p-5"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0878f9] text-white sm:h-20 sm:w-20">
                  <FeatureIcon name={feature.icon} size={38} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-snug text-[#09295f] sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>
    </>
  );
}
