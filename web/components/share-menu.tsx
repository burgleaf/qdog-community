"use client";

import { useEffect, useState } from "react";

import { ActionDropdown } from "@/components/action-dropdown";
import { ChatGPTIcon } from "@/components/chatgpt-icon";
import { useLocale } from "@/components/locale-provider";
import { buildChatGPTUrl } from "@/lib/codex-links";

type ShareMenuProps = {
  title: string;
  url: string;
  codexPrompt: string;
  codexMode?: "install" | "create";
  installCommand?: string;
  compact?: boolean;
};

function logActionError(action: string, error: unknown) {
  console.warn(
    `Unable to ${action}`,
    error instanceof Error ? error.stack : String(error),
  );
}

export function ShareMenu({
  title,
  url,
  codexPrompt,
  codexMode = "install",
  installCommand,
  compact = false,
}: ShareMenuProps) {
  const { t } = useLocale();
  const [copied, setCopied] = useState<
    "install" | "link" | "share" | "markdown" | null
  >(null);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const shareMessage = t("shareMessage", { title });
  const shareContent = `${shareMessage}\n\n${url}`;

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  async function copyText(
    value: string,
    type: "install" | "link" | "share" | "markdown",
  ) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      window.setTimeout(() => setCopied(null), 1400);
    } catch (error: unknown) {
      logActionError(
        type === "install" ? "copy install command" : `copy ${type}`,
        error,
      );
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({
        title: `${title} · Awesome Codex Pet`,
        text: shareMessage,
        url,
      });
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      logActionError("share page", error);
    }
  }

  const encodedShareContent = encodeURIComponent(shareContent);
  const encodedUrl = encodeURIComponent(url);

  return (
    <ActionDropdown
      label={t("share")}
      triggerClassName={`inline-flex cursor-pointer items-center justify-center gap-2 border border-border bg-bg-elevated text-text transition-colors hover:bg-surface ${
        compact
          ? "size-9 rounded-lg"
          : "h-9 rounded-lg px-4 text-sm font-medium"
      }`}
      trigger={
        <>
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.173.348.365.5.573m-.5-.573l6.604-3.852m-6.104 6.038l6.104 3.852m0 0a2.25 2.25 0 103.935 2.185 2.25 2.25 0 00-3.935-2.185zm0-9.89a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          {compact ? null : t("share")}
        </>
      }
    >
      <a
        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text transition-colors hover:bg-surface"
        href={buildChatGPTUrl(codexPrompt)}
        target="_blank"
        rel="noreferrer"
        role="menuitem"
      >
        <ChatGPTIcon className="size-6" />
        <span>
          <span className="block font-medium">
            {codexMode === "create" ? t("startInCodex") : t("openInCodex")}
          </span>
          <span className="block text-xs text-muted">
            {codexMode === "create"
              ? t("codexStartsCreation")
              : t("codexRunsInstall")}
          </span>
        </span>
      </a>

      {installCommand ? (
        <button
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-surface"
          type="button"
          role="menuitem"
          onClick={() => void copyText(installCommand, "install")}
        >
          <span className="font-mono text-muted">&gt;_</span>
          <span>{copied === "install" ? t("copied") : t("copyInstall")}</span>
        </button>
      ) : null}

      <button
        className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-surface"
        type="button"
        role="menuitem"
        onClick={() => void copyText(url, "link")}
      >
        <svg
          className="size-4 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-1.5 1.5a4.5 4.5 0 01-6.364-6.364l.75-.75m3.492 4.994a4.5 4.5 0 01-1.242-7.244l1.5-1.5a4.5 4.5 0 016.364 6.364l-.75.75"
          />
        </svg>
        <span>{copied === "link" ? t("copied") : t("copyPageLink")}</span>
      </button>

      <button
        className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-surface"
        type="button"
        role="menuitem"
        onClick={() => void copyText(shareContent, "share")}
      >
        <svg
          className="size-4 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h8m-8 4h5M7.5 3.75h7.25L19 8v12.25H5V3.75h2.5z"
          />
        </svg>
        <span>{copied === "share" ? t("copied") : t("copyShareText")}</span>
      </button>

      <button
        className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-surface"
        type="button"
        role="menuitem"
        onClick={() => void copyText(`[${title}](${url})`, "markdown")}
      >
        <span className="w-4 text-center font-mono text-xs text-muted">M↓</span>
        <span>
          {copied === "markdown" ? t("copied") : t("copyMarkdownLink")}
        </span>
      </button>

      <div className="my-1 border-t border-border" />
      <a
        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text transition-colors hover:bg-surface"
        href={`https://x.com/intent/post?text=${encodedShareContent}`}
        target="_blank"
        rel="noreferrer"
        role="menuitem"
      >
        <span className="w-4 text-center font-semibold">X</span>
        {t("shareToX")}
      </a>
      <a
        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-text transition-colors hover:bg-surface"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        role="menuitem"
      >
        <span className="w-4 text-center text-xs font-bold">in</span>
        {t("shareToLinkedIn")}
      </a>
      {canNativeShare ? (
        <button
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-text transition-colors hover:bg-surface"
          type="button"
          role="menuitem"
          onClick={() => void nativeShare()}
        >
          <svg
            className="size-4 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V3m0 0l-4.5 4.5M12 3l4.5 4.5M6.75 10.5h-1.5A2.25 2.25 0 003 12.75v6A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75v-6a2.25 2.25 0 00-2.25-2.25h-1.5"
            />
          </svg>
          {t("moreShareOptions")}
        </button>
      ) : null}
    </ActionDropdown>
  );
}
