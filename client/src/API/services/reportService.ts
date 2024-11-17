import { toast } from '@/hooks/use-toast';

// Crear un nuevo reporte
export async function createReport(data: any): Promise<void> {
  const url = `${import.meta.env.VITE_URL_CREATE_REPORTE}`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }

    toast({
      title: 'Reporte creado',
      description: 'El reporte fue creado con éxito.',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error al crear el reporte',
      description: 'No se pudo crear el reporte, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al crear el reporte:', error);
    throw new Error('No se pudo crear el reporte');
  }
}

// Actualizar un reporte existente
export async function updateReport(reportId: string, data: any): Promise<void> {
    console.log('reportId', reportId);
  const url = `${import.meta.env.VITE_URL_UPDATE_REPORTE}/${reportId}`;
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }

    toast({
      title: 'Reporte actualizado',
      description: 'El reporte fue actualizado con éxito.',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error al actualizar el reporte',
      description: 'No se pudo actualizar el reporte, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al actualizar el reporte:', error);
    throw new Error('No se pudo actualizar el reporte');
  }
}

// Eliminar un reporte
export async function deleteReport(reportId: string): Promise<void> {
  const url = `${import.meta.env.VITE_URL_DELETE_REPORTE}/${reportId}`;
  const options = {
    method: 'DELETE',
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }

    toast({
      title: 'Reporte eliminado',
      description: 'El reporte fue eliminado con éxito.',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error al eliminar el reporte',
      description: 'No se pudo eliminar el reporte, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al eliminar el reporte:', error);
    throw new Error('No se pudo eliminar el reporte');
  }
}
