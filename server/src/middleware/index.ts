// middleware son funciones intermedias que se ejecutan antes de llegar a las rutas de la aplicación.
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handlersInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next(); // Continuar con la ejecución de la aplicación
};
