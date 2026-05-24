import type { ITask } from "@/models/Task";

export function serializeTask(task: ITask | { _id: { toString(): string }; title: string; description?: string; completed: boolean; createdAt: Date; updatedAt: Date }) {
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description ?? "",
    completed: task.completed,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}
