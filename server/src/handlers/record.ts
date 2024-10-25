import { Request, Response } from 'express';
import Registro from '../models/Record.model';
import { createEntity, getEntities } from '../utils/crudOperations';


// Crear un registro
export const createRecord = (req: Request, res: Response) => {
  createEntity(Registro, req, res);
};

// Consultar a todos los registros
export const getRecord = async (req: Request, res: Response) => {
  getEntities(Registro, req, res);
};
