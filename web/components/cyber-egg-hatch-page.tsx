"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PetEggVisual } from "@/components/pet-egg-visual";
import {
  getCurrentAccount,
  getPetEggAssets,
  getPetEggHatch,
  hatchPetEgg,
  petHatchImageUrl,
  type PetEggAsset,
  type QDogAccount,
} from "@/lib/qdog-server";
import { localePath, type Locale } from "@/lib/i18n";

type HatchPhase = "loading" | "ready" | "hatching" | "completed" | "error";

const copy = {
  zh: {
    kicker: "赛博生命孵化舱",
    title: "唤醒你的赛博生命",
    intro: "生命模型会读取蛋内封存的基因编码，逐步构建一个独一无二的赛博生命。",
    start: "连接生命模型并开始孵化",
    retry: "重新连接孵化舱",
    back: "返回我的背包",
    login: "登录后才能进入赛博生命孵化舱。",
    missing: "没有找到这枚赛博宠物蛋，或它不属于当前账户。",
    complete: "赛博生命已苏醒",
    result: "本次生成结果已固定保存，再次访问不会重复消耗模型额度。",
    quota: "今日赛博生命孵化名额已用完，请在下一个 UTC 自然日再来。",
    failed: "生命模型暂时没有完成孵化，请稍后重新连接。",
    code: "加密生命编码",
    model: "AI LIFE MODEL · GPT-IMAGE-2",
    progress: "孵化同步率",
    steps: [
      "正在验证蛋体与资产归属",
      "正在解封九维生命基因",
      "正在与生命模型建立安全连接",
      "生命模型正在塑造轮廓与材质",
      "正在固化赛博生命的唯一形态",
    ],
  },
  en: {
    kicker: "Cyber Life Incubator",
    title: "Awaken your Cyber Life",
    intro: "The life model reads the genome sealed inside the egg and constructs one unique Cyber Life.",
    start: "Connect life model and hatch",
    retry: "Reconnect incubator",
    back: "Back to backpack",
    login: "Log in to enter the Cyber Life incubator.",
    missing: "This Cyber Egg was not found or does not belong to this account.",
    complete: "Cyber Life awakened",
    result: "This result is permanently stored. Revisiting it will not consume model quota again.",
    quota: "Today’s Cyber Life hatch capacity is full. Please return on the next UTC day.",
    failed: "The life model did not finish this hatch. Please reconnect later.",
    code: "Encrypted life code",
    model: "AI LIFE MODEL · GPT-IMAGE-2",
    progress: "Incubation sync",
    steps: [
      "Verifying egg ownership and integrity",
      "Unsealing the nine-dimensional genome",
      "Opening a secure life-model connection",
      "The life model is shaping form and material",
      "Locking the Cyber Life’s unique identity",
    ],
  },
};

export function CyberEggHatchPage({ locale }: { locale: Locale }) {
  const text = locale === "zh" ? copy.zh : copy.en;
  const [account, setAccount] = useState<QDogAccount | null | undefined>();
  const [asset, setAsset] = useState<PetEggAsset | null>();
  const [phase, setPhase] = useState<HatchPhase>("loading");
  const [step, setStep] = useState(0);
  const [errorCode, setErrorCode] = useState("");

  useEffect(() => {
    let active = true;
    void (async () => {
      const nextAccount = await getCurrentAccount();
      if (!active) return;
      setAccount(nextAccount);
      if (!nextAccount) { setPhase("ready"); return; }
      const assetId = new URLSearchParams(window.location.search).get("id");
      const assets = (await getPetEggAssets()).assets;
      if (!active) return;
      const selected = assets.find((item) => item.id === assetId) ?? null;
      setAsset(selected);
      setPhase(selected?.hatch?.status === "completed" ? "completed" : selected?.hatch?.status === "generating" ? "hatching" : "ready");
    })().catch(() => { if (active) setPhase("error"); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (phase !== "hatching") return;
    const timer = window.setInterval(() => {
      setStep((current) => Math.min(current + 1, text.steps.length - 1));
    }, 2800);
    return () => window.clearInterval(timer);
  }, [phase, text.steps.length]);

  useEffect(() => {
    if (phase !== "hatching" || !asset || asset.hatch?.status !== "generating") return;
    const timer = window.setInterval(() => {
      void getPetEggHatch(asset.id).then(({ hatch }) => {
        setAsset((current) => current ? { ...current, hatch } : current);
        if (hatch.status === "completed") setPhase("completed");
        if (hatch.status === "failed") setPhase("ready");
      }).catch(() => undefined);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [asset, phase]);

  const progress = useMemo(() => {
    if (phase === "completed") return 100;
    if (phase !== "hatching") return 0;
    return Math.min(18 + step * 18, 90);
  }, [phase, step]);

  async function startHatch() {
    if (!asset) return;
    setErrorCode("");
    setStep(0);
    setPhase("hatching");
    try {
      const { hatch } = await hatchPetEgg(asset.id);
      setAsset({ ...asset, hatch });
      setStep(text.steps.length - 1);
      setPhase("completed");
    } catch (error) {
      const code = error instanceof Error ? error.message : "hatch_generation_failed";
      setErrorCode(code);
      if (code === "hatch_in_progress") {
        setAsset({ ...asset, hatch: { status: "generating", imagePath: null, updatedAt: Date.now() } });
      } else {
        setPhase("error");
      }
    }
  }

  const message = errorCode === "daily_hatch_limit_reached" ? text.quota : text.failed;

  return <main className="hatch-page">
    <section className="hatch-hero">
      <span>{text.kicker}</span>
      <h1>{text.title}</h1>
      <p>{text.intro}</p>
    </section>

    <section className={`hatch-console hatch-console--${phase}`}>
      <div className="hatch-chamber">
        <div className="hatch-chamber__rings" aria-hidden="true"><i /><i /><i /></div>
        {phase === "completed" && asset
          ? <img className="hatch-life" src={petHatchImageUrl(asset.id)} alt={text.complete} />
          : asset ? <PetEggVisual className="hatch-egg" genomeCode={asset.genome.code} traits={asset.traits} /> : <div className="hatch-placeholder" />}
        <div className="hatch-chamber__beam" aria-hidden="true" />
      </div>

      <div className="hatch-control">
        {phase === "loading" ? <p>{text.steps[0]}…</p> : null}
        {!account && phase !== "loading" ? <div className="hatch-notice"><p>{text.login}</p><Link className="asset-button asset-button--primary" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(`${localePath(locale, "/eggs/hatch")}${window.location.search}`)}`}>{locale === "zh" ? "前往登录" : "Log in"}</Link></div> : null}
        {account && asset === null ? <div className="hatch-notice"><p>{text.missing}</p><Link href={localePath(locale, "/account")}>{text.back}</Link></div> : null}
        {account && asset === undefined && phase === "error" ? <div className="hatch-notice"><p>{text.failed}</p><Link href={localePath(locale, "/account")}>{text.back}</Link></div> : null}
        {asset ? <>
          <div className="hatch-code"><span>{text.code}</span><code>{asset.genome.code}</code></div>
          <div className="hatch-channel"><span className={phase === "hatching" ? "is-live" : ""} />{text.model}</div>
          {phase === "completed" ? <div className="hatch-complete"><small>100%</small><h2>{text.complete}</h2><p>{text.result}</p></div> : <>
            <div className="hatch-progress"><div><span>{text.progress}</span><strong>{progress}%</strong></div><i><b style={{ width: `${progress}%` }} /></i></div>
            <ol className="hatch-log">
              {text.steps.map((label, index) => <li className={phase === "hatching" && index <= step ? "is-active" : ""} key={label}><span>{index < step ? "✓" : index === step && phase === "hatching" ? "●" : "○"}</span>{label}</li>)}
            </ol>
            {phase === "error" ? <p className="hatch-error" role="alert">{message}</p> : null}
            <button className="hatch-start" disabled={phase === "hatching"} onClick={() => void startHatch()} type="button">{phase === "hatching" ? text.steps[step] : phase === "error" ? text.retry : text.start}</button>
          </>}
          <Link className="hatch-back" href={localePath(locale, "/account")}>← {text.back}</Link>
        </> : null}
      </div>
    </section>
  </main>;
}
