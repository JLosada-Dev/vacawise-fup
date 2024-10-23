import { Router } from 'express';
import { createUser, getUsers } from '../handlers/bovine';
import { handlersInputErrors } from '../middleware';

const bovineRouter = Router();

bovineRouter.post('/', handlersInputErrors, createUser);

bovineRouter.get('/', handlersInputErrors, getUsers);

export default bovineRouter;
