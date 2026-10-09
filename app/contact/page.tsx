import { site } from "@/data";
import PageBanner from "../components/shared/Banner";
import Contact from "../components/layout/contact/Contact";
import SecurityCta from "../components/homelayout/CTA";

export default function ContactPage() {
  const banner = site.contact.banner;

  return (
    <>
      <PageBanner
        title={banner.title}
        image={banner.image}
        items={banner.items}
      />

      <Contact />
      <SecurityCta />
    </>
  );
}
