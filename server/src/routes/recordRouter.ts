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
import { idValidator, recordValidators } from '../utils/validator';

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
recordRouter.put(
  '/actualizar/:id',
  idValidator,
  handlersInputErrors,
  updateRecord
);
// PATCH Methods
recordRouter.patch(
  '/restaurar/:id',
  idValidator,
  handlersInputErrors,
  restoreRecord
);
// DELETE Methods
recordRouter.delete(
  '/eliminar/:id',
  idValidator,
  handlersInputErrors,
  deleteRecord
);

//Grafica
recordRouter.get(
  '/grafica',
  handlersInputErrors,
  getMilkProductionCurrentMonth
);

export default recordRouter;
