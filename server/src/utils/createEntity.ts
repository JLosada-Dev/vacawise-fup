import { Request, Response } from 'express';

export const createEntity = async (Model: any, req: Request, res: Response) => {
  try {
    const entity = await Model.create(req.body);
    res.status(201).json({ data: entity });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todas las entidades
export const getEntities = async (Model: any, req: Request, res: Response) => {
  try {
    const entities = await Model.findAll();
    res.status(200).json({ data: entities });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
