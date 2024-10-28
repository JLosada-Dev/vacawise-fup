import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';
import { UserInfo, Roles } from '../types/';

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
  nombre: '',
  email: '',
  rol: '' as Roles,
};

// Cargar el estado inicial desde localStorage si existe
const getInitialUserState = (): UserInfo => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : EmptyUserState;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (
  state: UserInfo,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'CREATE_USER':
      return { ...state, ...action.payload };
    case 'UPDATE_USER':
      return { ...state, ...action.payload };
    case 'RESET_USER':
      return EmptyUserState;
    default:
      return state;
  }
};

// Proveedor del contexto de usuario
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, getInitialUserState());

  // Crear un usuario y guardar en localStorage
  const createUser = (user: UserInfo) => {
    dispatch({ type: 'CREATE_USER', payload: user });
    localStorage.setItem('user', JSON.stringify(user)); // Persistir en localStorage
  };

  // Actualizar el estado de usuario
  const updateUser = (user: Partial<UserInfo>) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
    const updatedUser = { ...state, ...user };
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Actualizar localStorage
  };

  // Resetear el estado de usuario
  const resetUser = () => {
    dispatch({ type: 'RESET_USER' });
    localStorage.removeItem('user'); // Eliminar del localStorage
  };

  useEffect(() => {
    // Al cargar el contexto, verifica si hay un usuario almacenado en localStorage y sincroniza el estado
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'CREATE_USER', payload: JSON.parse(storedUser) });
    }
  }, []);

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
    throw new Error('useUserContext debe utilizarse dentro de un UserProvider');
  }
  return context;
};
