import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { AuthForm } from "@/components/auth/AuthForm";
import { PageShell } from "@/components/layout/PageShell";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/tasks");

  return (
    <PageShell title="Tasks" subtitle="Create your account">
      <div className="mx-auto max-w-sm rounded-lg border border-neutral-200 bg-white p-6">
        <AuthForm mode="register" />
      </div>
    </PageShell>
  );
}
