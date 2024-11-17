import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface AddCowModalProps {
  onSuccess: () => void;
  createCow: (data: any) => Promise<void>;
}

const RAZAS_BOVINAS = [
  { value: 'Holstein', label: 'Holstein' },
  { value: 'Jersey', label: 'Jersey' },
  { value: 'Guernsey', label: 'Guernsey' },
  { value: 'Brown Swiss', label: 'Brown Swiss' },
];

export function AddCowModal({ onSuccess, createCow }: AddCowModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    numero_etiqueta: '',
    fecha_nacimiento: '',
    raza: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRazaChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      raza: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.numero_etiqueta && formData.fecha_nacimiento && formData.raza
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createCow(formData);
      toast({
        title: 'Bovino agregado',
        description: 'El bovino fue agregado exitosamente',
        variant: 'success',
      });
      setOpen(false);
      onSuccess();
      // Limpiar el formulario
      setFormData({
        numero_etiqueta: '',
        fecha_nacimiento: '',
        raza: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo agregar el bovino',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2 hover:bg-primary/90 transition-colors'>
          <Plus className='h-5 w-5' />
          Agregar bovino
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-foreground'>
            Agregar nuevo bovino
          </DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            Complete el formulario para registrar un nuevo bovino en el sistema.
            Todos los campos son obligatorios.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-6 py-4'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label
                htmlFor='numero_etiqueta'
                className='text-sm font-medium text-foreground'
              >
                Número de etiqueta
              </Label>
              <Input
                id='numero_etiqueta'
                name='numero_etiqueta'
                value={formData.numero_etiqueta}
                onChange={handleInputChange}
                placeholder='Ej: C-50'
                className={cn(
                  'w-full px-3 py-2 border rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50',
                  'placeholder:text-muted-foreground'
                )}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='fecha_nacimiento'
                className='text-sm font-medium text-foreground'
              >
                Fecha de nacimiento
              </Label>
              <Input
                id='fecha_nacimiento'
                name='fecha_nacimiento'
                type='date'
                value={formData.fecha_nacimiento}
                onChange={handleInputChange}
                className={cn(
                  'w-full px-3 py-2 border rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='raza'
                className='text-sm font-medium text-foreground'
              >
                Raza
              </Label>
              <Select
                value={formData.raza}
                onValueChange={handleRazaChange}
                required
              >
                <SelectTrigger
                  className={cn(
                    'w-full',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50'
                  )}
                >
                  <SelectValue placeholder='Selecciona una raza' />
                </SelectTrigger>
                <SelectContent>
                  {RAZAS_BOVINAS.map((raza) => (
                    <SelectItem
                      key={raza.value}
                      value={raza.value}
                      className='cursor-pointer hover:bg-secondary'
                    >
                      {raza.label}
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
                onClick={() => setOpen(false)}
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
                    Agregando...
                  </>
                ) : (
                  'Agregar bovino'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
