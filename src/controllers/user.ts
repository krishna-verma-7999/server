import { getAllUsers, getUserById } from "../db/userModel";
import express from "express";

export const getAllUsersController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getAllUsers();
    // console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export const getUserController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    // console.log(userId, user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
