import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit2,
  MoreHorizontal,
  Settings2,
  Trash2,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import AddReportModal from './AddReportModal';
import { UpdateReportModal } from './UpdateReportModal';

// Types
type DataTableProps<T> = {
  endpoint: string;
  columns: ColumnDef<T>[];
  filter: string;
  updateItem?: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => void;
  getId: (row: T) => string;
  refreshData?: () => void;
  createItem?: (data: any) => Promise<void>;
};

export function DataTable<T>({
  endpoint,
  columns,
  filter,
  updateItem,
  onDelete,
  getId,
  createItem,
}: DataTableProps<T>) {
  // State management
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch data function
  const fetchData = async () => {
    if (!endpoint) return;

    setLoading(true);
    setFetchError(null);

    try {
      const response = await fetch(endpoint);

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Validate content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('La respuesta del servidor no es JSON válido');
      }

      // Parse response
      const result = await response.json();
      const responseData = result.data || result || [];

      // Update state
      setData(responseData as T[]);
      setIsEmpty(responseData.length === 0);
      setFetchError(null);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setFetchError(
        error instanceof Error ? error.message : 'Error desconocido'
      );
      setIsEmpty(true);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when endpoint changes
  useEffect(() => {
    if (endpoint) {
      fetchData();
    }
  }, [endpoint]);

  // Table configuration
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Event handlers
  const handleDeleteRow = async (id: string) => {
    try {
      await onDelete(id);
      await fetchData();
    } catch (error) {
      console.error('Error al eliminar fila:', error);
      setFetchError('Error al eliminar el registro');
    }
  };

  const handleUpdateClick = (row: T) => {
    setSelectedRow(row);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSuccess = async () => {
    setIsUpdateModalOpen(false);
    await fetchData();
  };

  const handleCreateSuccess = async () => {
    await fetchData();
  };

  return (
    <div className='w-full bg-white rounded-xl p-4 my-6'>
      {/* Table Controls */}
      <div className='flex items-center justify-between py-4'>
        <div className='flex gap-2'>
          <Input
            placeholder={`Filtrar por ${filter}`}
            value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(filter)?.setFilterValue(event.target.value)
            }
            className='bg-white max-w-md'
          />

          {/* Column Visibility Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                <Settings2 className='mr-2 h-4 w-4' />
                Columnas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Visibilidad de columnas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Add New Item Button */}
        {createItem && (
          <AddReportModal
            onSuccess={handleCreateSuccess}
            createReport={createItem}
          />
        )}
      </div>

      {/* Main Table */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                        onClick={
                          header.column.getCanSort()
                            ? () => header.column.toggleSorting()
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <ArrowUpDown className='ml-2 h-4 w-4 inline' />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
                <TableHead>Acciones</TableHead>
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='h-24 text-center'
                >
                  <div className='flex justify-center items-center'>
                    <l-helix size='35' speed='2.5' />
                  </div>
                </TableCell>
              </TableRow>
            ) : fetchError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='h-24 text-center text-red-500'
                >
                  Error: {fetchError}
                </TableCell>
              </TableRow>
            ) : isEmpty ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className='h-24 text-center'
                >
                  No se encontraron datos.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                  {/* Row Actions */}
                  <TableCell className='text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleUpdateClick(row.original)}
                        >
                          <Edit2 className='mr-2 h-4 w-4' /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteRow(getId(row.original))}
                          className='text-red-600'
                        >
                          <Trash2 className='mr-2 h-4 w-4' /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-sm text-muted-foreground'>
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()}
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Update Modal */}
      {updateItem && selectedRow && (
        <UpdateReportModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onSuccess={handleUpdateSuccess}
          updateReport={updateItem}
          reportData={selectedRow as any}
        />
      )}
    </div>
  );
}
