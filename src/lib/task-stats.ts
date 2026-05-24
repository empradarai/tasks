import type { Task } from "@/types/task";

export interface TaskSummary {
  total: number;
  pending: number;
  done: number;
  completionRate: number;
  createdThisWeek: number;
  completedThisWeek: number;
}

export interface StatusSlice {
  name: string;
  value: number;
  color: string;
}

export interface ActivityPoint {
  date: string;
  label: string;
  created: number;
  completed: number;
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function shortLabel(isoDate: string): string {
  const d = new Date(isoDate + "T12:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function isWithinDays(iso: string, days: number): boolean {
  const then = startOfDay(new Date(iso));
  const cutoff = startOfDay(new Date());
  cutoff.setDate(cutoff.getDate() - (days - 1));
  return then >= cutoff;
}

export function getTaskSummary(tasks: Task[]): TaskSummary {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const pending = total - done;
  const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;
  const createdThisWeek = tasks.filter((t) => isWithinDays(t.createdAt, 7)).length;
  const completedThisWeek = tasks.filter(
    (t) => t.completed && isWithinDays(t.updatedAt, 7)
  ).length;

  return {
    total,
    pending,
    done,
    completionRate,
    createdThisWeek,
    completedThisWeek,
  };
}

export function getStatusPieData(tasks: Task[]): StatusSlice[] {
  const summary = getTaskSummary(tasks);
  const slices: StatusSlice[] = [
    { name: "To do", value: summary.pending, color: "#f59e0b" },
    { name: "Done", value: summary.done, color: "#10b981" },
  ];
  return slices.filter((s) => s.value > 0);
}

export function getActivityLineData(tasks: Task[], dayCount = 14): ActivityPoint[] {
  const today = startOfDay(new Date());
  const keys: string[] = [];

  for (let i = dayCount - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    keys.push(dateKey(d));
  }

  const createdByDay = new Map<string, number>();
  const completedByDay = new Map<string, number>();
  for (const key of keys) {
    createdByDay.set(key, 0);
    completedByDay.set(key, 0);
  }

  for (const task of tasks) {
    const createdKey = dateKey(new Date(task.createdAt));
    if (createdByDay.has(createdKey)) {
      createdByDay.set(createdKey, (createdByDay.get(createdKey) ?? 0) + 1);
    }
    if (task.completed) {
      const completedKey = dateKey(new Date(task.updatedAt));
      if (completedByDay.has(completedKey)) {
        completedByDay.set(completedKey, (completedByDay.get(completedKey) ?? 0) + 1);
      }
    }
  }

  return keys.map((date) => ({
    date,
    label: shortLabel(date),
    created: createdByDay.get(date) ?? 0,
    completed: completedByDay.get(date) ?? 0,
  }));
}
