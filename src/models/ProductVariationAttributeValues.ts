import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import ProductAttributes from "./ProductAttributes";
import ProductVariations from "./ProductVariations";
@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: false,
  timestamps: false,
  tableName: "product_variation_attribute_values",
})
export class ProductVariationAttributeValues extends Model<
  ProductVariationAttributeValues
> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(() => ProductAttributes)
  @Column
  productAttributeId!: number;

  @ForeignKey(() => ProductVariations)
  @Column
  productVariationId!: number;

  @Column
  value!: string;
  @Column
  image!: string;
  @Column
  alt!: string;
}

export default ProductVariationAttributeValues;
