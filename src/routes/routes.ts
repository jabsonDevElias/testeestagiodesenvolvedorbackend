import express from "express";

import { login, registerUser } from "../controllers/UserController";
import { tasks,createTask,deleteTask,completeTask} from "../controllers/TaskController";

import {authMiddleware} from "../middlewares/middleware";


const router = express.Router();

router.post("/auth/register",registerUser);
router.post("/auth/login", login);

router.get("/tasks", authMiddleware, tasks);
router.get("/tasks/:id", authMiddleware, tasks);

router.post("/tasks", authMiddleware, createTask);
router.put("/tasks/:id", authMiddleware, createTask);

router.delete("/tasks/:id", authMiddleware, deleteTask);

router.patch("/tasks/:id/complete", authMiddleware, completeTask);



export {router};