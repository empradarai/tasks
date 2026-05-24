import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models/Task";
import { requireAuth } from "@/lib/api-auth";
import { serializeTask } from "@/lib/serialize-task";
import { taskSchema } from "@/lib/validations";

export async function GET() {
  const { session, error } = await requireAuth();
  if (error) return error;

  await connectDB();
  const tasks = await Task.find({ userId: session!.user.id }).sort({ createdAt: -1 });

  return NextResponse.json(tasks.map(serializeTask));
}

export async function POST(request: Request) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = taskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();
    const task = await Task.create({
      ...parsed.data,
      userId: session!.user.id,
    });

    return NextResponse.json(serializeTask(task), { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
