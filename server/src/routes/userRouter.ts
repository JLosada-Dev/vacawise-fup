import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getCountUsuarios,
  getDeletedUsers,
  getUserByCC,
  getUsers,
  loginUser,
  restoreUser,
  updateState,
  updateUser,
} from '../handlers/user';
import { usuarioValidators } from '../utils/validator';
import { handlersInputErrors } from '../middleware';

const userRouter = Router();

// POST Methods
// Iniciar sesión de un usuario
userRouter.post('/login', loginUser);
// Realizar el registro de un usuario
userRouter.post(
  '/registrar',
  usuarioValidators,
  handlersInputErrors,
  createUser
);

// GET Methods
// Consultar a todos los usuarios
userRouter.get('/consultar', handlersInputErrors, getUsers);
userRouter.get('/consultarUsuario/:cedula', getUserByCC);
userRouter.get(
  '/consultarUsuariosEliminados',
  handlersInputErrors,
  getDeletedUsers
);
userRouter.get('/contar', handlersInputErrors, getCountUsuarios);

// PATCH & PUT Methods
userRouter.put('/actualizarUsuario/:id', handlersInputErrors, updateUser);
userRouter.patch('/actualizarEstado/:id', handlersInputErrors, updateState);
userRouter.patch('/restaurarUsuario/:id', handlersInputErrors, restoreUser);

//DELETE Methods
userRouter.delete('/eliminarUsuario/:id', handlersInputErrors, deleteUser);

export default userRouter;
