import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { PrivateRoutes, PublicRoutes } from '../router/routes';

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate replace to={PrivateRoutes.DASHBOARD} />
);

export const AuthGuard = ({ privateValidation }: Props) => {
  const { user } = useUserContext();
  const isAuthenticated = Boolean(user.nombre); // Cambia a true solo si el usuario está autenticado

  if (privateValidation) {
    // Para rutas privadas, verifica si está autenticado; si no, redirige a login
    return isAuthenticated ? (
      PrivateValidationFragment
    ) : (
      <Navigate replace to={PublicRoutes.LOGIN} />
    );
  } else {
    // Para rutas públicas, si está autenticado, redirige a dashboard; si no, muestra la página pública
    return isAuthenticated ? PublicValidationFragment : <Outlet />;
  }
};

export default AuthGuard;
