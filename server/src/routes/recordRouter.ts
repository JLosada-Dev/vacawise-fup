import { Router } from 'express';
import { handlersInputErrors } from '../middleware';
import { createRecord, getRecord } from '../handlers/record';
import { recordValidators } from '../utils/validator';

const recordRouter = Router();

recordRouter.post(
  '/registrar',
  recordValidators,
  handlersInputErrors,
  createRecord
);

recordRouter.get('/consultar', handlersInputErrors, getRecord);

export default recordRouter;
