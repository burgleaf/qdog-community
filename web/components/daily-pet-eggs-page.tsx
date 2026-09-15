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
    account: "My life vault", login: "Sign in to claim", inventory: "Signal date · 00:00 UTC", loading: "Scanning today’s genomes…", unavailable: "The signal could not be updated. Please try again.", success: "Egg secured. Open your life vault to reveal its genome.", credits: "{count} hatch credits", claimedToday: "Claimed today", claimedTodayMessage: "You have already claimed today’s egg. A new drop arrives at 00:00 UTC.",
  },
  zh: {
    eyebrow: "每日基因投放",
    title: "每天，50 个生命进入信号。",
    intro: "每个账户都有一枚专属新手蛋。这 50 枚是全站共享的每日额外投放，每个账户每天最多领取一枚，领完即止。",
    available: "等待领取", claimed: "已被领取", claim: "领取这枚蛋", claiming: "正在锁定…",
    account: "我的生命库", login: "登录后领取", inventory: "信号日期 · UTC 00:00", loading: "正在扫描今日基因…", unavailable: "信号暂时无法更新，请重试。", success: "生命蛋已锁定，进入生命库揭晓基因。", credits: "{count} 个孵化积分", claimedToday: "今日已领取", claimedTodayMessage: "你今天已经领取过一枚生命蛋，下一批将在 UTC 00:00 投放。",
  },
  ko: {
    eyebrow: "오늘의 유전자 드롭", title: "매일 50개의 생명이 신호에 진입합니다.", intro: "모든 계정은 전용 스타터 에그로 시작합니다. 추가 50개는 모두가 공유하며, 계정당 하루 하나만 받을 수 있습니다.",
    available: "수령 가능", claimed: "수령 완료", claim: "이 에그 받기", claiming: "확보 중…", account: "내 라이프 보관함", login: "로그인하고 받기", inventory: "신호 날짜 · UTC 00:00", loading: "오늘의 유전자를 스캔 중…", unavailable: "신호를 업데이트하지 못했습니다. 다시 시도해 주세요.", success: "에그를 확보했습니다. 라이프 보관함에서 유전자를 확인하세요.", credits: "부화 크레딧 {count}개", claimedToday: "오늘 수령 완료", claimedTodayMessage: "오늘의 에그를 이미 받았습니다. 새 드롭은 UTC 00:00에 시작됩니다.",
  },
  ja: {
    eyebrow: "デイリー遺伝子ドロップ", title: "毎日、50の生命がシグナルに入ります。", intro: "すべてのアカウントに専用スターターエッグがあります。追加の50個は全員で共有し、1アカウントにつき1日1個まで受け取れます。",
    available: "受取可能", claimed: "受取済み", claim: "このエッグを受け取る", claiming: "確保中…", account: "マイ生命庫", login: "ログインして受け取る", inventory: "シグナル日付 · UTC 00:00", loading: "今日の遺伝子をスキャン中…", unavailable: "シグナルを更新できませんでした。もう一度お試しください。", success: "エッグを確保しました。生命庫で遺伝子を確認できます。", credits: "孵化クレジット {count}", claimedToday: "本日受取済み", claimedTodayMessage: "本日のエッグはすでに受け取りました。次回は UTC 00:00 に追加されます。",
  },
  es: {
    eyebrow: "Entrega genética diaria", title: "Cada día, 50 vidas entran en la señal.", intro: "Cada cuenta comienza con un huevo inicial propio. Estos 50 genomas extra son compartidos: uno por cuenta y día, hasta agotarse.",
    available: "Disponible", claimed: "Reclamado", claim: "Reclamar este huevo", claiming: "Asegurando…", account: "Mi bóveda de vida", login: "Inicia sesión para reclamar", inventory: "Fecha de señal · 00:00 UTC", loading: "Escaneando los genomas de hoy…", unavailable: "No se pudo actualizar la señal. Inténtalo de nuevo.", success: "Huevo asegurado. Abre tu bóveda para revelar su genoma.", credits: "{count} créditos de incubación", claimedToday: "Reclamado hoy", claimedTodayMessage: "Ya reclamaste el huevo de hoy. Habrá una nueva entrega a las 00:00 UTC.",
  },
};

export function DailyPetEggsPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
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
    } catch (error) {
      const reason = error instanceof Error ? error.message : "";
      setMessage(reason === "daily_pet_egg_unavailable" ? text.claimedTodayMessage : text.unavailable);
      if (reason === "daily_pet_egg_unavailable") await refresh().catch(() => undefined);
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
          {egg.available ? account ? catalog.viewerClaimedToday ? <span className="egg-code-card__closed">{text.claimedToday}</span> : <button className="egg-code-card__claim" disabled={pendingId !== null} onClick={() => void claim(egg.id)} type="button">{pendingId === egg.id ? text.claiming : text.claim}</button> : <Link className="egg-code-card__claim" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/eggs"))}`}>{text.login}</Link> : <span className="egg-code-card__closed">{text.claimed}</span>}
        </article>)}
      </div>}
    </section>
  </main>;
}
