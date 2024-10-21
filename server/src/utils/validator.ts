import { body, ValidationChain } from 'express-validator';

// Validaciones comunes
export const nombreValidator: ValidationChain = body('nombre')
  .notEmpty()
  .withMessage('El nombre es requerido');
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
  body('sexo')
    .isIn(['Macho', 'Hembra'])
    .withMessage('El sexo debe ser Macho o Hembra'),
  body('raza')
    .isIn(['Holstein', 'Jersey', 'Guernsey', 'Brown Swiss'])
    .withMessage(
      'La raza debe ser una de las siguientes: Holstein, Jersey, Guernsey, Brown Swiss'
    ),
];

// Validaciones específicas para `registro`
export const registroValidators: ValidationChain[] = [
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
];
