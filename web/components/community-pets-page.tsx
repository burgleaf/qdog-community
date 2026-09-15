"use client";

import Link from "next/link";

import { PetGallery } from "@/components/pet-gallery";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";
import type { GalleryPet } from "@/lib/pets";

const copy = {
  en: { kicker: "Codex form library", title: "Community-made Codex pets", intro: "Browse, preview, and install existing animated companions. They also show what a Cyber Life can become inside Codex.", back: "← Back to Cyber Life" },
  zh: { kicker: "Codex 化身库", title: "社区制作的 Codex 宠物", intro: "浏览、预览并安装现有动画宠物。它们也是赛博生命未来进入 Codex 时的形态参考。", back: "← 返回赛博生命" },
  ko: { kicker: "Codex 형태 라이브러리", title: "커뮤니티 제작 Codex 펫", intro: "기존 애니메이션 동반자를 둘러보고 미리 보고 설치하세요. 사이버 라이프가 Codex 안에서 어떤 형태가 될 수 있는지도 보여 줍니다.", back: "← 사이버 라이프로 돌아가기" },
  ja: { kicker: "Codex 形態ライブラリ", title: "コミュニティ製 Codex ペット", intro: "既存のアニメーションペットを閲覧、プレビュー、インストールできます。サイバー生命が Codex 内で得られる姿の参考にもなります。", back: "← サイバー生命に戻る" },
  es: { kicker: "Biblioteca de formas Codex", title: "Mascotas Codex de la comunidad", intro: "Explora, previsualiza e instala compañeros animados. También muestran en qué puede convertirse una vida cibernética dentro de Codex.", back: "← Volver a Vida cibernética" },
};

export function CommunityPetsPage({ pets, categories }: { pets: GalleryPet[]; categories: Array<{ name: string; label: GalleryPet["categoryLabel"] }> }) {
  const { locale } = useLocale();
  const text = copy[locale];
  return <main className="community-library">
    <section className="community-library__hero">
      <span>{text.kicker}</span>
      <h1>{text.title}</h1>
      <p>{text.intro}</p>
      <Link href={localePath(locale, "/")}>{text.back}</Link>
    </section>
    <section className="community-library__gallery"><PetGallery pets={pets} categories={categories} /></section>
  </main>;
}
