import {
  BarChart3,
  Lock,
  Mail,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const features = [
  {
    icon: Zap,
    title: "Instant sync",
    description:
      "Optimistic updates keep your task list snappy. Changes feel local, sync in the background.",
    className: "sm:col-span-2 sm:row-span-2",
    accent: "from-indigo-500/10 to-violet-500/5",
  },
  {
    icon: BarChart3,
    title: "Built-in analytics",
    description: "Completion rates, activity trends, and status breakdowns at a glance.",
    className: "",
    accent: "from-amber-500/10 to-orange-500/5",
  },
  {
    icon: Shield,
    title: "Per-user isolation",
    description: "Every task is scoped to your account. Your data stays yours.",
    className: "",
    accent: "from-emerald-500/10 to-teal-500/5",
  },
  {
    icon: Mail,
    title: "Welcome onboarding",
    description: "New teammates get a polished welcome email the moment they sign up.",
    className: "",
    accent: "from-sky-500/10 to-blue-500/5",
  },
  {
    icon: Lock,
    title: "Secure auth",
    description: "Credentials-based sign-in with hashed passwords and session management.",
    className: "",
    accent: "from-rose-500/10 to-pink-500/5",
  },
  {
    icon: RefreshCw,
    title: "Always in sync",
    description: "Redux-powered state keeps the UI consistent across views and actions.",
    className: "sm:col-span-2",
    accent: "from-violet-500/10 to-purple-500/5",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 border-t border-neutral-200/80 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="indigo">Features</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Everything you need to run projects
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            From solo founders to growing teams — ship faster with tools that stay out of your way.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-gradient-to-br p-6 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5",
                feature.accent,
                feature.className,
              )}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/80">
                <feature.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
