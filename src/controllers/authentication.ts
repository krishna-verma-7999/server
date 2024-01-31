import express from "express";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { createUser, getExistingUserByEmail } from "../db/userQueries";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(204).send("Enter your details");
    }

    const existingUser = await getExistingUserByEmail(email);
    // console.log(existingUser);

    if (existingUser) {
      return res.status(409).send("user already exists");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValidated = emailRegex.test(email);

    if (!isEmailValidated) {
      return res.status(400).send("Email is not valid");
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    const isPasswordValidated = passwordRegex.test(password);

    if (!isPasswordValidated) {
      return res.status(400).send("Password is not valid");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).send("User created Successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(406).send("Body is Empty");
    }

    const existingUser = await getExistingUserByEmail(email);

    if (!existingUser) {
      return res.status(404).send("User doesn't exists");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(403).send("Password is incorrect");
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      status: 200,
      message: "User has been logged In successfully",
      data: token,
    });
    // return res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
