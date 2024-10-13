import { Router } from 'express';

const usuarioRouter = Router();

// Enrutamiento
/**
 * GET /
 * @summary Este es el endpoint raíz
 * @return {string} 200 - ¡Hola Mundo!
 * @example response - 200 - ¡Hola Mundo!
 * @example response - 500 - Error Interno del Servidor
 * @example response - 404 - No Encontrado
 */
usuarioRouter.get('/', (req, res) => {
  res.json('Desde GET /');
});

/**
 * POST /
 * @summary Endpoint para manejar solicitudes POST
 * @return {string} 200 - Respuesta desde POST
 * @example response - 200 - Desde POST /
 * @example response - 500 - Error Interno del Servidor
 * @example response - 404 - No Encontrado
 */
usuarioRouter.post('/', (req, res) => {
  res.json('Desde POST /');
});

/**
 * PUT /
 * @summary Endpoint para manejar solicitudes PUT
 * @return {string} 200 - Respuesta desde PUT
 * @example response - 200 - Desde PUT /
 * @example response - 500 - Error Interno del Servidor
 * @example response - 404 - No Encontrado
 */
usuarioRouter.put('/', (req, res) => {
  res.json('Desde PUT /');
});

/**
 * PATCH /
 * @summary Endpoint para manejar solicitudes PATCH
 * @return {string} 200 - Respuesta desde PATCH
 * @example response - 200 - Desde PATCH /
 * @example response - 500 - Error Interno del Servidor
 * @example response - 404 - No Encontrado
 */
usuarioRouter.patch('/', (req, res) => {
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
usuarioRouter.delete('/', (req, res) => {
  res.json('Desde DELETE /');
});

export default usuarioRouter;

// req: Objeto Request lo que se recibe y res: Objeto Response lo que se envía.