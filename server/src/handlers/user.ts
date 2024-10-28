// tsconfig.json - "target": "ESNext", moduleResolution: "NodeNext", "module": "NodeNext"
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Usuario from '../models/User.model';
import { createEntity, getEntities } from '../utils/crudOperations';

export const createUser = async (req: Request, res: Response) => {
  try {
    // Encriptar la contraseña
    const saltRounds = 10; // Número de rondas de encriptación
    const hashedPassword = await bcrypt.hash(req.body.clave, saltRounds);

    // Remplazar la contraseña en el cuerpo de la solicitud por la contraseña encriptada
    req.body.clave = hashedPassword;

    await createEntity(Usuario, req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Usuario.findAll({
      attributes: { exclude: ['clave', 'deletedAt'] }, // Excluir el campo 'clave' de los resultados
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, clave, rol } = req.body; // Destructuramos el email, la clave y el rol del cuerpo de la solicitud (req.body)

  try {
    // Buscar usuario por email
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña usando bcrypt.compare
    const validPassword = await bcrypt.compare(clave, user.clave);

    // Verificar contraseña
    if (!validPassword || user.rol !== rol) {
      return res.status(401).json({ message: 'Credenciales incorrectas' }); // * Mensaje genérico
    }

    // Usuario autenticado correctamente
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id_usuario,
        email: user.email,
        rol: user.rol,
        nombre: user.nombre, // Puedes agregar más campos según sea necesario
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateState = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Usuario.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  user.estado = !user.dataValues.estado;
  await user.save();
  res.status(200).json({ data: user });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Usuario.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  await user.update(req.body);
  await user.save();
  res.status(200).json({ data: user });
};
