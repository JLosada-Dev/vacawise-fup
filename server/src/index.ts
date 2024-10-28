/**
 * Punto de entrada de la aplicación del servidor.
 * disponible en 'http://localhost:3000'.
 */
import server from './server';
import colors from 'colors';

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(
    colors.cyan.bold(`La API REST está funcionando en http://localhost:${port}`)
  );
});
