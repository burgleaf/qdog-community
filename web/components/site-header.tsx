"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { useLocale } from "@/components/locale-provider";
import { SiteLogo } from "@/components/site-logo";
import { localeFromPathname, localePath } from "@/lib/i18n";
import { getCurrentAccount, type QDogAccount } from "@/lib/qdog-server";

export function SiteHeader() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const routeLocale = localeFromPathname(pathname);
  const activePath = routeLocale ? pathname.replace(new RegExp(`^/${routeLocale}(?=/|$)`), "") || "/" : pathname;
  const [account, setAccount] = useState<QDogAccount | null>(null);

  useEffect(() => {
    void getCurrentAccount().then(setAccount).catch(() => setAccount(null));
  }, [pathname]);

  const navItems = [
    { href: localePath(locale, "/"), label: locale === "zh" ? "孵化" : "Hatch" },
    { href: localePath(locale, "/eggs"), label: locale === "zh" ? "每日生命蛋" : "Daily eggs", matchPrefix: "/eggs" },
    { href: localePath(locale, "/account"), label: locale === "zh" ? "我的生命" : "My life", matchPrefix: "/account" },
    { href: localePath(locale, "/codex-pets"), label: locale === "zh" ? "Codex 化身" : "Codex forms", matchPrefix: "/codex-pets" },
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
            {account ? `${account.credits} ◈` : (locale === "zh" ? "登录 · 领 10 积分" : "Sign in · Get 10")}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
