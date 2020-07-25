import {
  Column,
  DataType,
  Model,
  Table,
  Default,
  Scopes,
} from "sequelize-typescript";

@Table({
  paranoid: false,
  timestamps: false,
  tableName: "banners",
})
@Scopes({
  website: {
    where: { active: true },
  },
})
export class Banners extends Model<Banners> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column
  title!: string;

  @Column
  image!: string;

  @Column
  href!: string;

  @Column
  type!: string;

  @Default(true)
  @Column
  active!: boolean;
}

export default Banners;
