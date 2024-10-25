import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { UserInfo, Roles } from "../types/"; // Importar el type UserInfo

// Define la interfaz del contexto con el rol incluido
interface UserContextProps {
  user: UserInfo;
  createUser: (user: UserInfo) => void;
  updateUser: (user: Partial<UserInfo>) => void;
  resetUser: () => void;
}

// Estado inicial del usuario con rol predeterminado
const EmptyUserState: UserInfo = {
  id: 0,
  name: "",
  email: "",
  rol: "ADMIN" as keyof Roles, // Rol por defecto 'USER'
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (
  state: UserInfo,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "CREATE_USER":
      return { ...state, ...action.payload };
    case "UPDATE_USER":
      return { ...state, ...action.payload };
    case "RESET_USER":
      return EmptyUserState;
    default:
      return state;
  }
};

// Proveedor del contexto de usuario
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, EmptyUserState);

  // Crear un usuario y guardar en localStorage
  const createUser = (user: UserInfo) => {
    dispatch({ type: "CREATE_USER", payload: user });
    localStorage.setItem("user", JSON.stringify(user)); // Persistir en localStorage si es necesario
  };

  // Actualizar el estado de usuario
  const updateUser = (user: Partial<UserInfo>) => {
    dispatch({ type: "UPDATE_USER", payload: user });
    const updatedUser = { ...state, ...user };
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Actualizar localStorage
  };

  // Resetear el estado de usuario
  const resetUser = () => {
    dispatch({ type: "RESET_USER" });
    localStorage.removeItem("user"); // Eliminar del localStorage
  };

  return (
    <UserContext.Provider
      value={{ user: state, createUser, updateUser, resetUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe utilizarse dentro de un UserProvider");
  }
  return context;
};
