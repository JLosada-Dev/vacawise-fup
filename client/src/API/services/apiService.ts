import { fetchData } from '../api';

export interface Users {
  id_usuario: string;
  nombre: string;
  rol: string;
  email: string;
  estado: boolean;
}

export interface Production {
  daily: number;
  monthly: number;
  yearly: number;
}

export async function getUsers(): Promise<Users[]> {
  const usersData = await fetchData(import.meta.env.VITE_URL_USUARIOS);
  console.log(usersData);
  return usersData.map((user: any) => ({
    id_usuario: user.id_usuario,
    nombre: user.nombre,
    rol: user.rol,
    email: user.email,
    estado: user.estado,
  }));
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
