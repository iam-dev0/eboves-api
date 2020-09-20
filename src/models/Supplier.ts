import {
  Column,
  DataType,
  Model,
  Table,
  Default,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  Unique,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  IsUrl,
} from "sequelize-typescript";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "suppliers",
})
export class Suppliers extends Model<Suppliers> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Unique
  @Column
  slug!: string;

  @Unique
  @Column
  code!: string;

  @Column
  companyName!: string;

  @Column
  name!: string;
  
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
  // deletedBy!: number;

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
