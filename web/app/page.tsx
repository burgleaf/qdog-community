import type { Metadata } from "next";

import { CyberLifeHome } from "@/components/cyber-life-home";
import { LocalizedDocumentTitle } from "@/components/localized-document-title";
import { getAllPets, toGalleryPet } from "@/lib/pets";
import { getTrendingPets } from "@/lib/ranking";
import { languageAlternates } from "@/lib/localized-route-metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.title} — hatch your own Cyber Life`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    languages: languageAlternates("/"),
  },
  openGraph: {
    title: `${siteConfig.title} — hatch your own Cyber Life`,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN", "ko_KR", "ja_JP", "es_ES"],
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
    title: `${siteConfig.title} — hatch your own Cyber Life`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function HomePage() {
  const pets = getAllPets();
  const examples = getTrendingPets(pets, 3).map(toGalleryPet);

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${siteConfig.url}/#cyber-life`,
        name: `${siteConfig.title} Cyber Life`,
        description: "Claim a free genome egg, hatch a persistent AI companion, and later bring that identity into Codex.",
        url: siteConfig.url,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        inLanguage: ["en", "zh-CN", "ko", "ja", "es"],
        isAccessibleForFree: true,
        potentialAction: {
          "@type": "CreateAction",
          name: "Claim a free starter Cyber Egg",
          target: `${siteConfig.url}/login`,
        },
      },
      {
        "@type": "Dataset",
        "@id": `${siteConfig.url}/#catalog`,
        name: "QDog catalog",
        alternateName: "Codex 宠物目录",
        description:
          "A machine-readable catalog of free-to-browse community Codex pets, creators, localized names, categories, animation versions, licenses, previews, and one-step installation commands.",
        url: siteConfig.url,
        creator: {
          "@id": `${siteConfig.url}/#organization`,
        },
        isAccessibleForFree: true,
        inLanguage: ["en", "zh-CN", "ko", "ja", "es"],
        keywords: siteConfig.keywords,
        distribution: [
          {
            "@type": "DataDownload",
            encodingFormat: "application/json",
            contentUrl: `${siteConfig.url}${siteConfig.catalog}`,
          },
          {
            "@type": "DataDownload",
            encodingFormat: "application/json",
            contentUrl: `${siteConfig.url}${siteConfig.collectionsCatalog}`,
          },
        ],
      },
    ],
  };

  return (
    <main>
      <LocalizedDocumentTitle
        en="Hatch your own Cyber Life"
        es="Incuba tu propia Vida Ciber"
        ja="あなただけのサイバー生命を孵化"
        ko="나만의 사이버 생명 부화"
        zh="孵化一只只属于你的赛博生命"
      />
      <CyberLifeHome examples={examples} communityPetCount={pets.length} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
    </main>
  );
}
