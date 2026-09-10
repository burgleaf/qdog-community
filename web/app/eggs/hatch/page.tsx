import type { Metadata } from "next";

import { CyberEggHatchPage } from "@/components/cyber-egg-hatch-page";

export const metadata: Metadata = {
  title: "Cyber Life Incubator",
  description: "Awaken a unique Cyber Life from your QDog Cyber Egg.",
  alternates: { canonical: "/eggs/hatch" },
  robots: { index: false, follow: false },
};

export default function Page() { return <CyberEggHatchPage locale="en" />; }
