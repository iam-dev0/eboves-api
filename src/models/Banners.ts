import {
  Column,
  DataType,
  Model,
  Table,
  Default,
  Scopes,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
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
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
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
