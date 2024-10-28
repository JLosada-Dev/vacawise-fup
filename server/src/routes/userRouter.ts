import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getDeletedUsers,
  getUsers,
  loginUser,
  updateState,
  updateUser,
} from '../handlers/user';
import {
  nombreValidator,
  emailValidator,
  rolValidator,
  claveValidator,
  cedulaValidator,
} from '../utils/validator';
import { handlersInputErrors } from '../middleware';

const userRouter = Router();

// POST Methods
// Iniciar sesión de un usuario
userRouter.post('/login', loginUser);
// Realizar el registro de un usuario
userRouter.post(
  '/registrar',
  [
    nombreValidator,
    emailValidator,
    rolValidator,
    claveValidator,
    cedulaValidator,
  ],
  handlersInputErrors,
  createUser
);

// GET Methods
// Consultar a todos los usuarios
userRouter.get('/consultar', handlersInputErrors, getUsers);
userRouter.get('/consultarUsuariosEliminados', handlersInputErrors, getDeletedUsers);

// PATCH & PUT Methods
userRouter.put('/actualizarUsuario/:id', handlersInputErrors, updateUser);
userRouter.patch('/actualizarEstado/:id', handlersInputErrors, updateState);

//DELETE Methods
userRouter.delete('/eliminarUsuario/:id', handlersInputErrors, deleteUser);

export default userRouter;
