/**
 * Punto de entrada de la aplicación del servidor.
 * disponible en 'http://localhost:3000'.
 */
import server from './server';
import colors from 'colors';

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(
    colors.cyan.bold(
      `🚀 La API REST está funcionando en http://localhost:${PORT}`
    )
  );
});
