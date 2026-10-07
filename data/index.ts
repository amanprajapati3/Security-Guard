import securityData from "./siteData.json";

export type RawSecurityData = typeof securityData;

export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

const sec = securityData.SecurityIndustries.sections;

/* Section data types                                                  */

export type SecurityTopbarData = typeof sec.Topbar.variants.SecurityTopbar1;
export type SecurityHeaderData = typeof sec.Header.variants.SecurityHeader1;
export type SecurityBannerData = typeof sec.Banner.variants.SecurityBanner1;
export type SecurityAboutData = typeof sec.About.variants.SecurityAbout1;
export type SecurityServicesData = typeof sec.Services.variants.SecurityServices1;
export type SecurityIndustriesData =
  typeof sec.Industries.variants.SecurityIndustries1;
export type SecurityStatsData = typeof sec.Stats.variants.SecurityStats1;
export type SecurityTestimonialData =
  typeof sec.Testimonial.variants.SecurityTestimonial1;
export type SecurityCtaData = typeof sec.Cta.variants.SecurityCta1;
export type SecurityFooterData = typeof sec.Footer.variants.SecurityFooter1;

/* Topbar */
export type SecurityTopbarContact = Pick<
  SecurityTopbarData,
  "phone" | "phoneHref" | "email" | "emailHref"
>;

/* Header */
export type SecurityHeaderNavChild = { label: string; href: string };
export type SecurityHeaderNavItem = {
  label: string;
  href: string;
  children?: SecurityHeaderNavChild[];
};
export type SecurityHeaderButton = SecurityHeaderData["buttons"][number];
export type SecurityHeaderMobileMenu = SecurityHeaderData["mobileMenu"];

/* Banner */
export type SecurityBannerSlide = SecurityBannerData["slides"][number];
export type SecurityBannerButton = SecurityBannerSlide["buttons"][number];
export type SecurityBannerHighlight = SecurityBannerSlide["highlights"][number];

/* About */
export type SecurityAboutFeatureItem = SecurityAboutData["features"][number];
export type SecurityAboutExperienceBadge = SecurityAboutData["experienceBadge"];
export type SecurityAboutBanner = SecurityAboutData["banner"];
export type SecurityAboutBannerItem = SecurityAboutBanner["items"][number];

/* Services */
export type SecurityServiceItem = SecurityServicesData["services"][number];
export type SecurityServicesBanner = SecurityServicesData["banner"];
export type SecurityServicesBannerItem = SecurityServicesBanner["items"][number];

/* Industries */
export type SecurityIndustryItem = SecurityIndustriesData["items"][number];
export type SecurityIndustriesBanner = SecurityIndustriesData["banner"];
export type SecurityIndustriesBannerItem = SecurityIndustriesBanner["items"][number];
export type SecurityIndustriesHeading = SecurityIndustriesData["heading"];
export type SecurityIndustryFeatureItem =
  SecurityIndustriesData["features"][number];

/* Stats */
export type SecurityStatItem = SecurityStatsData["stats"][number];

/* Testimonial */
export type SecurityTestimonialItem =
  SecurityTestimonialData["testimonialItems"][number];

/* Footer */
export type SecurityFooterColumn = SecurityFooterData["columns"][number];
export type SecurityFooterLink = SecurityFooterColumn["links"][number];
export type SecurityFooterContactItem =
  SecurityFooterData["footerContact"]["items"][number];
export type SecurityFooterContactLine = SecurityFooterContactItem["lines"][number];
export type SecuritySocialLink = SecurityFooterData["socialLinks"][number];
export type SecurityMissionData = typeof sec.Mission.variants.SecurityMission1;
export type SecurityMissionItem = SecurityMissionData["items"][number];
export type SecurityWhyChooseUsData = typeof sec.WhyChooseUs.variants.SecurityWhyChooseUs1;
export type SecurityWhyChooseUsItem = SecurityWhyChooseUsData["items"][number];
export type SecurityTeamData = typeof sec.Team.variants.SecurityTeam1;
export type SecurityTeamMember = SecurityTeamData["members"][number];
export type SecurityGalleryData = typeof sec.Gallery.variants.SecurityGallery1;
export type SecurityGalleryImage = SecurityGalleryData["images"][number];
/* Site object                                                         */

export const site = {
  topbar: sec.Topbar.variants.SecurityTopbar1,
  header: sec.Header.variants.SecurityHeader1,
  banner: sec.Banner.variants.SecurityBanner1,
  about: sec.About.variants.SecurityAbout1,
  services: sec.Services.variants.SecurityServices1,
  industries: sec.Industries.variants.SecurityIndustries1,
  stats: sec.Stats.variants.SecurityStats1,
  testimonial: sec.Testimonial.variants.SecurityTestimonial1,
  cta: sec.Cta.variants.SecurityCta1,
  footer: sec.Footer.variants.SecurityFooter1,
  mission: sec.Mission.variants.SecurityMission1,
  whyChooseUs: sec.WhyChooseUs.variants.SecurityWhyChooseUs1,
  team: sec.Team.variants.SecurityTeam1,
  gallery: sec.Gallery.variants.SecurityGallery1,
};

/* Slug helper                                                         */

function normalizeSlug(slug: string, collection: "services"): string {
  const segments = slug
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
  return segments[0] === collection
    ? segments.slice(1).join("/")
    : segments.join("/");
}

/* Banner helpers                                                      */

export function getBannerSlides(): SecurityBannerSlide[] {
  return sec.Banner.variants.SecurityBanner1.slides;
}

/* Services helpers                                                    */

const serviceItems = sec.Services.variants.SecurityServices1
  .services as SecurityServiceItem[];

export function getServices(): SecurityServiceItem[] {
  return serviceItems;
}

/** First N services, used by the home page grid (`homeVisibleCount`). */
export function getHomeServices(): SecurityServiceItem[] {
  return serviceItems.slice(
    0,
    sec.Services.variants.SecurityServices1.homeVisibleCount,
  );
}

export function getServiceBySlug(slug: string): SecurityServiceItem | null {
  const cleanSlug = normalizeSlug(slug, "services");
  return serviceItems.find((service) => service.slug === cleanSlug) || null;
}

export function getServiceSlugs(): SecurityServiceItem[] {
  return serviceItems;
}

/* Industries helpers                                                  */

const industryItems = sec.Industries.variants.SecurityIndustries1
  .items as SecurityIndustryItem[];

export function getIndustries(): SecurityIndustryItem[] {
  return industryItems;
}

/** Industries have no slug, so the numeric `id` is the lookup key. */
export function getIndustryById(id: number): SecurityIndustryItem | null {
  return industryItems.find((item) => item.id === id) || null;
}

/* Stats helpers                                                       */

const statItems = sec.Stats.variants.SecurityStats1.stats as SecurityStatItem[];

export function getStats(): SecurityStatItem[] {
  return statItems;
}

/* Testimonial helpers                                                 */

const testimonialItems = sec.Testimonial.variants.SecurityTestimonial1
  .testimonialItems as SecurityTestimonialItem[];

export function getTestimonials(): SecurityTestimonialItem[] {
  return testimonialItems;
}

/* About helpers                                                       */

export function getAboutFeatures(): SecurityAboutFeatureItem[] {
  return sec.About.variants.SecurityAbout1.features;
}

// mission vission
export function getMissionData(): SecurityMissionData {
  return sec.Mission.variants.SecurityMission1;
}

// choose us 
export function getWhyChooseUsData(): SecurityWhyChooseUsData {
  return sec.WhyChooseUs.variants.SecurityWhyChooseUs1;
}

/* Team helpers                                                        */

const teamMembers = sec.Team.variants.SecurityTeam1
  .members as SecurityTeamMember[];

export function getTeamMembers(): SecurityTeamMember[] {
  return teamMembers;
}

export function getTeamMemberBySlug(slug: string): SecurityTeamMember | null {
  return teamMembers.find((member) => member.slug === slug) || null;
}

/* Gallery helpers                                                     */

const galleryImages = sec.Gallery.variants.SecurityGallery1
  .images as SecurityGalleryImage[];

export function getGalleryImages(): SecurityGalleryImage[] {
  return galleryImages;
}

/** Gallery images shown before "Load More" is pressed. */
export function getGalleryVisibleCount(): number {
  return sec.Gallery.variants.SecurityGallery1.visibleCount;
}

/* Header / Footer helpers                                             */

export function getHeaderNav(): SecurityHeaderNavItem[] {
  return sec.Header.variants.SecurityHeader1.nav as SecurityHeaderNavItem[];
}

export function getFooterColumns(): SecurityFooterColumn[] {
  return sec.Footer.variants.SecurityFooter1.columns;
}

export function getFooterContactItems(): SecurityFooterContactItem[] {
  return sec.Footer.variants.SecurityFooter1.footerContact.items;
}

export default securityData;