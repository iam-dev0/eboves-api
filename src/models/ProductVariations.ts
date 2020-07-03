import {
  Column,
  DataType,
  Model,
  Table,
  Scopes,
  ForeignKey,
  Default,
  AllowNull,
} from "sequelize-typescript";
import Products from "./Products";

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
})
export class ProductVariations extends Model<ProductVariations> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(() => Products)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  productId!: number;

  @Column
  slug!: string;
  @Column({
    type: DataType.TEXT,
  })
  shortDescription!: string;

  @Column
  sku!: string;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  virtualQuantity!: number;
  @Column({
    type: DataType.DECIMAL,
  })
  price!: number;

  @Default(0)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  discountPercentage!: number;

  @Default(0)
  @Column({
    type: DataType.DECIMAL,
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
  preOrder!: boolean;

  @Default(true)
  @Column
  continue!: boolean;

  @Default(true)
  @Column
  active!: boolean;

  
  @Column
  createdBy!: number;
  @Column
  updatedBy!: number;
  @Column
  DeletedBy!: number;
}

export default ProductVariations;
