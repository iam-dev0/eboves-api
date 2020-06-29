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
  HasOne,
  BelongsTo,
} from "sequelize-typescript";
import ProductsImages from "./ProductImages";
import ProductAttribute from "./ProductAttributes";
import Brands from "./Brands";

@DefaultScope(() => ({
  attributes: [
    "id",
    "name",
    "brandId",
    "sku",
    "productType",
    "active",
    "createdAt",
  ],
}))
@Scopes(() => ({
  full: {},
  // yellow: {
  //   where: { brandId: "yellow" }
  // }
}))
@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "Products",
})
export class Products extends Model<Products> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(() => Brands)
  @Column
  brandId!: number;

  @BelongsTo(() => Brands)
  brand!: Brands;
  
  @Column
  supplierId!: number;

  @Column
  attributeId!: number;

  @Column({
    unique: false,
    type: DataType.STRING,
  })
  sku!: string;

  @HasMany(() => ProductAttribute)
  attributes!: ProductAttribute[];

  @HasMany(() => ProductsImages)
  images!: ProductsImages[];
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

  @Column({
    type: DataType.DECIMAL,
  })
  price!: number;

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

  @Default("eboves")
  @Column({
    type: DataType.ENUM,
    values: ["eboves", "supplier"],
  })
  productType!: string;

  @Column
  description!: string;

  @Column
  descriptionImage!: string;

  @Column({ type: DataType.TEXT })
  howToUse!: string;

  @Column
  name!: string;

  @Column
  active!: boolean;

  @Column
  commentsCount!: number;

  @Column({ type: DataType.DECIMAL })
  rating!: number;

  @Column
  createdBy!: number;
  @Column
  updatedBy!: number;
  @Column
  DeletedBy!: number;

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
