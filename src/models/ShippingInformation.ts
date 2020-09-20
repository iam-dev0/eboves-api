import {
  Column,
  DataType,
  Model,
  Table,
  Scopes,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  HasOne,
} from "sequelize-typescript";

import Orders from "./Order";

@Table({
  timestamps: false,
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  tableName: "shipping_information",
})
@Scopes({
  basic: {
    attributes: ["id", "name", "slug"],
  },
})
export class ShippingInformation extends Model<ShippingInformation> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  customerId!: number;

  @HasOne(()=>Orders)
  order!: Orders;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  cityId!: number;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  phone!: string;

  @Column
  email!: string;

  @Column({ type: DataType.TEXT })
  address!: string;
}

export default ShippingInformation;
