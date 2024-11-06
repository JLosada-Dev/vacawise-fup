import { Router } from 'express';
import { handlersInputErrors } from '../middleware';
import {
  createRecord,
  deleteRecord,
  getMilkProduction,
  getMilkProductionCurrentMonth,
  getRecord,
  restoreRecord,
  updateRecord,
} from '../handlers/record';
import { recordValidators } from '../utils/validator';

const recordRouter = Router();
// POST Methods
recordRouter.post(
  '/registrar',
  recordValidators,
  handlersInputErrors,
  createRecord
);
// GET Methods
recordRouter.get('/consultar', handlersInputErrors, getRecord);
recordRouter.get(
  '/consultarProduccion',
  handlersInputErrors,
  getMilkProduction
);
// PUT Methods
recordRouter.put('/actualizar/:id', handlersInputErrors, updateRecord);
// PATCH Methods
recordRouter.patch('/restaurar/:id', handlersInputErrors, restoreRecord);
// DELETE Methods
recordRouter.delete('/eliminar/:id', handlersInputErrors, deleteRecord);

//Grafica
recordRouter.get(
  '/grafica',
  handlersInputErrors,
  getMilkProductionCurrentMonth
);

export default recordRouter;
