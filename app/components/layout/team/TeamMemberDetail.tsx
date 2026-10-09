import Image from "next/image";
import { LuCheck } from "react-icons/lu";
import type { SecurityTeamMemberDetail } from "@/data";
import ScrollReveal from "../../shared/ScrollReveal";

export default function TeamMemberDetail({
  member,
}: {
  member: SecurityTeamMemberDetail;
}) {
  return (
    <ScrollReveal direction="none" duration={0.6}>
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8">
        <ScrollReveal as="div" direction="right" mobileDirection="up" className="relative mx-auto w-full max-w-md lg:mx-0">
          <span
            aria-hidden="true"
            className="absolute -right-2 -top-2 h-24 w-2/5 rounded-tr-2xl border-r-[7px] border-t-[7px] border-[#0878f9] sm:-right-3 sm:-top-3 sm:h-32"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-2 -left-2 h-24 w-2/5 rounded-bl-2xl border-b-[7px] border-l-[7px] border-[#0878f9] sm:-bottom-3 sm:-left-3 sm:h-32"
          />
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#edf5ff] shadow-[0_12px_35px_rgba(6,25,74,0.14)]">
            <Image
              src={member.image}
              alt={member.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal as="div" direction="left" mobileDirection="up" className="min-w-0">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#0878f9] sm:text-sm">
            Meet Our Professional
          </span>
          <h2 className="mt-0 text-3xl font-extrabold leading-tight tracking-tight text-[#09295f] sm:text-4xl lg:text-[48px]">
            {member.name}
          </h2>
          <p className="mt-0 text-lg font-semibold text-[#0878f9] sm:text-xl">
            {member.position}
          </p>
          <span className="mt-2 block h-[3px] w-12 bg-[#fdb913]" />

          <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-7">
            {member.biography}
          </p>

          <h3 className="mt-6 text-lg font-bold text-[#09295f] sm:text-xl lg:text-2xl">
            Areas of Expertise
          </h3>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {member.highlights.map((highlight, i) => (
              <ScrollReveal
                as="li"
                key={highlight}
                direction="up"
                index={i}
                staggerChildren={0.08}
                className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fdb913] text-white">
                  <LuCheck size={23} strokeWidth={3} />
                </span>
                {highlight}
              </ScrollReveal>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
    </ScrollReveal>
  );
}
