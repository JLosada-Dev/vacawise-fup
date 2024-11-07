import { Router } from 'express';
import {
  createBovine,
  deleteBovine,
  getBovine,
  getBovineForSelect,
  getCountBovinos,
  restoreBovine,
  updateBovine,
  updateBovineStatus,
} from '../handlers/bovine';
import { handlersInputErrors } from '../middleware';
import {
  bovinoValidators,
  idValidator,
  milkQuantityValidator,
} from '../utils/validator';

const bovineRouter = Router();

// POST Method
bovineRouter.post(
  '/registrar',
  bovinoValidators,
  milkQuantityValidator,
  handlersInputErrors,
  createBovine
);
// GET Method
bovineRouter.get('/consultar', handlersInputErrors, getBovine);
bovineRouter.get('/contar', handlersInputErrors, getCountBovinos);
// PUT Method
bovineRouter.put(
  '/actualizar/:id',
  idValidator,
  bovinoValidators,
  handlersInputErrors,
  updateBovine
);
bovineRouter.get('/consultarParaSeleccion', getBovineForSelect);
// PATCH Method
bovineRouter.patch(
  '/actualizarEstado/:id',
  idValidator,
  handlersInputErrors,
  updateBovineStatus
);
bovineRouter.patch(
  '/restaurar/:id',
  idValidator,
  handlersInputErrors,
  restoreBovine
);
// DELETE Method
bovineRouter.delete(
  '/eliminar/:id',
  idValidator,
  handlersInputErrors,
  deleteBovine
);

export default bovineRouter;
