import { Router } from "express";
import FacturaController from '../controllers/factura.controller.js'
import { responseGuardianBeared } from "../utils/middlewares/guardian.middleware.js";

const router = Router();

/**
 * Creación de rutasa para el método de publicación. {@Link Router}
 */
router.get('/info', FacturaController.info);
router.post('/factura-x-fecha', responseGuardianBeared, FacturaController.facturaXFecha);
router.post('/registro-entrada', responseGuardianBeared, FacturaController.registroEntrada);

export default router;