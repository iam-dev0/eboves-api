import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
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
