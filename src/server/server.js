import express, { response } from "express";
import cors from "cors";
import http from "http";
import '../models/asociation.model.js'
import appRoutes from "../routes/app.routes.js";
import { security } from "../environments/security.env.js";
import Estado from "../models/estado.model.js";
import TipoVehiculo from "../models/tipo_vehiculo.model.js";

/**
 * Clase para crear el servidor de la app.
 * @example
 * const server = new ServerApp();
 * server.start();
 * @todo Esta clase es un contenedor para el servidor express, su objetivo principal es iniciar el servidor y configurar los middlewares y las rutas.
 */
class ServerApp {

  /**
   * Funcion constructor
   * Esta función crea una instancia de la aplicación express y crea un servidor utilizando el módulo
   * http.
   */
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.middlewares();
    this.routes();
  }

  /**
   * Esta función se utiliza para configurar las rutas de la aplicación.
   * @return {void}
   */
  routes() {
    this.app.use(appRoutes);
  }

  /**
   * Esta función se utiliza para configurar los encabezados del objeto de respuesta para permitir
   * solicitudes de origen cruzado.
   * @returns {void}
   */
  middlewares() {
    this.app.use(cors());
    this.app.use((_, res = response, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, PARKING-API-KEY');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
      next();
    });
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ limit: '10mb', extended: true }))
  }

  /**
   * El servidor escucha en el puerto pasado por el archivo .env e imprime un mensaje en la consola si se está ejecutando.
   * @returns {void}
   */
  start() {
    this.server.listen(security.REST_PORT, () => {
      console.log(
        `🚀 🇺🇦  STOP THE WAR 🇷🇺 🚀  Servidor corriendo en http://localhost:${security.REST_PORT}`
      );
    });
  }
}

export default ServerApp;
