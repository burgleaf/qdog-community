"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { PetEggVisual } from "@/components/pet-egg-visual";
import { useLocale } from "@/components/locale-provider";
import { localePath } from "@/lib/i18n";
import {
  claimStarterPetEgg,
  getCurrentAccount,
  getDailyPetEggs,
  type QDogAccount,
} from "@/lib/qdog-server";

type CyberLifeHomeProps = {
  communityPetCount: number;
};

const GENOME = "QDG1-BCP-DTC-GHU-F3";
const FEATURED_LIFE = "Yfi";

const cyberForms = [
  {
    asset: "/home-cyber-life/crystal-fox.webp",
    identity: "CRYSTAL FOX",
    motion: "float",
    signal: "CRYO LINK",
    name: { en: "Crystal Fox", zh: "霜晶灵狐", ko: "서리 수정 여우", ja: "霜晶の霊狐", es: "Zorro de cristal" },
  },
  {
    asset: "/home-cyber-life/astral-faun.webp",
    identity: "ASTRAL FAE",
    motion: "drift",
    signal: "STAR MAP",
    name: { en: "Astral Fae", zh: "星穹幻灵", ko: "성운 정령", ja: "星空の幻獣", es: "Espíritu astral" },
  },
  {
    asset: "/home-cyber-life/starfire-dragon.webp",
    identity: "STARFIRE DRAGON",
    motion: "charge",
    signal: "CORE IGNITED",
    name: { en: "Starfire Dragon", zh: "星焰幼龙", ko: "성화 드래곤", ja: "星焔の幼竜", es: "Dragón de fuego estelar" },
  },
] as const;

const copy = {
  en: {
    badge: "A persistent AI companion",
    title: "Hatch a Cyber Life that is yours alone.",
    lead: "Every egg carries a sealed nine-part genome. Reveal its traits, awaken one lasting identity, and later bring that same life into Codex.",
    claim: "Claim your free starter egg",
    open: "Open my life vault",
    login: "Sign in to claim your egg",
    credits: "10 hatch credits included with every new account",
    remaining: "{count} limited eggs remain today",
    examplesKicker: "Awakened forms",
    examplesTitle: "Three identities. Three distinct energy signatures.",
    examplesDesc: "Crystal, astral, and starfire lifeforms are online together. Subtle motion keeps every silhouette alive without changing its original design.",
    starterKicker: "Your first egg",
    starterTitle: "The egg is free. You decide when it wakes.",
    starterDesc: "Create an account to receive one permanent starter egg and 10 credits. Each hatch costs 5 credits; failed generations return them.",
    starterClaimed: "Starter egg secured",
    starterPending: "Encoding your genome…",
    starterError: "The egg could not be claimed. Please try again.",
    daily: "Explore today’s 50 limited eggs",
    genomeKicker: "QDog Genome",
    genomeTitle: "Nine traits. One persistent identity.",
    genomeDesc: "Color, material, style, archetype, element, temperament, signature, pattern, and habitat are sealed into a versioned code. The image can evolve; the origin never changes.",
    genomeLabels: ["Color", "Material", "Style", "Archetype", "Element", "Temperament", "Signature", "Pattern", "Habitat"],
    codexKicker: "Platform forms",
    codexTitle: "Your Cyber Life can become a Codex pet.",
    codexDesc: "The awakened identity stays platform-neutral. A later Codex build turns that same character into a complete v2 animated spritesheet without replacing its genome or history.",
    codexCta: "Browse Codex form examples",
    codexCount: "{count} community forms already available",
    flow: ["Claim", "Reveal", "Hatch", "Enter Codex"],
  },
  zh: {
    badge: "拥有永久身份的 AI 伙伴",
    title: "孵化一只只属于你的赛博生命。",
    lead: "每枚蛋都封存着九维生命基因。揭晓它的属性，唤醒一个持续存在的身份，未来再让同一个生命进入 Codex。",
    claim: "免费领取新手蛋",
    open: "进入我的生命库",
    login: "登录并领取新手蛋",
    credits: "每个新账户赠送 10 个孵化积分",
    remaining: "今日还有 {count} 枚限量蛋",
    examplesKicker: "已觉醒形态",
    examplesTitle: "三个生命身份，三种赛博能量。",
    examplesDesc: "冰晶、星穹与星焰生命同时在线；轻量动态让每个轮廓保持生命感，同时不改变它们原本的设计。",
    starterKicker: "你的第一枚蛋",
    starterTitle: "蛋免费领取，由你决定何时唤醒。",
    starterDesc: "注册后获得一枚永久新手蛋和 10 个积分。每次孵化消耗 5 分；生成失败会自动返还。",
    starterClaimed: "新手蛋已进入背包",
    starterPending: "正在写入生命基因…",
    starterError: "新手蛋暂时无法领取，请重试。",
    daily: "探索今日 50 枚限量蛋",
    genomeKicker: "QDog 生命基因",
    genomeTitle: "九项特征，一个不会消失的身份。",
    genomeDesc: "颜色、材质、画风、原型、元素、性格、标志、纹样与栖息地被写入带版本的基因码。形象可以成长，起源不会改变。",
    genomeLabels: ["颜色", "材质", "画风", "原型", "元素", "性格", "标志", "纹样", "栖息地"],
    codexKicker: "跨平台形态",
    codexTitle: "让你的赛博生命成为 Codex 宠物。",
    codexDesc: "觉醒后的身份保持平台无关。未来的 Codex 构建会把同一个角色转化为完整 v2 动画图集，同时保留它的基因与历史。",
    codexCta: "查看 Codex 化身案例",
    codexCount: "社区已有 {count} 个可安装形态",
    flow: ["领取", "揭晓", "孵化", "进入 Codex"],
  },
  ko: {
    badge: "영구적인 정체성을 가진 AI 동반자",
    title: "오직 나만의 사이버 라이프를 부화하세요.",
    lead: "각 에그에는 아홉 가지 생명 유전자가 봉인되어 있습니다. 특성을 밝히고 지속되는 정체성을 깨운 뒤, 같은 생명을 Codex로 데려가세요.",
    claim: "무료 스타터 에그 받기",
    open: "내 라이프 보관함 열기",
    login: "로그인하고 에그 받기",
    credits: "새 계정마다 부화 크레딧 10개 제공",
    remaining: "오늘 한정 에그 {count}개 남음",
    examplesKicker: "각성한 형태",
    examplesTitle: "세 가지 정체성, 세 가지 사이버 에너지.",
    examplesDesc: "수정, 성운, 성화 생명체가 함께 온라인 상태입니다. 원래 디자인을 바꾸지 않는 가벼운 움직임으로 생명감을 더했습니다.",
    starterKicker: "첫 번째 에그",
    starterTitle: "에그는 무료입니다. 언제 깨울지는 당신이 정합니다.",
    starterDesc: "계정을 만들면 영구 스타터 에그 하나와 크레딧 10개를 받습니다. 에그 하나를 깨우는 데 5크레딧이 들며, 생성 실패 시 반환됩니다.",
    starterClaimed: "스타터 에그 확보 완료",
    starterPending: "유전자를 인코딩 중…",
    starterError: "에그를 받을 수 없습니다. 다시 시도해 주세요.",
    daily: "오늘의 한정 에그 50개 보기",
    genomeKicker: "QDog 유전자",
    genomeTitle: "아홉 가지 특성. 하나의 영구적인 정체성.",
    genomeDesc: "색상, 소재, 스타일, 원형, 원소, 기질, 상징, 무늬, 서식지가 버전이 있는 코드에 봉인됩니다. 모습은 성장해도 기원은 변하지 않습니다.",
    genomeLabels: ["색상", "소재", "스타일", "원형", "원소", "기질", "상징", "무늬", "서식지"],
    codexKicker: "플랫폼 형태",
    codexTitle: "사이버 라이프는 Codex 펫이 될 수 있습니다.",
    codexDesc: "각성한 정체성은 플랫폼에 종속되지 않습니다. 이후 Codex 빌드는 유전자와 기록을 유지한 채 같은 캐릭터를 완전한 v2 애니메이션 스프라이트시트로 바꿉니다.",
    codexCta: "Codex 형태 사례 보기",
    codexCount: "커뮤니티 형태 {count}개 이용 가능",
    flow: ["받기", "공개", "부화", "Codex 입장"],
  },
  ja: {
    badge: "永続するアイデンティティを持つ AI パートナー",
    title: "あなただけのサイバー生命を孵化させよう。",
    lead: "すべてのエッグには9つの生命遺伝子が封印されています。特性を解き明かし、続いていく唯一の存在を目覚めさせ、やがて同じ生命を Codex へ連れていきましょう。",
    claim: "無料スターターエッグを受け取る",
    open: "マイ生命庫を開く",
    login: "ログインしてエッグを受け取る",
    credits: "新規アカウントに孵化クレジット10を付与",
    remaining: "本日の限定エッグは残り {count} 個",
    examplesKicker: "覚醒した姿",
    examplesTitle: "3つの個性、3つのサイバーエネルギー。",
    examplesDesc: "霜晶・星空・星焔の生命が同時にオンライン。元のデザインを変えず、軽やかな動きでそれぞれの生命感を表現します。",
    starterKicker: "最初のエッグ",
    starterTitle: "エッグは無料。いつ目覚めさせるかはあなた次第。",
    starterDesc: "アカウント作成で永久スターターエッグ1個と10クレジットを獲得。孵化は1回5クレジットで、生成失敗時は返却されます。",
    starterClaimed: "スターターエッグを確保しました",
    starterPending: "生命遺伝子を記録中…",
    starterError: "エッグを受け取れませんでした。もう一度お試しください。",
    daily: "本日の限定エッグ50個を見る",
    genomeKicker: "QDog 生命遺伝子",
    genomeTitle: "9つの特性。消えないひとつの個性。",
    genomeDesc: "色、素材、画風、原型、元素、気質、シンボル、模様、生息地がバージョン付きコードに封印されます。姿は成長しても、起源は変わりません。",
    genomeLabels: ["色", "素材", "画風", "原型", "元素", "気質", "シンボル", "模様", "生息地"],
    codexKicker: "プラットフォーム形態",
    codexTitle: "サイバー生命は Codex ペットになれます。",
    codexDesc: "覚醒した個性はプラットフォームに依存しません。将来の Codex ビルドでは、遺伝子と履歴を保ったまま同じキャラクターを完全な v2 アニメーションスプライトシートへ変換します。",
    codexCta: "Codex 形態の例を見る",
    codexCount: "コミュニティ形態 {count} 件を公開中",
    flow: ["受取", "公開", "孵化", "Codex へ"],
  },
  es: {
    badge: "Un compañero de IA con identidad permanente",
    title: "Incuba una vida cibernética solo tuya.",
    lead: "Cada huevo guarda un genoma de nueve rasgos. Descubre sus atributos, despierta una identidad duradera y lleva después esa misma vida a Codex.",
    claim: "Reclama tu huevo inicial gratis",
    open: "Abrir mi bóveda de vida",
    login: "Inicia sesión para reclamar tu huevo",
    credits: "Cada cuenta nueva incluye 10 créditos de incubación",
    remaining: "Quedan {count} huevos limitados hoy",
    examplesKicker: "Formas despiertas",
    examplesTitle: "Tres identidades. Tres energías cibernéticas.",
    examplesDesc: "Las formas cristalina, astral y de fuego estelar están conectadas. Un movimiento sutil les da vida sin alterar su diseño original.",
    starterKicker: "Tu primer huevo",
    starterTitle: "El huevo es gratis. Tú decides cuándo despierta.",
    starterDesc: "Crea una cuenta para recibir un huevo inicial permanente y 10 créditos. Cada incubación cuesta 5 créditos; si falla, se devuelven.",
    starterClaimed: "Huevo inicial asegurado",
    starterPending: "Codificando tu genoma…",
    starterError: "No se pudo reclamar el huevo. Inténtalo de nuevo.",
    daily: "Explorar los 50 huevos limitados de hoy",
    genomeKicker: "Genoma QDog",
    genomeTitle: "Nueve rasgos. Una identidad permanente.",
    genomeDesc: "Color, material, estilo, arquetipo, elemento, temperamento, símbolo, patrón y hábitat quedan sellados en un código versionado. La imagen puede evolucionar; el origen no cambia.",
    genomeLabels: ["Color", "Material", "Estilo", "Arquetipo", "Elemento", "Temperamento", "Símbolo", "Patrón", "Hábitat"],
    codexKicker: "Formas de plataforma",
    codexTitle: "Tu vida cibernética puede convertirse en mascota Codex.",
    codexDesc: "La identidad despierta permanece independiente de la plataforma. Una futura versión Codex transforma el mismo personaje en un spritesheet v2 completo sin reemplazar su genoma ni su historia.",
    codexCta: "Ver ejemplos de formas Codex",
    codexCount: "Ya hay {count} formas de la comunidad",
    flow: ["Reclamar", "Revelar", "Incubar", "Entrar en Codex"],
  },
};

export function CyberLifeHome({ communityPetCount }: CyberLifeHomeProps) {
  const { locale } = useLocale();
  const text = copy[locale];
  const [account, setAccount] = useState<QDogAccount | null | undefined>();
  const [remaining, setRemaining] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void getCurrentAccount().then(setAccount).catch(() => setAccount(null));
    void getDailyPetEggs()
      .then((catalog) => setRemaining(catalog.eggs.filter((egg) => egg.available).length))
      .catch(() => setRemaining(null));
  }, []);

  const primaryCta = useMemo(() => {
    if (!account) return text.login;
    return account.starterEggClaimed ? text.open : text.claim;
  }, [account, text]);

  async function claimStarter() {
    if (!account || account.starterEggClaimed || pending) return;
    setPending(true);
    setMessage("");
    try {
      await claimStarterPetEgg();
      window.location.assign(localePath(locale, "/account"));
    } catch {
      setMessage(text.starterError);
      setPending(false);
    }
  }

  const loginHref = `${localePath(locale, "/login")}?return_to=${encodeURIComponent(localePath(locale, "/"))}`;

  return (
    <main className="life-home" data-domain="cyber">
      <section className="life-hero">
        <div className="life-hero__copy">
          <span className="life-kicker"><i />{text.badge}</span>
          <h1>{text.title}</h1>
          <p>{text.lead}</p>
          <div className="life-hero__actions">
            {account ? (
              account.starterEggClaimed ? (
                <Link className="life-button life-button--primary" href={localePath(locale, "/account")}>{primaryCta}</Link>
              ) : (
                <button className="life-button life-button--primary" disabled={pending} onClick={() => void claimStarter()} type="button">
                  {pending ? text.starterPending : primaryCta}
                </button>
              )
            ) : (
              <Link className="life-button life-button--primary" href={loginHref}>{primaryCta}</Link>
            )}
            <Link className="life-button" href="#awakened">{text.examplesKicker}</Link>
          </div>
          <div className="life-hero__signal">
            <strong>10</strong><span>{text.credits}</span>
            {remaining !== null ? <span>· {text.remaining.replace("{count}", String(remaining))}</span> : null}
          </div>
        </div>

        <div className="life-vessel" aria-label={GENOME}>
          <div className="life-vessel__orbit"><i /><i /><i /></div>
          <div className="life-vessel__scan" />
          <PetEggVisual className="life-vessel__egg" genomeCode={GENOME} traits="color:blue|size:large|shape:angular|material:crystal" />
          <div className="life-vessel__code"><span>GENOME SEALED</span><code>{GENOME}</code></div>
        </div>

        <ol className="life-flow" aria-label={text.flow.join(", ")}>
          {text.flow.map((label, index) => <li key={label}><span>0{index + 1}</span>{label}</li>)}
        </ol>
      </section>

      <section className="life-section life-awakened" id="awakened">
        <header className="life-section__heading">
          <div><span className="life-kicker">{text.examplesKicker}</span><h2>{text.examplesTitle}</h2></div>
          <p>{text.examplesDesc}</p>
        </header>
        <div className="life-example-grid">
          {cyberForms.map((form, index) => (
            <article className="life-example life-example--cyber" key={form.signal}>
              <span className="life-example__index">0{index + 1}</span>
              <span className="life-example__signal"><i />{form.signal}</span>
              <div className="life-example__visual">
                <span className="life-example__reticle" aria-hidden="true" />
                <img className={`life-example__pet life-example__pet--${form.motion}`} alt={form.name[locale]} src={form.asset} />
              </div>
              <div><strong>{form.name[locale]}</strong><span>{form.identity} · CYBER LIFE</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="life-section life-starter">
        <div className="life-starter__visual">
          <PetEggVisual genomeCode={GENOME} traits="color:gold|size:large|shape:round|material:ceramic" />
          <span>+10</span>
        </div>
        <div className="life-starter__copy">
          <span className="life-kicker">{text.starterKicker}</span>
          <h2>{text.starterTitle}</h2>
          <p>{text.starterDesc}</p>
          {message ? <p className="life-error" role="alert">{message}</p> : null}
          <div className="life-starter__actions">
            {account ? (
              account.starterEggClaimed ? (
                <Link className="life-button life-button--primary" href={localePath(locale, "/account")}>{text.starterClaimed}</Link>
              ) : (
                <button className="life-button life-button--primary" disabled={pending} onClick={() => void claimStarter()} type="button">{pending ? text.starterPending : text.claim}</button>
              )
            ) : <Link className="life-button life-button--primary" href={loginHref}>{text.login}</Link>}
            <Link className="life-button" href={localePath(locale, "/eggs")}>{text.daily}</Link>
          </div>
        </div>
      </section>

      <section className="life-section life-genome">
        <div className="life-genome__copy">
          <span className="life-kicker">{text.genomeKicker}</span>
          <h2>{text.genomeTitle}</h2>
          <p>{text.genomeDesc}</p>
          <code>{GENOME}</code>
        </div>
        <ol className="life-genome__traits">
          {text.genomeLabels.map((label, index) => <li key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><i /></li>)}
        </ol>
      </section>

      <section className="life-section life-codex">
        <div className="life-codex__copy">
          <span className="life-kicker">{text.codexKicker}</span>
          <h2>{text.codexTitle}</h2>
          <p>{text.codexDesc}</p>
          <Link className="life-button life-button--primary" href={localePath(locale, "/codex-pets")}>{text.codexCta}</Link>
          <small>{text.codexCount.replace("{count}", String(communityPetCount))}</small>
        </div>
        <div className="life-codex__track">
          <div className="life-codex__origin"><PetEggVisual genomeCode={GENOME} traits="color:blue|size:large|shape:angular|material:crystal" /><span>QDG1</span></div>
          <i aria-hidden="true" />
          <div className="life-codex__form life-codex__form--cyber">
            <span className="life-codex__scan" aria-hidden="true" />
            <img alt={`${FEATURED_LIFE} · Codex V2`} src="/home-cyber-life/yfi-idle.gif" />
            <span>{FEATURED_LIFE} · CODEX V2</span>
          </div>
        </div>
      </section>
    </main>
  );
}
