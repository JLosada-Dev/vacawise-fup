import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useUserContext } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { PrivateRoutes } from '@/router/routes';
import { ChevronDown, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const { createUser } = useUserContext();
  const { toast } = useToast();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [rol, setRol] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Evita que el formulario se envíe de forma tradicional
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, clave, rol }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Usuario logueado', data.user.name);
        createUser(data.user);
        navigate(PrivateRoutes.DASHBOARD);
      } else {
        toast({
          title: 'Error de autenticación',
          description:
            data.message || 'Ocurrió un error en el inicio de sesión',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error del servidor',
        description: 'No se pudo conectar al servidor, intenta más tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-slate-100 grainy-dark min-h-screen w-full flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-10 max-w-md w-full'>
        <h2 className='text-3xl font-bold text-center text-gray-900 mb-6'>
          Iniciar Sesión
        </h2>
        <p className='text-center text-gray-700 mb-4'>Accede a tu cuenta.</p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Rol
            </label>
            <div className='relative'>
              <select
                value={rol}
                onChange={({ target }) => setRol(target.value)}
                required
                className='w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-0 focus:border-green-600 appearance-none pr-10'
              >
                <option value='' disabled>
                  Selecciona tu rol
                </option>
                <option value='Administrador'>Administrador</option>
                <option value='Empleado'>Empleado</option>
                <option value='Veterinario'>Veterinario</option>
              </select>
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <ChevronDown size={'20px'} className='text-gray-400' />
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Correo Electrónico
            </label>
            <div className='relative'>
              <input
                placeholder='example@gmail.com'
                type='email'
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
                className='w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-green-600'
              />
              <Mail className='absolute left-3 top-3 text-gray-400' />
            </div>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Contraseña
            </label>
            <div className='relative'>
              <input
                placeholder='tu contraseña'
                type='password'
                value={clave}
                onChange={({ target }) => setClave(target.value)}
                required
                className='w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-green-600'
              />
              <Lock className='absolute left-3 top-3 text-gray-400' />
            </div>
          </div>
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>
        </form>
        <p className='mt-4 text-sm text-center text-gray-600'>
          ¿No tienes una cuenta?{' '}
          <Link to='/#' className='text-green-600 font-medium'>
            contacta al administrador
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default LoginPage;
