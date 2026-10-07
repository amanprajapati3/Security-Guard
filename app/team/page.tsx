import SecurityCta from "../components/homelayout/CTA";
import SecurityTestimonial from "../components/homelayout/TestimonialSection";
import Team from "../components/layout/team/Team";
import PageBanner from "../components/shared/Banner";
import { site } from "@/data";

export default function TeamPage() {
  const banner = site.team.banner;

  return (
    <>
      <PageBanner title={banner.title} image={banner.image} items={banner.items} />
      <Team />
      <SecurityTestimonial/>
      <SecurityCta />
    </>
  );
}
