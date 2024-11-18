import { Link } from 'react-router-dom';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { useUserContext } from '@/contexts/UserContext';
import { PrivateRoutes, PublicRoutes } from '@/router/routes';
import UserMenu from './UserMenu';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navigation() {
  const { user, resetUser } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menú de navegación basado en roles
  const roleLinks = {
    Administrador: [
      { path: PrivateRoutes.GESTION_USUARIOS, label: 'Gestión de Usuarios' },
      { path: PrivateRoutes.GESTION_REPORTES, label: 'Gestión de Reportes' },
      { path: PrivateRoutes.GENERAR_REPORTE, label: 'Generar Reporte' },
      { path: PrivateRoutes.GESTION_ANIMALES, label: 'Gestión de Animales' },
    ],
    Veterinario: [
      { path: PrivateRoutes.GESTION_REPORTES, label: 'Gestión de Reportes' },
      { path: PrivateRoutes.GENERAR_REPORTE, label: 'Generar Reporte' },
    ],
    Empleado: [
      { path: PrivateRoutes.GESTION_REPORTES, label: 'Gestión de Reportes' },
      { path: PrivateRoutes.GENERAR_REPORTE, label: 'Generar Reporte' },
    ],
  };

  const handleLogout = () => resetUser();

  return (
    <nav className='sticky z-50 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between'>
          <Link to='/' className='flex z-40 font-semibold'>
            Vaca<span className='text-green-600'>Wise</span>
          </Link>

          {/* Links visibles en pantallas grandes */}
          <div className='hidden lg:flex h-full items-center space-x-4'>
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
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  Administración ✨
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

          {/* Botón del menú móvil */}
          <div className='lg:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  {isMenuOpen ? (
                    <X className='h-5 w-5' />
                  ) : (
                    <Menu className='h-5 w-5' />
                  )}
                </button>
              </DropdownMenuTrigger>

              {/* Menú desplegable en pantallas pequeñas */}
              <DropdownMenuContent className='mt-2 space-y-2'>
                {user.rol &&
                  roleLinks[user.rol]?.map((link) => (
                    <DropdownMenuItem key={link.path} asChild>
                      <Link to={link.path}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                {user.rol ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to={PrivateRoutes.DASHBOARD}>
                        Administración ✨
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button
                        onClick={handleLogout}
                        className='w-full text-left'
                      >
                        Cerrar sesión
                      </button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to={PublicRoutes.LOGIN}>Iniciar sesión</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navigation;
