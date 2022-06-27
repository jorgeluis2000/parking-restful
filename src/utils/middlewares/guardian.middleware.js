import models from "../../models/asociation.model.js";
import {
  verifyJsonWebToken,
} from "../security/security.secure.js";
import { security } from "../../environments/security.env.js";
import { request, response } from "express";

/**
 * Resguarda la entrada a la API-Rest para que solo personas autorizadas puedan acceder.
 *
 * @param {request} [req=request] Son los parametros que deben llegar por http.
 * @param {response} [res=response] Son las respuestas que se enviaran por http.
 * @param {*} next
 * @return {response} Devuelve un mensaje de no autorizado si se le niega el acceso http o solo continua para ejcutar peticiones a la API
 */
const responseGuardianBeared = async (req = request, res = response, next) => {
  const apiKey = req.headers["api-key-silvercredit"];
  if (!apiKey && !apiKey?.toLowerCase()?.startsWith("bearer")) {
    return res.status(401).send({
      ok: false,
      title: "no autorizado",
      message: "Acceso no autorizado",
    });
  }
  const token = apiKey.substring(7);

  try {
    var accessAuthorization = await models.Authaccess.findOne({
      where: { nick: security.NICK_SERVICE },
    });
  } catch (error) {
    return res.status(401).send({
      ok: false,
      title: "no autorizado",
      message: "Acceso no autorizado",
    });
  }

  if (!verifyJsonWebToken(token, accessAuthorization.key_authaccess)) {
    return res.status(401).send({
      ok: false,
      title: "no autorizado",
      message: "Acceso no autorizado",
    });
  }
  next();
};

export { responseGuardianBeared };
