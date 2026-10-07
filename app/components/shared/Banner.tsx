import Image from "next/image";
import Link from "next/link";

export interface BannerPageItem {
  label: string;
  href?: string;
}

export interface BannerProps {
  title: string;
  image: string;
  items?: BannerPageItem[];
}

export default function Banner({
  title,
  image,
  items = [],
}: BannerProps) {
  return (
    <section className="relative mt-8 isolate flex min-h-[420px] items-center overflow-hidden bg-[#06194a] sm:mt-10 sm:min-h-[440px]">

      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />

      {/* 
        NAVY GRADIENT
        Change these colors/opacity here whenever you want
      */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-[#161618]
          via-[#1d1e1f]/60
          to-[#1f222c]/10
        "
      />

      {/* Optional overall dark overlay */}
      <div className="absolute inset-0 bg-[#06194a]/20" />

      {/* Yellow glow */}
      <div
        aria-hidden
        className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#fdb913]/15 blur-3xl"
      />

      {/* Content */}
      <div className="relative mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col   justify-center gap-4">
          {/* Title */}
          <h1 className="text-4xl text-center font-bold leading-tight uppercase text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Breadcrumb */}
          {items.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap mx-10 justify-center bg-white/20 py-2 px-6 rounded-full items-center gap-2 text-sm text-white sm:text-base"
            >
              {items.map((item, i) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2"
                >
                  {i > 0 && (
                    <span className="text-[#fdb913]">/</span>
                  )}

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#fdb913]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-[#f5f5f4]">
                      {item.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}

        </div>
      </div>
    </section>
  );
}