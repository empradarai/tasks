import mongoose, { Schema, models, model } from "mongoose";

export interface ITask {
  _id: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    completed: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

export const Task = models.Task ?? model<ITask>("Task", TaskSchema);
