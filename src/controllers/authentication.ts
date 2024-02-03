import express from "express";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { createUser, getExistingUserByEmail } from "../db/userQueries";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, name, asAdmin } = req.body;
    if (!email || !password || !name) {
      return res.status(204).send("Enter your details");
    }

    console.log(asAdmin);

    const existingUser = await getExistingUserByEmail(email);
    // console.log(existingUser);

    if (existingUser) {
      return res
        .status(200)
        .json({ status: 409, message: "User already exists" });
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

    const newUser = await createUser({
      name,
      email,
      role: asAdmin ? "Admin" : "Employee",
      password: hashedPassword,
    });
    console.log(newUser);

    return res
      .status(200)
      .json({ message: "User created successfully", status: 200 });
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
      return res
        .status(404)
        .json({ status: 404, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(403).json({
        status: 403,
        message: "Password is invalid",
      });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      status: 200,
      token: token,
      message: "User has been logged In successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
