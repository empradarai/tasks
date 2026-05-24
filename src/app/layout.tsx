import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tasks — Modern task management for teams",
    template: "%s | Tasks",
  },
  description:
    "Plan, prioritize, and ship work faster. Task management with analytics, secure auth, and a UI your team will love.",
  openGraph: {
    title: "Tasks — Modern task management for teams",
    description: "Plan, prioritize, and ship work faster with Tasks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased text-neutral-900">
        <SessionProvider>
          <StoreProvider>{children}</StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
