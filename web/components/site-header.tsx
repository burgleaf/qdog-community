"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { useLocale } from "@/components/locale-provider";
import { SiteLogo } from "@/components/site-logo";
import { localeFromPathname, localePath } from "@/lib/i18n";
import { getCurrentAccount, type QDogAccount } from "@/lib/qdog-server";

const copy = {
  en: { hatch: "Hatch", daily: "Daily eggs", life: "My life", forms: "Codex forms", login: "Sign in · Get 10" },
  zh: { hatch: "孵化", daily: "每日生命蛋", life: "我的生命", forms: "Codex 化身", login: "登录 · 领 10 积分" },
  ko: { hatch: "부화", daily: "데일리 에그", life: "내 생명", forms: "Codex 형태", login: "로그인 · 10 받기" },
  ja: { hatch: "孵化", daily: "デイリーエッグ", life: "マイ生命", forms: "Codex 形態", login: "ログイン · 10獲得" },
  es: { hatch: "Incubar", daily: "Huevos diarios", life: "Mi vida", forms: "Formas Codex", login: "Entrar · Obtener 10" },
};

export function SiteHeader() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const routeLocale = localeFromPathname(pathname);
  const activePath = routeLocale ? pathname.replace(new RegExp(`^/${routeLocale}(?=/|$)`), "") || "/" : pathname;
  const [account, setAccount] = useState<QDogAccount | null>(null);
  const text = copy[locale];

  useEffect(() => {
    void getCurrentAccount().then(setAccount).catch(() => setAccount(null));
  }, [pathname]);

  const navItems = [
    { href: localePath(locale, "/"), label: text.hatch },
    { href: localePath(locale, "/eggs"), label: text.daily, matchPrefix: "/eggs" },
    { href: localePath(locale, "/account"), label: text.life, matchPrefix: "/account" },
    { href: localePath(locale, "/codex-pets"), label: text.forms, matchPrefix: "/codex-pets" },
  ];

  return (
    <header className="site-header" data-domain="cyber">
      <div className="site-header__inner flex items-center justify-between gap-2">
        <Link href={localePath(locale, "/")} className="site-brand flex shrink-0 items-center gap-2 px-1.5 py-1" aria-label="QDog">
          <SiteLogo size={34} /><span className="site-brand__wordmark whitespace-nowrap text-text"><span className="text-accent">Q</span>Dog</span>
        </Link>
        <nav className="flex min-w-0 items-center gap-1" aria-label="Primary navigation">
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const itemPath = routeLocale ? item.href.replace(new RegExp(`^/${routeLocale}(?=/|$)`), "") || "/" : item.href;
              const isActive = activePath === itemPath || activePath.startsWith(item.matchPrefix ?? "__never__") || (itemPath !== "/" && activePath.startsWith(itemPath));
              return <Link key={item.href} href={item.href} className={`site-nav-link px-3.5 py-2 ${isActive ? "site-nav-link--active" : ""}`}>{item.label}</Link>;
            })}
          </div>
          <Link className="site-account-link inline-flex max-w-40 truncate px-3 py-2" href={localePath(locale, account ? "/account" : "/login")}>
            {account ? `${account.credits} ◈` : text.login}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
