import express from 'express';
import colors from 'colors';
import userRouter from './routes/userRouter';
import db from './config/db';

// Conecta a la base de datos.
async function connectDB() {
  try {
    await db.authenticate();
    db.sync(); // Sincroniza los modelos con la base de datos.
    console.log(
      colors.bgGreen.bold(
        'Conexión a la base de datos establecida correctamente.'
      )
    );
  } catch (error) {
    console.error(
      colors.bgRed.white('Error al conectar a la base de datos:'),
      error
    );
  }
}
connectDB();

/**
 * Inicializa una instancia del servidor Express.
 * @constant {Express} server - La instancia del servidor Express.
 */
const server = express();

// Maneja las rutas de la API de usuarios.
server.use('/api/users', userRouter);

export default server;
