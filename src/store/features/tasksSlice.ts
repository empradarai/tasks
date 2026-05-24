import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "@/types/task";

interface TasksState {
  items: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  status: "idle",
  error: null,
};

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    const message = typeof data.error === "string" ? data.error : "Request failed";
    throw new Error(message);
  }
  return data as T;
}

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetchAll", async () => {
  const res = await fetch("/api/tasks");
  return handleResponse<Task[]>(res);
});

export const createTask = createAsyncThunk<
  Task,
  { title: string; description?: string }
>("tasks/create", async (payload) => {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse<Task>(res);
});

export const updateTask = createAsyncThunk<
  Task,
  { id: string; title?: string; description?: string; completed?: boolean }
>("tasks/update", async ({ id, ...updates }) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return handleResponse<Task>(res);
});

export const deleteTask = createAsyncThunk<string, string>("tasks/delete", async (id) => {
  const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  await handleResponse<{ message: string }>(res);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load tasks";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export const { clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
