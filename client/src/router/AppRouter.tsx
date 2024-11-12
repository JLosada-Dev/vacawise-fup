import RoutesWithNotFound from '../helpers/routes-with-not-found';
import { BrowserRouter, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './routes';
import { AuthGuard, RoleGuard } from '../guards';
import {
  HomePage,
  LoginPage,
  Dashboard,
  GestionBovinosPage,
  GestionReportesPage,
  GestionUsuariosPage,
} from '../pages';

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

          {/* GESTION_USUARIOS */}
          <Route element={<RoleGuard allowedRoles={['Administrador']} />}>
            <Route
              path={PrivateRoutes.GESTION_USUARIOS}
              element={<GestionUsuariosPage />}
            />
          </Route>

          {/* GESTION_ANIMALES */}
          <Route
            element={
              <RoleGuard allowedRoles={['Administrador', 'Veterinario']} />
            }
          >
            <Route
              path={PrivateRoutes.GESTION_ANIMALES}
              element={<GestionBovinosPage />}
            />
          </Route>

          {/* GESTION_REPORTES */}
          <Route
            element={
              <RoleGuard
                allowedRoles={['Administrador', 'Veterinario', 'Empleado']}
              />
            }
          >
            <Route
              path={PrivateRoutes.GESTION_REPORTES}
              element={<GestionReportesPage />}
            />
            <Route
              path={PrivateRoutes.GENERAR_REPORTE}
              element={<GestionBovinosPage />}
            />
          </Route>
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
}

export default AppRouter;
