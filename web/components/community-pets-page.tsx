"use client";

import Link from "next/link";

import { PetGallery } from "@/components/pet-gallery";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";
import type { GalleryPet } from "@/lib/pets";

export function CommunityPetsPage({ pets, categories }: { pets: GalleryPet[]; categories: Array<{ name: string; label: GalleryPet["categoryLabel"] }> }) {
  const { locale } = useLocale();
  const zh = locale === "zh";
  return <main className="community-library">
    <section className="community-library__hero">
      <span>{zh ? "Codex 化身库" : "Codex form library"}</span>
      <h1>{zh ? "社区制作的 Codex 宠物" : "Community-made Codex pets"}</h1>
      <p>{zh ? "浏览、预览并安装现有动画宠物。它们也是赛博生命未来进入 Codex 时的形态参考。" : "Browse, preview, and install existing animated companions. They also show what a Cyber Life can become inside Codex."}</p>
      <Link href={localePath(locale, "/")}>{zh ? "← 返回赛博生命" : "← Back to Cyber Life"}</Link>
    </section>
    <section className="community-library__gallery"><PetGallery pets={pets} categories={categories} /></section>
  </main>;
}
