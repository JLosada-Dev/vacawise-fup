import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DataTable } from './DataTable';
import RootLayout from '@/layouts/RootLayout';
import { MaxWidthWrapper } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import {
  fetchCowReport,
  ReportResponse,
} from '@/API/services/generateReportService';

const reportColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'fecha',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = new Date(row.getValue('fecha'));
      return (
        <div>
          {date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'tipo_registro',
    header: 'Tipo de Registro',
  },
  {
    accessorKey: 'detalles',
    header: 'Detalles',
  },
  {
    accessorKey: 'cantidad_leche',
    header: 'Cantidad de Leche (L)',
  },
  {
    accessorKey: 'usuario',
    header: 'Usuario',
  },
  {
    accessorKey: 'rol',
    header: 'Rol',
  },
];

export default function GenerarReportesPage() {
  const [tagNumber, setTagNumber] = useState('');
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagNumber.trim()) return;

    setLoading(true);
    try {
      const data = await fetchCowReport(tagNumber);
      setReport(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RootLayout>
      <MaxWidthWrapper>
        <div className='space-y-6 bg-white p-4 rounded-xl my-6'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                Reportes Bovinos
              </h1>
              <p className='text-muted-foreground mt-2'>
                Genera y visualiza reportes detallados de los bovinos
                registrados.
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Buscar Bovino</CardTitle>
              <CardDescription>
                Ingresa el número de etiqueta del bovino para generar su
                reporte.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='flex gap-4 items-end'>
                <div className='flex-1'>
                  <label className='text-sm font-medium mb-2 block'>
                    Número de Etiqueta
                  </label>
                  <Input
                    type='text'
                    value={tagNumber}
                    onChange={(e) => setTagNumber(e.target.value)}
                    placeholder='Ej: BOV001'
                    className='max-w-md'
                  />
                </div>
                <Button
                  type='submit'
                  disabled={loading || !tagNumber}
                  className='min-w-[150px]'
                >
                  {loading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Generando...
                    </>
                  ) : (
                    'Generar Reporte'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {report && (
            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Información del Bovino</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Número de Etiqueta
                      </p>
                      <p className='text-lg font-semibold mt-1'>
                        {report.numero_etiqueta}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Raza
                      </p>
                      <p className='text-lg font-semibold mt-1'>
                        {report.raza}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Historial de Registros</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={reportColumns}
                    data={report.registros}
                    filter='tipo_registro'
                    endpoint=''
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </RootLayout>
  );
}
