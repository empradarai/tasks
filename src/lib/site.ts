/** Canonical site URL for metadata, sitemap, and JSON-LD. */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export const siteConfig = {
  name: "Tasks",
  title: "Tasks — Modern task management for teams",
  shortDescription:
    "Plan, prioritize, and complete work in one calm workspace with analytics and secure per-user auth.",
  description:
    "Plan, prioritize, and ship work faster. Task management with real-time analytics, per-user security, optimistic sync, and a UI your team will actually enjoy.",
  keywords: [
    "task management",
    "team productivity",
    "project management",
    "todo app",
    "task tracker",
    "work management",
    "team collaboration",
  ],
  locale: "en_US",
  twitterHandle: undefined as string | undefined,
} as const;
