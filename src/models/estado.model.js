import { Sequelize, DataTypes } from "sequelize";
import { db } from "../db/connect.database.js";

const Estado = db.define(
  "Estado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "estado",
    createdAt: false,
    updatedAt: false
  }
);

export default Estado;