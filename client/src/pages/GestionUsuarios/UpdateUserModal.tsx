import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  updateUser: (id: string, data: any) => Promise<void>;
  userData: {
    id_usuario: string;
    nombre: string;
    cedula: string;
    email: string;
    rol: string;
    clave: string;
  };
}

const ROLES_USUARIO = [
  { value: 'Administrador', label: 'Administrador' },
  { value: 'Veterinario', label: 'Veterinario' },
  { value: 'Empleado', label: 'Empleado' },
];

export function UpdateUserModal({
  isOpen,
  onClose,
  onSuccess,
  updateUser,
  userData,
}: UpdateUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: userData.nombre,
    cedula: userData.cedula,
    email: userData.email,
    rol: userData.rol,
    clave: '', // Inicialmente la clave está vacía
  });

  useEffect(() => {
    setFormData({
      nombre: userData.nombre,
      cedula: userData.cedula,
      email: userData.email,
      rol: userData.rol,
      clave: '', // Restablecer la clave a vacía al cargar los datos
    });
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRolChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      rol: value,
    }));
  };

  const isFormValid = () => {
    return formData.nombre && formData.cedula && formData.email && formData.rol;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Preparar los datos a enviar, incluyendo la clave si está presente
    const dataToUpdate = {
      ...formData,
      clave: formData.clave || userData.clave, // Usar la clave actual si no se cambia
    };

    try {
      await updateUser(userData.id_usuario, dataToUpdate);
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el usuario',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-foreground'>
            Actualizar usuario
          </DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            Modifique los campos que desea actualizar del usuario.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-6 py-4'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label
                htmlFor='nombre'
                className='text-sm font-medium text-foreground'
              >
                Nombre
              </Label>
              <Input
                id='nombre'
                name='nombre'
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder='Nombre completo'
                className={cn(
                  'w-full px-3 py-2 border rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='cedula'
                className='text-sm font-medium text-foreground'
              >
                Cédula
              </Label>
              <Input
                id='cedula'
                name='cedula'
                value={formData.cedula}
                onChange={handleInputChange}
                placeholder='Número de cédula'
                className={cn(
                  'w-full px-3 py-2 border rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-sm font-medium text-foreground'
              >
                Email
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='correo@ejemplo.com'
                className={cn(
                  'w-full px-3 py-2 border rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='clave'
                className='text-sm font-medium text-foreground'
              >
                Clave
              </Label>
              <Input
                id='clave'
                name='clave'
                type='password'
                value={formData.clave}
                onChange={handleInputChange}
                placeholder='********'
                className={cn(
                  'w-full px-3 py-2 border rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='rol'
                className='text-sm font-medium text-foreground'
              >
                Rol
              </Label>
              <Select
                value={formData.rol}
                onValueChange={handleRolChange}
                required
              >
                <SelectTrigger
                  className={cn(
                    'w-full',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50'
                  )}
                >
                  <SelectValue placeholder='Selecciona un rol' />
                </SelectTrigger>
                <SelectContent>
                  {ROLES_USUARIO.map((rol) => (
                    <SelectItem
                      key={rol.value}
                      value={rol.value}
                      className='cursor-pointer hover:bg-secondary'
                    >
                      {rol.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <div className='flex gap-3 justify-end w-full'>
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                className={cn(
                  'hover:bg-secondary/80',
                  loading && 'pointer-events-none opacity-50'
                )}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                disabled={loading || !isFormValid()}
                className={cn(
                  'hover:bg-primary/90',
                  'transition-colors',
                  'inline-flex items-center justify-center',
                  (loading || !isFormValid()) && 'opacity-50 cursor-not-allowed'
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Actualizando...
                  </>
                ) : (
                  'Actualizar usuario'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateUserModal;
