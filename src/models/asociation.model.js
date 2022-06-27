import Estado from "./estado.model";
import Factura from "./factura.model";
import TipoVehiculo from "./tipo_vehiculo.model";
import Vehiculo from "./vehiculo.model";


/* Exportación de los modelos. */
const models = {
    Estado,
    TipoVehiculo,
    Factura,
    Vehiculo
};

Factura.hasMany(Estado, { foreignKey: 'estado' })
Factura.hasMany(Vehiculo, { foreignKey: 'vehiculo' })

Vehiculo.hasMany(TipoVehiculo, { foreignKey: 'tipo_vehiculo' })

export default models;