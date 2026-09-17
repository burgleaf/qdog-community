"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { CodexIcon } from "@/components/codex-icon";
import { PetEggVisual } from "@/components/pet-egg-visual";
import {
  createPetCodexImageLink,
  getCurrentAccount,
  getPetEggAssets,
  getPetEggHatch,
  hatchPetEgg,
  petHatchImageUrl,
  type PetEggAsset,
  type QDogAccount,
} from "@/lib/qdog-server";
import { getCyberLifeCodexPrompt } from "@/lib/codex-links";
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
    loginCta: "前往登录",
    missing: "没有找到这枚赛博宠物蛋，或它不属于当前账户。",
    complete: "赛博生命已苏醒",
    result: "本次生成结果已固定保存，再次访问不会重复消耗模型额度。",
    quota: "今日赛博生命孵化名额已用完，请在下一个 UTC 自然日再来。",
    credits: "当前积分",
    cost: "本次孵化消耗 5 积分",
    insufficient: "孵化积分不足。付费补充功能即将开放。",
    failed: "孵化服务暂时繁忙，本次不会扣除积分，宠物蛋与生命基因也不会丢失。请稍后重试。",
    exhausted: "孵化服务连续异常，宠物蛋与积分均已保留。请稍后再试；如果问题持续，请联系客服并提供宠物蛋编号。",
    regionUnsupported: "源模型厂商暂不支持当前请求所在区域，本次不会扣除积分，宠物蛋与生命基因也不会丢失。",
    code: "加密生命编码",
    model: "AI LIFE MODEL · GPT-IMAGE-2",
    progress: "孵化同步率",
    codexTitle: "让它进入 Codex",
    codexDesc: "复制专属制作提示词，然后粘贴到 Codex。制作过程和结果仅保存在你的 Codex 环境中。",
    codexCopy: "复制 Codex 宠物制作提示词",
    codexCopying: "正在准备图片链接…",
    codexCopied: "已复制 · 请粘贴到 Codex",
    codexError: "暂时无法复制提示词，请稍后重试。",
    codexPrivacy: "图片链接有效 24 小时；分享提示词也会分享这张图片。",
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
    loginCta: "Log in",
    missing: "This Cyber Egg was not found or does not belong to this account.",
    complete: "Cyber Life awakened",
    result: "This result is permanently stored. Revisiting it will not consume model quota again.",
    quota: "Today’s Cyber Life hatch capacity is full. Please return on the next UTC day.",
    credits: "Credits available",
    cost: "This hatch costs 5 credits",
    insufficient: "You do not have enough hatch credits. Credit purchases are coming soon.",
    failed: "The hatch service is temporarily busy. No credit was charged, and your egg and genome are safe. Please try again later.",
    exhausted: "The hatch service failed repeatedly. Your egg and credit are safe. Try again later; if it continues, contact support with the egg ID.",
    regionUnsupported: "The source model provider does not support the region where this request originated. No credit was charged, and your egg and genome are safe.",
    code: "Encrypted life code",
    model: "AI LIFE MODEL · GPT-IMAGE-2",
    progress: "Incubation sync",
    codexTitle: "Bring it into Codex",
    codexDesc: "Copy the tailored production prompt and paste it into Codex. The process and results stay in your Codex environment.",
    codexCopy: "Copy Codex pet production prompt",
    codexCopying: "Preparing image link…",
    codexCopied: "Copied · paste into Codex",
    codexError: "The prompt could not be copied. Please try again.",
    codexPrivacy: "The image link lasts 24 hours; sharing the prompt also shares this image.",
    steps: [
      "Verifying egg ownership and integrity",
      "Unsealing the nine-dimensional genome",
      "Opening a secure life-model connection",
      "The life model is shaping form and material",
      "Locking the Cyber Life’s unique identity",
    ],
  },
  ko: {
    kicker: "사이버 라이프 부화기", title: "사이버 라이프 깨우기", intro: "생명 모델이 에그에 봉인된 유전자를 읽고 하나뿐인 사이버 라이프를 만듭니다.",
    start: "생명 모델에 연결하고 부화", retry: "부화기 다시 연결", back: "내 보관함으로", login: "사이버 라이프 부화기에 들어가려면 로그인하세요.", loginCta: "로그인", missing: "이 사이버 에그를 찾을 수 없거나 현재 계정의 소유가 아닙니다.", complete: "사이버 라이프 각성 완료", result: "이 결과는 영구 저장됩니다. 다시 방문해도 모델 한도를 추가로 사용하지 않습니다.", quota: "오늘의 부화 용량이 모두 찼습니다. 다음 UTC 날짜에 다시 방문하세요.", credits: "사용 가능한 크레딧", cost: "이번 부화는 5크레딧입니다", insufficient: "부화 크레딧이 부족합니다. 크레딧 구매 기능은 곧 제공됩니다.", failed: "부화 서비스가 잠시 혼잡합니다. 크레딧은 차감되지 않았으며 에그와 유전자는 안전합니다. 나중에 다시 시도하세요.", exhausted: "부화 서비스가 반복해서 실패했습니다. 에그와 크레딧은 안전합니다. 문제가 계속되면 에그 ID와 함께 지원팀에 문의하세요.", regionUnsupported: "원본 모델 제공업체가 현재 요청 지역을 지원하지 않습니다. 크레딧은 차감되지 않았으며 에그와 유전자는 안전합니다.", code: "암호화된 생명 코드", model: "AI LIFE MODEL · GPT-IMAGE-2", progress: "부화 동기화", codexTitle: "Codex로 데려가기", codexDesc: "맞춤 제작 프롬프트를 복사해 Codex에 붙여 넣으세요. 제작 과정과 결과는 사용자의 Codex 환경에만 남습니다.", codexCopy: "Codex 펫 제작 프롬프트 복사", codexCopying: "이미지 링크 준비 중…", codexCopied: "복사됨 · Codex에 붙여 넣으세요", codexError: "프롬프트를 복사할 수 없습니다. 다시 시도하세요.", codexPrivacy: "이미지 링크는 24시간 유효하며 프롬프트를 공유하면 이미지도 공유됩니다.",
    steps: ["에그 소유권과 무결성 확인 중", "아홉 가지 생명 유전자 개봉 중", "생명 모델과 보안 연결 중", "생명 모델이 형태와 소재를 만드는 중", "사이버 라이프의 고유한 정체성을 고정 중"],
  },
  ja: {
    kicker: "サイバー生命孵化装置", title: "サイバー生命を目覚めさせる", intro: "生命モデルがエッグに封印された遺伝子を読み取り、唯一のサイバー生命を構築します。",
    start: "生命モデルに接続して孵化", retry: "孵化装置に再接続", back: "生命庫に戻る", login: "サイバー生命孵化装置に入るにはログインしてください。", loginCta: "ログイン", missing: "このサイバーエッグが見つからないか、現在のアカウントの所有物ではありません。", complete: "サイバー生命が目覚めました", result: "この結果は永続保存されます。再訪してもモデル枠は追加消費されません。", quota: "本日の孵化枠は終了しました。次の UTC 日にお越しください。", credits: "利用可能クレジット", cost: "今回の孵化は5クレジット", insufficient: "孵化クレジットが不足しています。追加購入機能は近日公開予定です。", failed: "孵化サービスは一時的に混雑しています。クレジットは消費されず、エッグと遺伝子も安全です。後でもう一度お試しください。", exhausted: "孵化サービスでエラーが続きました。エッグとクレジットは保護されています。続く場合はエッグ ID を添えてサポートへご連絡ください。", regionUnsupported: "元のモデル提供元は現在のリクエスト地域をサポートしていません。クレジットは消費されず、エッグと遺伝子も安全です。", code: "暗号化生命コード", model: "AI LIFE MODEL · GPT-IMAGE-2", progress: "孵化同期率", codexTitle: "Codex へ連れていく", codexDesc: "専用の制作プロンプトをコピーして Codex に貼り付けます。制作過程と結果はあなたの Codex 環境内だけに残ります。", codexCopy: "Codex ペット制作プロンプトをコピー", codexCopying: "画像リンクを準備中…", codexCopied: "コピーしました · Codex に貼り付けてください", codexError: "プロンプトをコピーできませんでした。もう一度お試しください。", codexPrivacy: "画像リンクは24時間有効です。プロンプトを共有すると画像も共有されます。",
    steps: ["エッグの所有権と完全性を確認中", "9つの生命遺伝子を開封中", "生命モデルへ安全に接続中", "生命モデルが形と素材を生成中", "サイバー生命の唯一の個性を固定中"],
  },
  es: {
    kicker: "Incubadora de vida cibernética", title: "Despierta tu vida cibernética", intro: "El modelo de vida lee el genoma sellado en el huevo y construye una vida cibernética única.",
    start: "Conectar el modelo e incubar", retry: "Reconectar incubadora", back: "Volver a mi mochila", login: "Inicia sesión para entrar en la incubadora.", loginCta: "Iniciar sesión", missing: "No encontramos este huevo o no pertenece a la cuenta actual.", complete: "Vida cibernética despierta", result: "El resultado queda guardado permanentemente. Volver a visitarlo no consume más cuota.", quota: "La capacidad de incubación de hoy está completa. Regresa el próximo día UTC.", credits: "Créditos disponibles", cost: "Esta incubación cuesta 5 créditos", insufficient: "No tienes suficientes créditos. La compra de créditos estará disponible pronto.", failed: "El servicio está ocupado temporalmente. No se cobró ningún crédito y tu huevo y genoma están seguros. Inténtalo más tarde.", exhausted: "El servicio falló varias veces. Tu huevo y crédito están seguros. Si continúa, contacta con soporte e indica el ID del huevo.", regionUnsupported: "El proveedor del modelo de origen no admite la región desde la que se realizó esta solicitud. No se cobró ningún crédito y tu huevo y genoma están seguros.", code: "Código de vida cifrado", model: "AI LIFE MODEL · GPT-IMAGE-2", progress: "Sincronización de incubación", codexTitle: "Llévala a Codex", codexDesc: "Copia el prompt de producción personalizado y pégalo en Codex. El proceso y los resultados permanecen en tu entorno de Codex.", codexCopy: "Copiar prompt para crear la mascota Codex", codexCopying: "Preparando enlace de imagen…", codexCopied: "Copiado · pégalo en Codex", codexError: "No se pudo copiar el prompt. Inténtalo de nuevo.", codexPrivacy: "El enlace de imagen dura 24 horas; compartir el prompt también comparte esta imagen.",
    steps: ["Verificando propiedad e integridad del huevo", "Abriendo el genoma de nueve rasgos", "Creando una conexión segura con el modelo", "El modelo da forma y material a la vida", "Fijando la identidad única de la vida cibernética"],
  },
};

export function CyberEggHatchPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [account, setAccount] = useState<QDogAccount | null | undefined>();
  const [asset, setAsset] = useState<PetEggAsset | null>();
  const [phase, setPhase] = useState<HatchPhase>("loading");
  const [step, setStep] = useState(0);
  const [errorCode, setErrorCode] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

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
      setAccount(await getCurrentAccount());
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

  async function copyCodexPrompt() {
    if (!asset || phase !== "completed") return;
    setCopyStatus("copying");
    try {
      const { imageUrl } = await createPetCodexImageLink(asset.id);
      const prompt = getCyberLifeCodexPrompt({
        lifeCode: asset.genome.code,
        imageUrl,
      }, locale);
      await navigator.clipboard.writeText(prompt);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  const message = errorCode === "daily_hatch_limit_reached"
    ? text.quota
    : errorCode === "insufficient_credits"
      ? text.insufficient
      : errorCode === "hatch_provider_region_unsupported"
        ? text.regionUnsupported
        : errorCode === "hatch_retry_exhausted"
          ? text.exhausted
          : text.failed;

  return <main className="hatch-page" data-domain="cyber">
    <section className="hatch-hero">
      <span>{text.kicker}</span>
      <h1>{text.title}</h1>
      <p>{text.intro}</p>
    </section>

    <section className={`hatch-console hatch-console--${phase}`}>
      <div className="hatch-chamber">
        <div className="hatch-chamber__rings" aria-hidden="true"><i /><i /><i /></div>
        {phase === "completed" && asset
          ? <div className="hatch-life-stage"><img className="hatch-life" src={petHatchImageUrl(asset.id)} alt={text.complete} /></div>
          : asset ? <PetEggVisual className="hatch-egg" genomeCode={asset.genome.code} traits={asset.traits} /> : <div className="hatch-placeholder" />}
        <div className="hatch-chamber__beam" aria-hidden="true" />
      </div>

      <div className="hatch-control">
        {phase === "loading" ? <p>{text.steps[0]}…</p> : null}
        {!account && phase !== "loading" ? <div className="hatch-notice"><p>{text.login}</p><Link className="asset-button asset-button--primary" href={`${localePath(locale, "/login")}?return_to=${encodeURIComponent(`${localePath(locale, "/eggs/hatch")}${window.location.search}`)}`}>{text.loginCta}</Link></div> : null}
        {account && asset === null ? <div className="hatch-notice"><p>{text.missing}</p><Link href={localePath(locale, "/account")}>{text.back}</Link></div> : null}
        {account && asset === undefined && phase === "error" ? <div className="hatch-notice"><p>{text.failed}</p><Link href={localePath(locale, "/account")}>{text.back}</Link></div> : null}
        {asset ? <>
          <div className="hatch-code"><span>{text.code}</span><code>{asset.genome.code}</code></div>
          <div className="hatch-channel"><span className={phase === "hatching" ? "is-live" : ""} />{text.model}<strong>{text.credits}: {account?.credits ?? 0} ◈</strong></div>
          {phase === "completed" ? <div className="hatch-complete"><small>100%</small><h2>{text.complete}</h2><p>{text.result}</p><div className="hatch-codex"><div className="hatch-codex__heading"><CodexIcon className="size-9" /><div><h3>{text.codexTitle}</h3><p>{text.codexDesc}</p></div></div><button disabled={copyStatus === "copying"} onClick={() => void copyCodexPrompt()} type="button">{copyStatus === "copying" ? text.codexCopying : copyStatus === "copied" ? text.codexCopied : text.codexCopy}</button>{copyStatus === "error" ? <p className="hatch-error" role="alert">{text.codexError}</p> : null}<span>{text.codexPrivacy}</span></div></div> : <>
            <div className="hatch-progress"><div><span>{text.progress}</span><strong>{progress}%</strong></div><i><b style={{ width: `${progress}%` }} /></i></div>
            <ol className="hatch-log">
              {text.steps.map((label, index) => <li className={phase === "hatching" && index <= step ? "is-active" : ""} key={label}><span>{index < step ? "✓" : index === step && phase === "hatching" ? "●" : "○"}</span>{label}</li>)}
            </ol>
            {phase === "error" ? <p className="hatch-error" role="alert">{message}</p> : null}
            <p className="hatch-cost">{text.cost}</p>
            <button className="hatch-start" disabled={phase === "hatching" || (account?.credits ?? 0) < 5} onClick={() => void startHatch()} type="button">{phase === "hatching" ? text.steps[step] : phase === "error" ? text.retry : text.start}</button>
          </>}
          <Link className="hatch-back" href={localePath(locale, "/account")}>← {text.back}</Link>
        </> : null}
      </div>
    </section>
  </main>;
}
