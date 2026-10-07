import AboutSection from "../components/homelayout/AboutSection";
import SecurityCta from "../components/homelayout/CTA";
import WhyChooseUs from "../components/layout/choose/Choose";
import Mission from "../components/layout/mission/Mission";
import PageBanner from "../components/shared/Banner";
import { site } from "@/data";

export default function AboutPage() {
  const banner = site.about.banner;

  return (
    <>
      <PageBanner title={banner.title} image={banner.image} items={banner.items} />
      <AboutSection hideButton />
      <Mission />
      <WhyChooseUs />
      <SecurityCta />
    </>
  );
}
