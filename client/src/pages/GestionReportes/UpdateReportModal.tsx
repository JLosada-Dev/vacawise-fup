import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
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

interface UpdateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  updateReport: (id: string, data: any) => Promise<void>;
  reportData: {
    id_registro: string; // Requiere id_registro para la actualización
    id_bovino: string;
    tipo_registro: string;
    detalles: string;
    fecha: string;
    cantidad_leche: string;
  } | null;
}

const TIPOS_REGISTRO = [
  { value: 'Produccion', label: 'Producción' },
  { value: 'Salud', label: 'Salud' },
  { value: 'Reproduccion', label: 'Reproducción' },
];

export function UpdateReportModal({
  isOpen,
  onClose,
  onSuccess,
  updateReport,
  reportData,
}: UpdateReportModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_bovino: '',
    tipo_registro: '',
    detalles: '',
    fecha: '',
    cantidad_leche: '',
  });

  useEffect(() => {
    if (reportData) {
      setFormData({
        id_bovino: reportData.id_bovino,
        tipo_registro: reportData.tipo_registro,
        detalles: reportData.detalles,
        fecha: new Date(reportData.fecha).toISOString().split('T')[0],
        cantidad_leche: reportData.cantidad_leche,
      });
    }
  }, [reportData]);

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
      formData.fecha &&
      formData.cantidad_leche
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportData?.id_registro) return;

    setLoading(true);

    try {
      await updateReport(reportData.id_registro, formData); // Usa id_registro para actualizar
      onClose();
      onSuccess();
    } catch (error) {
      console.error('Error updating report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-foreground'>
            Actualizar reporte
          </DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            Modifique los campos que desea actualizar del reporte.
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
                className={cn(
                  'w-full px-3 py-2 border rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='fecha'
                className='text-sm font-medium text-foreground'
              >
                Fecha
              </Label>
              <Input
                id='fecha'
                name='fecha'
                type='date'
                value={formData.fecha}
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
                placeholder='Ej: Cantidad Ordeño Mañana'
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
                placeholder='Ej: 200'
                className={cn(
                  'w-full px-3 py-2 border rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
                required
              />
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
                  'Actualizar reporte'
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
