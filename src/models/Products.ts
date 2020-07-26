import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  DefaultScope,
  Scopes,
  Default,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
  HasOne,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import ProductsImages from "./ProductImages";
import ProductAttribute from "./ProductAttributes";
import Brands from "./Brands";
import Attributes from "./Attributes";
import ProductVariations from "./ProductVariations";
import Categories from "./Categories";
import Suppliers from "./Supplier";

@DefaultScope(() => ({
  attributes: { exclude: ["deletedBy", "createdBy", "updatedBy", "deletedAt"] },
}))
@Scopes(() => ({
  full: { attributes: { exclude: ["deletedAt"] } },

  websiteListing: {
    attributes: [
      "id",
      "name",
      "mainImage",
      "bestSeller",
      "featured",
      "topRated",
      "rating",
      "commentsCount",
    ],
    include: [{ model: Brands.scope("website") }],
    where: { active: true },
  },
}))
@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "Products",
})
export class Products extends Model<Products> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column
  name!: string;

  @ForeignKey(() => Categories)
  @Column
  categoryId!: number;

  @ForeignKey(() => Brands)
  @Column
  brandId!: number;

  @ForeignKey(() => Suppliers)
  @Column
  supplierId!: number;

  @Column({
    unique: false,
    type: DataType.STRING,
  })
  productCode!: string;

  @Column({
    unique: false,
    type: DataType.STRING,
  })
  slug!: string;

  @BelongsToMany(() => Attributes, () => ProductAttribute)
  attributes!: Attributes[];

  @HasMany(() => ProductVariations)
  variations!: ProductVariations[];

  @HasMany(() => ProductsImages)
  images!: ProductsImages[];

  @BelongsTo(() => Categories)
  Category!: Categories;

  @BelongsTo(() => Suppliers)
  supplier!: Suppliers;
  @BelongsTo(() => Brands)
  brand!: Brands;

  @Default("eboves")
  @Column({
    type: DataType.ENUM,
    values: ["eboves", "supplier"],
  })
  productType!: string;

  @Column
  mainImage!: string;

  @Column
  description!: string;

  @Column
  descriptionImage!: string;

  @Column({ type: DataType.TEXT })
  howToUse!: string;

  @Default(false)
  @Column
  active!: boolean;

  @Default(false)
  @Column
  bestSeller!: boolean;
  @Default(false)
  @Column
  featured!: boolean;
  @Default(false)
  @Column
  topRated!: boolean;

  @Column
  commentsCount!: number;

  @Column({ type: DataType.DECIMAL })
  rating!: number;

  @Column({
    type: DataType.TEXT,
  })
  metaTitle!: string;

  @Column({
    type: DataType.TEXT,
  })
  metaKeywords!: string;

  @Column({
    type: DataType.TEXT,
  })
  metaDescription!: string;

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

export default Products;
