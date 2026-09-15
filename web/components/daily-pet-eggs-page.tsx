"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { localePath, type Locale } from "@/lib/i18n";
import {
  claimDailyPetEgg,
  getCurrentAccount,
  getDailyPetEggs,
  type DailyPetEggCatalog,
  type QDogAccount,
} from "@/lib/qdog-server";

const copy = {
  en: {
    eyebrow: "Daily genome drop",
    title: "50 lives enter the signal each day.",
    intro: "Every account begins with one personal starter egg. These 50 additional genomes are a shared daily drop—one claim per account, while they last.",
    available: "Unclaimed", claimed: "Claimed", claim: "Claim this egg", claiming: "Securing…",
    account: "My life vault", login: "Sign in to claim", inventory: "Signal date · 00:00 UTC", loading: "Scanning today’s genomes…", unavailable: "The signal could not be updated. Please try again.", success: "Egg secured. Open your life vault to reveal its genome.", credits: "{count} hatch credits",
  },
  zh: {
    eyebrow: "每日基因投放",
    title: "每天，50 个生命进入信号。",
    intro: "每个账户都有一枚专属新手蛋。这 50 枚是全站共享的每日额外投放，每个账户每天最多领取一枚，领完即止。",
    available: "等待领取", claimed: "已被领取", claim: "领取这枚蛋", claiming: "正在锁定…",
    account: "我的生命库", login: "登录后领取", inventory: "信号日期 · UTC 00:00", loading: "正在扫描今日基因…", unavailable: "信号暂时无法更新，请重试。", success: "生命蛋已锁定，进入生命库揭晓基因。", credits: "{count} 个孵化积分",
  },
};

export function DailyPetEggsPage({ locale }: { locale: Locale }) {
  const text = locale === "zh" ? copy.zh : copy.en;
  const [catalog, setCatalog] = useState<DailyPetEggCatalog | null>(null);
  const [account, setAccount] = useState<QDogAccount | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function refresh() {
    const [nextCatalog, nextAccount] = await Promise.all([getDailyPetEggs(), getCurrentAccount()]);
    setCatalog(nextCatalog);
    setAccount(nextAccount);
  }

  useEffect(() => { void refresh().catch(() => setMessage(text.unavailable)); }, []);
  const remaining = useMemo(() => catalog?.eggs.filter((egg) => egg.available).length ?? 0, [catalog]);

  async function claim(id: string) {
    setPendingId(id);
    setMessage("");
    try {
      await claimDailyPetEgg(id);
      setMessage(text.success);
      await refresh();
    } catch {
      setMessage(text.unavailable);
    } finally {
      setPendingId(null);
    }
  }

  return <main className="asset-page daily-drop" data-domain="cyber">
    <section className="asset-hero daily-drop__hero">
      <div><span className="section-kicker">{text.eyebrow}</span><h1>{text.title}</h1><p>{text.intro}</p></div>
      <div className="asset-hero__actions">
        {account ? <><span className="daily-drop__credits">◈ {text.credits.replace("{count}", String(account.credits))}</span><Link className="asset-button asset-button--primary" href={localePath(locale, "/account")}>{text.account}</Link></> : <Link className="asset-button asset-button--primary" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/eggs"))}`}>{text.login}</Link>}
      </div>
    </section>

    <section className="asset-inventory">
      <div className="asset-inventory__heading"><div><span>{text.inventory}</span><h2>{catalog?.issuedForDate ?? "—"}</h2></div>{catalog ? <strong>{remaining} / {catalog.eggs.length}</strong> : null}</div>
      {message ? <p className="asset-message" role="status">{message} {message === text.success ? <Link href={localePath(locale, "/account")}>{text.account} →</Link> : null}</p> : null}
      {!catalog ? <p className="asset-loading">{text.loading}</p> : <div className="egg-code-grid">
        {catalog.eggs.map((egg) => <article className={`egg-code-card ${egg.available ? "" : "egg-code-card--used"}`} key={egg.id}>
          <div className="egg-code-card__top"><span>QDG · {String(egg.slot).padStart(2, "0")}</span><span>{egg.available ? text.available : text.claimed}</span></div>
          <div className="egg-code-card__signal" aria-hidden="true"><i /><i /><i /></div>
          <code>{egg.code}</code>
          {egg.available ? account ? <button className="egg-code-card__claim" disabled={pendingId !== null} onClick={() => void claim(egg.id)} type="button">{pendingId === egg.id ? text.claiming : text.claim}</button> : <Link className="egg-code-card__claim" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/eggs"))}`}>{text.login}</Link> : <span className="egg-code-card__closed">{text.claimed}</span>}
        </article>)}
      </div>}
    </section>
  </main>;
}
