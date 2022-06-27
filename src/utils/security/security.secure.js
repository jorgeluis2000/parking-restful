import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { security } from '../../environments/security.env.js'
import { InputRandomConst } from '../types/simpleInputs.types.js'

/**
 * Encriptar el texto o objeto que se requiera.
 *
 * @param {*} str
 * @return {string} texto o objeto encryptado.
 */
const encrypt = (str) => {
  return CryptoJS.AES.encrypt(str, security.SECRETKEY).toString();
};

/**
 * Desencriptar cualquier texto que se envie.
 *
 * @param {*} str texto o objeto.
 * @return {*} Texto o objeto.
 */
const decrypt = (str) => {
  return CryptoJS.AES.decrypt(str, security.SECRETKEY).toString(CryptoJS.enc.Latin1);
};
/**
 * Hashear cualquier texto o objeto en 256.
 *
 * @param {*} str texto o objeto.
 * @return {string} texto en Hexadecimal.
 */
const encryptSHA256 = (str) => {
  return CryptoJS.SHA256(str, security.SECRETKEY).toString(CryptoJS.enc.Hex);
};
/**
 * Hashear cualquier texto o objeto en 512.
 *
 * @param {*} str texto o objeto.
 * @return {string} texto en Hexadecimal.
 */
const encryptSHA512 = (str) => {
  return CryptoJS.SHA512(str, security.SECRETKEY).toString(CryptoJS.enc.Hex);
};
/**
 * Crear un token sin limite de expiracion.
 *
 * @param {*} str texto o objeto.
 * @param {string} [hashEncode='HS512'] tipo de hash que se va usar en la cabecera.
 * @param {string} [keyPrivate=security.SECRETKEYTOKEN] llave privada para crear el token.
 * @return {string} Token en formato texto.
 */
const createToken = (str, hashEncode = 'HS512', keyPrivate = security.SECRETKEYTOKEN) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const timestap = today.toISOString();
  const payLoad = {
    credential: str,
    check: true,
    date: timestap
  };
  return jwt.sign(payLoad, keyPrivate, { algorithm: hashEncode });
};
/**
 * Crear un token con limite de expiracion si se requiere.
 *
 * @param {*} str texto o objeto.
 * @param {*} expira texto o numerico, por ejemplo: '1d', '1m', 60, 60*60, '1h'.
 * @param {string} [hashEncode='HS512'] tipo de hash que se va usar en la cabecera.
 * @param {string} [keyPrivate=security.SECRETKEYTOKEN] llave privada para crear el token.
 * @return {string} Token en formato texto
 */
const createTokenWithExpirence = (str, expira, hashEncode = 'HS512', keyPrivate = security.SECRETKEYTOKEN) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const timestap = today.toISOString();
  const payLoad = {
    credential: str,
    check: true,
    date: timestap
  };
  return jwt.sign(payLoad, keyPrivate, { algorithm: hashEncode, expiresIn: expira });
};
/**
 * Decodificar o revelar el token, ademas revisa si el token se expiro si este tiene fecha de expiracion.
 *
 * @param {string} tokenText texto encryptado.
 * @param {string} [keyPublic=security.SECRETKEYTOKEN] llave publica para revelar el token.
 * @return {{credential: any,check: boolean, date: date}} objeto en formato JSON, este seria el payload almacenado en el token.
 */
const decodeJsonWebToken = (tokenText, keyPublic = security.SECRETKEYTOKEN) => {
  const decryptToken = decrypt(tokenText);
  try {
    const response = jwt.verify(decryptToken, keyPublic);
    return response;
  } catch (error) {
    return {};
  }
};
/**
 * Valida si el token se expiro y si la clave almacenada esla misma pasada por parametro.
 *
 * @param {string} tokenText texto.
 * @param {string} [passValid=''] Contrasña que será verificada.
 * @param {string} [keyPublic=security.SECRETKEYTOKEN] llave publica para revelar el token.
 * @return {boolean} Confirma si la validacion fue exitosa con un **True** y si esta falla devuelve un **False**.
 */
const verifyJsonWebToken = (tokenText, passValid = '', keyPublic = security.SECRETKEYTOKEN) => {
  const decryptToken = decrypt(tokenText);
  try {
    const response = jwt.verify(decryptToken, keyPublic);

    if (response.credential && response.credential === passValid) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
/**
 * Creacion de textos aletorios.
 *
 * @param {InputRandomConst} **cant** es un valor *numeric* el cual determina la cantidad de caracteres aleatorios y **stringWords** es la cadena de caracteres de representacion para decir que carcteres tomara el resultaado final
 * @return {string} texto con caracteres aleatorios
 */
const randomCode = ({ cant = 4, stringWords = "012346789" }) => {
  let password = "";
  for (var i = 0; i < cant; i++) password += stringWords.charAt(Math.floor(Math.random() * stringWords.length));
  return password;
}


export {
  encrypt,
  decrypt,
  encryptSHA256,
  createToken,
  createTokenWithExpirence,
  decodeJsonWebToken,
  verifyJsonWebToken,
  encryptSHA512,
  randomCode
};