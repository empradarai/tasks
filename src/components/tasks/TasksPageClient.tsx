"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { TaskDashboard } from "@/components/tasks/TaskDashboard";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { TaskList } from "@/components/tasks/TaskList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearTasks } from "@/store/features/tasksSlice";
import type { Task } from "@/types/task";

type ModalState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "edit"; task: Task };

export function TasksPageClient() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.tasks);

  const [modal, setModal] = useState<ModalState>({ open: false });

  function handleSignOut() {
    dispatch(clearTasks());
    signOut({ callbackUrl: "/login" });
  }

  function openCreateModal() {
    setModal({ open: true, mode: "create" });
  }

  function openEditModal(task: Task) {
    setModal({ open: true, mode: "edit", task });
  }

  function closeModal() {
    setModal({ open: false });
  }

  return (
    <PageShell
      wide
      title="My tasks"
      subtitle={session?.user?.name ? `Hello, ${session.user.name}` : undefined}
      headerAction={
        <div className="flex items-center gap-2">
          <Button onClick={openCreateModal}>New task</Button>
          <Link
            href="/settings"
            className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
          >
            Settings
          </Link>
          <Button variant="secondary" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      }
    >
      {status === "succeeded" && items.length > 0 && <TaskDashboard tasks={items} />}

      <TaskList onAddTask={openCreateModal} onEditTask={openEditModal} />

      <TaskFormModal
        open={modal.open}
        onClose={closeModal}
        mode={modal.open && modal.mode === "edit" ? "edit" : "create"}
        task={modal.open && modal.mode === "edit" ? modal.task : undefined}
      />
    </PageShell>
  );
}
