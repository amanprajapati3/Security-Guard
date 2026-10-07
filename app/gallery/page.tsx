import SecurityCta from "../components/homelayout/CTA";
import Gallery from "../components/layout/gallery/Gallery";
import PageBanner from "../components/shared/Banner";
import { site } from "@/data";

export default function GalleryPage() {
  const banner = site.gallery.banner;

  return (
    <>
      <PageBanner title={banner.title} image={banner.image} items={banner.items} />
      <Gallery />
      <SecurityCta />
    </>
  );
}
