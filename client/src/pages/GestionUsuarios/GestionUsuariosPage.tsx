import { deleteUser } from '@/API/services';
import { MaxWidthWrapper } from '@/components';
import { DataTable } from '@/components/DataTable';
import RootLayout from '@/layouts/RootLayout';
import { ColumnDef } from '@tanstack/react-table';

const URL_USUARIOS = import.meta.env.VITE_URL_USUARIOS;

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id_usuario',
    header: 'ID Usuario',
  },
  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'rol',
    header: 'Rol',
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
    await deleteUser(id);
    // Actualizar el estado de la tabla, eliminar fila, etc.
  } catch (error) {
    console.error('Error al eliminar:', error);
  }
};

export default function GestionReportesPage() {
  return (
    <RootLayout>
      <MaxWidthWrapper>
        <DataTable
          endpoint={URL_USUARIOS}
          columns={columns}
          filter='nombre'
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </MaxWidthWrapper>
    </RootLayout>
  );
}
