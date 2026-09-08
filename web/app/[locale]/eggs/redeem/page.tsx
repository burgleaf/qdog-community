import { RedeemPetEggPage } from "@/components/redeem-pet-egg-page";
import { localeConfig, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(localeConfig).map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; return { title: locale === "zh" ? "兑换宠物蛋" : "Redeem a pet egg", description: locale === "zh" ? "使用每日宠物蛋代码兑换一枚 QDog 宠物蛋资产。" : "Redeem a QDog daily code for a pet egg asset.", alternates: { canonical: `/${locale}/eggs/redeem` } }; }
export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; return <RedeemPetEggPage locale={locale} />; }
