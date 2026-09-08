"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PetEggVisual, parseEggTraits } from "@/components/pet-egg-visual";
import { getCurrentAccount, getPetEggAssets, logoutQDogAccount, type PetEggAsset, type QDogAccount } from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

export function AccountPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const [account, setAccount] = useState<QDogAccount | null | undefined>(undefined);
  const [assets, setAssets] = useState<PetEggAsset[]>([]);

  useEffect(() => {
    void getCurrentAccount().then(async (nextAccount) => {
      setAccount(nextAccount);
      if (nextAccount) setAssets((await getPetEggAssets()).assets);
    });
  }, []);

  async function logout() {
    await logoutQDogAccount();
    window.location.assign(localePath(locale, "/login"));
  }

  if (account === undefined) return <main className="identity-page"><p>{zh ? "正在加载个人中心…" : "Loading personal center…"}</p></main>;
  if (!account) return (
    <main className="identity-page"><section className="identity-card"><h1>{zh ? "请先登录" : "Log in first"}</h1><p>{zh ? "登录后即可查看你的宠物蛋背包。" : "Log in to view your pet egg backpack."}</p><Link className="identity-provider" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/account"))}`}>{zh ? "前往登录" : "Go to login"}</Link></section></main>
  );

  return (
    <main className="account-page">
      <section className="account-profile">
        {account.avatarUrl ? <img src={account.avatarUrl} alt="" /> : <span>{(account.displayName ?? account.email ?? "Q").slice(0, 1)}</span>}
        <div><span className="section-kicker">{zh ? "个人中心" : "Personal center"}</span><h1>{account.displayName ?? account.email}</h1><p>{account.email}</p></div>
        <button onClick={() => void logout()} type="button">{zh ? "退出登录" : "Log out"}</button>
      </section>

      <section className="backpack-section">
        <div className="backpack-heading"><div><span>{zh ? "宠物蛋资产" : "Pet egg assets"}</span><h2>{zh ? "我的宠物背包" : "My pet backpack"}</h2></div><Link className="asset-button asset-button--primary" href={localePath(locale, "/eggs/redeem")}>{zh ? "兑换新宠物蛋" : "Redeem another egg"}</Link></div>
        {assets.length === 0 ? <div className="backpack-empty"><p>{zh ? "背包还是空的。复制每日发放的代码，兑换第一枚宠物蛋吧。" : "Your backpack is empty. Copy a daily code and redeem your first pet egg."}</p><Link href={localePath(locale, "/eggs")}>{zh ? "查看今日代码" : "View today’s codes"}</Link></div> : (
          <div className="backpack-grid">
            {assets.map((asset) => {
              const traits = parseEggTraits(asset.traits);
              return <article className="backpack-card" key={asset.id}><PetEggVisual className="backpack-card__egg" traits={asset.traits} /><div><code>{asset.code}</code><h3>{zh ? "宠物蛋" : "Pet egg"}</h3><p>{[traits.color, traits.material, traits.shape, traits.size].join(" · ")}</p><time>{new Date(asset.acquiredAt).toLocaleDateString(zh ? "zh-CN" : "en-US")}</time></div></article>;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
