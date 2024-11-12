import { MaxWidthWrapper } from '@/components';
import { DataTable } from '@/components/DataTable';
import RootLayout from '@/layouts/RootLayout';
import { ColumnDef } from '@tanstack/react-table';

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
  return (
    <RootLayout>
      <MaxWidthWrapper>
        <DataTable
          endpoint={URL_REPORTES}
          columns={columns}
          filter='tipo_registro'
        />
      </MaxWidthWrapper>
    </RootLayout>
  );
}
