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
    <main className="identity-page">
      <section className="identity-card">
        <span className="section-kicker">{zh ? "QDog 账户" : "QDog account"}</span>
        <h1>{account ? (zh ? "你已经登录" : "You’re already signed in") : (zh ? "登录 QDog" : "Log in to QDog")}</h1>
        <p>{zh ? "登录后可以兑换宠物蛋、支持每日代码，并在个人中心管理宠物蛋资产。" : "Log in to redeem pet eggs, support daily codes, and manage your assets in the personal center."}</p>
        {account ? (
          <Link className="identity-provider" href={localePath(locale, "/account")}>{zh ? `进入 ${account.displayName ?? "个人中心"}` : `Continue as ${account.displayName ?? "QDog member"}`}</Link>
        ) : (
          <a className="identity-provider" href={googleLoginUrl(safeReturnTo(locale))}>
            <span className="google-mark" aria-hidden="true">G</span>
            {zh ? "使用 Google 账号登录" : "Continue with Google"}
          </a>
        )}
        <p className="identity-note">{zh ? "目前支持 Google 登录，后续可继续增加其他登录方式。" : "Google is currently supported; more sign-in methods can be added later."}</p>
      </section>
    </main>
  );
}
