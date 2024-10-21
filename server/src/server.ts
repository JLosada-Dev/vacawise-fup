import express from 'express';
import colors from 'colors';
import userRouter from './routes/userRouter';
import bovineRouter from './routes/bovineRouter';
import recordRouter from './routes/recordRouter';
import cors, { CorsOptions } from 'cors';
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
// Permitir Conexiones
const corsOptions: CorsOptions = {
  /**
   * Origin: Es el dominio que tiene permitido hacer peticiones a la API
   * callback: Es la función que se ejecuta si el origen tiene permitido hacer peticiones
   */
  origin: function (origin, callback) {
    callback(null, true); // Permitir todas las conexiones
  },
};

server.use(cors(corsOptions)); // Habilitar cors

// Leer datos de formularios.
server.use(express.json());

// Maneja las rutas de la API de usuarios.
server.use('/api/usuario', userRouter);
server.use('/api/bovino', bovineRouter);
server.use('/api/registro', recordRouter);

export default server;
