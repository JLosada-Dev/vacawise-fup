import { Router } from 'express';
import { createBovine, getBovine } from '../handlers/bovine';
import { handlersInputErrors } from '../middleware';
import { bovinoValidators } from '../utils/validator';

const bovineRouter = Router();

bovineRouter.post(
  '/registrar',
  bovinoValidators,
  handlersInputErrors,
  createBovine
);

bovineRouter.get('/consultar', handlersInputErrors, getBovine);

export default bovineRouter;
