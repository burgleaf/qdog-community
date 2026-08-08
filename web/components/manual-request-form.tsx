"use client";

import { useState, type FormEvent } from "react";

import { useLocale } from "@/components/locale-provider";

const ISSUE_FORM_URL =
  "https://github.com/burgleaf/qdog-community/issues/new";

const copy = {
  en: {
    eyebrow: "GitHub Issue submission",
    title: "Submit a pet request",
    intro:
      "Fill in the request here, then review and publish the prefilled GitHub Issue. QDog does not receive or store this form data.",
    character: "Character or concept",
    characterPlaceholder: "Misaka Mikoto, a golden retriever, my mascot...",
    franchise: "Original work",
    franchisePlaceholder: "Optional",
    reference: "Public reference image (required)",
    referencePlaceholder: "https://example.com/reference.png",
    referenceHelp:
      "Use a publicly accessible HTTPS image URL. Local uploads are attached directly in GitHub after you continue.",
    notes: "Anything important",
    notesPlaceholder:
      "Optional style, prop, expression, or animation preference",
    version: "Pet version",
    versionValue: "V2 · includes 16 look directions",
    submit: "Continue to GitHub Issue",
    pending: "Opening GitHub...",
    privacy:
      "No request data is sent to QDog. GitHub requires you to sign in and confirm the Issue before it is published.",
    referenceInvalid: "Enter a publicly accessible HTTPS image URL.",
  },
  zh: {
    eyebrow: "GitHub Issue 提交",
    title: "在线填写制作申请",
    intro:
      "在此填写申请后，会跳转到已预填内容的 GitHub Issue 表单，由你确认并发布。QDog 不会接收或保存这些表单数据。",
    character: "角色或概念",
    characterPlaceholder: "御坂美琴、金毛、我的吉祥物……",
    franchise: "所属作品",
    franchisePlaceholder: "可不填",
    reference: "公开参考图片（必填）",
    referencePlaceholder: "粘贴可公开访问的图片 URL（https://...）",
    referenceHelp:
      "请填写可公开访问的 HTTPS 图片 URL。本地图片请在跳转后的 GitHub Issue 中直接添加附件。",
    notes: "重要偏好",
    notesPlaceholder: "可不填，例如画风、道具、表情或动作",
    version: "宠物版本",
    versionValue: "V2 · 包含 16 个环视方向",
    submit: "前往 GitHub Issue 提交",
    pending: "正在打开 GitHub……",
    privacy:
      "表单数据不会发送到 QDog。你需登录 GitHub 并确认后，Issue 才会正式发布。",
    referenceInvalid: "请填写可公开访问的 HTTPS 图片 URL。",
  },
  ko: {
    eyebrow: "GitHub Issue 제출",
    title: "펫 제작 요청 제출",
    intro:
      "여기에서 요청을 작성하면 미리 채워진 GitHub Issue 양식으로 이동합니다. QDog은 이 양식 데이터를 받거나 저장하지 않습니다.",
    character: "캐릭터 또는 콘셉트",
    characterPlaceholder: "캐릭터, 동물, 마스코트...",
    franchise: "원작",
    franchisePlaceholder: "선택 사항",
    reference: "공개 참고 이미지 (필수)",
    referencePlaceholder: "https://example.com/reference.png",
    referenceHelp:
      "공개로 열 수 있는 HTTPS 이미지 URL을 입력하세요. 로컬 이미지는 이동 후 GitHub Issue에 직접 첨부하세요.",
    notes: "중요한 요청",
    notesPlaceholder: "선택 사항: 스타일, 소품, 표정, 동작",
    version: "펫 버전",
    versionValue: "V2 · 16개 시선 방향 포함",
    submit: "GitHub Issue로 계속",
    pending: "GitHub 여는 중...",
    privacy:
      "요청 데이터는 QDog으로 전송되지 않습니다. GitHub에서 로그인하고 확인해야 Issue가 게시됩니다.",
    referenceInvalid: "공개로 열 수 있는 HTTPS 이미지 URL을 입력하세요.",
  },
  ja: {
    eyebrow: "GitHub Issue 送信",
    title: "ペット制作リクエストを送信",
    intro:
      "ここでリクエストを入力すると、内容が入った GitHub Issue フォームに移動します。QDog はこのフォームのデータを受信・保存しません。",
    character: "キャラクターまたはコンセプト",
    characterPlaceholder: "キャラクター、動物、マスコット…",
    franchise: "原作",
    franchisePlaceholder: "任意",
    reference: "公開参考画像（必須）",
    referencePlaceholder: "https://example.com/reference.png",
    referenceHelp:
      "公開アクセスできる HTTPS 画像 URL を入力してください。ローカル画像は移動後に GitHub Issue へ直接添付できます。",
    notes: "大切な希望",
    notesPlaceholder: "任意：スタイル、小物、表情、動き",
    version: "ペットバージョン",
    versionValue: "V2 · 16方向の視線を含む",
    submit: "GitHub Issue に進む",
    pending: "GitHub を開いています…",
    privacy:
      "リクエストデータは QDog に送信されません。GitHub でログインして確認すると Issue が公開されます。",
    referenceInvalid: "公開アクセスできる HTTPS 画像 URL を入力してください。",
  },
  es: {
    eyebrow: "Envío con GitHub Issue",
    title: "Enviar una petición de mascota",
    intro:
      "Completa la petición aquí y continúa al formulario de GitHub Issue ya rellenado. QDog no recibe ni guarda estos datos.",
    character: "Personaje o concepto",
    characterPlaceholder: "Personaje, animal, mascota...",
    franchise: "Obra original",
    franchisePlaceholder: "Opcional",
    reference: "Imagen de referencia pública (obligatoria)",
    referencePlaceholder: "https://example.com/reference.png",
    referenceHelp:
      "Usa una URL HTTPS de imagen accesible públicamente. Adjunta imágenes locales directamente en GitHub después de continuar.",
    notes: "Preferencias importantes",
    notesPlaceholder: "Opcional: estilo, objeto, expresión o animación",
    version: "Versión de mascota",
    versionValue: "V2 · incluye 16 direcciones de mirada",
    submit: "Continuar a GitHub Issue",
    pending: "Abriendo GitHub...",
    privacy:
      "No se envían datos de la petición a QDog. Debes iniciar sesión y confirmar el Issue en GitHub antes de publicarlo.",
    referenceInvalid: "Usa una URL HTTPS de imagen accesible públicamente.",
  },
} as const;

function isPublicHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function ManualRequestForm() {
  const { locale } = useLocale();
  const text = copy[locale];
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const reference = String(form.get("references") || "").trim();

    if (!isPublicHttpsUrl(reference)) {
      setMessage(text.referenceInvalid);
      return;
    }

    const query = new URLSearchParams({
      template: "pet-request.yml",
      character: String(form.get("character") || "").trim(),
      franchise: String(form.get("franchise") || "").trim(),
      references: reference,
      visual_direction: String(form.get("visual_direction") || "").trim(),
    });

    setMessage("");
    setPending(true);
    window.location.assign(`${ISSUE_FORM_URL}?${query.toString()}`);
  }

  return (
    <section
      className="scroll-mt-20 border-b border-border py-12"
      id="manual-request-form"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        {text.eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-text">{text.title}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
        {text.intro}
      </p>
      <form className="mt-8 grid gap-5" onSubmit={submit}>
        <label className="grid gap-2 text-sm font-medium text-text">
          {text.character}
          <input
            className="h-12 rounded-lg border border-border bg-bg-elevated px-4 outline-none focus:border-accent"
            maxLength={100}
            name="character"
            placeholder={text.characterPlaceholder}
            required
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-text">
            {text.franchise}
            <input
              className="h-12 rounded-lg border border-border bg-bg-elevated px-4 outline-none focus:border-accent"
              maxLength={120}
              name="franchise"
              placeholder={text.franchisePlaceholder}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-text">
            {text.reference}
            <input
              className="h-12 rounded-lg border border-border bg-bg-elevated px-4 outline-none focus:border-accent"
              maxLength={500}
              name="references"
              placeholder={text.referencePlaceholder}
              required
              type="url"
            />
            <span className="text-xs font-normal leading-5 text-muted">
              {text.referenceHelp}
            </span>
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium text-text">
          {text.notes}
          <textarea
            className="min-h-28 resize-y rounded-lg border border-border bg-bg-elevated px-4 py-3 outline-none focus:border-accent"
            maxLength={1000}
            name="visual_direction"
            placeholder={text.notesPlaceholder}
          />
        </label>
        <div className="flex flex-col gap-5 border-t border-border pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              {text.version}
            </p>
            <p className="mt-1 text-sm font-semibold text-text">
              {text.versionValue}
            </p>
          </div>
          <button
            className="inline-flex h-12 min-w-44 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-55"
            disabled={pending}
            type="submit"
          >
            {pending ? text.pending : text.submit}
          </button>
        </div>
        <p className="text-xs leading-5 text-muted">{text.privacy}</p>
        {message ? (
          <p aria-live="polite" className="text-sm font-medium text-[#b42318]">
            {message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
