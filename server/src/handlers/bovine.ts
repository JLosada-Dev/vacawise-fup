import { Request, Response } from 'express';
import Bovino from '../models/Bovine.model';
import {
  createEntity,
  getEntities,
  updateEntity,
  deleteEntity,
  restoreEntity,
} from '../utils/crudOperations';

// Crear un bovino
export const createBovine = (req: Request, res: Response) => {
  createEntity(Bovino, req, res);
};
// Consultar a todos los bovinos
export const getBovine = async (req: Request, res: Response) => {
  getEntities(Bovino, req, res);
};
// Actualizar Bovinos
export const updateBovine = async (req: Request, res: Response) => {
  updateEntity(Bovino, req, res);
};
export const updateBovineStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bovine = await Bovino.findByPk(id);
    if (!bovine) {
      return res.status(404).json({ error: 'Bovino no encontrado' });
    }
    bovine.estado = !bovine.dataValues.estado;
    await bovine.save();
    res.status(200).json({ data: bovine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restaurar Bovinos
export const restoreBovine = async (req: Request, res: Response) => {
  restoreEntity(Bovino, req, res);
};

// Eliminar Bovinos
export const deleteBovine = async (req: Request, res: Response) => {
  deleteEntity(Bovino, req, res);
};

// Obtener la cantidad de bovinos
export const getCountBovinos = async (req: Request, res: Response) => {
  try {
    const count = await Bovino.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
