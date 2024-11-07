import request from 'supertest';
import server from '../../server'; // Asegúrate de importar tu aplicación

// Testing the user handler POST /user
describe('POST /usuario/registrar', () => {
  it('Flujo 1: Creación de usuario de manera exitosa', async () => {
    const response = await request(server).post('/api/usuario/registrar').send({
      nombre: 'Juan Pérez',
      cedula: 12345678,
      email: 'juan@correo.com',
      rol: 'Empleado',
      clave: 'contraseña',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');

    expect(response.body.clave).not.toBe('contraseña');
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('errors');
  });

  it('Flujo 2: Creación de usuario con datos faltantes', async () => {
    const response = await request(server).post('/api/usuario/registrar').send({
      nombre: '',
      cedula: -1,
      rol: '',
      email: 'juancorreo.com',
      clave: 'c',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(6);

    // prettier-ignore
    const expectedErrors = [
    { "type": "field", "value": "", "msg": "El nombre es requerido", "path": "nombre", "location": "body" },
    { "type": "field", "value": "", "msg": "El nombre debe tener entre 2 y 50 caracteres", "path": "nombre", "location": "body" },
    { "type": "field", "value": "juancorreo.com", "msg": "Debe ser un correo electrónico válido", "path": "email", "location": "body" },
    { "type": "field", "value": "", "msg": "El rol debe ser uno de los siguientes: Administrador, Empleado, Veterinario", "path": "rol", "location": "body" },
    { "type": "field", "value": "c", "msg": "La clave debe tener al menos 8 caracteres", "path": "clave", "location": "body" },
    { "type": "field", "value": -1, "msg": "La cédula debe ser un número entero positivo", "path": "cedula", "location": "body" }
  ];

    expect(response.body.errors).toEqual(
      expect.arrayContaining(expectedErrors)
    );
    expect(response.status).not.toBe(404);
  });
});

// Testing the user handler POST /user/login
describe('POST /api/usuario/login', () => {
  it('Flujo 1: Login exitoso respuesta 200', async () => {
    const response = await request(server).post('/api/usuario/login').send({
      rol: 'Empleado',
      email: 'juan@correo.com',
      clave: 'contraseña',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Inicio de sesión exitoso',
      user: {
        id: '1',
        email: 'juan@correo.com',
        rol: 'Empleado',
        nombre: 'Juan Pérez',
      },
    });
  });

  it('Flujo 2: Login fallido respuesta 404', async () => {
    const response = await request(server).post('/api/usuario/login').send({
      rol: 'Empleado',
      email: 'empleado@correo.com',
      clave: 'contraseña',
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Credenciales incorrectas',
    });
  });
});

// Testing the user handler GET /user/consultar

// Testing the user handler GET /user/contar

// Testing the user handler PUT /user/actualizar/:id

// Testing the user handler PATCH /user/actualizarEstado/:id
