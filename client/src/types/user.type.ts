// user.type.ts
import { Roles } from './roles';

export interface UserInfo {
  id: number;
  nombre: string;
  email: string;
  rol: Roles; // Esto permite que el rol sea uno de los valores de Roles
}
