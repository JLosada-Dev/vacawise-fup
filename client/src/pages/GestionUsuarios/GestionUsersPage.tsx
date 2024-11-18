import { createUser, deleteUser, updateUser } from '@/API/services';
import { MaxWidthWrapper } from '@/components';
import RootLayout from '@/layouts/RootLayout';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from './DataTable';

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
    accessorKey: 'cedula',
    header: 'Cedula',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'rol',
    header: 'Rol',
  },
];

export default function GestionUsersPage() {
  const [endpoint, setEndpoint] = useState(URL_USUARIOS);

  const refreshData = () => {
    setEndpoint('');
    setTimeout(() => setEndpoint(URL_USUARIOS), 0);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
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
          filter='nombre'
          onDelete={handleDelete}
          getId={(row) => row.id_usuario}
          refreshData={refreshData}
          createItem={createUser}
          updateItem={updateUser}
        />
      </MaxWidthWrapper>
    </RootLayout>
  );
}
