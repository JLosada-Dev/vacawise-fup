// src/pages/GenerarReportesPage/GenerarReportesPage.tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from './DataTable';
import RootLayout from '@/layouts/RootLayout';
import { MaxWidthWrapper } from '@/components';

const reportColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'fecha',
    header: 'Fecha',
    cell: ({ row }) => new Date(row.getValue('fecha')).toLocaleDateString(),
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
        <div className='space-y-6 my-6 bg-white p-4 rounded-md'>
          <Card>
            <CardHeader>
              <CardTitle>Generar Reporte de Bovino</CardTitle>
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
                <Button type='submit' disabled={loading || !tagNumber}>
                  {loading ? 'Generando...' : 'Generar Reporte'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {report && (
            <div className='space-y-4'>
              <Card>
                <CardContent className='pt-6'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Número de Etiqueta
                      </p>
                      <p className='text-lg font-semibold'>
                        {report.numero_etiqueta}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Raza
                      </p>
                      <p className='text-lg font-semibold'>{report.raza}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <DataTable
                endpoint=''
                columns={reportColumns}
                filter='tipo_registro'
                data={report.registros}
                onDelete={() => {}}
                getId={(row) => row.fecha}
              />
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </RootLayout>
  );
}

// src/pages/GenerarReportesPage/columns.ts
import { ColumnDef } from '@tanstack/react-table';
import {
  fetchCowReport,
  ReportResponse,
} from '@/API/services/generateReportService';
