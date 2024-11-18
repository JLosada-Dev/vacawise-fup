import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
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
      await updateReport(reportData.id_registro, formData);
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
            Actualizar Reporte
          </DialogTitle>
          <DialogDescription className='text-muted-foreground'>
            Modifique los campos que desea actualizar del reporte.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-6 py-4'>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='id_bovino'>ID Bovino</Label>
              <Input
                id='id_bovino'
                name='id_bovino'
                value={formData.id_bovino}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor='fecha'>Fecha</Label>
              <Input
                id='fecha'
                name='fecha'
                type='date'
                value={formData.fecha}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor='tipo_registro'>Tipo de Registro</Label>
              <Select
                value={formData.tipo_registro}
                onValueChange={handleTipoRegistroChange}
                required
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

            <div>
              <Label htmlFor='detalles'>Detalles</Label>
              <Input
                id='detalles'
                name='detalles'
                value={formData.detalles}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor='cantidad_leche'>Cantidad de leche (L)</Label>
              <Input
                id='cantidad_leche'
                name='cantidad_leche'
                type='number'
                value={formData.cantidad_leche}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={!isFormValid() || loading}>
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Actualizando...
                </>
              ) : (
                'Actualizar'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
