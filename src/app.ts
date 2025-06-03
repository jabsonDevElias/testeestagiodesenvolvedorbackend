require("dotenv").config();
import express from "express";
import cors from "cors";
import {router} from "./routes/routes";
import {sequelize} from "./config/db";

const app = express();

app.use(express.json());
app.use(cors());

sequelize.sync({ force: false })
  .then(() => console.log("Banco de dados sincronizado!"))
  .catch((err:any) => console.error("Erro ao sincronizar DB:", err));

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));