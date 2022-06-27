import { request, response } from "express";
import models from "../models/asociation.model.js";
import {
    encryptSHA256,
    encrypt,
    decodeJsonWebToken,
    createTokenWithExpirence,
    randomCode,
    verifyJsonWebToken,
    createSMS,
  } from "../utils/security/security.secure.js";

class FacturaController {
    
    constructor() { }

    // static async authUser(req = request, res = response) {}

    static async info(req = request, res = response) {}
}