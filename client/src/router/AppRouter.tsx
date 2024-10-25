import { BrowserRouter, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './routes'; // Importa constantes de rutas privadas y públicas
import { AuthGuard } from '../guards'; // Importa el guard para proteger rutas privadas
import { Dashboard, HomePage, LoginPage } from '../pages'; // Importa las páginas de la aplicación
import RoutesWithNotFound from '../helpers/routes-with-not-found'; // Importa un componente para manejar rutas no encontradas

// Componente principal de enrutamiento de la aplicación
function AppRouter() {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        {/* Maneja las rutas y los errores 404 */}
        <Route path='/' element={<HomePage />}></Route>{' '}
        {/* Ruta protegida por AuthGuard, verifica la autenticación del usuario */}
        <Route element={<AuthGuard privateValidation />}>
          <Route
            path={`${PrivateRoutes.DASHBOARD}/*`} // Ruta para el Dashboard privado
            element={<Dashboard />}
          ></Route>
        </Route>
        {/* Ruta pública para el inicio de sesión */}
        <Route path={PublicRoutes.LOGIN} element={<LoginPage />}></Route>
        {/* 
          <Route
            path={PublicRoutes.LOGIN}
            element={<Navigate to={PrivateRoutes.DASHBOARD} />}
          ></Route>
        */}
      </RoutesWithNotFound>
    </BrowserRouter>
  );
}

export default AppRouter;
