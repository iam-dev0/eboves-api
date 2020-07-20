import {
  Column,
  DataType,
  Model,
  Table,
  Default,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
} from "sequelize-typescript";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "Suppliers",
})
export class Suppliers extends Model<Suppliers> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column({ unique: true })
  code!: string;

  @Column
  companyName!: string;

  @Column
  description!: string;

  @Column
  website!: string;

  @Column
  email!: string;

  @Column
  phone!: string;

  @Column
  warehouseAddress!: string;

  @Column
  warehouseCityId!: number;

  @Column({ type: DataType.FLOAT })
  commissionPercentage!: number;

  @Default(true)
  @Column
  local!: boolean;

  @Default(true)
  @Column
  active!: boolean;

  // @Column
  // createdBy!: number;
  // @Column
  // updatedBy!: number;
  // @Column
  // DeletedBy!: number;

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

export default Suppliers;
