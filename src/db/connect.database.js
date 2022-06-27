import { Sequelize } from 'sequelize';
import { database } from '../environments/database.env.js'

/* Creación de una nueva instancia de Sequelize. */
const db = new Sequelize(`${database.DB_DIALECT}://${database.DB_USER}:${database.DB_PASS}@${database.DB_HOST}:${database.DB_PORT}/${database.DB_NAME}`);

/* Comprobando si la conexión está funcionando. */
db.authenticate()
    .then(() => {
        console.log('Conexion establecido correctamente con la base de datos.');
    })
    .catch((_) => {
        console.error('Tuvimos un problema al conectarnos a la base de datos.');
    });

export { db }