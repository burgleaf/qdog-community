"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PetEggVisual } from "@/components/pet-egg-visual";
import { claimStarterPetEgg, getCurrentAccount, getPetEggAssets, logoutQDogAccount, petHatchImageUrl, type PetEggAsset, type QDogAccount } from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

const copy = {
  en: { loading: "Loading personal center…", loginTitle: "Log in first", loginDesc: "Log in to view your Cyber Life backpack.", goLogin: "Go to login", account: "Life account", credits: "hatch credits", logout: "Log out", persistent: "Persistent identities", vault: "My life vault", encoding: "Encoding genome…", claimFree: "Claim free starter egg", daily: "View daily 50", error: "The starter egg could not be claimed. Please try again.", empty: "Your vault is empty. Start with the free egg made for your account.", claim: "Claim starter egg", awakenedAlt: "Awakened Cyber Life", life: "Cyber Life", egg: "Cyber Egg", lifeDesc: "Identity awakened and ready for a future Codex form", eggDesc: "Nine-part genome sealed · Hatch costs 5 credits", locale: "en-US", view: "View Cyber Life", returning: "Return to incubator", enter: "Enter incubator" },
  zh: { loading: "正在加载个人中心…", loginTitle: "请先登录", loginDesc: "登录后即可查看你的赛博背包。", goLogin: "前往登录", account: "生命账户", credits: "孵化积分", logout: "退出登录", persistent: "永久身份资产", vault: "我的生命库", encoding: "正在写入基因…", claimFree: "免费领取新手蛋", daily: "查看每日 50 枚", error: "新手蛋暂时无法领取，请稍后重试。", empty: "生命库还是空的。先领取属于你的免费新手蛋。", claim: "领取新手蛋", awakenedAlt: "已孵化的赛博生命", life: "赛博生命", egg: "赛博蛋", lifeDesc: "身份已经觉醒，未来可以构建 Codex 动画化身", eggDesc: "九维生命编码已封存 · 孵化消耗 5 积分", locale: "zh-CN", view: "查看赛博生命", returning: "返回孵化舱", enter: "进入孵化舱" },
  ko: { loading: "개인 센터 불러오는 중…", loginTitle: "먼저 로그인하세요", loginDesc: "로그인하여 사이버 라이프 보관함을 확인하세요.", goLogin: "로그인하기", account: "라이프 계정", credits: "부화 크레딧", logout: "로그아웃", persistent: "영구 정체성 자산", vault: "내 라이프 보관함", encoding: "유전자 인코딩 중…", claimFree: "무료 스타터 에그 받기", daily: "오늘의 50개 보기", error: "스타터 에그를 받을 수 없습니다. 다시 시도해 주세요.", empty: "보관함이 비어 있습니다. 계정 전용 무료 에그부터 시작하세요.", claim: "스타터 에그 받기", awakenedAlt: "각성한 사이버 라이프", life: "사이버 라이프", egg: "사이버 에그", lifeDesc: "정체성이 각성했으며 향후 Codex 형태로 만들 수 있습니다", eggDesc: "아홉 가지 유전자 봉인 · 부화 비용 5크레딧", locale: "ko-KR", view: "사이버 라이프 보기", returning: "부화기로 돌아가기", enter: "부화기 입장" },
  ja: { loading: "マイページを読み込み中…", loginTitle: "先にログインしてください", loginDesc: "ログインしてサイバー生命庫を確認できます。", goLogin: "ログインへ", account: "生命アカウント", credits: "孵化クレジット", logout: "ログアウト", persistent: "永続アイデンティティ資産", vault: "マイ生命庫", encoding: "遺伝子を記録中…", claimFree: "無料スターターエッグを受け取る", daily: "今日の50個を見る", error: "スターターエッグを受け取れませんでした。もう一度お試しください。", empty: "生命庫はまだ空です。アカウント専用の無料エッグから始めましょう。", claim: "スターターエッグを受け取る", awakenedAlt: "覚醒したサイバー生命", life: "サイバー生命", egg: "サイバーエッグ", lifeDesc: "個性は覚醒済み。将来 Codex の姿を構築できます", eggDesc: "9つの生命遺伝子を封印 · 孵化は5クレジット", locale: "ja-JP", view: "サイバー生命を見る", returning: "孵化装置に戻る", enter: "孵化装置へ" },
  es: { loading: "Cargando centro personal…", loginTitle: "Inicia sesión primero", loginDesc: "Inicia sesión para ver tu mochila de vida cibernética.", goLogin: "Ir al inicio de sesión", account: "Cuenta de vida", credits: "créditos de incubación", logout: "Cerrar sesión", persistent: "Identidades permanentes", vault: "Mi bóveda de vida", encoding: "Codificando genoma…", claimFree: "Reclamar huevo inicial gratis", daily: "Ver los 50 diarios", error: "No se pudo reclamar el huevo inicial. Inténtalo de nuevo.", empty: "Tu bóveda está vacía. Empieza con el huevo gratuito de tu cuenta.", claim: "Reclamar huevo inicial", awakenedAlt: "Vida cibernética despierta", life: "Vida cibernética", egg: "Huevo cibernético", lifeDesc: "Identidad despierta y preparada para una futura forma Codex", eggDesc: "Genoma de nueve rasgos sellado · Incubar cuesta 5 créditos", locale: "es-ES", view: "Ver vida cibernética", returning: "Volver a la incubadora", enter: "Entrar en la incubadora" },
};

export function AccountPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
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
      setMessage(text.error);
    } finally {
      setClaiming(false);
    }
  }

  if (account === undefined) return <main className="identity-page" data-domain="cyber"><p>{text.loading}</p></main>;
  if (!account) return (
    <main className="identity-page" data-domain="cyber"><section className="identity-card"><h1>{text.loginTitle}</h1><p>{text.loginDesc}</p><Link className="identity-provider" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/account"))}`}>{text.goLogin}</Link></section></main>
  );

  return (
    <main className="account-page" data-domain="cyber">
      <section className="account-profile">
        {account.avatarUrl ? <img src={account.avatarUrl} alt="" /> : <span>{(account.displayName ?? account.email ?? "Q").slice(0, 1)}</span>}
        <div><span className="section-kicker">{text.account}</span><h1>{account.displayName ?? account.email}</h1><p>{account.email}</p></div>
        <div className="account-credits"><strong>{account.credits}</strong><span>{text.credits}</span></div>
        <button onClick={() => void logout()} type="button">{text.logout}</button>
      </section>

      <section className="backpack-section">
        <div className="backpack-heading"><div><span>{text.persistent}</span><h2>{text.vault}</h2></div><div className="backpack-heading__actions">{!account.starterEggClaimed ? <button className="asset-button asset-button--primary" disabled={claiming} onClick={() => void claimStarter()} type="button">{claiming ? text.encoding : text.claimFree}</button> : null}<Link className="asset-button" href={localePath(locale, "/eggs")}>{text.daily}</Link></div></div>
        {message ? <p className="asset-message" role="alert">{message}</p> : null}
        {assets.length === 0 ? <div className="backpack-empty"><p>{text.empty}</p><button disabled={claiming} onClick={() => void claimStarter()} type="button">{text.claim}</button></div> : (
          <div className="backpack-grid">
            {assets.map((asset) => {
              const hatched = asset.hatch?.status === "completed";
              return <article className={`backpack-card ${hatched ? "backpack-card--life" : "backpack-card--egg"}`} key={asset.id}>
                <div className="backpack-card__visual">
                  {hatched
                    ? <img className="backpack-card__pet" src={petHatchImageUrl(asset.id)} alt={text.awakenedAlt} />
                    : <PetEggVisual className="backpack-card__egg" genomeCode={asset.genome.code} traits={asset.traits} />}
                </div>
                <div className="backpack-card__copy">
                  <span className="backpack-card__badge">{hatched ? text.life : text.egg}</span>
                  <code>{asset.genome.code}</code>
                  <h3>{hatched ? text.life : text.egg}</h3>
                  <p>{hatched ? text.lifeDesc : text.eggDesc}</p>
                  <time>{new Date(asset.acquiredAt).toLocaleDateString(text.locale)}</time>
                  <Link className="backpack-card__hatch" href={`${localePath(locale, "/eggs/hatch")}?id=${encodeURIComponent(asset.id)}`}>{hatched ? text.view : asset.hatch?.status === "generating" ? text.returning : text.enter}</Link>
                </div>
              </article>;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
