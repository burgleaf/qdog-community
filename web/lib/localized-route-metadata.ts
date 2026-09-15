import type { Metadata } from "next";

import {
  localeConfig,
  localePath,
  supportedLocales,
  type Locale,
} from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export type LocalizedPageKind = "home" | "install" | "request";
export const additionalWebLocales = ["ko", "ja", "es"] as const;
export type AdditionalWebLocale = (typeof additionalWebLocales)[number];

const pageCopy: Record<
  AdditionalWebLocale,
  Record<LocalizedPageKind, { title: string; description: string; keywords: string[] }>
> = {
  ko: {
    home: {
      title: "나만의 사이버 생명 부화",
      description:
        "무료 유전체 알을 받고 영구적인 AI 사이버 생명을 깨운 뒤 같은 정체성을 Codex로 가져오세요.",
      keywords: ["Codex 펫", "Codex 펫 설치", "무료 데스크톱 펫"],
    },
    install: {
      title: "Codex 펫 설치 방법",
      description:
        "macOS, Linux, Windows에서 Codex 펫을 설치하고 설정에서 활성화하는 단계별 안내입니다.",
      keywords: ["Codex 펫 설치", "Codex 사용자 펫", "Codex pets 폴더"],
    },
    request: {
      title: "무료 Codex 펫 제작 요청",
      description:
        "좋아하는 애니메이션, 게임, 마스코트, 동물 또는 오리지널 캐릭터의 Codex 펫을 커뮤니티에 무료로 요청하세요.",
      keywords: ["Codex 펫 요청", "무료 캐릭터 펫", "Codex 커뮤니티"],
    },
  },
  ja: {
    home: {
      title: "あなただけのサイバー生命を孵化",
      description:
        "無料のゲノムエッグを受け取り、永続するAIサイバー生命を目覚めさせ、同じ存在をCodexへ連れて行けます。",
      keywords: ["Codex ペット", "Codex ペット インストール", "無料 デスクトップペット"],
    },
    install: {
      title: "Codex ペットのインストール方法",
      description:
        "macOS、Linux、Windows に Codex ペットをインストールし、設定で有効にする手順を解説します。",
      keywords: ["Codex ペット インストール", "Codex カスタムペット", "Codex Pets 設定"],
    },
    request: {
      title: "Codex ペットを無料でリクエスト",
      description:
        "好きなアニメ、ゲーム、マスコット、動物、オリジナルキャラクターの Codex ペット制作をコミュニティへ無料で依頼できます。",
      keywords: ["Codex ペット リクエスト", "キャラクター デスクトップペット", "無料 ペット制作"],
    },
  },
  es: {
    home: {
      title: "Incuba tu propia Vida Ciber",
      description:
        "Recibe un huevo genómico gratis, despierta una Vida Ciber persistente y lleva después la misma identidad a Codex.",
      keywords: ["mascotas Codex", "instalar mascota Codex", "mascota de escritorio gratis"],
    },
    install: {
      title: "Cómo instalar una mascota Codex",
      description:
        "Guía para instalar mascotas Codex en macOS, Linux y Windows y activarlas desde los ajustes de Codex.",
      keywords: ["instalar mascota Codex", "mascota personalizada Codex", "carpeta Codex pets"],
    },
    request: {
      title: "Pide gratis una mascota Codex",
      description:
        "Solicita a la comunidad una mascota Codex de un personaje de anime, videojuego, mascota, animal o idea original.",
      keywords: ["pedir mascota Codex", "mascota de personaje gratis", "comunidad Codex"],
    },
  },
};

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(
      supportedLocales.map((locale) => [
        localeConfig[locale].htmlLang,
        localePath(locale, path),
      ]),
    ),
    "x-default": localePath("en", path),
  };
}

export function getLocalizedRouteMetadata(
  locale: AdditionalWebLocale,
  page: LocalizedPageKind,
): Metadata {
  const path = page === "home" ? "/" : `/${page}`;
  const canonical = localePath(locale, path);
  const copy = pageCopy[locale][page];
  return {
    title: {
      absolute: `${copy.title} · ${siteConfig.title}`,
    },
    description: copy.description,
    keywords: [...siteConfig.keywords, ...copy.keywords],
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${siteConfig.url}${canonical}`,
      siteName: siteConfig.title,
      locale: localeConfig[locale].ogLocale,
      alternateLocale: supportedLocales
        .filter((item) => item !== locale)
        .map((item) => localeConfig[item].ogLocale),
      type: page === "install" ? "article" : "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: siteConfig.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [siteConfig.ogImage],
    },
  };
}

export function getLocalizedPageCopy(
  locale: AdditionalWebLocale,
  page: LocalizedPageKind,
) {
  return pageCopy[locale][page];
}
