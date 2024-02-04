import express from "express";
import {
  getAllUsersController,
  getUserController,
  getUsersByToken,
} from "../controllers/user";

import { isAuthenticated, isOwner } from "../middleware";
import {
  assignedTodoController,
  createTaskController,
  getTodoController,
  updateTaskController,
} from "../controllers/task";

const router = express.Router();

router.get("/auth/user", isAuthenticated, getUsersByToken);
router.get("/auth/getAllUsers", isAuthenticated, getAllUsersController);
router.post("/auth/createTask", isAuthenticated, createTaskController);

router.post("/auth/getAllTask", isAuthenticated, getTodoController);
router.post("/auth/assignedTask", isAuthenticated, assignedTodoController);
router.post("/auth/updateTask", isAuthenticated, isOwner, updateTaskController);

router.post("/auth/getUserById", isAuthenticated, getUserController);

export default router;
