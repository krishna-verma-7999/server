import { UserModel } from "./models/user";

export const createUser = async (values: Record<string, any>) => {
  return await new UserModel(values)
    .save()
    .then((user: any) => user.toObject());
};

export const getExistingUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

export const getUserById = async (id: string) => {
  return UserModel.findById(id).select({ password: 0 });
};

export const getAllUsers = async () => {
  return await UserModel.find({
    role: "Employee",
  }).select({ password: 0 });
};
