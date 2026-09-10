"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { useLocale } from "@/components/locale-provider";
import { SiteLogo } from "@/components/site-logo";
import { SubmissionMenu } from "@/components/submission-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { localeFromPathname, localePath } from "@/lib/i18n";
import { getCurrentAccount, type QDogAccount } from "@/lib/qdog-server";

export function SiteHeader() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const routeLocale = localeFromPathname(pathname);
  const activePath = routeLocale ? pathname.replace(new RegExp(`^/${routeLocale}(?=/|$)`), "") || "/" : pathname;
  const [account, setAccount] = useState<QDogAccount | null>(null);

  useEffect(() => {
    void getCurrentAccount().then(setAccount).catch(() => setAccount(null));
  }, [pathname]);

  const navItems = [
    { href: localePath(locale, "/"), label: t("gallery"), matchPrefix: "/pets" },
    { href: localePath(locale, "/eggs"), label: locale === "zh" ? "赛博宠物蛋" : "Cyber Eggs" },
    { href: localePath(locale, "/install"), label: t("install") },
    { href: "/guide", label: t("makePet") },
  ];

  return (
    <header className="site-header">
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
          <Link className="site-nav-link inline-flex max-w-32 truncate px-2 py-2 sm:px-3" href={localePath(locale, account ? "/account" : "/login")}>
            {account?.displayName ?? account?.email ?? (locale === "zh" ? "登录" : "Log in")}
          </Link>
          <ThemeToggle /><LocaleSwitcher /><SubmissionMenu />
        </nav>
      </div>
    </header>
  );
}
