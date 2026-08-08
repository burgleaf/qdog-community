"use client";

import Link from "next/link";

import { useLocale } from "@/components/locale-provider";
import { SiteLogo } from "@/components/site-logo";
import { localeConfig, localePath } from "@/lib/i18n";

export function SiteFooter() {
  const { locale, t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer px-6">
      <div className="site-footer__inner py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="mb-3 flex items-center gap-2.5">
              <SiteLogo size={30} />
              <span className="text-base font-extrabold tracking-tight text-text">
                <span className="text-accent">Q</span>Dog
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {t("footerTagline")}
            </p>
          </div>

          <FooterLinks
            title={t("footerLinksTitle")}
            links={[
              ["/collections", t("collections")],
              [localePath(locale, "/"), t("gallery")],
              ["/rankings", t("rankings")],
              [localePath(locale, "/install"), t("install")],
              ["/guide", t("makePet")],
              [localePath(locale, "/request"), t("requestPet")],
            ]}
          />

          <div>
            <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-text">
              {t("footerCommunityTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a className="text-muted transition-colors hover:text-accent" href="https://github.com/burgleaf/qdog-community" target="_blank" rel="noreferrer">
                  {t("github")}
                </a>
              </li>
              <li><Link className="text-muted transition-colors hover:text-accent" href="/guide">{t("guide")}</Link></li>
              <li><Link className="text-muted transition-colors hover:text-accent" href="/guide">{t("contributing")}</Link></li>
              <li>
                <Link className="text-muted transition-colors hover:text-accent" href={localePath(locale, "/")} hrefLang={localeConfig[locale].htmlLang}>
                  {localeConfig[locale].label} · QDog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">© {year} QDog</p>
          <p className="text-xs text-muted">{t("footerLicenseLine")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-text">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {links.map(([href, label]) => (
          <li key={`${href}-${label}`}>
            <Link className="text-muted transition-colors hover:text-accent" href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
