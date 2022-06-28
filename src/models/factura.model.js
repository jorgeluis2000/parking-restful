import { Sequelize, DataTypes } from "sequelize";
import { db } from "../db/connect.database.js";

/* Definición del modelo Factura. */
const Factura = db.define(
  "Factura",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    vehiculo: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    entrada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    salida: {
      type: DataTypes.DATE,
      allowNull: true
    },
    minutos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    valor_total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
  },
  {
    tableName: "factura",
    modelName: "factura",
    createdAt: true,
    updatedAt: true
  }
);


export default Factura;