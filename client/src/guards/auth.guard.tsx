import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from "../contexts/UserContext"; // Asegúrate de que la ruta sea correcta
import { PrivateRoutes, PublicRoutes } from "../router/routes"; // Asegúrate de que la ruta sea correcta

interface Props {
  privateValidation: boolean; // Define si la ruta es privada o pública
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />;

export const AuthGuard = ({ privateValidation }: Props) => {
  const { user } = useUserContext(); // Usamos el contexto para obtener el estado del usuario

  return user.name ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} /> // Si no está autenticado, lo redirige al login
  );
};

export default AuthGuard;
