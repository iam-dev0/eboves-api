import {
  Column,
  DataType,
  Model,
  Table,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  Scopes,
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
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
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
  @Column
  active!: boolean;
  @Column
  default!: boolean;
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
