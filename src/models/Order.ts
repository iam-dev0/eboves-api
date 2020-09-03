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
  Unique,
  ForeignKey,
  BeforeCreate,
  HasMany,
} from "sequelize-typescript";
import ShippingInformation from "./ShippingInformation";
import OrderItems from "./OrderItems";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "orders",
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
export class Orders extends Model<Orders> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  // @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  outletId!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  customerId!: number;

  @ForeignKey(() => ShippingInformation)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  shippingInformationId!: number;

  @Column
  source!: string;

  @Unique
  @Column
  orderNumber!: string;

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

  // @Default(false)
  // @Column
  // stockOrderer!: boolean;  // Need to run the migration First

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  shippingCharges!: number;

  @Column({
    type: DataType.FLOAT,
  })
  tax!: number;

  @Default(0)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  discountedPercentage!: number;

  @Default(0)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  discountedAmount!: number;
  
  @HasMany(()=>OrderItems)
  products!: OrderItems[];



  @Column({ type: DataType.TEXT })
  discountReason!: string;
  @Column({ type: DataType.TEXT })
  shippingChargesRemovedReason!: string;
  @Column({ type: DataType.TEXT })
  returnReason!: string;
  @Column({ type: DataType.TEXT })
  cancelReason!: string;

  @Default("CASH_ON_DELIEVERY")
  @Column({
    type: DataType.ENUM,
    values: ["CASH_ON_DELIEVERY", "CREDIT_CARD", "BANK_TRANSFER"],
  })
  paymentMethod!: string;

  @Column({ type: DataType.TEXT })
  paymentReferenceNo!: string;

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

  @BeforeCreate
  static async addUniorderNumber(instance: Orders) {
    const order = await Orders.findOne({ order: [["createdAt", "DESC"]] });
    // this will also be called when an instance is created
    switch (instance.source) {
      case "WEBSITE_DESKTOP":
        instance.orderNumber = `WD-${instance.outletId}-${instance.id}`;
        break;
      case "WEBSITE_MOBILE":
        instance.orderNumber = `WM-${instance.outletId}-${instance.id}`;
        break;
      default:
        instance.orderNumber = `BO-${instance.outletId}-${
          !order ? 0 : order.id + 1
        }`;
        break;
    }
  }
}

export default Orders;
