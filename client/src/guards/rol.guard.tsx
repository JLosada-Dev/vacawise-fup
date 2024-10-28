import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserContext';
import { Roles } from '@/types';

type allowedRoles = Roles;

// Define la interfaz para las props
interface RoleGuardProps {
  allowedRoles: allowedRoles[]; // Un array de los roles permitidos
}

function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user } = useUserContext();

  // Si no hay usuario o su rol no está en la lista de roles permitidos, redirige
  if (!user || !allowedRoles.includes(user.rol)) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}

export default RoleGuard;
