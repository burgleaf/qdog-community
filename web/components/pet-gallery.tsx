"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { FilterBar, type CategoryFilterOption } from "@/components/filter-bar";
import { ActionDropdown } from "@/components/action-dropdown";
import { PetCard } from "@/components/pet-card";
import { useLocale } from "@/components/locale-provider";
import { fetchStats, type StatsMap } from "@/lib/stats";
import type { GalleryPet } from "@/lib/pets";
import { getTagSearchTerms } from "@/lib/tag-localization";

type PetGalleryProps = {
  pets: GalleryPet[];
  categories: Array<{ name: string; label: GalleryPet["categoryLabel"] }>;
};

type SortKey = "random" | "trending" | "downloads" | "likes" | "name";

const INITIAL_BATCH_SIZE = 18;
const LOAD_MORE_BATCH_SIZE = 18;

type StatsState =
  | { status: "loading"; pets: StatsMap; generatedAt: number }
  | { status: "ready"; pets: StatsMap; generatedAt: number }
  | { status: "error"; pets: StatsMap; generatedAt: number };

function normalizeSortText(value: string) {
  return value.normalize("NFKD").toLowerCase();
}

function comparePetsByName(a: GalleryPet, b: GalleryPet) {
  const aName = normalizeSortText(a.name);
  const bName = normalizeSortText(b.name);

  if (aName < bName) return -1;
  if (aName > bName) return 1;
  if (a.slug < b.slug) return -1;
  if (a.slug > b.slug) return 1;
  return 0;
}

function createPetRanks(pets: GalleryPet[], shuffle = false) {
  const slugs = pets.map((pet) => pet.slug);

  if (shuffle) {
    for (let index = slugs.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [slugs[index], slugs[swapIndex]] = [slugs[swapIndex], slugs[index]];
    }
  }

  return new Map(slugs.map((slug, index) => [slug, index]));
}

export function PetGallery({ pets, categories }: PetGalleryProps) {
  const { t } = useLocale();
  const [filters, setFilters] = useState({
    query: "",
    categories: [] as string[],
  });
  const [sort, setSort] = useState<SortKey>("random");
  const [randomRanks, setRandomRanks] = useState(() => createPetRanks(pets));
  const [renderCount, setRenderCount] = useState(INITIAL_BATCH_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [statsState, setStatsState] = useState<StatsState>({
    status: "loading",
    pets: {},
    generatedAt: 0,
  });

  useEffect(() => {
    setRandomRanks(createPetRanks(pets, true));
  }, [pets]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchStats(controller.signal)
      .then((payload) => {
        setStatsState({
          status: "ready",
          pets: payload.pets,
          generatedAt: payload.generatedAt,
        });
      })
      .catch((error: unknown) => {
        console.warn(
          "Unable to load pet statistics",
          error instanceof Error ? error.stack : String(error),
        );
        if (!controller.signal.aborted) {
          setStatsState({ status: "error", pets: {}, generatedAt: 0 });
        }
      });
    return () => controller.abort();
  }, []);

  const visible = useMemo(() => {
    const queryTerms = normalizeSortText(filters.query)
      .split(/\s+/)
      .filter(Boolean);

    const filtered = pets.filter((pet) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(pet.primary_category);
      if (!matchesCategory) return false;
      if (queryTerms.length === 0) return true;

      const haystack = normalizeSortText(
        [
          pet.name,
          pet.localizedNames?.en,
          pet.localizedNames?.zh,
          pet.author,
          pet.author_handle,
          pet.primary_category,
          pet.description,
          pet.runtimeDescription,
          pet.displayName,
          pet.categoryLabel.en,
          pet.categoryLabel.zh,
          ...pet.tags.flatMap(getTagSearchTerms),
        ]
          .filter(Boolean)
          .join(" "),
      );

      return queryTerms.every((term) => haystack.includes(term));
    });

    const withStats = filtered.map((pet, originalIndex) => ({
      pet,
      originalIndex,
      installs: statsState.pets[pet.slug]?.installs ?? 0,
      likes: statsState.pets[pet.slug]?.likes ?? 0,
      installs7d: statsState.pets[pet.slug]?.installs7d ?? 0,
      trendingScore: statsState.pets[pet.slug]?.trendingScore ?? 0,
      dailyRank: statsState.pets[pet.slug]?.dailyRank ?? 0,
      randomRank: randomRanks.get(pet.slug) ?? originalIndex,
    }));

    withStats.sort((a, b) => {
      if (
        sort !== "name" &&
        sort !== "random" &&
        statsState.status !== "ready"
      ) {
        return a.originalIndex - b.originalIndex;
      }

      switch (sort) {
        case "random":
          return a.randomRank - b.randomRank;
        case "downloads":
          return (
            b.installs - a.installs ||
            b.likes - a.likes ||
            comparePetsByName(a.pet, b.pet)
          );
        case "likes":
          return (
            b.likes - a.likes ||
            b.installs - a.installs ||
            comparePetsByName(a.pet, b.pet)
          );
        case "name":
          return comparePetsByName(a.pet, b.pet);
        case "trending":
        default:
          return (
            b.trendingScore - a.trendingScore ||
            b.installs7d - a.installs7d ||
            b.installs - a.installs ||
            b.likes - a.likes ||
            b.dailyRank - a.dailyRank ||
            comparePetsByName(a.pet, b.pet)
          );
      }
    });

    return withStats;
  }, [filters, pets, randomRanks, sort, statsState]);

  useEffect(() => {
    setRenderCount(INITIAL_BATCH_SIZE);
  }, [filters.categories, filters.query, sort]);

  const categoryOptions = useMemo<CategoryFilterOption[]>(() => {
    const countByCategory = new Map<string, number>();
    for (const pet of pets) {
      countByCategory.set(
        pet.primary_category,
        (countByCategory.get(pet.primary_category) ?? 0) + 1,
      );
    }
    return categories
      .map((category) => ({
        ...category,
        count: countByCategory.get(category.name) ?? 0,
      }))
      .filter((category) => category.count > 0);
  }, [categories, pets]);

  const rendered = visible.slice(0, renderCount);
  const hasMore = rendered.length < visible.length;
  const sortOptions: Array<{ value: SortKey; label: string }> = [
    { value: "random", label: t("sortRandom") },
    { value: "downloads", label: t("sortDownloads") },
    { value: "likes", label: t("sortLikes") },
    { value: "trending", label: t("sortPopular") },
    { value: "name", label: t("sortName") },
  ];
  const selectedSortLabel =
    sortOptions.find((option) => option.value === sort)?.label ??
    t("sortRandom");

  function selectSort(nextSort: SortKey) {
    if (nextSort === "random") {
      setRandomRanks(createPetRanks(pets, true));
      setRenderCount(INITIAL_BATCH_SIZE);
    }
    setSort(nextSort);
  }

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!hasMore || !target || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setRenderCount((current) =>
          Math.min(current + LOAD_MORE_BATCH_SIZE, visible.length),
        );
      },
      { rootMargin: "900px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, visible.length]);

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-heading">
        <span className="section-kicker">{t("gallery")}</span>
        <h2>{t("galleryTitle")}</h2>
        <p>{t("petsAvailable", { count: visible.length })}</p>
      </div>

      <div className="gallery-actions">
        <span className="text-xs text-muted" aria-live="polite">
          {statsState.status === "loading"
            ? t("statsLoading")
            : statsState.status === "error"
              ? t("statsUnavailable")
              : t("statsUpdated")}
        </span>
        <ActionDropdown
          label={t("sortLabel")}
          menuWidth={196}
          triggerClassName="inline-flex h-10 min-w-36 cursor-pointer items-center justify-between gap-3 rounded-full border border-border bg-bg-elevated px-4 text-sm font-bold text-text shadow-sm transition-colors hover:border-accent hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          trigger={
            <>
              <span>{selectedSortLabel}</span>
              <svg className="size-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </>
          }
        >
          <div className="px-2 pb-1.5 pt-1 text-[11px] font-bold uppercase text-muted">
            {t("sortLabel")}
          </div>
          {sortOptions.map((option) => {
            const selected = option.value === sort;
            return (
              <button
                key={option.value}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface ${selected ? "bg-accent-light text-accent" : "text-text"}`}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => selectSort(option.value)}
              >
                <span className="font-bold">{option.label}</span>
                <svg className={`size-4 shrink-0 ${selected ? "opacity-100" : "opacity-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            );
          })}
        </ActionDropdown>
      </div>

      <FilterBar categories={categoryOptions} onChange={setFilters} />

      {visible.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-lg">{t("noResults")}</p>
          <p className="text-sm mt-1">{t("noResultsHint")}</p>
        </div>
      ) : (
        <>
          <div className="pet-grid">
            {rendered.map(({ pet, installs, likes }) => (
              <div key={pet.slug} className="gallery-card-shell">
                <PetCard pet={pet} installs={installs} likes={likes} />
              </div>
            ))}
          </div>
          <div
            ref={loadMoreRef}
            className="flex min-h-20 flex-col items-center justify-center gap-2 pt-6"
            aria-live="polite"
          >
            <span className="text-xs text-muted">
              {t("showingPets", { count: rendered.length })}
            </span>
            {hasMore ? (
              <button
                className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-bg-elevated px-4 text-sm font-medium text-text transition-colors hover:border-border-hover hover:bg-surface"
                type="button"
                onClick={() =>
                  setRenderCount((current) =>
                    Math.min(current + LOAD_MORE_BATCH_SIZE, visible.length),
                  )
                }
              >
                {t("loadMorePets")}
              </button>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}
