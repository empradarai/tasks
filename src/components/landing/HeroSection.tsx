import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { DashboardPreview } from "./DashboardPreview";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="landing-gradient grid-pattern absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="indigo" className="mb-6 gap-1.5 px-3 py-1 text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Built for teams that ship
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            Task management that{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              keeps you moving
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Plan, prioritize, and complete work in one calm workspace. Real-time analytics,
            per-user security, and a UI your team will actually enjoy.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30 sm:w-auto"
            >
              Start free trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-base font-semibold text-neutral-800 shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50 sm:w-auto"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-4 text-sm text-neutral-500">
            No credit card required · Free forever on Starter
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <DashboardPreview />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-neutral-200/80 pt-12 sm:grid-cols-4">
          {[
            { value: "10k+", label: "Tasks completed" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "<50ms", label: "Sync latency" },
            { value: "4.9★", label: "User rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-neutral-900 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
