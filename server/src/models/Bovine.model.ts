import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  HasMany,
} from 'sequelize-typescript';
import Registro from './Record.model';

// Construcción con decoradores de la clase Bovino que extiende de Model de sequelize-typescript. agregan una función dentro de otra función.
// tsconfig.json: "experimentalDecorators": true, "emitDecoratorMetadata": true

@Table({
  tableName: 'bovino',
  timestamps: true,
  paranoid: true,
})

class Bovino extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_bovino: number;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  declare numero_etiqueta: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare fecha_nacimiento: Date;
  
  // !Por el momento no se manejar el sexo del bovino
  // @Column({
  //   type: DataType.TEXT,
  //   allowNull: false,
  //   validate: {
  //     isIn: [['Macho', 'Hembra']],
  //   },
  // })
  //declare sexo: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    validate: {
      isIn: [['Holstein', 'Jersey', 'Guernsey', 'Brown Swiss']],
    },
  })
  declare raza: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare estado: boolean;

  @HasMany(() => Registro)
  declare registros: Registro[];
}

export default Bovino;
