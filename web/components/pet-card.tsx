"use client";

import Link from "next/link";
import { useState } from "react";

import { getLocalizedCategoryLabel } from "@/lib/pet-localization";
import type { GalleryPet } from "@/lib/pets";
import { PetInstallMenu } from "@/components/pet-install-menu";
import { PetLikeButton } from "@/components/pet-like-button";
import { ShareMenu } from "@/components/share-menu";
import { useLocale } from "@/components/locale-provider";
import { getLocalizedPetName, getPetInstallPrompt } from "@/lib/codex-links";
import { getPetInstallCommands } from "@/lib/install";
import { siteConfig } from "@/lib/site";

type PetCardProps = {
  pet: GalleryPet;
  installs?: number;
  likes?: number;
};

function formatCount(n: number): string {
  if (n < 1000) return n.toString();
  if (n < 1000000) return `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}k`;
  return `${(n / 1000000).toFixed(1)}m`;
}

function petTone(slug: string) {
  let hash = 0;
  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash + slug.charCodeAt(index)) % 6;
  }
  return hash;
}

export function PetCard({ pet, installs = 0, likes = 0 }: PetCardProps) {
  const { t, locale } = useLocale();
  const detailHref = `/pets/${pet.slug}`;
  const localizedName = getLocalizedPetName(pet, locale);
  const [isAnimating, setIsAnimating] = useState(false);
  const commands = getPetInstallCommands(pet.slug);

  return (
    <article
      className={`pet-card pet-card--tone-${petTone(pet.slug)} group relative z-0 flex h-full flex-col hover:z-20 focus-within:z-30`}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setIsAnimating(true);
      }}
      onPointerLeave={() => setIsAnimating(false)}
      onFocus={() => setIsAnimating(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsAnimating(false);
      }}
    >
      <div className="pet-card__visual relative flex h-56 items-center justify-center overflow-hidden p-4 xl:h-60">
        <Link
          className="absolute inset-0 z-10 rounded-t-[1.35rem] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent"
          href={detailHref}
          aria-label={`${t("view")} ${localizedName}`}
        />
        <div className="pet-card__character-stage pointer-events-none">
          <img
            className="pet-card__character h-full w-auto object-contain [image-rendering:pixelated]"
            src={isAnimating ? pet.animatedPreviewImage : pet.previewImage}
            alt={`${localizedName} preview`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className="absolute left-3 top-3 z-20 rounded-full bg-[#0b9f78] px-2.5 py-1 text-[10px] font-extrabold text-white shadow-sm">
          {getLocalizedCategoryLabel(pet.categoryLabel, locale)}
        </span>
        <div className="absolute right-3 top-3 z-20">
          <PetLikeButton slug={pet.slug} initialLikes={likes} />
        </div>
      </div>

      <div className="pet-card__body flex flex-grow flex-col border-t border-border p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h2 className="min-w-0 truncate text-base font-extrabold leading-tight text-text">
            <Link className="hover:text-accent" href={detailHref}>{localizedName}</Link>
          </h2>
          {installs > 0 ? (
            <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-muted" title={t("statsInstalls", { count: installs })}>
              <svg className="size-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {formatCount(installs)}
            </span>
          ) : null}
        </div>

        <p className="mb-3 text-sm text-muted">
          {t("by")} {" "}
          <Link className="relative z-20 hover:text-accent" href={`/contributors/${pet.author_slug}`}>
            {pet.author_handle ?? pet.author}
          </Link>
        </p>

        <p className="mb-4 line-clamp-2 flex-grow text-sm leading-relaxed text-muted">
          {pet.description ?? pet.runtimeDescription ?? t("defaultDesc")}
        </p>

        <div className="relative z-20 mt-auto flex gap-2">
          <Link className="inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-bg-secondary px-3 text-sm font-bold text-accent-hover transition-colors hover:bg-accent-light" href={detailHref}>
            {t("view")}
          </Link>
          <PetInstallMenu pet={pet} />
          <ShareMenu compact title={localizedName} url={`${siteConfig.url}${detailHref}`} codexPrompt={getPetInstallPrompt(pet, locale)} installCommand={commands.bash} />
        </div>
      </div>
    </article>
  );
}
