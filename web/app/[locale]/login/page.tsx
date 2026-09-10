import { LoginPage } from "@/components/login-page";
import { localeConfig, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(localeConfig).map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; return { title: locale === "zh" ? "登录" : "Log in", description: locale === "zh" ? "登录 QDog 管理赛博宠物蛋资产。" : "Log in to QDog to manage Cyber Egg assets.", alternates: { canonical: `/${locale}/login` }, robots: { index: false, follow: false } }; }
export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; return <LoginPage locale={locale} />; }
