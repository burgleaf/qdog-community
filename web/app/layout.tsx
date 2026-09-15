import type { Metadata, Viewport } from "next";

import "./globals.css";

import { LocaleProvider } from "@/components/locale-provider";
import { BackToTop } from "@/components/back-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import { languageAlternates } from "@/lib/localized-route-metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.title}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.title,
  keywords: siteConfig.keywords,
  authors: [{ name: "QDog contributors", url: siteConfig.repo }],
  creator: "QDog",
  publisher: "QDog",
  category: "personalization",
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: languageAlternates("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.title,
      },
    ],
    locale: "en_US",
    alternateLocale: ["zh_CN", "ko_KR", "ja_JP", "es_ES"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#091113" },
    { media: "(prefers-color-scheme: dark)", color: "#091113" },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.title,
      alternateName: siteConfig.altNames,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.svg`,
      },
      sameAs: [siteConfig.repo],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.title,
      alternateName: siteConfig.altNames,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: ["en", "zh-CN", "ko", "ja", "es"],
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      about: [
        "Persistent AI Cyber Life",
        "Free genome pet eggs",
        "AI pet hatching with starter credits",
        "Codex forms for Cyber Life",
      ],
      potentialAction: [
        {
          "@type": "ViewAction",
          name: "Claim a free starter egg",
          target: `${siteConfig.url}/login`,
        },
        {
          "@type": "CreateAction",
          name: "Browse Codex forms",
          target: `${siteConfig.url}/codex-pets`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>
          <LocaleProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <BackToTop />
          </LocaleProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
