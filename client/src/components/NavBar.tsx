import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { useUserContext } from "@/contexts/UserContext";

function Navigation() {
  const { user } = useUserContext(); // Usamos el contexto para obtener el estado del usuario

  return (
    <nav className="sticky z-50 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link to={"/"} className="flex z-40 font-semibold">
            Vaca<span className="text-green-600">Wise</span>
          </Link>
          <div className="h-full flex items-center space-x-4">
            {/* Mostrar opciones de navegación dependiendo del rol */}
            {user.rol === "ADMIN" && (
              <>
                <Link
                  to="/gestion-usuarios"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Gestión de Usuarios
                </Link>
                <Link
                  to="/gestion-animales"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Gestión de Animales
                </Link>
                <Link
                  to="/gestion-reportes"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Gestión de Producción
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  to="/Login"
                  className={buttonVariants({ size: "sm", variant: "default" })}
                >
                  Cerrar Sesión
                </Link>
              </>
            )}
            {user.rol === "VETERINARIAN" && (
              <>
                <Link
                  to="/gestion-usuarios"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Gestión de Usuarios
                </Link>
                <Link
                  to="/generar-reportes"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Generar Reportes
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  to="/Login"
                  className={buttonVariants({ size: "sm", variant: "default" })}
                >
                  Cerrar Sesión
                </Link>
              </>
            )}
            {user.rol === "EMPLOYEE" && (
              <>
                <Link
                  to="/registro-produccion"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Registro de Producción
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  to="/Login"
                  className={buttonVariants({ size: "sm", variant: "default" })}
                >
                  Cerrar Sesión
                </Link>
              </>
            )}

            {/* Mostrar botón de inicio de sesión si el rol es "USER" */}
            {!user.rol && (
              <>
                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                <Link to={"/login"} className={buttonVariants({ size: "sm" })}>
                  Iniciar sesión
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navigation;
