import SecurityCta from "../components/homelayout/CTA";
import SecurityIndustries from "../components/homelayout/IndustrySection";
import ServiceSection from "../components/homelayout/ServiceSection";
import PageBanner from "../components/shared/Banner";
import { site } from "@/data";

export default function ServicesPage() {
  const banner = site.services.banner;

  return (
    <>
      <PageBanner title={banner.title} image={banner.image} items={banner.items} />
      <ServiceSection />
      <SecurityIndustries/>
      <SecurityCta/>
    </>
  );
}
