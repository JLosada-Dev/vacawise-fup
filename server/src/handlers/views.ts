// Construcción de vistas de bovinos
import { Request, Response } from 'express';
import Bovino from '../models/Bovine.model';
import Registro from '../models/Record.model';
import Usuario from '../models/User.model';

export const getDetailedBovineReports = async (req: Request, res: Response) => {
  try {
    const { numero_etiqueta } = req.params;

    // Encontrar el bovino por número de etiqueta
    const bovino = await Bovino.findOne({
      where: { numero_etiqueta },
      include: [
        {
          model: Registro,
          as: 'registros',
          attributes: ['fecha', 'tipo_registro', 'detalles', 'cantidad_leche'],
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['nombre', 'rol'],
            },
          ],
        },
      ],
    });

    if (!bovino) {
      return res.status(404).json({ error: 'Bovino no encontrado' });
    }

    // Mapear registros con la información del usuario
    const detailedReports = bovino.registros
      .map((record: any) => ({
        fecha: record.fecha,
        tipo_registro: record.tipo_registro,
        detalles: record.detalles,
        cantidad_leche:
          record.tipo_registro === 'Produccion' ? record.cantidad_leche : null,
        usuario: record.usuario.nombre,
        rol: record.usuario.rol,
      }))
      .sort((a: any, b: any) => a.tipo_registro.localeCompare(b.tipo_registro)); // Organizar por tipo de registro

    res.status(200).json({
      numero_etiqueta: bovino.numero_etiqueta,
      raza: bovino.raza,
      registros: detailedReports,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
