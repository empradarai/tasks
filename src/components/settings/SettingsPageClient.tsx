"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { PageShell } from "@/components/layout/PageShell";
import { ChangePasswordForm } from "@/components/settings/ChangePasswordForm";

export function SettingsPageClient() {
  const { data: session } = useSession();

  return (
    <PageShell
      title="Settings"
      subtitle={session?.user?.email ?? undefined}
      headerAction={
        <Link
          href="/tasks"
          className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
        >
          Back to tasks
        </Link>
      }
    >
      <div className="mx-auto max-w-sm rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Change password</h2>
        <ChangePasswordForm />
      </div>
    </PageShell>
  );
}
