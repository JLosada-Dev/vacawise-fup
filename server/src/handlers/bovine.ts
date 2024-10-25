import { Request, Response } from 'express';
import Bovino from '../models/Bovine.model';
import { createEntity, getEntities } from '../utils/crudOperations';


// Crear un bovino
export const createBovine = (req: Request, res: Response) => {
  createEntity(Bovino, req, res);
};


// Consultar a todos los bovinos
export const getBovine = async (req: Request, res: Response) => {
  getEntities(Bovino, req, res);
};
