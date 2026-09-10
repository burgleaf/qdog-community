import type { Metadata } from "next";

import { CyberEggHatchPage } from "@/components/cyber-egg-hatch-page";
import { localeConfig, type Locale } from "@/lib/i18n";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(localeConfig).map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "赛博生命孵化舱" : "Cyber Life Incubator",
    description: locale === "zh" ? "从你的 QDog 赛博宠物蛋中唤醒独特的赛博生命。" : "Awaken a unique Cyber Life from your QDog Cyber Egg.",
    alternates: { canonical: `/${locale}/eggs/hatch` },
    robots: { index: false, follow: false },
  };
}
export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <CyberEggHatchPage locale={locale} />;
}
