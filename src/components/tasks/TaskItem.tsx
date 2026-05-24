"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/store/hooks";
import { updateTask, deleteTask } from "@/store/features/tasksSlice";
import type { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onEdit }: TaskItemProps) {
  const dispatch = useAppDispatch();
  const [busy, setBusy] = useState(false);

  async function toggleComplete() {
    setBusy(true);
    try {
      await dispatch(
        updateTask({ id: task.id, completed: !task.completed })
      ).unwrap();
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${task.title}"?`)) return;

    setBusy(true);
    try {
      await dispatch(deleteTask(task.id)).unwrap();
    } finally {
      setBusy(false);
    }
  }

  return (
    <li
      className={`group flex items-start gap-3 rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
        task.completed ? "border-neutral-100 bg-neutral-50/80" : "border-neutral-200"
      }`}
    >
      <label className="relative mt-0.5 flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
          disabled={busy}
          className="peer sr-only"
          aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        />
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2 peer-disabled:opacity-50 ${
            task.completed
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-neutral-300 bg-white group-hover:border-indigo-400"
          }`}
        >
          {task.completed && (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      </label>

      <div className="min-w-0 flex-1">
        <p
          className={`font-medium leading-snug ${
            task.completed ? "text-neutral-400 line-through" : "text-neutral-900"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p
            className={`mt-1.5 text-sm leading-relaxed ${
              task.completed ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:focus-within:opacity-100">
        <Button
          variant="ghost"
          onClick={() => onEdit(task)}
          disabled={busy}
          className="!px-2.5 text-neutral-600"
          aria-label={`Edit ${task.title}`}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          onClick={handleDelete}
          disabled={busy}
          className="!px-2.5 text-red-600 hover:bg-red-50 hover:text-red-700"
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
