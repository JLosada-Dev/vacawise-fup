import { Request, Response } from 'express';

// Crear una entidad genérica
export const createEntity = async (Model: any, req: Request, res: Response) => {
  try {
    const entity = await Model.create(req.body);
    res.status(201).json({ data: entity });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todas las entidades de forma genérica
export const getEntities = async (Model: any, req: Request, res: Response) => {
  try {
    const entities = await Model.findAll();
    res.status(200).json({ data: entities });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener una entidad por ID de forma genérica
export const getEntityById = async (
  Model: any,
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const entity = await Model.findByPk(id);
    if (!entity) {
      return res.status(404).json({ error: 'Entidad No Encontrada' });
    }
    res.json({ data: entity });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar una entidad de forma genérica
export const updateEntity = async (Model: any, req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const entity = await Model.findByPk(id);
    if (!entity) {
      return res.status(404).json({ error: 'Entidad No Encontrada' });
    }
    await entity.update(req.body);
    res.json({ data: entity });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Eliminar una entidad de forma genérica
export const deleteEntity = async (Model: any, req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const entity = await Model.findByPk(id);
    if (!entity) {
      return res.status(404).json({ error: 'Entidad No Encontrada' });
    }
    await entity.destroy();
    res.json({ data: 'Entidad Eliminada' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
