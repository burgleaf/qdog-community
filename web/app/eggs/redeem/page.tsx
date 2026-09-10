import type { Metadata } from "next";
import { RedeemPetEggPage } from "@/components/redeem-pet-egg-page";

export const metadata: Metadata = { title: "Redeem a Cyber Egg", description: "Redeem a QDog daily code for a Cyber Egg asset.", alternates: { canonical: "/eggs/redeem" } };
export default function Page() { return <RedeemPetEggPage locale="en" />; }
