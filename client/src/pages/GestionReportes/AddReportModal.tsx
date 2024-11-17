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
import { useUserContext } from '@/contexts/UserContext';

interface AddReportModalProps {
  onSuccess: () => void;
  createReport: (data: any) => Promise<void>;
}

const TIPOS_REGISTRO = [
  { value: 'Produccion', label: 'Producción' },
  { value: 'Salud', label: 'Salud' },
  { value: 'Reproduccion', label: 'Reproducción' },
];

export default function AddReportModal({
  onSuccess,
  createReport,
}: AddReportModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_bovino: '',
    tipo_registro: '',
    detalles: '',
    cantidad_leche: '',
  });

  // Accedemos al contexto de usuario
  const { user } = useUserContext();

  // Si el usuario no está autenticado, podemos manejarlo aquí si es necesario
  if (!user || user.id === 0) {
    toast({
      title: 'Error',
      description: 'No se ha encontrado un usuario válido.',
      variant: 'destructive',
    });
    return null; // O alguna otra lógica para manejar el caso de usuario no autenticado
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTipoRegistroChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tipo_registro: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.id_bovino &&
      formData.tipo_registro &&
      formData.detalles &&
      formData.cantidad_leche
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Incluimos el id_usuario del contexto en el formData
    const reportData = { ...formData, id_usuario: user.id };

    try {
      await createReport(reportData);
      toast({
        title: 'Reporte agregado',
        description: 'El reporte fue agregado exitosamente',
        variant: 'success',
      });
      setOpen(false);
      onSuccess();
      // Limpiar el formulario
      setFormData({
        id_bovino: '',
        tipo_registro: '',
        detalles: '',
        cantidad_leche: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo agregar el reporte',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2 hover:bg-primary/90 transition-colores'>
          <Plus className='h-5 w-5' />
          Agregar reporte
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-foreground'>
            Agregar nuevo reporte
          </DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            Complete el formulario para registrar un nuevo reporte. Todos los
            campos son obligatorios.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-6 py-4'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label
                htmlFor='id_bovino'
                className='text-sm font-medium text-foreground'
              >
                ID Bovino
              </Label>
              <Input
                id='id_bovino'
                name='id_bovino'
                value={formData.id_bovino}
                onChange={handleInputChange}
                placeholder='Ej: 1'
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
                htmlFor='tipo_registro'
                className='text-sm font-medium text-foreground'
              >
                Tipo de Registro
              </Label>
              <Select
                value={formData.tipo_registro}
                onValueChange={handleTipoRegistroChange}
                required
              >
                <SelectTrigger
                  className={cn(
                    'w-full',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50'
                  )}
                >
                  <SelectValue placeholder='Selecciona un tipo de registro' />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_REGISTRO.map((tipo) => (
                    <SelectItem
                      key={tipo.value}
                      value={tipo.value}
                      className='cursor-pointer hover:bg-secondary'
                    >
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='detalles'
                className='text-sm font-medium text-foreground'
              >
                Detalles
              </Label>
              <Input
                id='detalles'
                name='detalles'
                value={formData.detalles}
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
                htmlFor='cantidad_leche'
                className='text-sm font-medium text-foreground'
              >
                Cantidad de leche (L)
              </Label>
              <Input
                id='cantidad_leche'
                name='cantidad_leche'
                type='number'
                value={formData.cantidad_leche}
                onChange={handleInputChange}
                placeholder='Ej: 20 L'
                className={cn(
                  'w-full px-3 py-2 border rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
              />
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
                  'Agregar reporte'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
