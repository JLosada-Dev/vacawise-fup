// user.type.ts
import { Roles } from "./roles";

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  rol: keyof Roles; // Esto permite que el rol sea uno de los valores de Roles
}
