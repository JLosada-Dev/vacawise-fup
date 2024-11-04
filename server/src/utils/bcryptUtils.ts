import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Error al encriptar la contraseña');
  }
};
