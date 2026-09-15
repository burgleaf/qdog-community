"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PetEggVisual } from "@/components/pet-egg-visual";
import { claimStarterPetEgg, getCurrentAccount, getPetEggAssets, logoutQDogAccount, petHatchImageUrl, type PetEggAsset, type QDogAccount } from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

export function AccountPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const [account, setAccount] = useState<QDogAccount | null | undefined>(undefined);
  const [assets, setAssets] = useState<PetEggAsset[]>([]);
  const [claiming, setClaiming] = useState(false);
  const [message, setMessage] = useState("");

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

  async function claimStarter() {
    setClaiming(true);
    setMessage("");
    try {
      await claimStarterPetEgg();
      const [nextAccount, nextAssets] = await Promise.all([getCurrentAccount(), getPetEggAssets()]);
      setAccount(nextAccount);
      setAssets(nextAssets.assets);
    } catch {
      setMessage(zh ? "新手蛋暂时无法领取，请稍后重试。" : "The starter egg could not be claimed. Please try again.");
    } finally {
      setClaiming(false);
    }
  }

  if (account === undefined) return <main className="identity-page" data-domain="cyber"><p>{zh ? "正在加载个人中心…" : "Loading personal center…"}</p></main>;
  if (!account) return (
    <main className="identity-page" data-domain="cyber"><section className="identity-card"><h1>{zh ? "请先登录" : "Log in first"}</h1><p>{zh ? "登录后即可查看你的赛博背包。" : "Log in to view your Cyber Life backpack."}</p><Link className="identity-provider" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/account"))}`}>{zh ? "前往登录" : "Go to login"}</Link></section></main>
  );

  return (
    <main className="account-page" data-domain="cyber">
      <section className="account-profile">
        {account.avatarUrl ? <img src={account.avatarUrl} alt="" /> : <span>{(account.displayName ?? account.email ?? "Q").slice(0, 1)}</span>}
        <div><span className="section-kicker">{zh ? "生命账户" : "Life account"}</span><h1>{account.displayName ?? account.email}</h1><p>{account.email}</p></div>
        <div className="account-credits"><strong>{account.credits}</strong><span>{zh ? "孵化积分" : "hatch credits"}</span></div>
        <button onClick={() => void logout()} type="button">{zh ? "退出登录" : "Log out"}</button>
      </section>

      <section className="backpack-section">
        <div className="backpack-heading"><div><span>{zh ? "永久身份资产" : "Persistent identities"}</span><h2>{zh ? "我的生命库" : "My life vault"}</h2></div><div className="backpack-heading__actions">{!account.starterEggClaimed ? <button className="asset-button asset-button--primary" disabled={claiming} onClick={() => void claimStarter()} type="button">{claiming ? (zh ? "正在写入基因…" : "Encoding genome…") : (zh ? "免费领取新手蛋" : "Claim free starter egg")}</button> : null}<Link className="asset-button" href={localePath(locale, "/eggs")}>{zh ? "查看每日 50 枚" : "View daily 50"}</Link></div></div>
        {message ? <p className="asset-message" role="alert">{message}</p> : null}
        {assets.length === 0 ? <div className="backpack-empty"><p>{zh ? "生命库还是空的。先领取属于你的免费新手蛋。" : "Your vault is empty. Start with the free egg made for your account."}</p><button disabled={claiming} onClick={() => void claimStarter()} type="button">{zh ? "领取新手蛋" : "Claim starter egg"}</button></div> : (
          <div className="backpack-grid">
            {assets.map((asset) => {
              const hatched = asset.hatch?.status === "completed";
              return <article className={`backpack-card ${hatched ? "backpack-card--life" : "backpack-card--egg"}`} key={asset.id}>
                <div className="backpack-card__visual">
                  {hatched
                    ? <img className="backpack-card__pet" src={petHatchImageUrl(asset.id)} alt={zh ? "已孵化的赛博生命" : "Awakened Cyber Life"} />
                    : <PetEggVisual className="backpack-card__egg" genomeCode={asset.genome.code} traits={asset.traits} />}
                </div>
                <div className="backpack-card__copy">
                  <span className="backpack-card__badge">{hatched ? (zh ? "赛博生命" : "Cyber Life") : (zh ? "赛博蛋" : "Cyber Egg")}</span>
                  <code>{asset.genome.code}</code>
                  <h3>{hatched ? (zh ? "赛博生命" : "Cyber Life") : (zh ? "赛博蛋" : "Cyber Egg")}</h3>
                  <p>{hatched ? (zh ? "身份已经觉醒，未来可以构建 Codex 动画化身" : "Identity awakened and ready for a future Codex form") : (zh ? "九维生命编码已封存 · 孵化消耗 1 积分" : "Nine-part genome sealed · Hatch costs 1 credit")}</p>
                  <time>{new Date(asset.acquiredAt).toLocaleDateString(zh ? "zh-CN" : "en-US")}</time>
                  <Link className="backpack-card__hatch" href={`${localePath(locale, "/eggs/hatch")}?id=${encodeURIComponent(asset.id)}`}>{hatched ? (zh ? "查看赛博生命" : "View Cyber Life") : asset.hatch?.status === "generating" ? (zh ? "返回孵化舱" : "Return to incubator") : (zh ? "进入孵化舱" : "Enter incubator")}</Link>
                </div>
              </article>;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
