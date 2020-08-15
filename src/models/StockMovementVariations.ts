import {
  Column,
  DataType,
  Model,
  Table,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  BelongsTo,
  Default,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import StockMovement from "./StockMovement";
import ProductVariations from "./ProductVariations";


@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "stock_movement_variations",
})


export class StockMovementVariations extends Model<StockMovementVariations> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(() => StockMovement)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  stockMovementId!: number;

  @ForeignKey(() => ProductVariations)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  productVariationId!: number;

  @BelongsTo(()=>ProductVariations)
  variation!: ProductVariations;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  requestedQuantity!: number;

  @Column({
    type: DataType.FLOAT,
  })
  requestedPrice!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  receivedQuantity!: number;

  @Column({
    type: DataType.FLOAT,
  })
  receivedPrice!: number;

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

export default StockMovementVariations;
