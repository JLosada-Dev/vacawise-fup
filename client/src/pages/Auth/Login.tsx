import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="bg-slate-100 grainy-dark min-h-screen w-full flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Iniciar Sesión
        </h2>
        <p className="text-center text-gray-700 mb-4">Accede a tu cuenta.</p>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            {/* <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Recordar mi sesión
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-green-600">
              ¿Olvidaste tu contraseña?
            </Link> */}
          </div>
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-green-600 font-medium">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
