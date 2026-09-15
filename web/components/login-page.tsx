"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getCurrentAccount, googleLoginUrl, type QDogAccount } from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

const copy = {
  en: { kicker: "Create a life account", connected: "Your life account is connected", title: "Claim your first life egg", intro: "Continue with Google to receive one personal starter egg and 10 hatch credits. Your life assets remain private to your account.", center: "QDog member", continue: "Continue as {name}", provider: "Continue with Google", note: "New accounts receive 10 credits · A base hatch costs 5 credits" },
  zh: { kicker: "建立生命账户", connected: "你的生命账户已连接", title: "领取你的第一枚生命蛋", intro: "使用 Google 登录即可获得一枚专属新手蛋和 10 个孵化积分。无需填写资料，也不会公开你的生命资产。", center: "个人中心", continue: "进入 {name}", provider: "使用 Google 账号登录", note: "新账户赠送 10 积分 · 每次基础孵化消耗 5 积分" },
  ko: { kicker: "라이프 계정 만들기", connected: "라이프 계정이 연결되었습니다", title: "첫 번째 라이프 에그 받기", intro: "Google로 로그인하면 전용 스타터 에그 하나와 부화 크레딧 10개를 받습니다. 라이프 자산은 계정에 비공개로 보관됩니다.", center: "QDog 멤버", continue: "{name}(으)로 계속", provider: "Google로 계속", note: "새 계정에 10크레딧 제공 · 기본 부화는 5크레딧" },
  ja: { kicker: "生命アカウントを作成", connected: "生命アカウントに接続済み", title: "最初の生命エッグを受け取る", intro: "Google でログインすると、専用スターターエッグ1個と孵化クレジット10を受け取れます。生命資産はアカウント内で非公開です。", center: "QDog メンバー", continue: "{name} として続行", provider: "Google で続行", note: "新規アカウントに10クレジット · 基本孵化は5クレジット" },
  es: { kicker: "Crear una cuenta de vida", connected: "Tu cuenta de vida está conectada", title: "Reclama tu primer huevo de vida", intro: "Continúa con Google para recibir un huevo inicial personal y 10 créditos de incubación. Tus activos de vida permanecen privados.", center: "miembro de QDog", continue: "Continuar como {name}", provider: "Continuar con Google", note: "Las cuentas nuevas reciben 10 créditos · Una incubación básica cuesta 5" },
};

function safeReturnTo(locale: Locale) {
  if (typeof window === "undefined") return localePath(locale, "/account");
  const value = new URLSearchParams(window.location.search).get("return_to");
  return value?.startsWith("/") && !value.startsWith("//") ? value : localePath(locale, "/account");
}

export function LoginPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [account, setAccount] = useState<QDogAccount | null>(null);
  useEffect(() => { void getCurrentAccount().then(setAccount); }, []);

  return (
    <main className="identity-page" data-domain="cyber">
      <section className="identity-card">
        <span className="section-kicker">{text.kicker}</span>
        <h1>{account ? text.connected : text.title}</h1>
        <p>{text.intro}</p>
        {account ? (
          <Link className="identity-provider" href={localePath(locale, "/account")}>{text.continue.replace("{name}", account.displayName ?? text.center)}</Link>
        ) : (
          <a className="identity-provider" href={googleLoginUrl(safeReturnTo(locale))}>
            <span className="google-mark" aria-hidden="true">G</span>
            {text.provider}
          </a>
        )}
        <p className="identity-note">{text.note}</p>
      </section>
    </main>
  );
}
