"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ActionDropdown } from "@/components/action-dropdown";
import { CodexIcon } from "@/components/codex-icon";
import { useLocale } from "@/components/locale-provider";
import {
  buildCodexUrl,
  getPetRequestPrompt,
  getPetSubmissionPrompt,
} from "@/lib/codex-links";

type PromptKind = "request" | "submission";

type WorkflowActionProps = {
  href: string;
  title: string;
  description: string;
  prompt: string;
  copied: boolean;
  copyLabel: string;
  copiedLabel: string;
  onCopy: (prompt: string) => void;
};

function WorkflowAction({
  href,
  title,
  description,
  prompt,
  copied,
  copyLabel,
  copiedLabel,
  onCopy,
}: WorkflowActionProps) {
  return (
    <div
      className="flex items-stretch rounded-md transition-colors hover:bg-surface"
      role="group"
    >
      <a
        className="flex min-w-0 flex-1 items-start gap-3 px-3 py-3 text-text"
        href={href}
        role="menuitem"
      >
        <CodexIcon className="mt-0.5 size-8" />
        <span className="min-w-0">
          <span className="block text-sm font-medium">{title}</span>
          <span className="mt-0.5 block text-xs leading-4 text-muted">
            {description}
          </span>
        </span>
      </a>
      <button
        aria-label={copyLabel}
        className="my-2 mr-1.5 flex w-[76px] shrink-0 cursor-pointer flex-col items-center justify-center gap-1 border-l border-border px-2 text-[11px] leading-4 text-muted transition-colors hover:text-accent"
        data-menu-keep-open
        onClick={() => onCopy(prompt)}
        role="menuitem"
        title={copyLabel}
        type="button"
      >
        {copied ? (
          <svg
            aria-hidden="true"
            className="size-4 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}

export function SubmissionMenu() {
  const { locale, t } = useLocale();
  const [copiedPrompt, setCopiedPrompt] = useState<PromptKind | null>(null);
  const requestPrompt = getPetRequestPrompt(locale);
  const submissionPrompt = getPetSubmissionPrompt(locale);

  useEffect(() => {
    if (!copiedPrompt) return;
    const timeout = window.setTimeout(() => setCopiedPrompt(null), 1600);
    return () => window.clearTimeout(timeout);
  }, [copiedPrompt]);

  async function copyPrompt(kind: PromptKind, prompt: string) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(kind);
    } catch (error) {
      console.error("Unable to copy the contribution prompt", error);
    }
  }

  return (
    <ActionDropdown
      label={t("submitPet")}
      menuWidth={340}
      triggerClassName="ml-1 inline-flex size-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-accent text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-hover sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3.5 sm:py-1.5"
      trigger={
        <>
          <svg
            aria-hidden="true"
            className="size-4 sm:hidden"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.25}
            viewBox="0 0 24 24"
          >
            <path
              d="M12 5v14M5 12h14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">{t("submitPet")}</span>
          <svg
            aria-hidden="true"
            className="hidden size-3 sm:block"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.25}
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      }
    >
      <Link
        className="flex items-start gap-3 rounded-md px-3 py-3 text-text transition-colors hover:bg-surface"
        href="/guide"
        role="menuitem"
      >
        <svg
          aria-hidden="true"
          className="size-5 shrink-0 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="min-w-0">
          <span className="block text-sm font-medium">{t("makePet")}</span>
          <span className="mt-0.5 block text-xs leading-4 text-muted">
            {t("submissionGuideDesc")}
          </span>
        </span>
      </Link>
      <div className="my-1 border-t border-border" role="separator" />
      <WorkflowAction
        copied={copiedPrompt === "request"}
        copiedLabel={t("copied")}
        copyLabel={t("copyPromptShort")}
        description={t("requestPetWithAIDesc")}
        href={buildCodexUrl(requestPrompt)}
        onCopy={(prompt) => void copyPrompt("request", prompt)}
        prompt={requestPrompt}
        title={t("requestPetWithAI")}
      />
      <WorkflowAction
        copied={copiedPrompt === "submission"}
        copiedLabel={t("copied")}
        copyLabel={t("copyPromptShort")}
        description={t("submitPetWithAIDesc")}
        href={buildCodexUrl(submissionPrompt)}
        onCopy={(prompt) => void copyPrompt("submission", prompt)}
        prompt={submissionPrompt}
        title={t("submitPetWithAI")}
      />
    </ActionDropdown>
  );
}
