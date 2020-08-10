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
  ForeignKey,
} from "sequelize-typescript";
import ProductVariations from "./ProductVariations";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "stocks",
})

export class Stocks extends Model<Stocks> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column
  outletId!: number;

  @ForeignKey(()=>ProductVariations)
  @Column
  productVariationId!: number;
  @Column
  supplierId!: number;


  @Column({
    type: DataType.FLOAT,
  })
  supplierPrice!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  availableQuantity!: number;



  @Default(true)
  @Column
  active!: boolean;

 

  @Column
  createdBy!: number;
  @Column
  updatedBy!: number;
  @Column
  deletedBy!: number;

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

export default Stocks;
