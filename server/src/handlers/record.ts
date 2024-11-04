import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Registro from '../models/Record.model';
import {
  createEntity,
  deleteEntity,
  getEntities,
  restoreEntity,
  updateEntity,
} from '../utils/crudOperations';

// Crear un registro
export const createRecord = (req: Request, res: Response) => {
  createEntity(Registro, req, res);
};

// Consultar a todos los registros
export const getRecord = async (req: Request, res: Response) => {
  getEntities(Registro, req, res);
};

// Actualizar un registro
export const updateRecord = async (req: Request, res: Response) => {
  updateEntity(Registro, req, res);
};

export const restoreRecord = async (req: Request, res: Response) => {
  restoreEntity(Registro, req, res);
};

// Eliminar un registro
export const deleteRecord = async (req: Request, res: Response) => {
  deleteEntity(Registro, req, res);
};

// Obtener la producción de leche por día, mes y año
export const getMilkProduction = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    const currentDay = currentDate.getDate();

    const dailyProduction = await Registro.sum('cantidad_leche', {
      where: {
        fecha: {
          [Op.gte]: new Date(currentYear, currentMonth - 1, currentDay),
          [Op.lt]: new Date(currentYear, currentMonth - 1, currentDay + 1),
        },
        tipo_registro: 'Produccion',
      },
    });

    const monthlyProduction = await Registro.sum('cantidad_leche', {
      where: {
        fecha: {
          [Op.gte]: new Date(currentYear, currentMonth - 1, 1),
          [Op.lt]: new Date(currentYear, currentMonth, 1),
        },
        tipo_registro: 'Produccion',
      },
    });

    const yearlyProduction = await Registro.sum('cantidad_leche', {
      where: {
        fecha: {
          [Op.gte]: new Date(currentYear, 0, 1),
          [Op.lt]: new Date(currentYear + 1, 0, 1),
        },
        tipo_registro: 'Produccion',
      },
    });

    res.json({
      ProduccionDiaria: dailyProduction || 0,
      ProduccionMensual: monthlyProduction || 0,
      ProduccionAnual: yearlyProduction || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
