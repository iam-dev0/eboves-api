import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import Products from "./Products";
import Attributes from "./Attributes";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: false,
  timestamps: false,
  tableName: "product_attribute",
})
export class ProductAttribute extends Model<ProductAttribute> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(() => Products)
  @Column
  productId!: number;

  @ForeignKey(() => Attributes)
  @Column
  attributeId!: number;
}

export default ProductAttribute;
