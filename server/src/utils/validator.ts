import { body, ValidationChain } from 'express-validator';

// Validaciones comunes
export const nombreValidator: ValidationChain = body('nombre')
  .notEmpty()
  .withMessage('El nombre es requerido')
  .isLength({ min: 2, max: 50 })
  .withMessage('El nombre debe tener entre 2 y 50 caracteres');

export const emailValidator: ValidationChain = body('email')
  .isEmail()
  .withMessage('Debe ser un correo electrónico válido');
export const rolValidator: ValidationChain = body('rol')
  .isIn(['Administrador', 'Empleado', 'Veterinario'])
  .withMessage(
    'El rol debe ser uno de los siguientes: Administrador, Empleado, Veterinario'
  );
export const claveValidator: ValidationChain = body('clave')
  .isLength({ min: 8 })
  .withMessage('La clave debe tener al menos 8 caracteres');
export const cedulaValidator: ValidationChain = body('cedula')
  .isInt({ min: 1 })
  .withMessage('La cédula debe ser un número entero positivo');
export const fechaValidator: ValidationChain = body('fecha')
  .isDate()
  .withMessage('Debe ser una fecha válida');

// Validaciones específicas para `bovino`
export const bovinoValidators: ValidationChain[] = [
  body('numero_etiqueta')
    .notEmpty()
    .withMessage('El número de etiqueta es requerido'),
  // body('sexo')
  //   .isIn(['Macho', 'Hembra'])
  //   .withMessage('El sexo debe ser Macho o Hembra'),
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

// Validación de cantidad de leche
export const cantidadLecheValidator: ValidationChain = body('cantidad_leche')
  .optional() // Hace que el campo sea opcional
  .isFloat({ min: 0 }) // Si se proporciona, debe ser un número flotante positivo
  .withMessage(
    'La cantidad de leche, si se proporciona, debe ser un número positivo'
  );
