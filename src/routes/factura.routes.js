import { Router } from "express";
import FacturaController from '../controllers/factura.controller.js'
import { responseGuardianBeared } from "../utils/middlewares/guardian.middleware.js";

const router = Router();

/**
 * Creación de rutasa para el método de publicación. {@Link Router}
 */
router.get('/info', FacturaController.info);
router.post('/factura-total-vehiculos', responseGuardianBeared, FacturaController.facturaTotalYVehiculos);
router.post('/registro-entrada', responseGuardianBeared, FacturaController.registroEntrada);
router.post('/registro-salida', responseGuardianBeared, FacturaController.registroSalida);
router.post('/lista-parking', responseGuardianBeared, FacturaController.facturaListaDeParking);
router.post('/todo-uno', responseGuardianBeared, FacturaController.todoEnUno);

export default router;