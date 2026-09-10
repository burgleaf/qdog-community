"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getCurrentAccount, getDailyPetEggs, setDailyPetEggSupport, type DailyPetEggCatalog, type QDogAccount } from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Cyber Egg assets", title: "Today’s 50 Cyber Egg codes", intro: "Every code can be redeemed once. The Cyber Egg’s appearance stays hidden until it enters your backpack.",
    available: "Available", redeemed: "Redeemed", support: "Support", supported: "Supported", copy: "Copy code", copied: "Copied",
    redeem: "Redeem a code", account: "Personal center", login: "Log in to support or redeem", inventory: "Issued at 00:00 UTC", loading: "Loading today’s codes…", unavailable: "Unable to update. Please try again.",
  },
  zh: {
    eyebrow: "赛博宠物蛋资产", title: "今日发放的 50 个赛博宠物蛋代码", intro: "每个代码只能兑换一次。兑换前隐藏赛博宠物蛋外观，进入背包后才揭晓专属蛋体。",
    available: "可兑换", redeemed: "已兑换", support: "支持", supported: "已支持", copy: "复制代码", copied: "已复制",
    redeem: "兑换赛博宠物蛋", account: "个人中心", login: "登录后支持或兑换", inventory: "每日 00:00 UTC 发放", loading: "正在加载今日代码…", unavailable: "操作失败，请稍后重试。",
  },
};

export function DailyPetEggsPage({ locale }: { locale: Locale }) {
  const text = copy[locale === "zh" ? "zh" : "en"];
  const [catalog, setCatalog] = useState<DailyPetEggCatalog | null>(null);
  const [account, setAccount] = useState<QDogAccount | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function refresh() {
    const [nextCatalog, nextAccount] = await Promise.all([getDailyPetEggs(), getCurrentAccount()]);
    setCatalog(nextCatalog);
    setAccount(nextAccount);
  }

  useEffect(() => {
    void refresh().catch(() => setMessage(text.unavailable));
  }, []);

  const remaining = useMemo(() => catalog?.eggs.filter((egg) => egg.available).length ?? 0, [catalog]);

  async function support(id: string, supporting: boolean) {
    setPendingId(id);
    setMessage("");
    try {
      await setDailyPetEggSupport(id, supporting);
      await refresh();
    } catch {
      setMessage(text.unavailable);
    } finally {
      setPendingId(null);
    }
  }

  async function copyCode(id: string, code: string) {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1400);
  }

  return (
    <main className="asset-page">
      <section className="asset-hero">
        <div>
          <span className="section-kicker">{text.eyebrow}</span>
          <h1>{text.title}</h1>
          <p>{text.intro}</p>
        </div>
        <div className="asset-hero__actions">
          <Link className="asset-button asset-button--primary" href={localePath(locale, "/eggs/redeem")}>{text.redeem}</Link>
          <Link className="asset-button" href={account ? localePath(locale, "/account") : `${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/eggs"))}`}>{account ? text.account : text.login}</Link>
        </div>
      </section>

      <section className="asset-inventory">
        <div className="asset-inventory__heading">
          <div><span>{text.inventory}</span><h2>{catalog?.issuedForDate ?? "—"}</h2></div>
          {catalog ? <strong>{remaining} / {catalog.eggs.length}</strong> : null}
        </div>
        {message ? <p className="asset-message" role="alert">{message}</p> : null}
        {!catalog ? <p className="asset-loading">{text.loading}</p> : (
          <div className="egg-code-grid">
            {catalog.eggs.map((egg) => (
              <article className={`egg-code-card ${egg.available ? "" : "egg-code-card--used"}`} key={egg.id}>
                <div className="egg-code-card__top">
                  <span>#{String(egg.slot).padStart(2, "0")}</span>
                  <span>{egg.available ? text.available : text.redeemed}</span>
                </div>
                <code>{egg.code}</code>
                <div className="egg-code-card__actions">
                  <button disabled={!egg.available} onClick={() => void copyCode(egg.id, egg.code)} type="button">{copiedId === egg.id ? text.copied : text.copy}</button>
                  <button disabled={!account || pendingId === egg.id} onClick={() => void support(egg.id, !egg.supported)} type="button">{egg.supported ? text.supported : text.support} · {egg.supporters}</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
