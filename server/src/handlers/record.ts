import { Request, Response } from 'express';
import Registro from '../models/Record.model';
import { createEntity, getEntities } from '../utils/crudOperations';

export const createUser = (req: Request, res: Response) => {
  createEntity(Registro, req, res);
};

export const getUsers = async (req: Request, res: Response) => {
  getEntities(Registro, req, res);
};
