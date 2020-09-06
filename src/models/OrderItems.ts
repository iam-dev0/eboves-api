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
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
} from "sequelize-typescript";
import Orders from "./Order";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "order_product_variations",
})
@Scopes({
  basic: {
    attributes: ["id", "name", "slug", "type"],
  },
  website: {
    attributes: ["id", "name", "type"],
    where: { active: true },
  },
})
export class OrderItems extends Model<OrderItems> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(()=>Orders)
  // @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  orderId!: number;

  // @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  productId!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  productVariationid!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  supplierId!: number;

  // @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  supplierPrice!: number;

  // @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  sellingPrice!: number;

  @Default(0)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  discountedPercentage!: number;

  @Column
  discountReason!: string;

  @Default(1)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  quantity!: number;

  @Default("PENDING")
  @Column({
    type: DataType.ENUM,
    values: [
      "PENDING",
      "CONFIRMED",
      "IN HOUSE",
      "OUT OF STOCK",
      "DISPATCH",
      "DELIEVERED",
      "CANCELTED",
      "RETURNED",
    ],
  })
  status!: string;

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

export default OrderItems;
