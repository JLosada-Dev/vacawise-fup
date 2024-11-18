import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const Page404: React.FC = () => {
  return (
    <section className='h-screen py-10 bg-white'>
      <div className='mx-auto'>
        <div className='flex flex-col items-center'>
          <h1 className='text-7xl font-bold text-center'>404</h1>
          {/* Div con estilo inline para el fondo */}
          <div
            className='flex items-center justify-center w-1/2'
            style={{
              backgroundImage:
                "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              height: '400px',
            }}
          ></div>
          <div className='text-center -mt-12'>
            <h3 className='text-4xl font-bold mb-4'>
              Parece que estás perdido
            </h3>
            <p className='text-lg text-gray-600 mb-6'>
              La página que buscas no está disponible.
            </p>
            <Button>
              <Link to='/' className='px-6 py-3'>
                Volver a la página de inicio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
