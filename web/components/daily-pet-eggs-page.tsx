"use client";

import { useEffect, useMemo, useState } from "react";

import {
  claimDailyPetEgg,
  getCurrentAccount,
  getDailyPetEggs,
  googleLoginUrl,
  logoutQDogAccount,
  setDailyPetEggSupport,
  type DailyPetEggCatalog,
  type PetEggAsset,
  type QDogAccount,
} from "@/lib/qdog-server";
import type { Locale } from "@/lib/i18n";

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  login: string;
  logout: string;
  greeting: string;
  available: string;
  claimed: string;
  support: string;
  supported: string;
  claim: string;
  claimedByYou: string;
  dailyLimit: string;
  inventory: string;
  backpack: string;
  emptyBackpack: string;
  loginHint: string;
  failedLogin: string;
  unavailable: string;
  loading: string;
  code: string;
};

const copy: Record<"en" | "zh", Copy> = {
  en: {
    eyebrow: "Daily pet eggs",
    title: "50 new pet eggs, every day",
    intro: "A fresh batch is issued at 00:00 UTC. Sign in with Google to support a favorite egg and claim one available egg each day.",
    login: "Continue with Google",
    logout: "Log out",
    greeting: "Signed in as",
    available: "Available",
    claimed: "Claimed",
    support: "Support",
    supported: "Supported",
    claim: "Claim this egg",
    claimedByYou: "In your backpack",
    dailyLimit: "You can claim one egg per day.",
    inventory: "today's issued codes",
    backpack: "Your pet egg backpack",
    emptyBackpack: "Your backpack is empty. Claim an available egg from today’s release.",
    loginHint: "Google sign-in is required for claiming, support, and your backpack.",
    failedLogin: "Google sign-in did not complete. Please try again.",
    unavailable: "This egg was just claimed or your daily claim has already been used.",
    loading: "Loading today’s pet eggs…",
    code: "Issue",
  },
  zh: {
    eyebrow: "每日宠物蛋",
    title: "每天固定发放 50 枚宠物蛋",
    intro: "每日 00:00 UTC 发放新一批。使用 Google 登录后，可以支持心仪的宠物蛋，并每天领取一枚仍可用的宠物蛋。",
    login: "使用 Google 登录",
    logout: "退出登录",
    greeting: "当前登录",
    available: "可领取",
    claimed: "已领取",
    support: "支持",
    supported: "已支持",
    claim: "领取这枚宠物蛋",
    claimedByYou: "已收入背包",
    dailyLimit: "每个账号每天可领取一枚。",
    inventory: "今日发放编号",
    backpack: "你的宠物蛋背包",
    emptyBackpack: "背包还是空的，领取今日仍可用的宠物蛋吧。",
    loginHint: "领取、支持和查看背包均需要使用 Google 登录。",
    failedLogin: "Google 登录未完成，请重试。",
    unavailable: "这枚宠物蛋刚刚被领取，或你今天已经领取过一枚。",
    loading: "正在加载今日宠物蛋…",
    code: "发放编号",
  },
};

function traitsList(traits: string) {
  return traits.split("|").map((trait) => trait.replace(":", " · "));
}

function currentPageReturnTo() {
  if (typeof window === "undefined") return "/eggs";
  const url = new URL(window.location.href);
  // A previous OAuth failure must not be carried into a retry's success redirect.
  url.searchParams.delete("login");
  return `${url.pathname}${url.search}${url.hash}`;
}

export function DailyPetEggsPage({ locale }: { locale: Locale }) {
  const text = copy[locale === "zh" ? "zh" : "en"];
  const [catalog, setCatalog] = useState<DailyPetEggCatalog | null>(null);
  const [account, setAccount] = useState<QDogAccount | null>(null);
  const [assets, setAssets] = useState<PetEggAsset[]>([]);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const refresh = async () => {
    const [nextCatalog, nextAccount] = await Promise.all([
      getDailyPetEggs(),
      getCurrentAccount(),
    ]);
    setCatalog(nextCatalog);
    setAccount(nextAccount);
    if (nextAccount) {
      const response = await fetch(
        `${(process.env.NEXT_PUBLIC_QDOG_SERVER_API ?? "https://api.q.dog").replace(/\/$/, "")}/assets`,
        { credentials: "include" },
      );
      if (response.ok) {
        const payload = (await response.json()) as { assets?: PetEggAsset[] };
        setAssets(payload.assets ?? []);
      }
    } else {
      setAssets([]);
    }
  };

  useEffect(() => {
    void refresh().catch(() => setMessage(text.unavailable));
  }, []);

  const claimedCount = useMemo(
    () => catalog?.eggs.filter((egg) => !egg.available).length ?? 0,
    [catalog],
  );

  async function claim(id: string) {
    setPendingId(id);
    setMessage("");
    try {
      await claimDailyPetEgg(id);
      await refresh();
    } catch {
      setMessage(text.unavailable);
    } finally {
      setPendingId(null);
    }
  }

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

  async function logout() {
    await logoutQDogAccount();
    await refresh();
  }

  const returnTo = currentPageReturnTo();
  const loginFailed = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("login") === "failed";

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1200px]">
        <section className="rounded-[2rem] border border-border bg-bg-elevated p-6 shadow-[var(--shadow-lift)] sm:p-10">
          <span className="section-kicker">{text.eyebrow}</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-5xl">{text.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{text.intro}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {account ? (
              <>
                <span className="rounded-full border border-border bg-bg px-4 py-2 text-sm text-text">
                  {text.greeting} <strong>{account.displayName ?? account.email ?? "Google user"}</strong>
                </span>
                <button className="rounded-full border border-border px-4 py-2 text-sm font-bold text-text hover:border-accent hover:text-accent" type="button" onClick={() => void logout()}>{text.logout}</button>
              </>
            ) : (
              <a className="rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-accent-hover" href={googleLoginUrl(returnTo)}>{text.login}</a>
            )}
            <span className="text-sm text-muted">{text.dailyLimit}</span>
          </div>
          {!account ? <p className="mt-4 text-sm text-muted">{text.loginHint}</p> : null}
          {!account && loginFailed ? <p className="mt-4 text-sm font-semibold text-[#b42318]" role="alert">{text.failedLogin}</p> : null}
          {message ? <p className="mt-4 text-sm font-semibold text-[#b42318]" role="alert">{message}</p> : null}
        </section>

        {!catalog ? <p className="py-16 text-center text-muted">{text.loading}</p> : (
          <>
            <section className="pt-12">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div><span className="section-kicker">{text.inventory}</span><h2 className="mt-2 text-2xl font-extrabold text-text">{catalog.issuedForDate}</h2></div>
                <p className="text-sm text-muted">{claimedCount} / {catalog.eggs.length} {text.claimed.toLowerCase()}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {catalog.eggs.map((egg) => (
                  <article key={egg.id} className="rounded-2xl border border-border bg-bg-elevated p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-extrabold text-accent">{text.code} #{String(egg.slot).padStart(2, "0")}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${egg.available ? "bg-accent-light text-accent" : "bg-bg-secondary text-muted"}`}>{egg.available ? text.available : text.claimed}</span>
                    </div>
                    <ul className="mt-4 space-y-1 text-sm text-muted">{traitsList(egg.traits).map((trait) => <li key={trait}>{trait}</li>)}</ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button className="rounded-lg border border-border px-3 py-2 text-sm font-bold text-text hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50" disabled={!account || pendingId === egg.id} type="button" onClick={() => void support(egg.id, !egg.supported)}>{egg.supported ? text.supported : text.support} · {egg.supporters}</button>
                      <button className="rounded-lg bg-accent px-3 py-2 text-sm font-bold text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50" disabled={!account || !egg.available || pendingId === egg.id || egg.claimedByViewer} type="button" onClick={() => void claim(egg.id)}>{egg.claimedByViewer ? text.claimedByYou : text.claim}</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {account ? <section className="pt-14"><span className="section-kicker">{text.backpack}</span><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{assets.length ? assets.map((asset) => <article className="rounded-2xl border border-border bg-bg-elevated p-5 text-sm text-muted" key={asset.id}><strong className="block text-text">Pet egg</strong><span className="mt-2 block">{traitsList(asset.traits).join(" · ")}</span></article>) : <p className="text-muted">{text.emptyBackpack}</p>}</div></section> : null}
          </>
        )}
      </div>
    </main>
  );
}
