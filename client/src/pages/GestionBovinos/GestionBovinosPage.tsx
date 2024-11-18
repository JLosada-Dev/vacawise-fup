import { createCow, deleteCow, updateCow } from '@/API/services';
import { MaxWidthWrapper } from '@/components';
import RootLayout from '@/layouts/RootLayout';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from './DataTable';

const URL_BOVINOS = import.meta.env.VITE_URL_BOVINOS;

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id_bovino',
    header: 'ID Bovino',
  },
  {
    accessorKey: 'numero_etiqueta',
    header: 'Numero etiqueta',
  },
  {
    accessorKey: 'fecha_nacimiento',
    header: 'Fecha nacimiento',
    cell: ({ row }) => {
      const date = new Date(row.getValue('fecha_nacimiento'));
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
    accessorKey: 'raza',
    header: 'Raza',
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
  },
];

export default function GestionBovinoPage() {
  const [endpoint, setEndpoint] = useState(URL_BOVINOS);

  const refreshData = () => {
    setEndpoint('');
    setTimeout(() => setEndpoint(URL_BOVINOS), 0);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCow(id);
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
          filter='raza'
          onDelete={handleDelete}
          getId={(row) => row.id_bovino}
          refreshData={refreshData}
          createItem={createCow}
          updateItem={updateCow}
        />
      </MaxWidthWrapper>
    </RootLayout>
  );
}
