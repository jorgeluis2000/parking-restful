import { request, response } from "express";
import {
  verifyJsonWebToken,
} from "../security/security.secure.js";
import { security } from "../../environments/security.env.js";

/**
 * Resguarda la entrada a la API-Rest para que solo personas autorizadas puedan acceder.
 *
 * @param {request} [req=request] Son los parametros que deben llegar por http.
 * @param {response} [res=response] Son las respuestas que se enviaran por http.
 * @param {*} next
 * @return {response} Devuelve un mensaje de no autorizado si se le niega el acceso http o solo continua para ejcutar peticiones a la API
 */
const responseGuardianBeared = async (req = request, res = response, next) => {
  const apiKey = req.headers["parking-api-key"];
  if (!apiKey && !apiKey?.toLowerCase()?.startsWith("bearer")) {
    return res.status(401).send({
      ok: false,
      title: "no autorizado",
      message: "Acceso no autorizado",
    });
  }
  const token = apiKey.substring(7);

  if (!security.MAINWORD || security.MAINWORD === '') {
    return res.status(401).send({
      ok: false,
      title: "no autorizado",
      message: "Acceso no autorizado",
    });
  }

  if (!verifyJsonWebToken(token, security.MAINWORD)) {
    return res.status(401).send({
      ok: false,
      title: "no autorizado",
      message: "Acceso no autorizado",
    });
  }
  next();
};

export { responseGuardianBeared };
