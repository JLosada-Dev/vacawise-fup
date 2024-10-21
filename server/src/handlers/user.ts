// tsconfig.json - "target": "ESNext", moduleResolution: "NodeNext", "module": "NodeNext"
import { Request, Response } from 'express';
import Usuario from '../models/User.model';
import { createEntity, getEntities } from '../utils/createEntity';

export const createUser = (req: Request, res: Response) => {
  createEntity(Usuario, req, res);
};

export const getUsers = async (req: Request, res: Response) => {
  getEntities(Usuario, req, res);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, clave } = req.body; // Destructuramos el email y la clave del cuerpo de la solicitud (req.body)

  try {
    // Buscar usuario por email
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    if (user.clave !== clave) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Usuario autenticado correctamente
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
