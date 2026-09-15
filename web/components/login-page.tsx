"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getCurrentAccount, googleLoginUrl, type QDogAccount } from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

function safeReturnTo(locale: Locale) {
  if (typeof window === "undefined") return localePath(locale, "/account");
  const value = new URLSearchParams(window.location.search).get("return_to");
  return value?.startsWith("/") && !value.startsWith("//") ? value : localePath(locale, "/account");
}

export function LoginPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  const [account, setAccount] = useState<QDogAccount | null>(null);
  useEffect(() => { void getCurrentAccount().then(setAccount); }, []);

  return (
    <main className="identity-page" data-domain="cyber">
      <section className="identity-card">
        <span className="section-kicker">{zh ? "建立生命账户" : "Create a life account"}</span>
        <h1>{account ? (zh ? "你的生命账户已连接" : "Your life account is connected") : (zh ? "领取你的第一枚生命蛋" : "Claim your first life egg")}</h1>
        <p>{zh ? "使用 Google 登录即可获得一枚专属新手蛋和 10 个孵化积分。无需填写资料，也不会公开你的生命资产。" : "Continue with Google to receive one personal starter egg and 10 hatch credits. Your life assets remain private to your account."}</p>
        {account ? (
          <Link className="identity-provider" href={localePath(locale, "/account")}>{zh ? `进入 ${account.displayName ?? "个人中心"}` : `Continue as ${account.displayName ?? "QDog member"}`}</Link>
        ) : (
          <a className="identity-provider" href={googleLoginUrl(safeReturnTo(locale))}>
            <span className="google-mark" aria-hidden="true">G</span>
            {zh ? "使用 Google 账号登录" : "Continue with Google"}
          </a>
        )}
        <p className="identity-note">{zh ? "新账户赠送 10 积分 · 每次基础孵化消耗 1 积分" : "New accounts receive 10 credits · A base hatch costs 1 credit"}</p>
      </section>
    </main>
  );
}
