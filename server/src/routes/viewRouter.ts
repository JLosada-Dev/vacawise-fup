import { Router } from 'express';
import { getDetailedBovineReports } from '../handlers/views';
import { handlersInputErrors } from '../middleware';

const viewRouter = Router();

// GET Method
viewRouter.get(
  '/bovinosReportes/:numero_etiqueta([a-zA-Z0-9-]+)',
  handlersInputErrors,
  getDetailedBovineReports
);


export default viewRouter;