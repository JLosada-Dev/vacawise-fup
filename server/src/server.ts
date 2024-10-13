import express from 'express';
import usuarioRouter from './routers/usuarioRouter';
import db from './config/db';

// Conecta a la base de datos.
async function connectDB() {
  try {
    await db.authenticate();
    db.sync(); // Sincroniza los modelos con la base de datos.
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}
connectDB();

/**
 * Inicializa una instancia del servidor Express.
 * @constant {Express} server - La instancia del servidor Express.
 */
const server = express();

// Maneja las rutas de la API de usuarios.
server.use('/api/usuarios', usuarioRouter);


export default server;
