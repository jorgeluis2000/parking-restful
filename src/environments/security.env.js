import pkg from "dotenv";
pkg.config();

/**
 * Exportando las variables desde el archivo .env.
 * @typedef {object} SecurityParking
 * @property {string} SECRETKEY - llave secreta de encriptacion.
 * @property {string} SECRETKEYTOKEN - llave secreta para resolver el token.
 * @property {string} MAINWORD - Palabra de prueba.
 * @property {number} REST_PORT - Puerto donde sera expuesto el microservicio.
 * @property {string} NICK_SERVICE - Nombre del servicio, example format: my-name.
 * @property {string} TOKEN_AUTH - Token de autenticacion para la api.
 */
/**
 * Exportando las variables desde el archivo .env.
 * @type {SecurityParking} 
 */
export const security = {
   SECRETKEY: process.env.SECRETKEY,
   SECRETKEYTOKEN: process.env.SECRETKEYTOKEN,
   MAINWORD: process.env.MAINWORD,
   REST_PORT: process.env.REST_PORT,
   NICK_SERVICE: process.env.NICK_SERVICE,
   TOKEN_AUTH: process.env.TOKEN_AUTH
}