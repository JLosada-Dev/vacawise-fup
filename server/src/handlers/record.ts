import { Request, Response } from 'express';
import { Op, Sequelize } from 'sequelize';
import Registro from '../models/Record.model';
import {
  createEntity,
  deleteEntity,
  getEntities,
  restoreEntity,
  updateEntity,
} from '../utils/crudOperations';

// Crear un registro
export const createRecord = async (req: Request, res: Response) => {
  createEntity(Registro, req, res);
};

// registrar bluk
export const createRecordBulk = async (req: Request, res: Response) => {
  try {
    const { records } = req.body;
    const createdRecords = await Registro.bulkCreate(records);
    res.status(201).json(createdRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
      ProduccionDiaria: (dailyProduction || 0).toFixed(2),
      ProduccionMensual: (monthlyProduction || 0).toFixed(2),
      ProduccionAnual: (yearlyProduction || 0).toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Endpoint Grafica
export const getMilkProductionCurrentMonth = async (
  req: Request,
  res: Response
) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const productions = await Registro.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('fecha')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('cantidad_leche')), 'totalMilk'],
      ],
      where: {
        fecha: {
          [Op.gte]: new Date(currentYear, currentMonth, 1),
          [Op.lt]: new Date(currentYear, currentMonth + 1, 1),
        },
        tipo_registro: 'Produccion',
      },
      group: [Sequelize.fn('DATE', Sequelize.col('fecha'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('fecha')), 'ASC']],
    });

    const formattedProductions = productions.map((production) => ({
      date: production.get('date'),
      totalMilk: production.get('totalMilk'),
    }));

    res.status(200).json(formattedProductions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
