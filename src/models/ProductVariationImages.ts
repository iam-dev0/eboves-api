import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    IsUrl,
  } from "sequelize-typescript";
import ProductVariations from "./ProductVariations";
  
  
  
  
  
  
  


  
  @Table({
    defaultScope: {
      attributes: { exclude: ["deletedAt"] }
    },
    paranoid: false,
    timestamps:false,
    tableName: "product_variation_images"
  })
  export class ProductVariationsImages extends Model<ProductVariationsImages> {
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

    
    @Column
    image!: string;
  }
  
  export default ProductVariationsImages;