"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { useLocale } from "@/components/locale-provider";
import { SiteLogo } from "@/components/site-logo";
import { SubmissionMenu } from "@/components/submission-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { localeFromPathname, localePath } from "@/lib/i18n";

export function SiteHeader() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const routeLocale = localeFromPathname(pathname);
  const activePath = routeLocale
    ? pathname.replace(new RegExp(`^/${routeLocale}(?=/|$)`), "") || "/"
    : pathname;

  const navItems: { href: string; label: string; matchPrefix?: string }[] = [
    { href: localePath(locale, "/"), label: t("gallery"), matchPrefix: "/pets" },
    { href: "/collections", label: t("collections") },
    { href: "/rankings", label: t("rankings"), matchPrefix: "/contributors" },
    { href: localePath(locale, "/install"), label: t("install") },
    { href: "/guide", label: t("makePet") },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner flex items-center justify-between gap-2">
        <Link
          href={localePath(locale, "/")}
          className="site-brand flex shrink-0 items-center gap-2 px-1.5 py-1"
          aria-label="QDog"
        >
          <SiteLogo size={34} />
          <span className="site-brand__wordmark whitespace-nowrap text-text">
            <span className="text-accent">Q</span>Dog
          </span>
        </Link>

        <nav className="flex min-w-0 items-center gap-1" aria-label="Primary navigation">
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const itemPath = routeLocale
                ? item.href.replace(new RegExp(`^/${routeLocale}(?=/|$)`), "") || "/"
                : item.href;
              const isActive =
                activePath === itemPath ||
                (item.matchPrefix ? activePath.startsWith(item.matchPrefix) : false) ||
                (itemPath !== "/" && activePath.startsWith(itemPath));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav-link px-3.5 py-2 ${
                    isActive ? "site-nav-link--active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <a
            className="site-nav-link hidden items-center gap-1.5 px-3 py-2 xl:inline-flex"
            href="https://github.com/burgleaf/qdog-community"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {t("github")}
          </a>

          <ThemeToggle />
          <LocaleSwitcher />
          <SubmissionMenu />
        </nav>
      </div>
    </header>
  );
}
