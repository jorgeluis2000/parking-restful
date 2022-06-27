import { Sequelize, DataTypes } from "sequelize";
import { db } from "../db/connect.database.js";

const Vehiculo = db.define(
  "Vehiculo",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    placa: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    tipo_vehiculo: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    tableName: "vehiculo",
    createdAt: true,
    updatedAt: true
  }
);

export default Vehiculo;