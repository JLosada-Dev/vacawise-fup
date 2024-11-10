// tsconfig.json - "target": "ESNext", moduleResolution: "NodeNext", "module": "NodeNext"
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { hashPassword } from '../utils/bcryptUtils';
import Usuario from '../models/User.model';
import { createEntity } from '../utils/crudOperations';
import { Op } from 'sequelize';

// POST Methods
export const createUser = async (req: Request, res: Response) => {
  try {
    // Encriptar la contraseña
    // const saltRounds = 10; // Número de rondas de encriptación
    // const hashedPassword = await bcrypt.hash(req.body.clave, saltRounds);
    const password = req.body.clave;
    // Remplazar la contraseña en el cuerpo de la solicitud por la contraseña encriptada
    req.body.clave = await hashPassword(password);

    await createEntity(Usuario, req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, clave, rol } = req.body; // Desestructuramos el email, la clave y el rol del cuerpo de la solicitud (req.body)
  try {
    // Buscar usuario por email
    const user = await Usuario.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'Credenciales incorrectas' }); // 404 Not Found
    }

    // Verificar la contraseña usando bcrypt.compare
    const validPassword = await bcrypt.compare(clave, user.clave);

    // Verificar contraseña
    if (!validPassword || user.rol !== rol) {
      return res.status(401).json({ message: 'Credenciales incorrectas' }); // 401 Unauthorized
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

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Usuario.findAll({
      order: [['id_usuario', 'ASC']], // Ordenar por id_usuario de forma ascendente
      attributes: { exclude: ['clave', 'deletedAt'] }, // Excluir el campo 'clave' de los resultados
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }

    res.status(200).json(users);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// export const getDeletedUsers = async (req: Request, res: Response) => {
//   try {
//     const deletedUsers = await Usuario.findAll({
//       where: {
//         deletedAt: {
//           // Op.ne: null is a Sequelize operator to check for non-null values
//           [Op.ne]: null,
//         },
//       },
//       paranoid: false, // Include soft-deleted records
//       attributes: { exclude: ['clave'] }, // Exclude the 'clave' field from the results
//     });
//     res.status(200).json(deletedUsers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// export const getUserByCC = async (req: Request, res: Response) => {
//   try {
//     const { cedula } = req.params;
//     const user = await Usuario.findOne({
//       where: { cedula },
//       attributes: { exclude: ['clave', 'deletedAt'] },
//     });
//     if (!user) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const restoreUser = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await Usuario.findOne({
//       where: { id_usuario: id },
//       paranoid: false, // Include soft-deleted records
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }

//     await user.restore(); // Restore the soft-deleted user
//     res.status(200).json({ data: user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// PATCH & PUT Methods
// export const updateState = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const user = await Usuario.findByPk(id);
//   if (!user) {
//     return res.status(404).json({ error: 'Usuario no encontrado' });
//   }
//   user.estado = !user.dataValues.estado;
//   await user.save();
//   res.status(200).json({ data: user });
// };

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Usuario.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Check if the password is being updated
  if (req.body.clave) {
    const password = req.body.clave;
    req.body.clave = await hashPassword(password);
  }

  await user.update(req.body);
  await user.save();
  res.status(200).json({ data: user });
};

// DELETE Methods
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Usuario.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Set the estado to false before destroying the user
  user.estado = false;
  await user.save();

  await user.destroy();
  res.status(200).json({ data: user });
};

// Obtener la cantidad de usuarios
// export const getCountUsuarios = async (req: Request, res: Response) => {
//   try {
//     const count = await Usuario.count();
//     res.status(200).json({ count });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
