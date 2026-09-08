"use client";

import Link from "next/link";
import { PetEggVisual } from "@/components/pet-egg-visual";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";

export function CommunityDomains({ petCount }: { petCount: number }) {
  const { locale } = useLocale();
  const zh = locale === "zh";
  return (
    <section className="domain-switcher" aria-label={zh ? "QDog 两大领域" : "QDog domains"}>
      <Link className="domain-card" href="#gallery">
        <span className="domain-card__index">01</span>
        <div><span>{zh ? "社区宠物" : "Community pets"}</span><h2>{zh ? `${petCount} 只社区创作` : `${petCount} community creations`}</h2><p>{zh ? "发现、预览和安装社区制作的 Codex 小宠物。" : "Discover, preview, and install Codex pets made by the community."}</p></div>
        <strong>{zh ? "进入社区宠物 →" : "Explore community pets →"}</strong>
      </Link>
      <Link className="domain-card domain-card--asset" href={localePath(locale, "/eggs")}>
        <span className="domain-card__index">02</span>
        <div><span>{zh ? "宠物蛋资产" : "Pet egg assets"}</span><h2>{zh ? "每天 50 个限量代码" : "50 limited codes every day"}</h2><p>{zh ? "获取代码、兑换宠物蛋，并收藏由属性生成的独特形象。" : "Collect a code, redeem an egg, and keep its trait-generated visual."}</p></div>
        <PetEggVisual className="domain-card__egg" traits="color:gold|size:large|shape:angular|material:crystal" />
        <strong>{zh ? "进入宠物蛋领域 →" : "Enter pet egg assets →"}</strong>
      </Link>
    </section>
  );
}
