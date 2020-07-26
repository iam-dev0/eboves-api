import {
  Column,
  DataType,
  Model,
  Table,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  Scopes,
  Default,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "Outlets",
})
@Scopes({
  basic: {
    attributes: ["id", "name", "slug"],
  },
})
export class Outlets extends Model<Outlets> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column
  cityId!: number;

  @Column({ unique: true })
  slug!: string;

  @Column
  name!: string;

  @Column({ type: DataType.TEXT })
  address!: string;

  @Default(true)
  @Column
  active!: boolean;
  @Default(false)
  @Column
  default!: boolean;

  @Default(false)
  @Column
  online!: boolean;

  // @ForeignKey(() => Categories)
  @Column
  managerId!: number;

  @Column
  createdBy!: number;
  @Column
  updatedBy!: number;
  @Column
  DeletedBy!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;
}

export default Outlets;
