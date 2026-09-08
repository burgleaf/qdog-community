import { AccountPage } from "@/components/account-page";
import { localeConfig, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(localeConfig).map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; return { title: locale === "zh" ? "个人中心" : "Personal center", description: "Manage your QDog pet egg assets.", alternates: { canonical: `/${locale}/account` }, robots: { index: false, follow: false } }; }
export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; return <AccountPage locale={locale} />; }
