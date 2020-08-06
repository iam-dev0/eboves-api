import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  Default,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

import Outlets from "./Outlets";
import Suppliers from "./Supplier";
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

  @ForeignKey(() => Outlets)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  outletId!: number;

  @ForeignKey(() => ProductVariations)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  productVariationId!: number;

  @ForeignKey(() => Suppliers)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  supplierId!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  availableQuantity!: number;
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  bookedQuantity!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  dispatchedQuantity!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  deliveredQuantity!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  damagedQuantity!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  inTransitTquantity!: number;

  @Default(true)
  @Column
  active!: boolean;

  @Column
  createdBy!: number;
  @Column
  updatedBy!: number;
  @Column
  DeletedBy!: number;
}

export default Stocks;
