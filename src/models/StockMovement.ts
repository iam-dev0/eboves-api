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
  BelongsTo,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  Unique,
  HasMany,
} from "sequelize-typescript";
import Outlets from "./Outlets";
import Suppliers from "./Supplier";
import StockMovementVariations from "./StockMovementVariations";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "stock_movement",
})
export class StockMovement extends Model<StockMovement> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(() => Suppliers)
  // @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  supplierId!: number;

  @BelongsTo(() => Suppliers)
  supplier!: Suppliers;

  @ForeignKey(() => Outlets)
  // @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  outletId!: number;

  @BelongsTo(() => Outlets)
  outlet!: Outlets;

  @HasMany(() => StockMovementVariations)
  variations!: StockMovementVariations[];

  @Column
  supplierInvoiceNumber!: string;

  @Column
  delieveryDate!: Date;

  @Unique
  @Column
  orderNumber!: string;

  @Column({ type: DataType.TEXT })
  note!: string;

  @Default("open")
  @Column({
    type: DataType.ENUM,
    values: ["open", "stockOrdered", "stockReceived", "stockReturned"],
  })
  status!: string;

  @Column
  createdBy!: number;
  @Column
  updatedBy!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export default StockMovement;
