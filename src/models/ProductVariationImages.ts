import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
  } from "sequelize-typescript";
import Products from "./Products";
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
    @Column({
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataType.INTEGER.UNSIGNED
    })
    id!: number;
    
    @ForeignKey(() => ProductVariations)
    @Column
    productVariationId!: number;

    @Column
    image!: string;
  }
  
  export default ProductVariationsImages;