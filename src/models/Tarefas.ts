import { DataTypes } from "sequelize";
import {sequelize} from "../config/db";

const Tarefas = sequelize.define("Tarefas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idUser:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  dataVencimento:{
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  }
});

module.exports = Tarefas;