import { deleteCow } from '@/API/services';
import { MaxWidthWrapper } from '@/components';
import { DataTable } from '@/components/DataTable';
import RootLayout from '@/layouts/RootLayout';
import { ColumnDef } from '@tanstack/react-table';

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
    cell: ({ row }) =>
      new Date(row.getValue('fecha_nacimiento')).toLocaleDateString(),
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

const handleUpdate = async (id: string) => {
  // Redirigir a un formulario de edición o mostrar un modal
  console.log('Editar usuario:', id);
};

const handleDelete = async (id: string) => {
  try {
    await deleteCow(id);
    // Actualizar el estado de la tabla, eliminar fila, etc.
  } catch (error) {
    console.error('Error al eliminar:', error);
  }
};

export default function GestionBovinoPage() {
  return (
    <RootLayout>
      <MaxWidthWrapper>
        <DataTable
          endpoint={URL_BOVINOS}
          columns={columns}
          filter='raza'
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          getId={(row) => row.id_bovino} 
        />
      </MaxWidthWrapper>
    </RootLayout>
  );
}
