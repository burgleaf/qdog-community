"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PetEggVisual } from "@/components/pet-egg-visual";
import { useLocale } from "@/components/locale-provider";
import { getLocalizedPetName } from "@/lib/codex-links";
import { localePath } from "@/lib/i18n";
import {
  claimStarterPetEgg,
  getCurrentAccount,
  getDailyPetEggs,
  type QDogAccount,
} from "@/lib/qdog-server";
import type { GalleryPet } from "@/lib/pets";

type CyberLifeHomeProps = {
  examples: GalleryPet[];
  communityPetCount: number;
};

const GENOME = "QDG1-BCP-DTC-GHU-F3";

const copy = {
  en: {
    badge: "A persistent AI companion",
    title: "Hatch a Cyber Life that is yours alone.",
    lead: "Every egg carries a sealed nine-part genome. Reveal its traits, awaken one lasting identity, and later bring that same life into Codex.",
    claim: "Claim your free starter egg",
    open: "Open my life vault",
    login: "Sign in to claim your egg",
    credits: "10 hatch credits included with every new account",
    remaining: "{count} limited eggs remain today",
    examplesKicker: "Awakened forms",
    examplesTitle: "A life begins as one identity, then learns new forms.",
    examplesDesc: "These community-made Codex companions show the animated form a Cyber Life can eventually take.",
    starterKicker: "Your first egg",
    starterTitle: "The egg is free. You decide when it wakes.",
    starterDesc: "Create an account to receive one permanent starter egg and 10 credits. One credit awakens one egg; failed generations return the credit.",
    starterClaimed: "Starter egg secured",
    starterPending: "Encoding your genome…",
    starterError: "The egg could not be claimed. Please try again.",
    daily: "Explore today’s 50 limited eggs",
    genomeKicker: "QDog Genome",
    genomeTitle: "Nine traits. One persistent identity.",
    genomeDesc: "Color, material, style, archetype, element, temperament, signature, pattern, and habitat are sealed into a versioned code. The image can evolve; the origin never changes.",
    genomeLabels: ["Color", "Material", "Style", "Archetype", "Element", "Temperament", "Signature", "Pattern", "Habitat"],
    codexKicker: "Platform forms",
    codexTitle: "Your Cyber Life can become a Codex pet.",
    codexDesc: "The awakened identity stays platform-neutral. A later Codex build turns that same character into a complete v2 animated spritesheet without replacing its genome or history.",
    codexCta: "Browse Codex form examples",
    codexCount: "{count} community forms already available",
    flow: ["Claim", "Reveal", "Hatch", "Enter Codex"],
  },
  zh: {
    badge: "拥有永久身份的 AI 伙伴",
    title: "孵化一只只属于你的赛博生命。",
    lead: "每枚蛋都封存着九维生命基因。揭晓它的属性，唤醒一个持续存在的身份，未来再让同一个生命进入 Codex。",
    claim: "免费领取新手蛋",
    open: "进入我的生命库",
    login: "登录并领取新手蛋",
    credits: "每个新账户赠送 10 个孵化积分",
    remaining: "今日还有 {count} 枚限量蛋",
    examplesKicker: "已觉醒形态",
    examplesTitle: "一个生命身份，可以拥有不同形态。",
    examplesDesc: "这些社区制作的 Codex 伙伴，展示了赛博生命未来可以获得的动画化身。",
    starterKicker: "你的第一枚蛋",
    starterTitle: "蛋免费领取，由你决定何时唤醒。",
    starterDesc: "注册后获得一枚永久新手蛋和 10 个积分。每次孵化消耗 1 分；生成失败会自动返还。",
    starterClaimed: "新手蛋已进入背包",
    starterPending: "正在写入生命基因…",
    starterError: "新手蛋暂时无法领取，请重试。",
    daily: "探索今日 50 枚限量蛋",
    genomeKicker: "QDog 生命基因",
    genomeTitle: "九项特征，一个不会消失的身份。",
    genomeDesc: "颜色、材质、画风、原型、元素、性格、标志、纹样与栖息地被写入带版本的基因码。形象可以成长，起源不会改变。",
    genomeLabels: ["颜色", "材质", "画风", "原型", "元素", "性格", "标志", "纹样", "栖息地"],
    codexKicker: "跨平台形态",
    codexTitle: "让你的赛博生命成为 Codex 宠物。",
    codexDesc: "觉醒后的身份保持平台无关。未来的 Codex 构建会把同一个角色转化为完整 v2 动画图集，同时保留它的基因与历史。",
    codexCta: "查看 Codex 化身案例",
    codexCount: "社区已有 {count} 个可安装形态",
    flow: ["领取", "揭晓", "孵化", "进入 Codex"],
  },
};

export function CyberLifeHome({ examples, communityPetCount }: CyberLifeHomeProps) {
  const { locale } = useLocale();
  const text = locale === "zh" ? copy.zh : copy.en;
  const [account, setAccount] = useState<QDogAccount | null | undefined>();
  const [remaining, setRemaining] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void getCurrentAccount().then(setAccount).catch(() => setAccount(null));
    void getDailyPetEggs()
      .then((catalog) => setRemaining(catalog.eggs.filter((egg) => egg.available).length))
      .catch(() => setRemaining(null));
  }, []);

  const primaryCta = useMemo(() => {
    if (!account) return text.login;
    return account.starterEggClaimed ? text.open : text.claim;
  }, [account, text]);

  async function claimStarter() {
    if (!account || account.starterEggClaimed || pending) return;
    setPending(true);
    setMessage("");
    try {
      await claimStarterPetEgg();
      window.location.assign(localePath(locale, "/account"));
    } catch {
      setMessage(text.starterError);
      setPending(false);
    }
  }

  const loginHref = `${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/"))}`;

  return (
    <main className="life-home" data-domain="cyber">
      <section className="life-hero">
        <div className="life-hero__copy">
          <span className="life-kicker"><i />{text.badge}</span>
          <h1>{text.title}</h1>
          <p>{text.lead}</p>
          <div className="life-hero__actions">
            {account ? (
              account.starterEggClaimed ? (
                <Link className="life-button life-button--primary" href={localePath(locale, "/account")}>{primaryCta}</Link>
              ) : (
                <button className="life-button life-button--primary" disabled={pending} onClick={() => void claimStarter()} type="button">
                  {pending ? text.starterPending : primaryCta}
                </button>
              )
            ) : (
              <Link className="life-button life-button--primary" href={loginHref}>{primaryCta}</Link>
            )}
            <Link className="life-button" href="#awakened">{text.examplesKicker}</Link>
          </div>
          <div className="life-hero__signal">
            <strong>10</strong><span>{text.credits}</span>
            {remaining !== null ? <span>· {text.remaining.replace("{count}", String(remaining))}</span> : null}
          </div>
        </div>

        <div className="life-vessel" aria-label={GENOME}>
          <div className="life-vessel__orbit"><i /><i /><i /></div>
          <div className="life-vessel__scan" />
          <PetEggVisual className="life-vessel__egg" genomeCode={GENOME} traits="color:blue|size:large|shape:angular|material:crystal" />
          <div className="life-vessel__code"><span>GENOME SEALED</span><code>{GENOME}</code></div>
        </div>

        <ol className="life-flow" aria-label={text.flow.join(", ")}>
          {text.flow.map((label, index) => <li key={label}><span>0{index + 1}</span>{label}</li>)}
        </ol>
      </section>

      <section className="life-section life-awakened" id="awakened">
        <header className="life-section__heading">
          <div><span className="life-kicker">{text.examplesKicker}</span><h2>{text.examplesTitle}</h2></div>
          <p>{text.examplesDesc}</p>
        </header>
        <div className="life-example-grid">
          {examples.slice(0, 3).map((pet, index) => (
            <Link className="life-example" href={`/pets/${pet.slug}`} key={pet.slug}>
              <span className="life-example__index">0{index + 1}</span>
              <div className="life-example__visual"><img alt={getLocalizedPetName(pet, locale)} src={pet.previewImage} /></div>
              <div><strong>{getLocalizedPetName(pet, locale)}</strong><span>CODEX FORM · V{pet.spriteVersionNumber}</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="life-section life-starter">
        <div className="life-starter__visual">
          <PetEggVisual genomeCode={GENOME} traits="color:gold|size:large|shape:round|material:ceramic" />
          <span>+10</span>
        </div>
        <div className="life-starter__copy">
          <span className="life-kicker">{text.starterKicker}</span>
          <h2>{text.starterTitle}</h2>
          <p>{text.starterDesc}</p>
          {message ? <p className="life-error" role="alert">{message}</p> : null}
          <div className="life-starter__actions">
            {account ? (
              account.starterEggClaimed ? (
                <Link className="life-button life-button--primary" href={localePath(locale, "/account")}>{text.starterClaimed}</Link>
              ) : (
                <button className="life-button life-button--primary" disabled={pending} onClick={() => void claimStarter()} type="button">{pending ? text.starterPending : text.claim}</button>
              )
            ) : <Link className="life-button life-button--primary" href={loginHref}>{text.login}</Link>}
            <Link className="life-button" href={localePath(locale, "/eggs")}>{text.daily}</Link>
          </div>
        </div>
      </section>

      <section className="life-section life-genome">
        <div className="life-genome__copy">
          <span className="life-kicker">{text.genomeKicker}</span>
          <h2>{text.genomeTitle}</h2>
          <p>{text.genomeDesc}</p>
          <code>{GENOME}</code>
        </div>
        <ol className="life-genome__traits">
          {text.genomeLabels.map((label, index) => <li key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><i /></li>)}
        </ol>
      </section>

      <section className="life-section life-codex">
        <div className="life-codex__copy">
          <span className="life-kicker">{text.codexKicker}</span>
          <h2>{text.codexTitle}</h2>
          <p>{text.codexDesc}</p>
          <Link className="life-button life-button--primary" href={localePath(locale, "/codex-pets")}>{text.codexCta}</Link>
          <small>{text.codexCount.replace("{count}", String(communityPetCount))}</small>
        </div>
        <div className="life-codex__track">
          <div className="life-codex__origin"><PetEggVisual genomeCode={GENOME} traits="color:blue|size:large|shape:angular|material:crystal" /><span>QDG1</span></div>
          <i aria-hidden="true" />
          {examples[0] ? <div className="life-codex__form"><img alt="" src={examples[0].previewImage} /><span>CODEX V2</span></div> : null}
        </div>
      </section>
    </main>
  );
}
