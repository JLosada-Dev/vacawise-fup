import express from 'express';
import usuarioRouter from './routers/usuarioRouter';

const server = express();

// Configura el middleware para manejar las rutas de la API de usuarios.
server.use('/api/usuarios', usuarioRouter);

// Exporta la instancia del servidor para que pueda ser utilizada en otros módulos.
export default server;
