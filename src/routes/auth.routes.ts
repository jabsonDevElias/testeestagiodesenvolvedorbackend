import express from "express";
import { cadastrausuario, login,tasks,cadastraTarefas,finalizarTarefas,excluirTarefas} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/auth/register",cadastrausuario);
router.post("/auth/login", login);

router.get("/tasks", authMiddleware, tasks);
router.post("/cadastratarefas", authMiddleware, cadastraTarefas);
router.post("/finalizartarefas", authMiddleware, finalizarTarefas);
router.post("/excluirtarefas", authMiddleware, excluirTarefas);


module.exports = router;