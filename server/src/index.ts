/**
 * Punto de entrada de la aplicación del servidor.
 * disponible en 'http://localhost:3000'.
 */
import server from './server';

server.listen(3000, () => {
  console.log('La API REST está funcionando en http://localhost:3000');
});
