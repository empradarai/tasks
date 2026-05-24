import { BarChart3, CheckCircle2, Circle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const previewTasks = [
  { title: "Ship landing page", done: true, tag: "Marketing" },
  { title: "Review Q2 roadmap", done: false, tag: "Planning" },
  { title: "Sync with design team", done: false, tag: "Design" },
];

export function DashboardPreview() {
  return (
    <div className="animate-float relative mx-auto w-full max-w-4xl">
      <div className="glass-card overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/80 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 text-xs font-medium text-neutral-400">tasks.app/dashboard</span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-5 sm:p-6">
          <div className="space-y-3 sm:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900">Today&apos;s tasks</h3>
              <Badge variant="indigo">3 active</Badge>
            </div>
            <ul className="space-y-2">
              {previewTasks.map((task) => (
                <li
                  key={task.title}
                  className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-white px-3 py-2.5 shadow-sm"
                >
                  {task.done ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-neutral-300" />
                  )}
                  <span
                    className={
                      task.done
                        ? "flex-1 text-sm text-neutral-400 line-through"
                        : "flex-1 text-sm font-medium text-neutral-800"
                    }
                  >
                    {task.title}
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                    {task.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 sm:col-span-2">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
              <div className="flex items-center gap-2 text-indigo-700">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Completion</span>
              </div>
              <p className="mt-2 text-3xl font-bold text-indigo-900">67%</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-indigo-100">
                <div className="h-full w-2/3 rounded-full bg-indigo-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3">
                <Clock className="h-4 w-4 text-amber-600" />
                <p className="mt-1 text-xl font-bold text-amber-900">2</p>
                <p className="text-xs text-amber-700">To do</p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <p className="mt-1 text-xl font-bold text-emerald-900">4</p>
                <p className="text-xs text-emerald-700">Done</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-violet-500/10 to-fuchsia-500/20 blur-2xl" />
    </div>
  );
}
