import { useUserContext } from '@/contexts/UserContext';
import { Navigate } from 'react-router-dom';
import EmployeeDashboard from './Dashboards/EmployeeDashboard';
import AdminDashboard from './Dashboards/AdminDashboard';
import VetDashboard from './Dashboards/VetDashboard';

function Dashboard() {
  const { user } = useUserContext();

  if (user.rol === 'Administrador') {
    return <AdminDashboard />;
  }
  if (user.rol === 'Veterinario') {
    return <VetDashboard />;
  }
  if (user.rol === 'Empleado') {
    console.log('user rol', user.rol);
    return <EmployeeDashboard />;
  }

  return (
    <>
      <Navigate to='/login' />
    </>
  );
}
export default Dashboard;
