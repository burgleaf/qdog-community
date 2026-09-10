import type { Metadata } from "next";
import { LoginPage } from "@/components/login-page";

export const metadata: Metadata = { title: "Log in", description: "Log in to QDog to manage Cyber Egg assets.", alternates: { canonical: "/login" }, robots: { index: false, follow: false } };
export default function Page() { return <LoginPage locale="en" />; }
