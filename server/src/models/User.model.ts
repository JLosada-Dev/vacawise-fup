import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  HasMany,
} from 'sequelize-typescript';
import Registro from './Record.model';

@Table({
  tableName: 'usuario',
  timestamps: true,
  paranoid: true,
})
class Usuario extends Model {
  // Columna para el ID del usuario, es la clave primaria y se autoincrementa
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_usuario: number;

  // Columna para el nombre del usuario, no puede ser nulo
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare nombre: string;

  // Columna para el rol del usuario, no puede ser nulo y debe ser uno de los valores especificados
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      isIn: [['Administrador', 'Empleado', 'Veterinario']],
    },
  })
  declare rol: string;

  // Columna para el email del usuario, debe ser único
  @Column({
    type: DataType.TEXT,
    unique: true,
  })
  declare email: string;

  // Columna para la contraseña del usuario, no puede ser nula y debe tener una longitud entre 8 y 255 caracteres
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      len: [8, 255],
    },
  })
  declare contraseña: string;

  // Relación uno a muchos con el modelo Registro
  @HasMany(() => Registro)
  declare registros: Registro[];
}

export default Usuario;
