import { Link } from 'react-router-dom';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { useUserContext } from '@/contexts/UserContext';
import { PrivateRoutes, PublicRoutes } from '@/router/routes';

function Navigation() {
  const { user, resetUser } = useUserContext();

  // Menú de navegación basado en roles
  const roleLinks = {
    Administrador: [
      {
        path: PrivateRoutes.ADMINISTRADOR.GESTION_USUARIOS,
        label: 'Gestión de Usuarios',
      },
      {
        path: PrivateRoutes.ADMINISTRADOR.GESTION_REPORTES,
        label: 'Gestión de Producción',
      },
      {
        path: PrivateRoutes.ADMINISTRADOR.GESTION_ANIMALES,
        label: 'Gestión de Animales',
      },
    ],
    Veterinario: [
      {
        path: PrivateRoutes.VETERINARIO.GESTION_ANIMALES,
        label: 'Gestión de Animales',
      },
      {
        path: PrivateRoutes.VETERINARIO.GESTION_REPORTES,
        label: 'Generar de Reportes',
      },
    ],
    Empleado: [
      {
        path: PrivateRoutes.EMPLEADO.GESTION_REPORTES,
        label: 'Registro de Reportes',
      },
    ],
  };

  return (
    <nav className='sticky z-50 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          {/* Logo */}
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
                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                <button
                  onClick={resetUser}
                  className={buttonVariants({ size: 'sm', variant: 'default' })}
                >
                  Cerrar Sesión
                </button>
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
