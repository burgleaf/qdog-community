import type { Metadata } from "next";

import HomePage from "@/app/page";
import { languageAlternates } from "@/lib/localized-route-metadata";
import { withSiteKeywords } from "@/lib/seo-keywords";
import { siteConfig } from "@/lib/site";

const title = "免费 Codex 小宠物画廊与社区";
const description =
  "浏览社区制作的 Codex 小宠物完整动画，一键安装喜欢的角色，或免费申请社区制作。";

export const metadata: Metadata = {
  title: {
    absolute: `${title} · ${siteConfig.title}`,
  },
  description,
  keywords: withSiteKeywords([
    "Codex 小宠物",
    "Codex 宠物画廊",
    "免费 Codex 宠物",
    "Codex 宠物安装",
    "Codex 宠物社区",
    "Codex 宠物制作申请",
  ]),
  alternates: {
    canonical: "/zh",
    languages: languageAlternates("/"),
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/zh`,
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US", "ko_KR", "ja_JP", "es_ES"],
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: "QDog 精选宠物画廊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.ogImage],
  },
};

export default HomePage;
