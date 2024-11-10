import { UsersInfo, Production } from '@/types';
import { fetchData } from '../api';
import { toast } from '@/hooks/use-toast';

export async function getUsers(): Promise<UsersInfo[]> {
  const usersData = await fetchData(import.meta.env.VITE_URL_USUARIOS);
  return usersData.map((user: any) => ({
    id_usuario: user.id_usuario,
    nombre: user.nombre,
    rol: user.rol,
    email: user.email,
    estado: user.estado,
  }));
}

export async function toggleUserStatus(
  userId: string,
  currentStatus: boolean
): Promise<void> {
  const url = `${import.meta.env.VITE_URL_ESTADO_USUARIO}/${userId}`;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado: !currentStatus }), // Cambia el estado
  };

  try {
    await fetchData(url, options);
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

export async function getTotalUsers(): Promise<number> {
  const totalUsersData = await fetchData(
    import.meta.env.VITE_URL_TOTAL_USUARIOS
  );
  return totalUsersData.count;
}

export async function getTotalCows(): Promise<number> {
  const totalCowsData = await fetchData(import.meta.env.VITE_URL_TOTAL_VACAS);
  return totalCowsData.count; // Accede a `count` directamente
}

export async function getProduction(): Promise<Production> {
  const productionData = await fetchData(import.meta.env.VITE_URL_PRODUCCION);
  return {
    daily: productionData.ProduccionDiaria,
    monthly: productionData.ProduccionMensual,
    yearly: productionData.ProduccionAnual,
  };
}
