import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  AllowNull,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";
import ProductVariations from "./ProductVariations";
import Attributes from "./Attributes";
@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: false,
  timestamps: false,
  tableName: "product_variation_attribute_values",
})
export class ProductVariationAttributeValues extends Model< ProductVariationAttributeValues> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(() => ProductVariations)
  @Column
  productVariationId!: number;

  @ForeignKey(() => Attributes)
  @Column
  attributeId!: number;


  @Column
  value!: string;

  @Column
  alt!: string;
}

export default ProductVariationAttributeValues;
