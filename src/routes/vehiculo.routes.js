import { Router } from "express";
import ControladorVehiculo from '../controllers/user.controller.js'
import { responseGuardianBeared } from "../utils/middlewares/guardian.middleware.js";

const router = Router();

/**
 * Creación de rutasa para el método de publicación. {@Link Router}
 */
router.post('/vehiculo', responseGuardianBeared, ControladorVehiculo.info);

export default router;