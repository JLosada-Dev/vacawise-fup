import { Request, Response } from 'express';
import Bovino from '../models/Bovine.model';
import { createEntity, getEntities } from '../utils/crudOperations';

export const createUser = (req: Request, res: Response) => {
  createEntity(Bovino, req, res);
};

export const getUsers = async (req: Request, res: Response) => {
  getEntities(Bovino, req, res);
};