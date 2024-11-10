import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';

interface StatusButtonProps {
  userId: string;
  currentStatus: boolean; //(activo/inactivo)
  onToggleStatus: (userId: string, currentStatus: boolean) => Promise<void>;
}

const StatusButton: FC<StatusButtonProps> = ({
  userId,
  currentStatus,
  onToggleStatus,
}) => {
  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    if (disabled) return;

    try {
      await onToggleStatus(userId, currentStatus);
      setDisabled(true);

      setTimeout(() => {
        setDisabled(false);
      }, 2000);
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={currentStatus ? 'default' : 'outline'}
      size='sm'
      className={`transition-colors duration-300 ease-in-out ${
        currentStatus
          ? 'bg-green-200 text-slate-800 hover:bg-green-300'
          : 'bg-green-400 text-slate-800 hover:bg-green-500'
      }`}
      disabled={disabled}
    >
      {currentStatus ? (
        <>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 13l4 4L19 7'
            />
          </svg>
          Activo
        </>
      ) : (
        <>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
          Inactivo
        </>
      )}
    </Button>
  );
};

export default StatusButton;
