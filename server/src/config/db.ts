import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; // Para gestionar variables de entorno desde un archivo .env durante el desarrollo.

/**
 * Inicializa una instancia de Sequelize para conectarse a una base de datos PostgreSQL.
 * @remarks
 * Esta configuración se conecta a una base de datos PostgreSQL utilizando un URI de conexión.
 * 
 * @dotenv
 * dotenv: Un módulo que carga variables de entorno desde un archivo .env durante el desarrollo. `process.env` contiene las variables de entorno.
 * 
 * dotenv.config(): Carga las variables de entorno desde un archivo .env durante el desarrollo. `process.env` contiene las variables de entorno.
 * 
 * Documentación: https://sequelize.org/master/manual/getting-started.html
 */

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!);

export default db;
