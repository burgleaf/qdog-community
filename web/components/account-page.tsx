"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PetEggVisual } from "@/components/pet-egg-visual";
import { getCurrentAccount, getPetEggAssets, logoutQDogAccount, petHatchImageUrl, type PetEggAsset, type QDogAccount } from "@/lib/qdog-server";
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
    <main className="identity-page"><section className="identity-card"><h1>{zh ? "请先登录" : "Log in first"}</h1><p>{zh ? "登录后即可查看你的赛博宠物蛋背包。" : "Log in to view your Cyber Egg backpack."}</p><Link className="identity-provider" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/account"))}`}>{zh ? "前往登录" : "Go to login"}</Link></section></main>
  );

  return (
    <main className="account-page">
      <section className="account-profile">
        {account.avatarUrl ? <img src={account.avatarUrl} alt="" /> : <span>{(account.displayName ?? account.email ?? "Q").slice(0, 1)}</span>}
        <div><span className="section-kicker">{zh ? "个人中心" : "Personal center"}</span><h1>{account.displayName ?? account.email}</h1><p>{account.email}</p></div>
        <button onClick={() => void logout()} type="button">{zh ? "退出登录" : "Log out"}</button>
      </section>

      <section className="backpack-section">
        <div className="backpack-heading"><div><span>{zh ? "赛博宠物蛋资产" : "Cyber Egg assets"}</span><h2>{zh ? "我的赛博背包" : "My cyber backpack"}</h2></div><Link className="asset-button asset-button--primary" href={localePath(locale, "/eggs/redeem")}>{zh ? "兑换新赛博宠物蛋" : "Redeem another Cyber Egg"}</Link></div>
        {assets.length === 0 ? <div className="backpack-empty"><p>{zh ? "背包还是空的。复制每日发放的代码，兑换第一枚赛博宠物蛋吧。" : "Your backpack is empty. Copy a daily code and redeem your first Cyber Egg."}</p><Link href={localePath(locale, "/eggs")}>{zh ? "查看今日代码" : "View today’s codes"}</Link></div> : (
          <div className="backpack-grid">
            {assets.map((asset) => {
              return <article className="backpack-card" key={asset.id}>
                <div className="backpack-card__visual">
                  {asset.hatch?.status === "completed"
                    ? <img className="backpack-card__pet" src={petHatchImageUrl(asset.id)} alt={zh ? "已孵化的赛博生命" : "Awakened Cyber Life"} />
                    : <PetEggVisual className="backpack-card__egg" genomeCode={asset.genome.code} traits={asset.traits} />}
                </div>
                <div className="backpack-card__copy">
                  <code>{asset.genome.code}</code>
                  <h3>{asset.hatch?.status === "completed" ? (zh ? "赛博生命" : "Cyber Life") : (zh ? "赛博宠物蛋" : "Cyber Egg")}</h3>
                  <p>{asset.hatch?.status === "completed" ? (zh ? "生命形态已固定" : "Life identity secured") : (zh ? "九维生命编码已封存" : "Nine-dimensional genome sealed")}</p>
                  <time>{new Date(asset.acquiredAt).toLocaleDateString(zh ? "zh-CN" : "en-US")}</time>
                  <Link className="backpack-card__hatch" href={`${localePath(locale, "/eggs/hatch")}?id=${encodeURIComponent(asset.id)}`}>{asset.hatch?.status === "completed" ? (zh ? "查看赛博生命" : "View Cyber Life") : asset.hatch?.status === "generating" ? (zh ? "返回孵化舱" : "Return to incubator") : (zh ? "进入孵化舱" : "Enter incubator")}</Link>
                </div>
              </article>;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
