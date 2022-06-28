import { Sequelize, DataTypes } from "sequelize";
import { db } from "../db/connect.database.js";

/* Definición del modelo. */
const TipoVehiculo = db.define(
  "TipoVehiculo",
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
    tableName: "tipo_vehiculo",
    modelName: "tipo_vehiculo",
    createdAt: false,
    updatedAt: false
  }
);


export default TipoVehiculo;