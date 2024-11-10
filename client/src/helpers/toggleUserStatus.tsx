export async function toggleUserStatus(
  userId: string,
  currentStatus: boolean
): Promise<void> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/usuario/actualizarEstado/${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: !currentStatus }), // Cambia el estado
      }
    );

    if (!response.ok) {
      throw new Error('Error al actualizar el estado');
    }
  } catch (error) {
    console.error(error);
  }
}
