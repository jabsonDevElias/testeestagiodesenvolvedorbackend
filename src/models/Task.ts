import { DataTypes } from "sequelize";
import {sequelize} from "../config/db";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  dueDate:{
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

export {Task};