import { Production } from '@/types';
import { toast } from '@/hooks/use-toast';

export async function createCow(data: any): Promise<void> {
  const url = `${import.meta.env.VITE_URL_CREATE_BOVINO}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }
  } catch (error) {
    console.error('Error al agregar el bovino:', error);
    throw new Error('No se pudo agregar el bovino');
  }
}

export async function getTotalCows(): Promise<number> {
  const url = `${import.meta.env.VITE_URL_TOTAL_VACAS}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }

    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error al obtener el total de vacas:', error);
    throw new Error('No se pudo obtener el total de vacas');
  }
}

export async function toggleCowStatus(
  cowId: string,
  currentStatus: boolean
): Promise<void> {
  const url = `${import.meta.env.VITE_URL_ESTADO_BOVINO}/${cowId}`;
  const newStatus = !currentStatus;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado: newStatus }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }
  } catch (error) {
    toast({
      title: 'Error al actualizar el estado del usuario:',
      description: 'No se pudo actualizar el estado, intentalo más tarde.',
      variant: 'destructive',
    });
    console.error('Error al actualizar el estado del usuario:', error);
    throw error;
  }
}

export async function getProduction(): Promise<Production> {
  const url = `${import.meta.env.VITE_URL_PRODUCCION}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }

    const data = await response.json();
    return {
      daily: data.ProduccionDiaria,
      monthly: data.ProduccionMensual,
      yearly: data.ProduccionAnual,
    };
  } catch (error) {
    console.error('Error al obtener los datos de producción:', error);
    throw new Error('No se pudieron obtener los datos de producción');
  }
}

export async function deleteCow(cowId: string): Promise<void> {
  const url = `${import.meta.env.VITE_URL_COW}/${cowId}`;
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
      title: 'Vaca eliminada',
      description: 'La vaca fue eliminada con éxito.',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error al eliminar la vaca',
      description: 'No se pudo eliminar la vaca, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al eliminar la vaca:', error);
    throw new Error('No se pudo eliminar la vaca');
  }
}

export async function updateCow(cowId: string, data: any): Promise<void> {
  const url = `${import.meta.env.VITE_URL_UPDATE_BOVINO}/${cowId}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }

    toast({
      title: 'Bovino actualizado',
      description: 'El bovino fue actualizado con éxito.',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error al actualizar el bovino',
      description: 'No se pudo actualizar el bovino, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al actualizar el bovino:', error);
    throw new Error('No se pudo actualizar el bovino');
  }
}
