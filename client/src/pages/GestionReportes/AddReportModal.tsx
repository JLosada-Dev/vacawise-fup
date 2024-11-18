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

const TIPOS_REGISTRO = [
  { value: 'Produccion', label: 'Producción' },
  { value: 'Salud', label: 'Salud' },
  { value: 'Reproduccion', label: 'Reproducción' },
];

interface AddReportModalProps {
  onSuccess: () => void;
  createReport: (data: any) => Promise<void>;
}

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

  const { user } = useUserContext();

  if (!user || user.id === 0) {
    toast({
      title: 'Error',
      description: 'No se ha encontrado un usuario válido.',
      variant: 'destructive',
    });
    return null;
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
        <Button className='gap-2'>
          <Plus className='h-5 w-5' />
          Agregar reporte
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[450px]'>
        <DialogHeader>
          <DialogTitle>Agregar nuevo reporte</DialogTitle>
          <DialogDescription>
            Complete el formulario para registrar un nuevo reporte. Todos los
            campos son obligatorios.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid gap-4'>
            {/* ID Bovino */}
            <div>
              <Label htmlFor='id_bovino'>ID Bovino</Label>
              <Input
                id='id_bovino'
                name='id_bovino'
                value={formData.id_bovino}
                onChange={handleInputChange}
                placeholder='Ej: 1'
                required
              />
            </div>
            {/* Tipo de Registro */}
            <div>
              <Label htmlFor='tipo_registro'>Tipo de Registro</Label>
              <Select
                value={formData.tipo_registro}
                onValueChange={handleTipoRegistroChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona un tipo de registro' />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS_REGISTRO.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Detalles */}
            <div>
              <Label htmlFor='detalles'>Detalles</Label>
              <Input
                id='detalles'
                name='detalles'
                value={formData.detalles}
                onChange={handleInputChange}
                placeholder='Agrega detalles del reporte'
                required
              />
            </div>
            {/* Cantidad de leche */}
            <div>
              <Label htmlFor='cantidad_leche'>Cantidad de leche (L)</Label>
              <Input
                id='cantidad_leche'
                name='cantidad_leche'
                type='number'
                value={formData.cantidad_leche}
                onChange={handleInputChange}
                placeholder='Ej: 20 L'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              disabled={loading || !isFormValid()}
              className={cn(
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary'
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
