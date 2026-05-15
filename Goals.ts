import mongoose, { Schema, Document } from "mongoose";

export interface IGoal extends Document {
  title: string;
  description?: string;
  targetDate?: Date;
  achieved: boolean;
  createdAt: Date;
}

const GoalSchema = new Schema<IGoal>(
  {
    title: { type: String, required: true },
    description: { type: String },
    targetDate: { type: Date },
    achieved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Goal = mongoose.model<IGoal>("Goal", GoalSchema);
