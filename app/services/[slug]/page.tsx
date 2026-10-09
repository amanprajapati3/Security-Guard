import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SecurityCta from "@/app/components/homelayout/CTA";
import ServiceDetail from "@/app/components/layout/service/ServiceDetail";
import PageBanner from "@/app/components/shared/Banner";
import { getServiceDetailBySlug, getServiceDetails, site } from "@/data";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getServiceDetails().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetailBySlug(slug);

  if (!detail) {
    return {};
  }

  return {
    title: `${detail.title.normal} ${detail.title.highlighted} | Safeguard Security`,
    description: detail.description,
  };
}

async function ServiceDetailContent({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const detail = getServiceDetailBySlug(slug);

  if (!detail) {
    notFound();
  }

  const banner = site.services.detailBanner;

  return (
    <>
      <PageBanner
        title={banner.title}
        image={banner.image}
        items={banner.items}
        compact
      />
      <ServiceDetail detail={detail} />
      <SecurityCta />
    </>
  );
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-white" aria-busy="true" />}>
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}
