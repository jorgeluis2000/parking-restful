import Estado from "./estado.model.js";
import Factura from "./factura.model.js";
import TipoVehiculo from "./tipo_vehiculo.model.js";
import Vehiculo from "./vehiculo.model.js";


/* Exportación de los modelos. */
const models = {
    Estado,
    TipoVehiculo,
    Factura,
    Vehiculo
};

// Factura.hasMany(Estado, { foreignKey: 'estado' })
// Factura.hasMany(Vehiculo, { foreignKey: 'vehiculo' })

// Vehiculo.hasMany(TipoVehiculo, { foreignKey: 'tipo_vehiculo' })


export default models;