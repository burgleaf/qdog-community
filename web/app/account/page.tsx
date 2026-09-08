import type { Metadata } from "next";
import { AccountPage } from "@/components/account-page";

export const metadata: Metadata = { title: "Personal center", description: "Manage your QDog pet egg assets.", alternates: { canonical: "/account" }, robots: { index: false, follow: false } };
export default function Page() { return <AccountPage locale="en" />; }
