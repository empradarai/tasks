"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { taskFormSchema, type TaskFormValues } from "@/lib/validations";
import { useAppDispatch } from "@/store/hooks";
import { createTask, updateTask } from "@/store/features/tasksSlice";
import type { Task } from "@/types/task";

type FieldErrors = Partial<Record<keyof TaskFormValues, string>>;

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  task?: Task;
}

function emptyForm(): TaskFormValues {
  return { title: "", description: "" };
}

function valuesFromTask(task: Task): TaskFormValues {
  return { title: task.title, description: task.description ?? "" };
}

export function TaskFormModal({ open, onClose, mode, task }: TaskFormModalProps) {
  const dispatch = useAppDispatch();
  const isEdit = mode === "edit";

  const [values, setValues] = useState<TaskFormValues>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setValues(isEdit && task ? valuesFromTask(task) : emptyForm());
    setFieldErrors({});
    setSubmitError("");
  }, [open, isEdit, task]);

  function validate(): TaskFormValues | null {
    const result = taskFormSchema.safeParse(values);
    if (result.success) {
      setFieldErrors({});
      return result.data;
    }

    const errors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof TaskFormValues;
      if (!errors[field]) errors[field] = issue.message;
    }
    setFieldErrors(errors);
    return null;
  }

  function handleFieldChange(field: keyof TaskFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError("");

    const data = validate();
    if (!data) return;

    setLoading(true);
    try {
      if (isEdit && task) {
        await dispatch(
          updateTask({
            id: task.id,
            title: data.title,
            description: data.description.trim(),
          })
        ).unwrap();
      } else {
        await dispatch(
          createTask({
            title: data.title,
            description: data.description.trim() || undefined,
          })
        ).unwrap();
      }
      onClose();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit task" : "New task"}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {submitError && <Alert variant="error">{submitError}</Alert>}

        <Input
          label="Title"
          value={values.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          placeholder="What needs to be done?"
          error={fieldErrors.title}
          autoFocus
        />

        <Textarea
          label="Description"
          value={values.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          placeholder="Add optional details…"
          error={fieldErrors.description}
          rows={4}
        />

        <p className="text-xs text-neutral-500">
          Title is required (max 200 characters). Description is optional (max 1000 characters).
        </p>

        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isEdit ? "Save changes" : "Create task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
