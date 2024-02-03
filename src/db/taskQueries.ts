import { TaskModel } from "./models/task";

export const createTask = async (values: Record<string, any>) => {
  return await new TaskModel(values)
    .save()
    .then((user: any) => user.toObject());
};

export const getAllTask = async () => {
  return await TaskModel.find()
    .sort({ priority: "asc" })
    .populate("assignedTo");
};

export const updateTaskStatus = async (status: string, id: string) => {
  return await TaskModel.findOneAndUpdate(
    { _id: id },
    { status: status }
  ).populate("assignedTo");
};
