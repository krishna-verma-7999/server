import { getUserById } from "../db/userQueries";
import express from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: Error, decoded: { id: string }) => {
        // console.log(decoded);
        if (err) {
          return res.status(401).send({
            message: "Auth Failed maybe token expired",
            success: false,
            err,
          });
        } else {
          req.body.userId = decoded.id;
          next();
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send("Middleware problem");
  }
};
