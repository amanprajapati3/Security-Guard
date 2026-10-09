"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuPlus, LuMinus } from "react-icons/lu";
import { site } from "@/data";
import Banner from "../../shared/Banner";
import ScrollReveal from "../../shared/ScrollReveal";

/* Small eyebrow section label with yellow bar */
function SectionLabel({ text, center = false }: { text: string; center?: boolean }) {
  return (
    <div className={`flex justify-center  items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="h-0.5 w-8 bg-[#fdb913] sm:w-10" />
      <span className="text-xs font-bold uppercase sm:text-[13px] lg:text-[15px] text-[#06194a]">
        {text}
      </span>
    </div>
  );
}

export default function FAQPage() {
  const f = site.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Main FAQ & Image Section */}
      <ScrollReveal direction="none" duration={0.6}>
      <section className="relative overflow-hidden bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Intro */}
          <ScrollReveal as="div" direction="up" className="max-w-3xl mx-auto text-center mb-9">
            <SectionLabel text={f.badge} />
            <h2 className="mt-1 text-3xl font-bold leading-tight text-[#06194a] sm:text-4xl lg:text-[49px]">
              {f.title.normal} <span className="text-[#fdb913]">{f.title.highlighted}</span>
            </h2>
            <p className="mt-1 text-base leading-relaxed text-slate-600">
              {f.desc}
            </p>
          </ScrollReveal>

          {/* Grid Layout: Accordion Left, Framed Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Accordion List */}
            <div className="lg:col-span-7 space-y-4">
              {f.items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <ScrollReveal
                    as="div"
                    key={item.id}
                    direction="up"
                    index={index}
                    staggerChildren={0.08}
                    className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                      isOpen
                        ? "bg-[#06194a] text-white border-[#06194a] shadow-lg"
                        : "bg-[#f8fafc] text-[#06194a] border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full cursor-pointer flex items-center justify-between p-3 text-left focus:outline-none"
                    >
                      <span className={`text-base sm:text-lg font-bold pr-4 ${isOpen ? "text-white" : "text-[#06194a]"}`}>
                        {item.question}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fdb913] text-[#06194a] shadow-sm transition-transform duration-300">
                        {isOpen ? <LuMinus size={18} strokeWidth={2.5} /> : <LuPlus size={18} strokeWidth={2.5} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 pt-0 text-sm sm:text-base leading-relaxed text-slate-200">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Right Column: Image with Top-Left Navy Frame and Bottom-Right Yellow Frame */}
            <ScrollReveal as="div" direction="left" className="lg:col-span-5 relative flex justify-center lg:justify-end lg:sticky lg:top-8">
              <div className="relative w-full max-w-xl">
                
                {/* Top-Left Dark Blue Frame */}
                <div className="absolute -top-4 -right-4 w-1/2 h-1/2 bg-[#fdb913]  rounded-xl  z-0 pointer-events-none hidden sm:block" />

                {/* Bottom-Right Yellow Frame */}
                <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 bg-[#06194a] rounded-xl z-0 pointer-events-none hidden sm:block" />

                {/* Main Image Container */}
                <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl bg-white aspect-[3/4] w-full">
                  <Image
                    src={f.image}
                    alt="Security Guard FAQ"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}