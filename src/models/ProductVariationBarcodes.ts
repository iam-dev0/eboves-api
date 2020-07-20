import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  Unique,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
} from "sequelize-typescript";

import ProductVariations from "./ProductVariations";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: false,
  timestamps: true,
  tableName: "product_variation_barcodes",
})
export class ProductVariationsBarcodes extends Model<ProductVariationsBarcodes> {


  @ForeignKey(() => ProductVariations)
  @Column
  productVariationId!: number;

  @Unique
  @Column
  barcode!: string;

  @Column
  supplierPrice!: number;

  @Default(true)
  @Column
  active!: boolean;
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

export default ProductVariationsBarcodes;
