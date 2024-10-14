// tsconfig.json - "target": "ESNext", moduleResolution: "NodeNext", "module": "NodeNext"
import { Request, Response } from 'express';
import Usuario from '../models/User.model';
import { createEntity } from '../utils/createEntity';

export const createUser = (req: Request, res: Response) => {
  createEntity(Usuario, req, res);
};
