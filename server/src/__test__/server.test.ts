import { connectDB } from '../server';
import db from '../config/db';

jest.mock('../config/db'); // Mockear la conexión a la base de datos.

describe('connectDB', () => {
  it('should handle database connection error', async () => {
    // Simular un error en la autenticación de la base de datos
    const errorMessage = 'Error al conectar a la base de datos:';
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValueOnce(new Error(errorMessage));
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage),
      expect.any(Error)
    );

    consoleSpy.mockRestore(); // Restaurar el espía de la consola después del test
  });

  it('should log success message when connected successfully', async () => {
    // Simular una conexión exitosa a la base de datos
    jest.spyOn(db, 'authenticate').mockResolvedValueOnce(undefined);
    jest.spyOn(db, 'sync').mockResolvedValueOnce(undefined);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Conexión a la base de datos establecida correctamente.'
      )
    );

    consoleSpy.mockRestore(); // Restaurar el espía de la consola después del test
  });
});
