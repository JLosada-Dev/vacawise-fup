import { Link } from 'react-router-dom';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { useUserContext } from '@/contexts/UserContext';
import { PrivateRoutes, PublicRoutes } from '@/router/routes';
import UserMenu from './UserMenu';

function Navigation() {
  const { user, resetUser } = useUserContext();

  // Menú de navegación basado en roles
  const roleLinks = {
    Administrador: [
      {
        path: PrivateRoutes.GESTION_USUARIOS,
        label: 'Gestión de Usuarios',
      },
      {
        path: PrivateRoutes.GESTION_REPORTES,
        label: 'Gestión de Reportes',
      },
      {
        path: PrivateRoutes.GENERAR_REPORTE,
        label: 'Generar de Reporte',
      },
      {
        path: PrivateRoutes.GESTION_ANIMALES,
        label: 'Gestión de Animales',
      },
    ],
    Veterinario: [
      {
        path: PrivateRoutes.GESTION_REPORTES,
        label: 'Gestión de Reportes',
      },
      {
        path: PrivateRoutes.GENERAR_REPORTE,
        label: 'Generar Reporte',
      },
    ],
    Empleado: [
      {
        path: PrivateRoutes.GESTION_REPORTES,
        label: 'Gestión de Reportes',
      },
      {
        path: PrivateRoutes.GENERAR_REPORTE,
        label: 'Generar Reporte',
      },
    ],
  };
  const handleLogout = () => {
    resetUser();
  };

  return (
    <nav className='sticky z-50 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link to='/' className='flex z-40 font-semibold'>
            Vaca<span className='text-green-600'>Wise</span>
          </Link>

          <div className='h-full flex items-center space-x-4'>
            {/* Links de navegación según el rol */}
            {user.rol &&
              roleLinks[user.rol]?.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  {link.label}
                </Link>
              ))}

            {user.rol ? (
              <>
                <Link
                  to={PrivateRoutes.DASHBOARD}
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Administrador ✨
                </Link>
                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                <UserMenu user={user} onLogout={handleLogout} />
              </>
            ) : (
              <Link
                to={PublicRoutes.LOGIN}
                className={buttonVariants({ size: 'sm' })}
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navigation;
