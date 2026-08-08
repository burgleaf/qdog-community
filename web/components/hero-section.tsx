"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { useLocale } from "@/components/locale-provider";
import { getLocalizedPetName } from "@/lib/codex-links";
import { drawGachaPets } from "@/lib/gacha";
import { localePath } from "@/lib/i18n";
import type { GalleryPet } from "@/lib/pets";

type HeroSectionProps = {
  petCount: number;
  categoryCount: number;
  featured: GalleryPet[];
  allPets: GalleryPet[];
};

type DrawCount = 1 | 10;

function DiceIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect height="15" rx="2.5" width="15" x="4.5" y="4.5" />
      <circle cx="8.5" cy="8.5" fill="currentColor" r="1" stroke="none" />
      <circle cx="15.5" cy="15.5" fill="currentColor" r="1" stroke="none" />
      <circle cx="15.5" cy="8.5" fill="currentColor" r="1" stroke="none" />
      <circle cx="8.5" cy="15.5" fill="currentColor" r="1" stroke="none" />
    </svg>
  );
}

export function HeroSection({
  petCount,
  categoryCount,
  featured,
  allPets,
}: HeroSectionProps) {
  const { t, locale } = useLocale();
  const initialPet = featured[0] ?? allPets[0];
  const [resultSlugs, setResultSlugs] = useState<string[]>(
    initialPet ? [initialPet.slug] : [],
  );
  const [pendingCount, setPendingCount] = useState<DrawCount | null>(null);
  const previousSlugs = useRef<string[]>(initialPet ? [initialPet.slug] : []);
  const timerRef = useRef<number | null>(null);
  const petBySlug = useMemo(
    () => new Map(allPets.map((pet) => [pet.slug, pet])),
    [allPets],
  );
  const results = resultSlugs
    .map((slug) => petBySlug.get(slug))
    .filter((pet): pet is GalleryPet => Boolean(pet));
  const primaryResult = results[0] ?? initialPet;
  const miniPets = featured
    .filter((pet) => !resultSlugs.includes(pet.slug))
    .slice(0, 3);
  const isDrawing = pendingCount !== null;
  const isMultiResult = results.length > 1;

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  function drawPets(count: DrawCount) {
    if (isDrawing || allPets.length < count) return;
    setPendingCount(count);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    timerRef.current = window.setTimeout(
      () => {
        const nextPets = drawGachaPets(
          allPets,
          count,
          previousSlugs.current,
        );
        const nextSlugs = nextPets.map((pet) => pet.slug);
        previousSlugs.current = nextSlugs;
        setResultSlugs(nextSlugs);
        setPendingCount(null);
        timerRef.current = null;
      },
      reducedMotion ? 0 : 280,
    );
  }

  return (
    <section className="home-hero">
      <div className="home-hero__inner">
        <div className="home-hero__copy">
          <div className="hero-badge">
            <span className="hero-badge__dot" aria-hidden="true" />
            {t("heroBadge", { count: petCount })}
          </div>

          <h1 className="home-hero__title">
            {t("heroTitle1")}
            <br />
            <span className="home-hero__accent">{t("heroTitle2")}</span>
          </h1>

          <p className="home-hero__lead">{t("heroDesc")}</p>

          <div className="hero-cta">
            <Link className="hero-cta__primary" href="#gallery">
              {t("heroExplore")}
              <span aria-hidden="true">↓</span>
            </Link>
            <Link
              className="hero-cta__secondary"
              href={localePath(locale, "/request")}
            >
              {t("heroSubmit")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div
            className="hero-stats"
            aria-label={t("heroBadge", { count: petCount })}
          >
            <span className="hero-stat">
              <strong>{petCount}</strong> {t("heroStatPets")}
            </span>
            <span className="hero-stat">
              <strong>{categoryCount}</strong> {t("heroStatCategories")}
            </span>
            <span className="hero-stat">
              <strong>{t("heroStatLicenseValue")}</strong>{" "}
              {t("heroStatLicense")}
            </span>
          </div>
        </div>

        {primaryResult ? (
          <div className="hero-showcase">
            {miniPets.length > 0 ? (
              <div className="hero-showcase__minis" aria-hidden="true">
                {miniPets.map((pet) => (
                  <span className="hero-showcase__mini" key={pet.slug}>
                    <img
                      alt=""
                      decoding="async"
                      loading="lazy"
                      src={pet.previewImage}
                    />
                  </span>
                ))}
              </div>
            ) : null}

            <p className="hero-showcase__label">{t("gachaStageLabel")}</p>
            <div
              aria-live="polite"
              className={`hero-showcase__stage ${
                isDrawing ? "hero-showcase__stage--drawing" : ""
              } ${isMultiResult ? "hero-showcase__stage--multi" : ""}`}
            >
              {isMultiResult ? (
                <div className="hero-showcase__results">
                  {results.map((pet) => {
                    const name = getLocalizedPetName(pet, locale);
                    return (
                      <Link
                        aria-label={`${t("view")} ${name}`}
                        className="hero-showcase__result"
                        href={`/pets/${pet.slug}`}
                        key={pet.slug}
                        title={name}
                      >
                        <span className="hero-showcase__result-visual">
                          <img
                            alt=""
                            decoding="async"
                            src={pet.previewImage}
                          />
                        </span>
                        <span className="hero-showcase__result-name">
                          {name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <Link
                  aria-label={`${t("view")} ${getLocalizedPetName(primaryResult, locale)}`}
                  className="hero-showcase__single"
                  href={`/pets/${primaryResult.slug}`}
                >
                  <img
                    alt={getLocalizedPetName(primaryResult, locale)}
                    decoding="async"
                    fetchPriority="high"
                    key={primaryResult.slug}
                    src={primaryResult.previewImage}
                  />
                </Link>
              )}
            </div>

            <div className="hero-showcase__meta">
              {isMultiResult ? (
                <>
                  <p className="hero-showcase__name">
                    {t("gachaComplete", { count: results.length })}
                  </p>
                  <p className="hero-showcase__author">
                    {t("gachaRuleNote")}
                  </p>
                </>
              ) : (
                <>
                  <Link
                    className="hero-showcase__name"
                    href={`/pets/${primaryResult.slug}`}
                  >
                    {getLocalizedPetName(primaryResult, locale)}
                  </Link>
                  <p className="hero-showcase__author">
                    {t("by")} {primaryResult.author_handle ?? primaryResult.author}
                  </p>
                </>
              )}
            </div>

            <div className="hero-showcase__actions">
              <button
                className="hero-showcase__action"
                disabled={isDrawing || allPets.length < 1}
                onClick={() => drawPets(1)}
                type="button"
              >
                <DiceIcon />
                {pendingCount === 1 ? t("gachaDrawing") : t("gachaSingle")}
              </button>
              <button
                className="hero-showcase__action hero-showcase__action--primary"
                disabled={isDrawing || allPets.length < 10}
                onClick={() => drawPets(10)}
                type="button"
              >
                <DiceIcon />
                {pendingCount === 10 ? t("gachaDrawing") : t("gachaTen")}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
