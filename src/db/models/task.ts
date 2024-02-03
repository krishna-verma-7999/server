import mongoose from "mongoose";

enum Priority {
  not_hurry,
  medium,
  high,
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: Priority,
    default: "medium",
  },
  timeEstimate: {
    type: Number, // In minutes, for example
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "done", "failed"],
    default: "pending",
  },
});

export const TaskModel = mongoose.model("Task", taskSchema);
