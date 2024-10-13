/**
 * Punto de entrada de la aplicación del servidor.
 * 
 * Este módulo importa la instancia del servidor desde el módulo './server'
 * y comienza a escuchar en el puerto 3000. Una vez que el servidor está 
 * en funcionamiento, registra un mensaje indicando que la API REST está 
 * disponible en 'http://localhost:3000'.
 * 
 * @module index
 */
import server from './server';

server.listen(3000, () => {
  console.log('La API REST está funcionando en http://localhost:3000');
});
