import { getAllUsers, getUserById } from "../db/userQueries";
import express from "express";

export const getAllUsersController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getAllUsers();
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

export const getUsersByToken = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.body;
    const data = await getUserById(userId);

    if (!data) {
      return res.status(404).send("user is not exists");
    }
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
