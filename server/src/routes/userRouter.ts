import { Router } from 'express';
import { createUser, getUsers, loginUser } from '../handlers/user';
import {
  nombreValidator,
  emailValidator,
  rolValidator,
  claveValidator,
  cedulaValidator,
} from '../utils/validator';
import { handlersInputErrors } from '../middleware';

const userRouter = Router();

// Enrutamiento - endpoints

/**
 * GET /
 * @summary Este es el endpoint raíz
 * @return {string} 200 - ¡Hola Mundo!
 * @example response - 200 - ¡Hola Mundo!
 * @example response - 500 - Error Interno del Servidor
 * @example response - 404 - No Encontrado
 */
userRouter.get('/', handlersInputErrors, getUsers);


userRouter.post('/login', loginUser);

/**
 * POST /
 * @summary Endpoint para manejar solicitudes POST
 * @param {object} req - Objeto Request que contiene los datos de la solicitud
 * @param {object} res - Objeto Response que se enviará como respuesta
 * @return {string} 200 - Respuesta desde POST
 * @example response - 200 - Desde POST /
 * @example response - 500 - Error Interno del Servidor
 * @example response - 404 - No Encontrado
 */
userRouter.post(
  '/registrar',
  [
    nombreValidator,
    emailValidator,
    rolValidator,
    claveValidator,
    cedulaValidator,
  ],
  handlersInputErrors,
  createUser
);

/**
 * PUT /
 * @summary Endpoint para manejar solicitudes PUT
 * @return {string} 200 - Respuesta desde PUT
 * @example response - 200 - Desde PUT /
 * @example response - 500 - Error Interno del Servidor
 * @example response - 404 - No Encontrado
 */
userRouter.put('/');

/**
 * PATCH /
 * @summary Endpoint para manejar solicitudes PATCH
 * @return {string} 200 - Respuesta desde PATCH
 * @example response - 200 - Desde PATCH /
 * @example response - 500 - Error Interno del Servidor
 * @example response - 404 - No Encontrado
 */
userRouter.patch('/', (req, res) => {
  res.json('Desde PATCH /');
});

/**
 * DELETE /
 * @summary Endpoint para manejar solicitudes DELETE
 * @return {string} 200 - Respuesta desde DELETE
 * @example response - 200 - Desde DELETE /
 * @example response - 500 - Error Interno del Servidor
 * @example response - 404 - No Encontrado
 */
userRouter.delete('/', (req, res) => {
  res.json('Desde DELETE /');
});

export default userRouter;

// req: Objeto Request lo que se recibe y res: Objeto Response lo que se envía.
