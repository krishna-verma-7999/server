import { TaskModel } from "./models/task";

export const createTask = async (values: Record<string, any>) => {
  return await new TaskModel(values)
    .save()
    .then((user: any) => user.toObject());
};

export const getAllTask = async () => {
  return await TaskModel.find();
};
