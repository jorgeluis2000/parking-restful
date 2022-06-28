import { Sequelize, DataTypes } from "sequelize";
import { db } from "../db/connect.database.js";

/* Definición del modelo. */
const Vehiculo = db.define(
  "Vehiculo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    placa: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    tipo_vehiculo: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  },
  {
    tableName: "vehiculo",
    modelName: "vehiculo",
    createdAt: true,
    updatedAt: true
  }
);

export default Vehiculo;