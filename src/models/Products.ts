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
} from "sequelize-typescript";
import ProductsImages from "./ProductImages";
import ProductAttribute from "./ProductAttributes";
import Brands from "./Brands";
import Attributes from "./Attributes";
import ProductVariations from "./ProductVariations";
import Categories from "./Categories";
import Suppliers from "./Supplier";

@DefaultScope(() => ({
  attributes:{exclude:["deletedBy","createdBy","updatedBy","deletedAt"]},
}))
@Scopes(() => ({
  full: { attributes: { exclude: ["deletedAt"] } },
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
  category!: Categories;
  @BelongsTo(() => Suppliers)
  supplier!: Suppliers;
  @BelongsTo(() => Brands)
  brand!: Brands;

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

  @Default(false)
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
