"use client";

import { useState, type FormEvent } from "react";

import { useLocale } from "@/components/locale-provider";

const ISSUE_URL = "https://github.com/burgleaf/qdog-community/issues/new";

const copy = {
  en: {
    eyebrow: "Repository submission",
    title: "Submit your pet repository",
    description:
      "Paste the root URL of a public GitHub repository. Maintainers will review the finished pet package and confirm missing details in the resulting Issue.",
    label: "Public GitHub repository URL",
    placeholder: "https://github.com/your-name/your-pet",
    hint: "Use the owner/repository root URL. Private repositories and file, branch, release, or archive URLs cannot be reviewed.",
    submit: "Continue to GitHub",
    invalid:
      "Enter a valid repository root such as https://github.com/owner/repository.",
    privacy:
      "No files are uploaded and the QDog API is not called. The URL is validated locally before opening a prefilled GitHub Issue.",
  },
  zh: {
    eyebrow: "仓库投稿",
    title: "提交你的宠物仓库",
    description:
      "粘贴公开 GitHub 仓库根地址。维护者会检查最终宠物成品，并在生成的 Issue 中确认缺失信息。",
    label: "公开 GitHub 仓库地址",
    placeholder: "https://github.com/你的账号/宠物仓库",
    hint: "请填写 owner/repository 格式的仓库根地址；无法审核私有仓库、文件、分支、Release 或压缩包链接。",
    submit: "前往 GitHub 提交",
    invalid:
      "请输入有效的仓库根地址，例如 https://github.com/owner/repository。",
    privacy:
      "本表单不会上传文件，也不会调用 QDog API；只在浏览器本地校验地址并打开预填的 GitHub Issue。",
  },
  ko: {
    eyebrow: "저장소 제출",
    title: "펫 저장소 제출",
    description:
      "공개 GitHub 저장소의 루트 URL을 입력하세요. 관리자가 완성된 펫 패키지를 검토합니다.",
    label: "공개 GitHub 저장소 URL",
    placeholder: "https://github.com/your-name/your-pet",
    hint: "owner/repository 형식의 저장소 루트 URL을 사용하세요.",
    submit: "GitHub로 계속",
    invalid:
      "https://github.com/owner/repository 형식의 올바른 URL을 입력하세요.",
    privacy:
      "파일이나 데이터가 QDog API로 전송되지 않습니다. URL을 로컬에서 확인한 뒤 GitHub Issue를 엽니다.",
  },
  ja: {
    eyebrow: "リポジトリ投稿",
    title: "ペットリポジトリを投稿",
    description:
      "公開 GitHub リポジトリのルート URL を入力してください。完成したペットを管理者が確認します。",
    label: "公開 GitHub リポジトリ URL",
    placeholder: "https://github.com/your-name/your-pet",
    hint: "owner/repository 形式のルート URL を使用してください。",
    submit: "GitHub へ進む",
    invalid:
      "https://github.com/owner/repository 形式の有効な URL を入力してください。",
    privacy:
      "ファイルやデータを QDog API に送信しません。URL をローカルで検証して GitHub Issue を開きます。",
  },
  es: {
    eyebrow: "Envío del repositorio",
    title: "Envía el repositorio de tu mascota",
    description:
      "Pega la URL raíz de un repositorio público de GitHub. El equipo revisará el paquete final.",
    label: "URL del repositorio público",
    placeholder: "https://github.com/tu-nombre/tu-mascota",
    hint: "Usa la raíz owner/repository; no enlaces a archivos, ramas o versiones.",
    submit: "Continuar en GitHub",
    invalid:
      "Introduce una URL válida como https://github.com/owner/repository.",
    privacy:
      "No se suben archivos ni se llama a la API de QDog. La URL se valida localmente antes de abrir un Issue de GitHub.",
  },
} as const;

function normalizeGithubRepository(value: string) {
  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== "https:" ||
      url.hostname.toLowerCase() !== "github.com" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length !== 2) return null;

    const owner = parts[0];
    const repository = parts[1].replace(/\.git$/i, "");
    const validOwner =
      /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(owner);
    const validRepository =
      /^[A-Za-z0-9._-]{1,100}$/.test(repository) &&
      repository !== "." &&
      repository !== "..";

    if (!validOwner || !validRepository) return null;
    return `https://github.com/${owner}/${repository}`;
  } catch {
    return null;
  }
}

export function RepositorySubmissionForm() {
  const { locale } = useLocale();
  const text = copy[locale];
  const [repository, setRepository] = useState("");
  const [error, setError] = useState("");

  function submitRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeGithubRepository(repository);
    if (!normalized) {
      setError(text.invalid);
      return;
    }

    const repoName = normalized.split("/").slice(-2).join("/");
    const issue = new URL(ISSUE_URL);
    issue.searchParams.set("title", `[Submission] ${repoName}`);
    issue.searchParams.set("labels", "type: submission,status: triage");
    issue.searchParams.set(
      "body",
      `## Pet repository\n\n${normalized}\n\n## Review request\n\nPlease review this public repository as a Codex pet submission. The website did not upload any files.`,
    );
    window.location.assign(issue.toString());
  }

  return (
    <section
      aria-labelledby="repository-form-title"
      className="scroll-mt-24 border-t border-border pt-14"
      id="repository-submission"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="section-kicker">{text.eyebrow}</span>
        <h2
          className="mt-4 text-3xl font-extrabold tracking-tight text-text sm:text-4xl"
          id="repository-form-title"
        >
          {text.title}
        </h2>
        <p className="mt-4 leading-7 text-text-secondary">
          {text.description}
        </p>
      </div>

      <form
        className="mx-auto mt-9 max-w-3xl rounded-[1.5rem] border border-border bg-bg-elevated p-6 shadow-[var(--shadow-lift)] sm:p-9"
        noValidate
        onSubmit={submitRepository}
      >
        <label
          className="block text-sm font-bold text-text"
          htmlFor="github-repository"
        >
          {text.label} <span className="text-accent">*</span>
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            aria-describedby="repository-hint repository-error"
            aria-invalid={Boolean(error)}
            className="h-12 min-w-0 flex-1 rounded-xl border border-border bg-bg px-4 text-sm text-text outline-none transition-colors placeholder:text-muted/55 focus:border-accent focus:ring-2 focus:ring-accent/15"
            id="github-repository"
            inputMode="url"
            name="repository"
            onChange={(event) => {
              setRepository(event.target.value);
              if (error) setError("");
            }}
            placeholder={text.placeholder}
            required
            type="url"
            value={repository}
          />
          <button
            className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent px-6 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-accent-hover"
            type="submit"
          >
            {text.submit}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </button>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted" id="repository-hint">
          {text.hint}
        </p>
        {error ? (
          <p
            className="mt-3 text-sm font-semibold text-[#b42318]"
            id="repository-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        <p className="mt-6 border-t border-border pt-5 text-xs leading-5 text-muted">
          🔒 {text.privacy}
        </p>
      </form>
    </section>
  );
}
