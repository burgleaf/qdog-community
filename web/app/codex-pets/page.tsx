import type { Metadata } from "next";

import { CommunityPetsPage } from "@/components/community-pets-page";
import { getAllPets, getCategories, toGalleryPet } from "@/lib/pets";

export const metadata: Metadata = {
  title: "Community Codex pets",
  description: "Browse, preview, and install community-made Codex pet forms.",
  alternates: { canonical: "/codex-pets" },
};

export default function CodexPetsPage() {
  const pets = getAllPets().map(toGalleryPet);
  return <CommunityPetsPage pets={pets} categories={getCategories(pets)} />;
}
