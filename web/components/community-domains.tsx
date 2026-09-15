"use client";

import Link from "next/link";
import { PetEggVisual } from "@/components/pet-egg-visual";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";

export function CommunityDomains({ petCount }: { petCount: number }) {
  const { locale, t } = useLocale();
  return (
    <section className="domain-switcher" aria-label={t("domainSwitcherLabel")}>
      <p className="domain-switcher__lede">{t("domainSwitcherLede")}</p>
      <div className="domain-switcher__grid">
        <Link className="domain-card domain-card--community" href="#gallery">
          <span className="domain-card__index">01</span>
          <div>
            <span>{t("domainCommunityKicker")}</span>
            <h2>{t("domainCommunityTitle", { count: petCount })}</h2>
            <p>{t("domainCommunityDesc")}</p>
          </div>
          <strong>{t("domainCommunityCta")}</strong>
        </Link>
        <Link className="domain-card domain-card--cyber" href={localePath(locale, "/eggs")}>
          <span className="domain-card__index">02</span>
          <div>
            <span>{t("domainCyberKicker")}</span>
            <h2>{t("domainCyberTitle")}</h2>
            <p>{t("domainCyberDesc")}</p>
          </div>
          <PetEggVisual className="domain-card__egg" traits="color:gold|size:large|shape:angular|material:crystal" />
          <strong>{t("domainCyberCta")}</strong>
        </Link>
      </div>
    </section>
  );
}
