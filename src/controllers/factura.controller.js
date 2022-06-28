import { request, response } from "express";
import { Op, QueryTypes, Sequelize } from "sequelize";
import sequelize from "sequelize";
import moment from "moment";
import models from "../models/asociation.model.js";
import "../utils/constans.utils.js"
import { tipoEstadoFactura, tipoVehiculoConst, vehiculosOficiales } from "../utils/constans.utils.js";
import { db } from "../db/connect.database.js";



export default class FacturaController {

  constructor() { }

  // static async authUser(req = request, res = response) {}

  static async info(req = request, res = response) {
    return res.status(200).send({
      ok: true,
      title: "Info basic",
      message: "Informacion basica",
    });
  }

  static async facturaTotalYVehiculos(req = request, res = response) {
    /* Comprobando si el cuerpo de la solicitud tiene las propiedades fechaInicio y fechaFin. */
    if (!req.body.fechaInicio || !req.body.fechaFin) {
      return res.status(400).send({
        ok: false,
        title: "Faltan credenciales",
        message: "Verifica que hayas colocado el rango de fechas.",
      });
    }

    const { fechaInicio, fechaFin } = req.body
    const inicio = moment(fechaInicio).subtract(1, 'days')
    const fin = moment(fechaFin).add(1, 'days')
    try {
      var reporte = null
      var reporteConteo = await models.Factura.findAndCountAll({
        where: {
          entrada: {
            [Op.between]: [
              inicio,
              fin
            ]
          },
          estado: tipoEstadoFactura.finalizado
        },
        order: [['entrada', 'DESC']],
        raw: false
      })

      var reporteSuma = await models.Factura.findAll({
        where: {
          entrada: {
            [Op.between]: [
              inicio,
              fin
            ]
          },
          estado: tipoEstadoFactura.finalizado
        },
        attributes: [
          'vehiculo',
          [Sequelize.fn('sum', Sequelize.col('valor_total')), 'total_amount'],
        ],
        group: ['vehiculo'],
        raw: true
      })
      let sumaTotal = 0
      reporteSuma.map(value => sumaTotal += sumaTotal + value.total_amount)
      reporte = { conteo: reporteConteo.count, costoTotal: sumaTotal }
    } catch (error) {
      return res.status(400).send({
        ok: false,
        title: "Problemas con el servidor",
        message: "El reporte no se genero, intentalo de nuevo mas tarde.",
      });
    }

    return res.status(200).send({
      ok: true,
      title: "Reporte generado",
      message: "El reporte por rango de fechas especifico se ha generado satisfactorimente.",
      reporte
    });
  }

  static async facturaListaDeParking(req = request, res = response) {
    /* Comprobando si el cuerpo de la solicitud tiene las propiedades fechaInicio y fechaFin. */
    if (!req.body.fechaInicio || !req.body.fechaFin) {
      return res.status(400).send({
        ok: false,
        title: "Faltan credenciales",
        message: "Verifica que hayas colocado el rango de fechas.",
      });
    }

    const { fechaInicio, fechaFin } = req.body
    const inicio = moment(fechaInicio).subtract(1, 'days')
    const fin = moment(fechaFin).add(1, 'days')
    try {
      var reporte = await db.query(`SELECT * FROM (SELECT id, vehiculo, entrada, salida, minutos, estado, valor_total FROM factura WHERE estado = '${tipoEstadoFactura.finalizado}' AND entrada BETWEEN '${inicio}' AND '${fin}' ) as factura INNER JOIN vehiculo ON factura.vehiculo = vehiculo.placa`,
      {
        type: QueryTypes.SELECT
      })
    } catch (error) {
      return res.status(400).send({
        ok: false,
        title: "Problemas con el servidor",
        message: "El reporte no se genero, intentalo de nuevo mas tarde.",
        error
      });
    }

    return res.status(200).send({
      ok: true,
      title: "Reporte generado",
      message: "El reporte por rango de fechas especifico se ha generado satisfactorimente.",
      reporte
    });
  }
  static async todoEnUno(req = request, res = response) {
    /* Comprobando si el cuerpo de la solicitud tiene las propiedades fechaInicio y fechaFin. */
    if (!req.body.fechaInicio || !req.body.fechaFin || !req.body.tipoVehiculoB) {
      return res.status(400).send({
        ok: false,
        title: "Faltan credenciales",
        message: "Verifica que hayas colocado el rango de fechas.",
      });
    }

    const { fechaInicio, fechaFin, tipoVehiculoB } = req.body
    const inicio = moment(fechaInicio).subtract(1, 'days')
    const fin = moment(fechaFin).add(1, 'days')
    try {
      var reporteFull = null
      var reporte = await db.query(`SELECT * FROM (SELECT id, vehiculo, entrada, salida, minutos, estado, valor_total FROM factura WHERE estado = '${tipoEstadoFactura.finalizado}' AND entrada BETWEEN '${inicio}' AND '${fin}' ) as factura INNER JOIN (SELECT * FROM vehiculo WHERE tipo_vehiculo = '${tipoVehiculoB}') as vehiculo ON factura.vehiculo = vehiculo.placa`,
      {
        type: QueryTypes.SELECT
      })
      let sumaTotal = 0
      reporte.map(value => sumaTotal += sumaTotal + value.valor_total)
      reporteFull = {
        cantidad: reporte.length,
        monto_total: sumaTotal,
        reporte
      }

    } catch (error) {
      return res.status(400).send({
        ok: false,
        title: "Problemas con el servidor",
        message: "El reporte no se genero, intentalo de nuevo mas tarde.",
      });
    }

    return res.status(200).send({
      ok: true,
      title: "Reporte generado",
      message: "El reporte por rango de fechas especifico se ha generado satisfactorimente.",
      reporteFull
    });
  }

  static async registroEntrada(req = request, res = response) {
    if (!req.body.placa || !req.body.tipoVehiculo) {
      return res.status(400).send({
        ok: false,
        title: "Faltan credenciales",
        message: "Verifica que hayas ingresado todos los campos.",
      });
    }
    const { placa, tipoVehiculo } = req.body

    if (!JSON.stringify(tipoVehiculoConst).includes(tipoVehiculo)) {
      return res.status(404).send({
        ok: false,
        title: "Tipo vehiculo invalido",
        message: "Ese tipo de vehiculo no corresponde a nuestra lista.",
      });
    }

    try {
      var [buscarVehiculo, created] = await models.Vehiculo.findOrCreate({
        where: {
          placa: placa.toString(),
          tipo_vehiculo: tipoVehiculo.toString()
        }
      })
      if (buscarVehiculo) {
        var registrarFacturaEntrada = await models.Factura.create({
          vehiculo: placa.toString(),
          tipo_vehiculo: tipoVehiculo,
          estado: tipoEstadoFactura.parqueado,
          valor_total: 0.0,
          minutos: '0',
          entrada: moment().toISOString()
        })
      }
    } catch (error) {
      return res.status(400).send({
        ok: false,
        title: "Problemas con el servidor",
        message: "El reporte no se genero, intentalo de nuevo mas tarde.",
      });
    }
    return res.status(200).send({
      ok: true,
      title: "Entrada registrada",
      message: "El vehiculo se ha registrado con exito.",
    });
  }

  static async registroSalida(req = request, res = response) {
    if (!req.body.placa) {
      return res.status(400).send({
        ok: false,
        title: "Faltan credenciales",
        message: "Verifica que hayas ingresado todos los campos.",
      });
    }
    const { placa } = req.body
    let valoresCobro = {
      vehiculOficial: false,
      minutos: 0,
      valor_total: 0.0
    }

    try {
      const buscarVehiculo = await models.Vehiculo.findOne({
        where: {
          placa
        }
      })
      if (buscarVehiculo) {

        if (vehiculosOficiales.includes(buscarVehiculo.tipo_vehiculo)) {
          valoresCobro.vehiculOficial = true
        }
        const buscarFactura = await models.Factura.findOne({
          where: {
            vehiculo: placa,
            estado: tipoEstadoFactura.parqueado
          }
        })

        if (buscarFactura) {
          const entradaActual = moment(buscarFactura.entrada)
          const salidaActual = moment()
          valoresCobro.minutos = salidaActual.diff(entradaActual, 'minutes')

          if (!valoresCobro.vehiculOficial) {

            if (buscarVehiculo.tipo_vehiculo === tipoVehiculoConst.bicicleta) {
              valoresCobro.valor_total = 5 * valoresCobro.minutos
            } else if (buscarVehiculo.tipo_vehiculo === tipoVehiculoConst.motocicleta) {
              valoresCobro.valor_total = 10 * valoresCobro.minutos
            } else if (buscarVehiculo.tipo_vehiculo === tipoVehiculoConst.automovil_particular) {
              valoresCobro.valor_total = 30 * valoresCobro.minutos
            } else if (buscarVehiculo.tipo_vehiculo === tipoVehiculoConst.vehiculo_pesado) {
              valoresCobro.valor_total = 40 * valoresCobro.minutos
            }
          }
          var actualizarFactura = await models.Factura.update({
            salida: salidaActual,
            minutos: valoresCobro.minutos,
            estado: tipoEstadoFactura.finalizado,
            valor_total: valoresCobro.valor_total
          }, {
            where: {
              vehiculo: placa,
              estado: tipoEstadoFactura.parqueado
            }
          })
        } else {
          return res.status(404).send({
            ok: false,
            title: "No ha ingresado",
            message: "Ese vehiculo no se encuentra estacionado actualmente.",
          });
        }
      }
    } catch (error) {
      return res.status(400).send({
        ok: false,
        title: "Problemas con el servidor",
        message: "El reporte no se genero, intentalo de nuevo mas tarde.",
      });
    }

    return res.status(200).send({
      ok: true,
      title: "Entrada registrada",
      message: "Se ha a cobrado satifactoriamente el pedido.",
    });
  }
}