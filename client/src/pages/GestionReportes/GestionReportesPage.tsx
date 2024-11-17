import { MaxWidthWrapper } from '@/components';
import RootLayout from '@/layouts/RootLayout';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { useState } from 'react';
import { createReport, deleteReport, updateReport } from '@/API/services';

const URL_REPORTES = import.meta.env.VITE_URL_REPORTES;

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id_registro',
    header: 'ID Registro',
  },
  {
    accessorKey: 'id_usuario',
    header: 'ID Usuario',
  },
  {
    accessorKey: 'id_bovino',
    header: 'ID Bovino',
  },
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
];

export default function GestionReportesPage() {
  const [endpoint, setEndpoint] = useState(URL_REPORTES);

  const refreshData = () => {
    setEndpoint('');
    setTimeout(() => setEndpoint(URL_REPORTES), 0);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReport(id);
      refreshData();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <RootLayout>
      <MaxWidthWrapper>
        <DataTable
          endpoint={endpoint}
          columns={columns}
          filter='tipo_registro'
          getId={(row) => row.id_registro}
          onDelete={handleDelete}
          refreshData={refreshData}
          createItem={createReport}
          updateItem={updateReport}
        />
      </MaxWidthWrapper>
    </RootLayout>
  );
}
