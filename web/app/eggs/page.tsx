import type { Metadata } from "next";

import { DailyPetEggsPage } from "@/components/daily-pet-eggs-page";
import { languageAlternates } from "@/lib/localized-route-metadata";

export const metadata: Metadata = {
  title: "Daily pet eggs",
  description: "Sign in with Google to support and claim one of QDog's 50 daily pet eggs.",
  alternates: { canonical: "/eggs", languages: languageAlternates("/eggs") },
};

export default function EggsPage() {
  return <DailyPetEggsPage locale="en" />;
}
