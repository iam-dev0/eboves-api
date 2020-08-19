import {
  Column,
  DataType,
  Model,
  Table,
  Scopes,
  ForeignKey,
  Default,
  AllowNull,
  HasMany,
  BelongsTo,
  BelongsToMany,
  Unique,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import Products from "./Products";
import ProductVariationAttributeValues from "./ProductVariationAttributeValues";
import ProductVariationsBarcodes from "./ProductVariationBarcodes";
import ProductVariationsImages from "./ProductVariationImages";
import Attributes from "./Attributes";
import Stocks from "./Stocks";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "product_variations",
})
@Scopes({
  basic: {
    attributes: ["id", "name", "slug"],
  },
  websiteListing: {
    attributes: [
      "id",
      "slug",
      "mainImage",
      "virtualQuantity",
      "price",
      "bestSeller",
      "topRated",
      "featured",
      "discountPercentage",
      "discountPrice",
      "discountStartTime",
      "discountEndTime",
      "trending",
      "preOrder",
    ],
    where: { active: true },
  },
})
export class ProductVariations extends Model<ProductVariations> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column
  mainImage!: string;
  @Column
  mainBarcode!: string;

  @ForeignKey(() => Products)
  // @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  productId!: number;

  @BelongsTo(() => Products)
  product!: Products;

  @HasMany(() => ProductVariationsBarcodes)
  barcodes!: ProductVariationsBarcodes[];

  @HasMany(() => ProductVariationsImages)
  images!: ProductVariationsImages[];

  @BelongsToMany(() => Attributes, () => ProductVariationAttributeValues)
  attributeValues!: Attributes[];

  @HasMany(() => Stocks)
  stocks!: Stocks[];

  @Unique
  @Column
  slug!: string;

  @Column({
    type: DataType.TEXT,
  })
  shortDescription!: string;

  @Unique
  @Column
  sku!: string;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  virtualQuantity!: number;

  @Column({
    type: DataType.FLOAT,
  })
  price!: number;

  @Column({
    type: DataType.FLOAT,
  })
  supplierPrice!: number;

  @Default(0)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  discountPercentage!: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  discountPrice!: number;

  discountStartTime!: Date;

  discountEndTime!: Date;

  @Default(false)
  @Column
  trending!: boolean;

  @Default(false)
  @Column
  bestSeller!: boolean;

  @Default(false)
  @Column
  featured!: boolean;

  @Default(false)
  @Column
  topRated!: boolean;

  @Default(false)
  @Column
  preOrder!: boolean;

  @Default(true)
  @Column
  active!: boolean;

  @Column
  createdBy!: number;
  @Column
  updatedBy!: number;
  @Column
  deletedBy!: number;

  toJSON(): any {
    const data = this.get();
    for (const x in data) {
      if (x === "availableQuantity") {
        if (data["availableQuantity"]) {
          data[x] = parseInt(data[x]) + data["virtualQuantity"];
        } else {
          data[x] = data["virtualQuantity"];
        }
      }
    }
    delete data["virtualQuantity"];
    return data;
  }
}

export default ProductVariations;
