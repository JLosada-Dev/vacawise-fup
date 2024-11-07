import { body, param, ValidationChain } from 'express-validator';

// Validaciones comunes para `usuario`
export const usuarioValidators: ValidationChain[] = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
  body('rol')
    .isIn(['Administrador', 'Empleado', 'Veterinario'])
    .withMessage(
      'El rol debe ser uno de los siguientes: Administrador, Empleado, Veterinario'
    ),
  body('clave')
    .isLength({ min: 8 })
    .withMessage('La clave debe tener al menos 8 caracteres'),
  body('cedula')
    .isInt({ min: 1 })
    .withMessage('La cédula debe ser un número entero positivo'),
  body('fecha').isDate().withMessage('Debe ser una fecha válida'),
];

// Validaciones específicas para `bovino`
export const bovinoValidators: ValidationChain[] = [
  body('numero_etiqueta')
    .notEmpty()
    .withMessage('El número de etiqueta es requerido')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/)
    .withMessage(
      'El número de etiqueta debe contener al menos una letra y un número'
    ),
  body('raza')
    .isIn(['Holstein', 'Jersey', 'Guernsey', 'Brown Swiss'])
    .withMessage(
      'La raza debe ser una de las siguientes: Holstein, Jersey, Guernsey, Brown Swiss'
    ),
  body('fecha_nacimiento')
    .isDate()
    .withMessage('Debe ser una fecha válida')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('La fecha de nacimiento no puede ser en el futuro');
      }
      return true;
    }),
];

// Validaciones específicas para `registro`
export const recordValidators: ValidationChain[] = [
  body('id_usuario')
    .isInt()
    .withMessage('El id de usuario debe ser un número entero'),
  body('id_bovino')
    .isInt()
    .withMessage('El id de bovino debe ser un número entero'),
  body('tipo_registro')
    .isIn(['Produccion', 'Salud', 'Reproduccion'])
    .withMessage(
      'El tipo de registro debe ser uno de los siguientes: Produccion, Salud, Reproduccion'
    ),
  body('detalles')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Los detalles no pueden exceder los 255 caracteres'),
];

export const idValidator: ValidationChain = param('id')
  .isInt()
  .withMessage('ID no válido');

// Validación de cantidad de leche
export const milkQuantityValidator: ValidationChain = body('cantidad_leche')
  .optional() // Hace que el campo sea opcional
  .isFloat({ min: 0 }) // Si se proporciona, debe ser un número flotante positivo
  .withMessage(
    'La cantidad de leche, si se proporciona, debe ser un número positivo'
  );
