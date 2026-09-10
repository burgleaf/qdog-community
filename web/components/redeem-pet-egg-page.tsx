"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { PetEggVisual } from "@/components/pet-egg-visual";
import { getCurrentAccount, redeemPetEggCode, type PetEggAsset, type QDogAccount } from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

export function RedeemPetEggPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const [account, setAccount] = useState<QDogAccount | null>(null);
  const [code, setCode] = useState("");
  const [asset, setAsset] = useState<PetEggAsset | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { void getCurrentAccount().then(setAccount); }, []);

  async function redeem(event: FormEvent) {
    event.preventDefault();
    setPending(true); setError("");
    try { setAsset((await redeemPetEggCode(code)).asset); }
    catch (caught) {
      const reason = caught instanceof Error ? caught.message : "";
      setError(reason === "invalid_pet_egg_code" ? (zh ? "代码格式不正确。" : "The code format is invalid.") : (zh ? "代码已兑换、已过期，或你今天已经兑换过。" : "This code is used, expired, or you already redeemed one today."));
    } finally { setPending(false); }
  }

  return (
    <main className="redeem-page">
      <section className="redeem-panel">
        <div className="redeem-copy"><span className="section-kicker">{zh ? "代码兑换" : "Code redemption"}</span><h1>{zh ? "领取一枚赛博宠物蛋" : "Reveal a Cyber Egg"}</h1><p>{zh ? "输入每日发放的代码。兑换成功后，隐藏的生命编码会生成专属 SVG 蛋体并存入背包。" : "Enter a daily code. Its sealed life code will generate a unique SVG Cyber Egg in your backpack."}</p><Link href={localePath(locale, "/eggs")}>{zh ? "查看今日发放代码 →" : "Browse today’s codes →"}</Link></div>
        <div className="redeem-machine">
          {asset ? <><PetEggVisual className="redeem-result" genomeCode={asset.genome.code} traits={asset.traits} /><strong>{zh ? "兑换成功" : "Redeemed"}</strong><code>{asset.genome.code}</code><Link className="asset-button asset-button--primary" href={localePath(locale, "/account")}>{zh ? "放入背包并查看" : "View in backpack"}</Link></> : account ? (
            <form onSubmit={(event) => void redeem(event)}><label htmlFor="egg-code">{zh ? "赛博宠物蛋代码" : "Cyber Egg code"}</label><input id="egg-code" value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="QD-XXXX-XXXX-XXXX" autoComplete="off" spellCheck={false} /><button disabled={pending || !code} type="submit">{pending ? (zh ? "正在兑换…" : "Redeeming…") : (zh ? "兑换赛博宠物蛋" : "Redeem Cyber Egg")}</button>{error ? <p role="alert">{error}</p> : null}</form>
          ) : <div className="redeem-login"><p>{zh ? "兑换属于账户资产，请先登录。" : "Redemption creates an account asset. Please log in first."}</p><Link className="asset-button asset-button--primary" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/eggs/redeem"))}`}>{zh ? "前往登录" : "Log in"}</Link></div>}
        </div>
      </section>
    </main>
  );
}
