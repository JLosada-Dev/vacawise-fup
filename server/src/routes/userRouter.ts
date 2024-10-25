import { Router } from 'express';
import { createUser, getUsers, loginUser } from '../handlers/user';
import {
  nombreValidator,
  emailValidator,
  rolValidator,
  claveValidator,
  cedulaValidator,
} from '../utils/validator';
import { handlersInputErrors } from '../middleware';

const userRouter = Router();

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

// Consultar a todos los usuarios
userRouter.get('/consultar', handlersInputErrors, getUsers);


userRouter.put('/');

userRouter.patch('/', (req, res) => {
  res.json('Desde PATCH /');
});

userRouter.delete('/', (req, res) => {
  res.json('Desde DELETE /');
});

export default userRouter;
