import express from "express";
import { cadastrausuario, login,tasks,createTask,deleteTask} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/auth/register",cadastrausuario);
router.post("/auth/login", login);

router.get("/tasks", authMiddleware, tasks);
router.get("/tasks/:id", authMiddleware, tasks);

router.post("/tasks", authMiddleware, createTask);
router.put("/tasks/:id", authMiddleware, createTask);

router.delete("/tasks/:id", authMiddleware, deleteTask);



module.exports = router;