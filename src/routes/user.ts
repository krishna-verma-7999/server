import express from "express";
import { getAllUsersController, getUserController } from "../controllers/user";

import { isAuthenticated } from "../middleware";

const router = express.Router();

router.get("/getAllUsers", isAuthenticated, getAllUsersController);
router.get("/getUser/:userId", isAuthenticated, getUserController);

export default router;
