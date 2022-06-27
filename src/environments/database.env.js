import pkg from "dotenv";
pkg.config();

/**
 * Exportando el objeto de la base de datos.
 * @typedef {object} DataBase
 * @property {string} DB_DIALECT - DB a usar.
 * @property {string} DB_USER - Usuario de la base de datos.
 * @property {string} DB_PASS - Password del usuario que se usa para ingresar a la base de datos.
 * @property {string} DB_HOST - IPv4, IPv6 o direccion donde se aloja la base de datos.
 * @property {number} DB_PORT - Puerto de entradas y salidas de datos de la base de datos.
 * @property {string} DB_NAME - Nombre de la base de datos.
 */
/**
 * Exportando el objeto de la base de datos
 * @type {DataBase}
 */
export const database = {
    DB_DIALECT: process.env.DB_DIALECT,
    DB_USER:process.env.DB_USER,
    DB_PASS:process.env.DB_PASS,
    DB_HOST:process.env.DB_HOST,
    DB_PORT:process.env.DB_PORT,
    DB_NAME:process.env.DB_NAME,
}