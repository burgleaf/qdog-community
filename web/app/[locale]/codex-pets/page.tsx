import type { Metadata } from "next";

import { CommunityPetsPage } from "@/components/community-pets-page";
import { localeConfig, localePath, type Locale } from "@/lib/i18n";
import { getAllPets, getCategories, toGalleryPet } from "@/lib/pets";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(localeConfig).map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonical = locale === "en" ? "/en/codex-pets" : localePath(locale, "/codex-pets");
  return {
    title: locale === "zh" ? "社区 Codex 宠物" : "Community Codex pets",
    description: locale === "zh" ? "浏览、预览并安装社区制作的 Codex 宠物形态。" : "Browse, preview, and install community-made Codex pet forms.",
    alternates: { canonical },
  };
}
export default function LocalizedCodexPetsPage() {
  const pets = getAllPets().map(toGalleryPet);
  return <CommunityPetsPage pets={pets} categories={getCategories(pets)} />;
}
