/**
 * Tipos de estado de una factura
 * @typedef {object} TipoEstadoFactura
 * @property {string} parqueado - Estado de parqueo
 * @property {string} cancelado - Estado cancelado
 * @property {string} finalizado - Estado finalizado
 */
/**
 * Tipos de estado de una factura
 * @type {TipoEstadoFactura}
 */
export const tipoEstadoFactura = {
    parqueado: 'PARQ',
    cancelado: 'CANC',
    finalizado: 'FINA'
}

/**
 * Tipos de vehiculos permitidos en el programa
 * @typedef {object} TipoVehiculoConst
 * @property {string} policia - Vehiculo de policia
 * @property {string} ejercito - Vehiculo del ejercito
 * @property {string} bombero - Vehiculo del bombero
 * @property {string} ambulancia - Vehiculo de ambulancia
 * @property {string} bicicleta - Vehiculo de bicicleta
 * @property {string} motocicleta - Vehiculo de motocicleta
 * @property {string} automovil_particular - Vehiculo de automovil particular
 * @property {string} vehiculo_pesado - Vehiculo de vehiculo pesado
 */
/**
 * Tipos de vehiculos permitidos en el programa
 * @type {TipoVehiculoConst}
 */
export const tipoVehiculo = {
    policia: 'POLI',
    ejercito: 'EJER',
    bombero: 'BOMB',
    ambulancia: 'AMBU',
    bicicleta: 'BICI',
    motocicleta: 'MOTO',
    automovil_particular: 'AUPA',
    vehiculo_pesado: 'VEPE'
}