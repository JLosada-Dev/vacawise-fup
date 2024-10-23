import { Router } from 'express';
import { handlersInputErrors } from '../middleware';
import { createUser, getUsers } from '../handlers/record';

const recordRouter = Router();

recordRouter.post('/', handlersInputErrors, createUser);

recordRouter.get('/', handlersInputErrors, getUsers);

export default recordRouter;
