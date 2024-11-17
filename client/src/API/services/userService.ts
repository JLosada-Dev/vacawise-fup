import { UsersInfo } from '@/types';
import { toast } from '@/hooks/use-toast';

// Obtener todos los usuarios
export async function getUsers(): Promise<UsersInfo[]> {
  const url = `${import.meta.env.VITE_URL_USUARIOS}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }

    const usersData = await response.json();
    return usersData.map((user: any) => ({
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      rol: user.rol,
      email: user.email,
      estado: user.estado,
    }));
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw new Error('No se pudieron obtener los usuarios');
  }
}

// Alternar el estado de un usuario
export async function toggleUserStatus(
  userId: string,
  currentStatus: boolean
): Promise<void> {
  const url = `${import.meta.env.VITE_URL_ESTADO_USUARIO}/${userId}`;
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: !currentStatus }), // Cambia el estado
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }
  } catch (error) {
    toast({
      title: 'Error al actualizar el estado del usuario',
      description: 'No se pudo actualizar el estado, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al actualizar el estado del usuario:', error);
    throw error;
  }
}

// Obtener el total de usuarios
export async function getTotalUsers(): Promise<number> {
  const url = `${import.meta.env.VITE_URL_TOTAL_USUARIOS}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Estado: ${response.status}. ${errorText}`);
    }

    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error al obtener el total de usuarios:', error);
    throw new Error('No se pudo obtener el total de usuarios');
  }
}

// Crear un nuevo usuario
export async function createUser(data: any): Promise<void> {
  const url = `${import.meta.env.VITE_URL_CREATE_USUARIO}`;
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
      title: 'Usuario creado',
      description: 'El usuario fue creado con éxito.',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error al crear el usuario',
      description: 'No se pudo crear el usuario, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al crear el usuario:', error);
    throw new Error('No se pudo crear el usuario');
  }
}

// Actualizar un usuario existente
export async function updateUser(userId: string, data: any): Promise<void> {
  const url = `${import.meta.env.VITE_URL_UPDATE_USUARIO}/${userId}`;
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
      title: 'Usuario actualizado',
      description: 'El usuario fue actualizado con éxito.',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error al actualizar el usuario',
      description: 'No se pudo actualizar el usuario, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al actualizar el usuario:', error);
    throw new Error('No se pudo actualizar el usuario');
  }
}

// Eliminar un usuario
export async function deleteUser(userId: string): Promise<void> {
  const url = `${import.meta.env.VITE_URL_USER}/${userId}`;
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
      title: 'Usuario eliminado',
      description: 'El usuario fue eliminado con éxito.',
      variant: 'success',
    });
  } catch (error) {
    toast({
      title: 'Error al eliminar el usuario',
      description: 'No se pudo eliminar el usuario, intenta más tarde.',
      variant: 'destructive',
    });
    console.error('Error al eliminar el usuario:', error);
    throw new Error('No se pudo eliminar el usuario');
  }
}
