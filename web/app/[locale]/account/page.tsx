import { AccountPage } from "@/components/account-page";
import { localeConfig, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(localeConfig).map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; return { title: locale === "zh" ? "个人中心" : "Personal center", description: locale === "zh" ? "管理你的 QDog 赛博宠物蛋与赛博生命。" : "Manage your QDog Cyber Egg and Cyber Life assets.", alternates: { canonical: `/${locale}/account` }, robots: { index: false, follow: false } }; }
export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; return <AccountPage locale={locale} />; }
