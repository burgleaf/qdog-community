import type { Metadata } from "next";

import { DailyPetEggsPage } from "@/components/daily-pet-eggs-page";
import { localeConfig, localePath, type Locale } from "@/lib/i18n";
import { languageAlternates } from "@/lib/localized-route-metadata";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(localeConfig).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isChinese = locale === "zh";
  const title = isChinese ? "每日赛博宠物蛋" : "Daily Cyber Eggs";
  const description = isChinese
    ? "使用 Google 登录，支持并领取 QDog 每日固定发放的 50 枚赛博宠物蛋。"
    : "Sign in with Google to support and claim one of QDog's 50 daily Cyber Eggs.";
  const canonical = locale === "en" ? "/en/eggs" : localePath(locale, "/eggs");
  return {
    title: { absolute: `${title} · ${siteConfig.title}` },
    description,
    alternates: { canonical, languages: languageAlternates("/eggs") },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${canonical}`,
      type: "website",
    },
  };
}

export default async function LocalizedEggsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <DailyPetEggsPage locale={locale} />;
}
