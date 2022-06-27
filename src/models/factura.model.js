import { Sequelize, DataTypes } from "sequelize";
import { db } from "../db/connect.database.js";

const Factura = db.define(
  "Factura",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    vehiculo: {
      type: DataTypes.UUIDV4,
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
      type: DataTypes.UUIDV4,
      allowNull: true
    },
    valor_total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
  },
  {
    tableName: "factura",
    createdAt: true,
    updatedAt: true
  }
);


export default Factura;