import { UsersInfo } from '@/types';
import { fetchData } from '../API';
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

export async function addUser(newUser: any) {
  return await fetchData(import.meta.env.VITE_URL_USUARIOS, {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function updateUser(userId: string, userData: any): Promise<void> {
  const url = `${import.meta.env.VITE_URL_USUARIOS}/${userId}`;
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };
  try {
    await fetchData(url, options);
    toast({
      title: 'Usuario actualizado',
      description: 'El usuario fue actualizado con éxito.',
      variant: 'default',
    });
  } catch (error) {
    toast({
      title: 'Error al actualizar el usuario',
      description: 'No se pudo actualizar el usuario, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al actualizar el usuario:', error);
  }
}

export async function deleteUser(userId: string): Promise<void> {
  const url = `${import.meta.env.VITE_URL_USUARIOS}/${userId}`;
  const options = {
    method: 'DELETE',
  };
  try {
    await fetchData(url, options);
    toast({
      title: 'Usuario eliminado',
      description: 'El usuario fue eliminado con éxito.',
      variant: 'default',
    });
  } catch (error) {
    toast({
      title: 'Error al eliminar el usuario',
      description: 'No se pudo eliminar el usuario, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al eliminar el usuario:', error);
  }
}
