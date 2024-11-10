import { Roles } from './roles';

export interface UserInfo {
  id: number;
  nombre: string;
  email: string;
  rol: Roles;
}

export interface UsersInfo {
  id_usuario: string;
  nombre: string;
  rol: string;
  email: string;
  estado: boolean;
}
