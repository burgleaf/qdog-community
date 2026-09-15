"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { PetEggVisual } from "@/components/pet-egg-visual";
import { getCurrentAccount, redeemPetEggCode, type PetEggAsset, type QDogAccount } from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

const copy = {
  en: { kicker: "Code redemption", title: "Reveal a Cyber Egg", intro: "Enter a daily code. Its sealed life code will generate a unique SVG Cyber Egg in your backpack. Cyber Life cannot be installed into Codex.", browse: "Browse today’s codes →", invalid: "The code format is invalid.", used: "This code is used, expired, or you already redeemed one today.", success: "Redeemed", view: "View in backpack", label: "Cyber Egg code", pending: "Redeeming…", redeem: "Redeem Cyber Egg", loginText: "Redemption creates an account asset. Please log in first.", login: "Log in" },
  zh: { kicker: "代码兑换", title: "领取一枚赛博蛋", intro: "输入每日发放的代码。兑换成功后，隐藏的生命编码会生成专属 SVG 蛋体并存入背包。生命形象不能装进 Codex。", browse: "查看今日发放代码 →", invalid: "代码格式不正确。", used: "代码已兑换、已过期，或你今天已经兑换过。", success: "兑换成功", view: "放入背包并查看", label: "赛博蛋代码", pending: "正在兑换…", redeem: "兑换赛博蛋", loginText: "兑换属于账户资产，请先登录。", login: "前往登录" },
  ko: { kicker: "코드 교환", title: "사이버 에그 공개", intro: "데일리 코드를 입력하세요. 봉인된 생명 코드는 고유한 SVG 사이버 에그를 만들어 보관함에 저장합니다. 사이버 라이프 자체는 Codex에 설치할 수 없습니다.", browse: "오늘의 코드 보기 →", invalid: "코드 형식이 올바르지 않습니다.", used: "사용 또는 만료된 코드이거나 오늘 이미 하나를 교환했습니다.", success: "교환 완료", view: "보관함에서 보기", label: "사이버 에그 코드", pending: "교환 중…", redeem: "사이버 에그 교환", loginText: "교환하면 계정 자산이 생성됩니다. 먼저 로그인하세요.", login: "로그인" },
  ja: { kicker: "コード交換", title: "サイバーエッグを公開", intro: "デイリーコードを入力してください。封印された生命コードから固有の SVG サイバーエッグを生成し、生命庫に保存します。サイバー生命自体は Codex にインストールできません。", browse: "今日のコードを見る →", invalid: "コード形式が正しくありません。", used: "使用済み、期限切れ、または本日すでに交換済みです。", success: "交換完了", view: "生命庫で見る", label: "サイバーエッグコード", pending: "交換中…", redeem: "サイバーエッグを交換", loginText: "交換するとアカウント資産が作成されます。先にログインしてください。", login: "ログイン" },
  es: { kicker: "Canje de código", title: "Revela un huevo cibernético", intro: "Introduce un código diario. Su código de vida sellado generará un huevo SVG único en tu mochila. La vida cibernética no se instala directamente en Codex.", browse: "Ver los códigos de hoy →", invalid: "El formato del código no es válido.", used: "El código está usado, caducó o ya canjeaste uno hoy.", success: "Canjeado", view: "Ver en la mochila", label: "Código de huevo cibernético", pending: "Canjeando…", redeem: "Canjear huevo", loginText: "El canje crea un activo de la cuenta. Inicia sesión primero.", login: "Iniciar sesión" },
};

export function RedeemPetEggPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
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
      setError(reason === "invalid_pet_egg_code" ? text.invalid : text.used);
    } finally { setPending(false); }
  }

  return (
    <main className="redeem-page" data-domain="cyber">
      <section className="redeem-panel">
        <div className="redeem-copy"><span className="section-kicker">{text.kicker}</span><h1>{text.title}</h1><p>{text.intro}</p><Link href={localePath(locale, "/eggs")}>{text.browse}</Link></div>
        <div className="redeem-machine">
          {asset ? <><PetEggVisual className="redeem-result" genomeCode={asset.genome.code} traits={asset.traits} /><strong>{text.success}</strong><code>{asset.genome.code}</code><Link className="asset-button asset-button--primary" href={localePath(locale, "/account")}>{text.view}</Link></> : account ? (
            <form onSubmit={(event) => void redeem(event)}><label htmlFor="egg-code">{text.label}</label><input id="egg-code" value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="QD-XXXX-XXXX-XXXX" autoComplete="off" spellCheck={false} /><button disabled={pending || !code} type="submit">{pending ? text.pending : text.redeem}</button>{error ? <p role="alert">{error}</p> : null}</form>
          ) : <div className="redeem-login"><p>{text.loginText}</p><Link className="asset-button asset-button--primary" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/eggs/redeem"))}`}>{text.login}</Link></div>}
        </div>
      </section>
    </main>
  );
}
