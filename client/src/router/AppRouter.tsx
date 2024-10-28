import RoutesWithNotFound from '../helpers/routes-with-not-found';
import { BrowserRouter, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './routes';
import { AuthGuard, RoleGuard } from '../guards';
import { HomePage, LoginPage, Dashboard } from '../pages';
import VaccinesPage from '@/pages/tash';

function AppRouter() {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        {/* Rutas Públicas */}
        <Route path={PublicRoutes.HOME} element={<HomePage />} />
        <Route element={<AuthGuard privateValidation={false} />}>
          <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
        </Route>

        {/* Rutas protegidas con autenticación */}
        <Route element={<AuthGuard privateValidation />}>
          <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />

          {/* Rutas específicas que solo pueden ser accedidas por Administrador */}
          <Route element={<RoleGuard allowedRoles={['Administrador']} />}>
            <Route
              path={PrivateRoutes.ADMINISTRADOR.GESTION_ANIMALES}
              element={<VaccinesPage />}
            />
            <Route
              path={PrivateRoutes.ADMINISTRADOR.GESTION_REPORTES}
              element={<VaccinesPage />}
            />
            <Route
              path={PrivateRoutes.ADMINISTRADOR.GESTION_USUARIOS}
              element={<VaccinesPage />}
            />
          </Route>

          {/* Rutas específicas para Veterinario */}
          <Route
            element={
              <RoleGuard allowedRoles={['Veterinario', 'Administrador']} />
            }
          >
            <Route
              path={PrivateRoutes.VETERINARIO.GESTION_ANIMALES}
              element={<VaccinesPage />}
            />
            <Route
              path={PrivateRoutes.VETERINARIO.GESTION_REPORTES}
              element={<VaccinesPage />}
            />
          </Route>

          {/* Rutas específicas para Empleado */}
          <Route
            element={<RoleGuard allowedRoles={['Empleado', 'Administrador']} />}
          >
            <Route
              path={PrivateRoutes.EMPLEADO.GESTION_REPORTES}
              element={<VaccinesPage />}
            />
          </Route>
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
}

export default AppRouter;
