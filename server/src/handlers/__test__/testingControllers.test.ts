//npm test
// npm run test:coverage

import request from 'supertest';
import server from '../../server'; // Asegúrate de importar tu aplicación

describe('GET /api/usuario/consultar', () => {
  it('Flujo 2: Consulta de usuario fallida', async () => {
    const response = await request(server).get('/api/usuario/consultar');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'No se encontraron usuarios',
    });
  });
});

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
describe('GET /api/usuario/consultar', () => {
  it('Flujo 1: Consulta de usuario exitosa', async () => {
    const response = await request(server).get('/api/usuario/consultar');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveLength(1);
    expect(response.body).not.toHaveProperty('errors');
  });
});

// Testing the user handler PUT /user/actualizar/:id
describe('PUT /api/usuario/actualizar/:id', () => {
  it('Flujo 1: Actualización de usuario exitosa', async () => {
    const response = await request(server)
      .put('/api/usuario/actualizarUsuario/1')
      .send({
        nombre: 'Jose Legarda Update',
        cedula: 1061747271,
        rol: 'Veterinario',
        email: 'update@correo.com',
        clave: 'contraseña',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty('errors');
  });
  it('Flujo 2: Actualización de usuario con datos faltantes', async () => {
    const response = await request(server)
      .put('/api/usuario/actualizarUsuario/1')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(6);
    expect(response.body.errors).toBeTruthy();

    expect(response.status).not.toBe(200);
    expect(response.body).not.toBe('data');
  });
});

// Testing the user handler DELETE /user/eliminar/:id
describe('DELETE /api/usuario/eliminar/:id', () => {
  it('Flujo 1: Eliminación de usuario exitosa', async () => {
    const response = await request(server).delete(
      '/api/usuario/eliminarUsuario/1'
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');

    expect(response.body).not.toHaveProperty('errors');
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
  it('Flujo 2: Eliminación de usuario fallida', async () => {
    const response = await request(server).delete(
      '/api/usuario/eliminarUsuario/2000'
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Usuario no encontrado' });

    expect(response.status).not.toBe(200);
  });
});

// Bovino Handler Test
describe('GET /api/bovino/consultar', () => {
  it('Flujo 2: Consulta de bovino fallida', async () => {
    const response = await request(server).get('/api/bovino/consultar');

    expect(response.status).toBe(404);
  });
});

describe('POST /api/bovino/registrar', () => {
  it('Flujo 1: Registro de bovino exitoso', async () => {
    const response = await request(server).post('/api/bovino/registrar').send({
      numero_etiqueta: 'P50',
      fecha_nacimiento: '2020-10-26',
      raza: 'Holstein',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body).not.toHaveProperty('errors');
  });
  it('Flujo 2: Registro de bovino fallido', async () => {
    const response = await request(server)
      .post('/api/bovino/registrar')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(4);
    expect(response.body).toHaveProperty('errors');

    expect(response.body).not.toHaveProperty('data');
  });
});

describe('GET /api/bovino/consultar', () => {
  it('Flujo 1: Consulta de bovino exitosa', async () => {
    const response = await request(server).get('/api/bovino/consultar');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('PUT /api/bovino/actualizar/:id', () => {
  it('Flujo 1: Actualización de bovino exitosa', async () => {
    const response = await request(server)
      .put('/api/bovino/actualizar/1')
      .send({
        numero_etiqueta: 'P50',
        fecha_nacimiento: '2020-10-26',
        raza: 'Holstein',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).not.toHaveProperty('errors');
  });
  it('Flujo 2: Actualización de bovino fallida', async () => {
    const response = await request(server)
      .put('/api/bovino/actualizar/1')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(4);
    expect(response.body).toHaveProperty('errors');
    expect(response.body).not.toHaveProperty('data');
  });
});

describe('DELETE /api/bovino/eliminar/:id', () => {
  it('Flujo 1: Eliminación de bovino exitosa', async () => {
    const response = await request(server).delete('/api/bovino/eliminar/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).not.toHaveProperty('errors');
  });
  it('Flujo 2: Eliminación de bovino fallida', async () => {
    const response = await request(server).delete('/api/bovino/eliminar/1');
    expect(response.status).toBe(404);
  });
});

// Record Handler Test
describe('GET /api/reporte/consultar', () => {
  it('Flujo 2: Consulta de reporte fallida', async () => {
    const response = await request(server).get('/api/reporte/consultar');

    expect(response.status).toBe(404);
  });
});

describe('POST /api/reporte/registrar', () => {
  it('Flujo 1: Registro de reporte exitoso', async () => {
    const response = await request(server).post('/api/reporte/registrar').send({
      id_usuario: '1',
      id_bovino: '1',
      tipo_registro: 'Produccion',
      detalles: 'Mañana',
      cantidad_leche: 20,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body).not.toHaveProperty('errors');
  });
  it('Flujo 2: Registro de reporte fallido', async () => {
    const response = await request(server)
      .post('/api/reporte/registrar')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(3);
    expect(response.body).toHaveProperty('errors');

    expect(response.body).not.toHaveProperty('data');
  });
  it('Reportes: Validacion de fecha', async () => {
    const response = await request(server).post('/api/reporte/registrar').send({
      id_usuario: '1',
      id_bovino: '1',
      tipo_registro: 'Produccion',
      detalles: 'Mañana',
      cantidad_leche: 20,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET /api/reporte/consultar', () => {
  it('Flujo 1: Consulta de reporte exitosa', async () => {
    const response = await request(server).get('/api/reporte/consultar');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('PUT /api/reporte/actualizar/:id', () => {
  it('Flujo 1: Actualización de reporte exitosa', async () => {
    const response = await request(server)
      .put('/api/reporte/actualizar/1')
      .send({
        id_usuario: '1',
        id_bovino: '1',
        tipo_registro: 'Produccion',
        detalles: 'Medio día',
        cantidad_leche: 90,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).not.toHaveProperty('errors');
  });
  it('Flujo 2: Actualización de reporte fallida', async () => {
    const response = await request(server)
      .put('/api/reporte/actualizar/1')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(3);
    expect(response.body).toHaveProperty('errors');
    expect(response.body).not.toHaveProperty('data');
  });
});

describe('DELETE /api/reporte/eliminar/:id', () => {
  it('Flujo 1: Eliminación de reporte exitosa', async () => {
    const response = await request(server).delete('/api/reporte/eliminar/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).not.toHaveProperty('errors');
  });
  it('Flujo 2: Eliminación de reporte fallida', async () => {
    const response = await request(server).delete('/api/reporte/eliminar/1');
    expect(response.status).toBe(404);
  });
});
