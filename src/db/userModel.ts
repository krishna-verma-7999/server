import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(
          value
        );
      },
      message: "Password is invalid",
    },
  },
});

const UserModel = mongoose.model("User", userSchema);

export const createUser = async (values: Record<string, any>) => {
  return await new UserModel(values)
    .save()
    .then((user: any) => user.toObject());
};

export const getExistingAdminByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

export const getUserById = async (id: string) => {
  return UserModel.findById(id);
};

export const getAllUsers = async () => {
  return await UserModel.find();
};
