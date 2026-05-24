"use client";

import { useEffect } from "react";
import { TaskItem } from "@/components/tasks/TaskItem";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTasks } from "@/store/features/tasksSlice";
import type { Task } from "@/types/task";

interface TaskListProps {
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

export function TaskList({ onAddTask, onEditTask }: TaskListProps) {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white px-6 py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-indigo-600" />
        <p className="text-sm text-neutral-500">Loading your tasks…</p>
      </div>
    );
  }

  if (status === "failed") {
    return <Alert variant="error">{error ?? "Failed to load tasks"}</Alert>;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-neutral-900">No tasks yet</h2>
        <p className="mt-1 max-w-xs text-sm text-neutral-500">
          Create your first task to get started. You can mark tasks complete or edit them anytime.
        </p>
        <Button onClick={onAddTask} className="mt-6">
          Create your first task
        </Button>
      </div>
    );
  }

  const pending = items.filter((t) => !t.completed);
  const done = items.filter((t) => t.completed);

  return (
    <div className="space-y-8">
      {pending.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              To do
            </h2>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              {pending.length}
            </span>
          </div>
          <ul className="space-y-2">
            {pending.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </ul>
        </section>
      )}
      {done.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Completed
            </h2>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              {done.length}
            </span>
          </div>
          <ul className="space-y-2">
            {done.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
