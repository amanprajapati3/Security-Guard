import SecurityCta from "../components/homelayout/CTA";
import Faq from "../components/layout/faq/Faq";
import PageBanner from "../components/shared/Banner";
import { site } from "@/data";

export default function FaqPage() {
  const banner = site.faq.banner;

  return (
    <>
      <PageBanner
        title={banner.title}
        image={banner.image}
        items={banner.items}
      />
      <Faq />
      <SecurityCta />
    </>
  );
}
