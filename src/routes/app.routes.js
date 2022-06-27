import express from 'express';
import VehiculoRoutes from './vehiculo.routes.js';
// import RecoveryRoutes from './recovery.routes.js'

const app = express(); 

/* Diciéndole a la aplicación que use las rutas en el archivo `vehiculo.routes.js` */
app.use('/api/parking', VehiculoRoutes);
// app.use('/api/recovery', RecoveryRoutes);


export default app;