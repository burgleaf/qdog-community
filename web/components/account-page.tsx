"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PetEggVisual } from "@/components/pet-egg-visual";
import { decodePetEggGenome } from "@/lib/pet-egg-genome";
import { getCurrentAccount, getPetEggAssets, hatchPetEgg, logoutQDogAccount, petHatchImageUrl, type PetEggAsset, type QDogAccount } from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

export function AccountPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const [account, setAccount] = useState<QDogAccount | null | undefined>(undefined);
  const [assets, setAssets] = useState<PetEggAsset[]>([]);
  const [hatchingId, setHatchingId] = useState<string | null>(null);
  const [hatchError, setHatchError] = useState<Record<string, string>>({});

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

  async function hatch(asset: PetEggAsset) {
    setHatchingId(asset.id);
    setHatchError((current) => ({ ...current, [asset.id]: "" }));
    try {
      const result = await hatchPetEgg(asset.id);
      setAssets((current) => current.map((item) => item.id === asset.id
        ? { ...item, hatch: result.hatch }
        : item));
    } catch (error) {
      const code = error instanceof Error ? error.message : "hatch_generation_failed";
      setHatchError((current) => ({ ...current, [asset.id]: code }));
    } finally {
      setHatchingId(null);
    }
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
              const genome = decodePetEggGenome(asset.genome.code);
              const generating = hatchingId === asset.id;
              return <article className="backpack-card" key={asset.id}>
                <div className="backpack-card__visual">
                  {asset.hatch?.status === "completed"
                    ? <img className="backpack-card__pet" src={petHatchImageUrl(asset.id)} alt={zh ? "已孵化的基础宠物" : "Hatched base pet"} />
                    : <PetEggVisual className="backpack-card__egg" genomeCode={asset.genome.code} traits={asset.traits} />}
                </div>
                <div className="backpack-card__copy">
                  <code>{asset.genome.code}</code>
                  <h3>{asset.hatch?.status === "completed" ? (zh ? "基础宠物" : "Base pet") : (zh ? "宠物蛋" : "Pet egg")}</h3>
                  {genome ? <p>{[genome.color, genome.material, genome.style, genome.archetype, genome.element, genome.temperament, genome.signature, genome.pattern, genome.habitat].join(" · ")}</p> : null}
                  <time>{new Date(asset.acquiredAt).toLocaleDateString(zh ? "zh-CN" : "en-US")}</time>
                  {asset.hatch?.status !== "completed" ? <button className="backpack-card__hatch" disabled={generating} onClick={() => void hatch(asset)} type="button">
                    {generating ? (zh ? "正在孵化…" : "Hatching…") : asset.hatch?.status === "generating" ? (zh ? "检查孵化状态" : "Check hatch") : asset.hatch?.status === "failed" ? (zh ? "重新孵化" : "Retry hatch") : (zh ? "孵化基础宠物" : "Hatch base pet")}
                  </button> : null}
                  {hatchError[asset.id] ? <p className="backpack-card__error">{zh ? "孵化暂时失败，请稍后重试。" : "Hatching failed for now. Please retry later."}</p> : null}
                </div>
              </article>;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
