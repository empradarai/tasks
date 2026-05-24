"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { Task } from "@/types/task";
import {
  getActivityLineData,
  getStatusPieData,
  getTaskSummary,
} from "@/lib/task-stats";

interface TaskDashboardProps {
  tasks: Task[];
}

function StatCard({
  label,
  value,
  hint,
  accent = "neutral",
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "neutral" | "amber" | "emerald" | "indigo";
}) {
  const styles = {
    neutral: "border-neutral-200 bg-white text-neutral-900",
    amber: "border-amber-100 bg-amber-50/50 text-amber-900",
    emerald: "border-emerald-100 bg-emerald-50/50 text-emerald-900",
    indigo: "border-indigo-100 bg-indigo-50/50 text-indigo-900",
  };
  const labelStyles = {
    neutral: "text-neutral-500",
    amber: "text-amber-700",
    emerald: "text-emerald-700",
    indigo: "text-indigo-700",
  };

  return (
    <div className={`rounded-xl border px-4 py-3 shadow-sm ${styles[accent]}`}>
      <p className={`text-xs font-medium uppercase tracking-wide ${labelStyles[accent]}`}>
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

export function TaskDashboard({ tasks }: TaskDashboardProps) {
  const summary = useMemo(() => getTaskSummary(tasks), [tasks]);
  const pieData = useMemo(() => getStatusPieData(tasks), [tasks]);
  const lineData = useMemo(() => getActivityLineData(tasks, 14), [tasks]);

  const hasActivity = lineData.some((d) => d.created > 0 || d.completed > 0);

  return (
    <section className="mb-8 space-y-6" aria-label="Task analytics">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total" value={summary.total} accent="neutral" />
        <StatCard label="To do" value={summary.pending} accent="amber" />
        <StatCard label="Done" value={summary.done} accent="emerald" />
        <StatCard
          label="Completion"
          value={`${summary.completionRate}%`}
          hint="of all tasks"
          accent="indigo"
        />
        <StatCard
          label="Added (7d)"
          value={summary.createdThisWeek}
          hint="new this week"
          accent="neutral"
        />
        <StatCard
          label="Finished (7d)"
          value={summary.completedThisWeek}
          hint="completed this week"
          accent="emerald"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-semibold text-neutral-900">Status breakdown</h2>
          <p className="mt-0.5 text-xs text-neutral-500">To do vs completed tasks</p>
          <div className="mt-4 h-56">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "0.75rem",
                      border: "1px solid #e5e5e5",
                      fontSize: "0.875rem",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-sm text-neutral-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-full items-center justify-center text-sm text-neutral-500">
                No tasks to chart yet.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-semibold text-neutral-900">Activity (14 days)</h2>
          <p className="mt-0.5 text-xs text-neutral-500">
            Tasks created vs marked complete per day
          </p>
          <div className="mt-4 h-56">
            {hasActivity ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "#737373" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e5e5" }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "#737373" }}
                    tickLine={false}
                    axisLine={false}
                    width={28}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "0.75rem",
                      border: "1px solid #e5e5e5",
                      fontSize: "0.875rem",
                    }}
                    labelFormatter={(_, payload) => {
                      const point = payload?.[0]?.payload as { date?: string } | undefined;
                      return point?.date
                        ? new Date(point.date + "T12:00:00").toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })
                        : "";
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-sm text-neutral-600">{value}</span>
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="created"
                    name="Created"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#6366f1" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    name="Completed"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#10b981" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="flex h-full items-center justify-center text-sm text-neutral-500">
                Activity will appear as you add and complete tasks.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
