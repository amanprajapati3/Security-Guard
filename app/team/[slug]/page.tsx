import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SecurityCta from "@/app/components/homelayout/CTA";
import TeamMemberDetail from "@/app/components/layout/team/TeamMemberDetail";
import PageBanner from "@/app/components/shared/Banner";
import { getTeamMemberDetailBySlug, getTeamMemberDetails, site } from "@/data";

interface TeamMemberDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getTeamMemberDetails().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TeamMemberDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberDetailBySlug(slug);

  if (!member) {
    return {};
  }

  return {
    title: `${member.name} | ${member.position} | Safeguard Security`,
    description: member.biography,
  };
}

async function TeamMemberDetailContent({
  params,
}: TeamMemberDetailPageProps) {
  const { slug } = await params;
  const member = getTeamMemberDetailBySlug(slug);

  if (!member) {
    notFound();
  }

  const banner = site.team.detailBanner;

  return (
    <>
      <PageBanner
        title={banner.title}
        image={banner.image}
        items={[
          ...banner.items.slice(0, -1),
          { label: member.name },
        ]}
        compact
      />
      <TeamMemberDetail member={member} />
      <SecurityCta />
    </>
  );
}

export default function TeamMemberDetailPage({
  params,
}: TeamMemberDetailPageProps) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-white" aria-busy="true" />}>
      <TeamMemberDetailContent params={params} />
    </Suspense>
  );
}
