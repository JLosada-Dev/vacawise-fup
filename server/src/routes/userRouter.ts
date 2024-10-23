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

userRouter.post('/login', loginUser);

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

userRouter.get('/', handlersInputErrors, getUsers);


userRouter.put('/');

userRouter.patch('/', (req, res) => {
  res.json('Desde PATCH /');
});

userRouter.delete('/', (req, res) => {
  res.json('Desde DELETE /');
});

export default userRouter;
