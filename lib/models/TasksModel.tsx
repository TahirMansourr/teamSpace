import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  priority: String,
  dueDate: Date,
  creationDate: { type: Date, default: new Date() },
  lastModified: Date,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [String],
  // attatchments : string
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  subTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  dependencies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  featureId: String,
  sprintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sprint",
  },
  backlogItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductBacklogItem",
  },
  estimatedEffort: Number,
  isGlobal: Boolean,
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
