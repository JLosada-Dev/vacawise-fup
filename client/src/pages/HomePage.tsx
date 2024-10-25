import { Icons } from '@/components/Icon';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Button } from '@/components/ui/button';
import Layout from '@/layouts/Layout';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  logo,
  line,
  Avatar_01,
  Avatar_02,
  Avatar_03,
} from '../assets/images.ts';

function HomePage() {
  return (
    <Layout>
      <div className='bg-slate-50 grainy-light'>
        <section>
          <MaxWidthWrapper className='pb-14 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8'>
            <div className='col-span-2 px-6 lg:px-0'>
              <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
                <h1 className='relative w-fit tracking-tight text-balance mt-20 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
                  Gestiona tu ganadería de manera{' '}
                  <span className='bg-green-600 px-2 text-white'>
                    eficiente
                  </span>
                </h1>
                <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
                  Optimiza la salud y producción de tu ganado con nuestra
                  plataforma, diseñada para mejorar cada aspecto de tu negocio.
                </p>
                <ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-green-600' />
                    Control sanitario y seguimiento de vacunas
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-green-600' />
                    Gestión de producción (leche)
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-green-600' />
                    Gestion de empleados y registros de actividades
                  </li>
                </ul>

                <div className='mt-16 flex flex-col sm:flex-row items-center sm:items-start gap-5'>
                  <div className='flex flex-col justify-between items-center sm:items-start'>
                    <div className='flex gap-0.5'>
                      <Star className='h-4 w-4 text-green-600 fill-green-600' />
                      <Star className='h-4 w-4 text-green-600 fill-green-600' />
                      <Star className='h-4 w-4 text-green-600 fill-green-600' />
                      <Star className='h-4 w-4 text-green-600 fill-green-600' />
                      <Star className='h-4 w-4 text-green-600 fill-green-600' />
                    </div>

                    <p>
                      <span className='font-semibold'>100%</span> comprometidos
                      con la calidad
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
              <div className='relative md:max-w-xl'>
                <img
                  src={line}
                  className='absolute w-20 left-8 -bottom-6 select-none'
                />
                <img src={logo} alt='vaca-logo' />
              </div>
            </div>
          </MaxWidthWrapper>
        </section>

        <section className='bg-slate-100 grainy-dark py-20'>
          <MaxWidthWrapper className='flex flex-col items-start'>
            <div className='flex flex-col items-start gap-4 sm:gap-6'>
              <h2 className='mt-2 tracking-tight text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                Control de acceso{' '}
                <span className='relative px-2'>
                  inteligente{' '}
                  <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500' />
                </span>{' '}
              </h2>
              <p className='mt-4 text-lg text-gray-700'>
                Gestiona el acceso al sistema para administradores, veterinarios
                y empleados. Cada rol tiene funciones específicas, asegurando
                que la información relevante esté siempre al alcance.
              </p>
            </div>

            <div className='roles-container flex flex-wrap justify-center lg:justify-evenly w-full mt-10 gap-6'>
              <TeamMemberCard
                title='Administradores'
                description='Acceso total al sistema'
                members={[
                  {
                    name: 'Sofia Davis',
                    role: 'Owner',
                    email: 'sofia@example.com',
                    avatarSrc: Avatar_01,
                  },
                ]}
              />
              <TeamMemberCard
                title='Veterinarios'
                description='Control sanitario'
                members={[
                  {
                    name: 'Jackson Lee',
                    role: 'Veterinario',
                    email: 'jackson@example.com',
                    avatarSrc: Avatar_02,
                  },
                  {
                    name: 'Maria Garcia',
                    role: 'Veterinario',
                    email: 'maria@example.com',
                  },
                ]}
              />
              <TeamMemberCard
                title='Empleados'
                description='Registro de actividades'
                members={[
                  {
                    name: 'Emma Johnson',
                    role: 'Empleado',
                    email: 'emma@example.com',
                  },
                  {
                    name: 'Jhon Doe',
                    role: 'Empleado',
                    email: 'jhon@example.com',
                    avatarSrc: Avatar_03,
                  },
                ]}
              />
            </div>
          </MaxWidthWrapper>
        </section>

        <section>
          <MaxWidthWrapper className='py-24'>
            <div className='mb-12 px-6 lg:px-8'>
              <div className='mx-auto max-w-2xl sm:text-center'>
                <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                  Empieza a gestionar tu ganado y{' '}
                  <span className='relative px-2 bg-green-600 text-white'>
                    mejora tu productividad
                  </span>{' '}
                  ahora
                </h2>
              </div>
            </div>

            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='relative flex flex-col items-center md:grid grid-cols-2 gap-40'>
                <img
                  src='/arrow.png'
                  className='absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0'
                />

                <div className='relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl'>
                  <img
                    src='/farmer.png'
                    className='rounded-sm object-cover shadow-md ring-1 ring-gray-900/10 h-full w-full'
                  />
                </div>
              </div>
            </div>

            <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
              <li className='w-fit'>
                <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
                Plataforma fácil de usar
              </li>
              <li className='w-fit'>
                <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
                Escalable para cualquier tamaño de granja
              </li>
              <li className='w-fit'>
                <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
                Seguimiento de la salud y producción de tu ganado
              </li>

              <div className='flex justify-center pt-10'>
                <Button>
                  <Link to={'/login'}>
                    <span className='font-semibold'>¡Empieza ahora!</span>
                  </Link>
                </Button>
              </div>
            </ul>
          </MaxWidthWrapper>
        </section>
      </div>
    </Layout>
  );
}
export default HomePage;
