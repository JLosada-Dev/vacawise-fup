import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Usuario from './User.model';
import Bovino from './Bovine.model';

@Table({
  tableName: 'registro',
  timestamps: true,
  paranoid: true,
})
class Registro extends Model {
  // Columna para el ID del registro, es la clave primaria y se auto-incremental
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_registro: number;

  // Columna para la clave foránea del usuario
  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.BIGINT,
  })
  declare id_usuario: number;

  // Relación de pertenencia con el modelo Usuario
  @BelongsTo(() => Usuario)
  declare usuario: Usuario;

  // Columna para la clave foránea del bovino
  @ForeignKey(() => Bovino)
  @Column({
    type: DataType.BIGINT,
  })
  declare id_bovino: number;

  // Relación de pertenencia con el modelo Bovino
  @BelongsTo(() => Bovino)
  declare bovino: Bovino;

  // Columna para la fecha del registro, no puede ser nula
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare fecha: Date;

  // Columna para el tipo de registro, no puede ser nula y debe ser uno de los valores especificados
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      isIn: [['Produccion', 'Salud', 'Reproduccion']],
    },
  })
  declare tipo_registro: string;

  // Columna para los detalles del registro en formato STRING
  @Column({
    type: DataType.STRING,
  })
  declare detalles: string;

  // Columna para la cantidad de leche producida, en litros
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare cantidad_leche: number;
}

export default Registro;
