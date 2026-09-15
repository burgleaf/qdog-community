import type { Metadata } from "next";

import HomePage from "@/app/page";
import { languageAlternates } from "@/lib/localized-route-metadata";
import { withSiteKeywords } from "@/lib/seo-keywords";
import { siteConfig } from "@/lib/site";

const title = "孵化一只只属于你的赛博生命";
const description =
  "免费领取基因蛋，用新账户赠送的 10 个积分孵化拥有永久身份的 AI 赛博生命，未来再让它进入 Codex。";

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
        alt: "QDog 赛博生命孵化",
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
