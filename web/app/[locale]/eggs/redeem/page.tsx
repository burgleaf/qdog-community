import { RedeemPetEggPage } from "@/components/redeem-pet-egg-page";
import { localeConfig, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(localeConfig).map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; return { title: locale === "zh" ? "兑换赛博宠物蛋" : "Redeem a Cyber Egg", description: locale === "zh" ? "使用每日代码兑换一枚 QDog 赛博宠物蛋资产。" : "Redeem a QDog daily code for a Cyber Egg asset.", alternates: { canonical: `/${locale}/eggs/redeem` } }; }
export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; return <RedeemPetEggPage locale={locale} />; }
