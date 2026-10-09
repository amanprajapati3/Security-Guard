"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuMinus,
  LuPlus,
  LuX,
} from "react-icons/lu";
import {
  getGalleryImages,
  getGalleryVisibleCount,
  site,
  type SecurityGalleryImage,
} from "@/data";
import ScrollReveal from "../../shared/ScrollReveal";

/* Wraps around the collection so the dialog can slide forever */
function slideImage(
  images: SecurityGalleryImage[],
  currentId: number,
  delta: number,
): SecurityGalleryImage | null {
  const index = images.findIndex((item) => item.id === currentId);
  if (index < 0) return null;
  return images[(index + delta + images.length) % images.length];
}

function GalleryTile({
  image,
  onOpen,
}: {
  image: SecurityGalleryImage;
  onOpen: (image: SecurityGalleryImage) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      aria-label={`View ${image.title}`}
      className="group relative aspect-[4/3] cursor-pointer w-full overflow-hidden rounded-xl bg-[#06194a] shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <Image
        src={image.image}
        alt={image.title}
        fill
        sizes="(max-width: 639px) 78vw, (max-width: 1023px) 46vw, 23vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <span className="absolute inset-0 bg-[#06194a]/0 transition-colors duration-300 group-hover:bg-[#06194a]/40" />

      <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-[#06194a] via-[#06194a]/95 to-transparent px-4 pb-3 pt-8 text-left text-sm font-bold text-white transition-transform duration-300 group-hover:translate-y-0">
        {image.title}
      </span>
    </button>
  );
}

export default function Gallery() {
  const d = site.gallery;
  const images = getGalleryImages();
  const defaultCount = getGalleryVisibleCount();

  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<SecurityGalleryImage | null>(null);

  const visible = showAll ? images : images.slice(0, defaultCount);

  /* Slide to the previous / next image inside the dialog */
  const step = (delta: number) => {
    setActive((current) =>
      current ? slideImage(images, current.id, delta) : current,
    );
  };

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const delta = event.key === "ArrowLeft" ? -1 : 1;
        setActive((current) =>
          current ? slideImage(images, current.id, delta) : current,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active, images]);
  return (
    <ScrollReveal direction="none" duration={0.6}>
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading: badge + title */}
        <ScrollReveal as="div" direction="up" className="mx-auto max-w-4xl text-center">
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
        </ScrollReveal>

        {/* Mobile: horizontal scroll */}
        <div className="mt-12 sm:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {visible.map((image, i) => (
              <div
                key={image.id}
                className="w-[78%] shrink-0 snap-start last:mr-4"
              >
                <ScrollReveal as="div" index={i} staggerChildren={0.08} className="w-full">
                  <GalleryTile image={image} onOpen={setActive} />
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet: 2 per row, Desktop: 4 per row */}
        <div className="mt-12 hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {visible.map((image, i) => (
            <ScrollReveal as="div" key={image.id} index={i} staggerChildren={0.08} className="w-full">
              <GalleryTile image={image} onOpen={setActive} />
            </ScrollReveal>
          ))}
        </div>

        {/* Load more / show less */}
        <div className="mt-10 flex justify-center">
          {showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="btn-fill-tl [--btn-fill:#06194a] [--btn-hover:#ffffff] inline-flex cursor-pointer items-center gap-3 rounded-full border-2 border-[#06194a] py-2 pl-6 pr-2 text-sm font-bold text-[#06194a] sm:text-base"
            >
              Show Less
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#06194a] text-white transition-colors">
                <LuMinus size={18} />
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="btn-fill-tr [--btn-fill:#06194a] [--btn-hover:#fdb913] inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#fdb913] py-2 pl-6 pr-2 text-sm font-bold text-[#06194a] shadow-lg sm:text-base"
            >
              Load More
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#06194a] text-white">
                <LuPlus size={18} />
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox dialog */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setActive(null)}
            className="absolute cursor-pointer right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-[#06194a]/70 text-white backdrop-blur transition-colors duration-300 hover:bg-[#fdb913] hover:text-[#06194a]"
          >
            <LuX size={24} />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 cursor-pointer top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#06194a]/70 text-white backdrop-blur transition-colors duration-300 hover:bg-[#fdb913] hover:text-[#06194a] sm:left-6 sm:h-12 sm:w-12"
          >
            <LuChevronLeft size={26} />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            className="absolute right-2 cursor-pointer top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#06194a]/70 text-white backdrop-blur transition-colors duration-300 hover:bg-[#fdb913] hover:text-[#06194a] sm:right-6 sm:h-12 sm:w-12"
          >
            <LuChevronRight size={26} />
          </button>

          <figure
            className="w-full max-w-3xl px-12 sm:max-w-4xl sm:px-20"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="(max-width: 1024px) 92vw, 896px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm font-bold uppercase tracking-[0.15em] text-white sm:text-base">
              {active.title}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
    </ScrollReveal>
  );
}
