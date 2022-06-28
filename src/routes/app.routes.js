import express from 'express';
import FacturaRoutes from './factura.routes.js';

const app = express(); 

/* Diciéndole a la aplicación que use las rutas en el archivo `factura.routes.js` */
app.use('/api/parking', FacturaRoutes);


export default app;