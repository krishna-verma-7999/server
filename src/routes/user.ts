import express from "express";
import {
  getAllUsersController,
  getUserController,
  getUsersByToken,
} from "../controllers/user";

import { isAuthenticated } from "../middleware";
import { createTaskController, getTodoController } from "../controllers/task";

const router = express.Router();

router.post("/auth/user", isAuthenticated, getUsersByToken);
router.post("/auth/getAllUsers", isAuthenticated, getAllUsersController);
router.post("/auth/createTask", isAuthenticated, createTaskController);

router.post("/auth/getAllTask", isAuthenticated, getTodoController);

export default router;
