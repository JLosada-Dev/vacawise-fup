import { Production } from '@/types';
import { fetchData } from '../API';
import { toast } from '@/hooks/use-toast';

export async function getTotalCows(): Promise<number> {
  const totalCowsData = await fetchData(import.meta.env.VITE_URL_TOTAL_VACAS);
  return totalCowsData.count;
}

export async function getProduction(): Promise<Production> {
  const productionData = await fetchData(import.meta.env.VITE_URL_PRODUCCION);
  return {
    daily: productionData.ProduccionDiaria,
    monthly: productionData.ProduccionMensual,
    yearly: productionData.ProduccionAnual,
  };
}

export async function deleteCow(cowId: string): Promise<void> {
  const url = `${import.meta.env.VITE_URL_COW}/${cowId}`;
  const options = {
    method: 'DELETE',
  };
  try {
    await fetchData(url, options);
    toast({
      title: 'Vaca eliminado',
      description: 'La vaca fue eliminado con éxito.',
      variant: 'default',
    });
  } catch (error) {
    toast({
      title: 'Error al eliminar la vaca',
      description: 'No se pudo eliminar la vaca, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al eliminar la vaca:', error);
  }
}
