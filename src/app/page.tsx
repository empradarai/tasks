import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { LandingPage } from "@/components/landing/LandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildLandingJsonLd, buildLandingMetadata } from "@/lib/seo";

export const metadata: Metadata = buildLandingMetadata();

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/tasks");

  return (
    <>
      <JsonLd data={buildLandingJsonLd()} />
      <LandingPage />
    </>
  );
}
