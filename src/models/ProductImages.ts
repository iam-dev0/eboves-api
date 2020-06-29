import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
  } from "sequelize-typescript";
import Products from "./Products";
  
  
  
  
  
  
  


  
  @Table({
    defaultScope: {
      attributes: { exclude: ["deletedAt"] }
    },
    paranoid: false,
    timestamps:false,
    tableName: "product_images"
  })
  export class ProductsImages extends Model<ProductsImages> {
    @Column({
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataType.INTEGER.UNSIGNED
    })
    id!: number;
    
    @ForeignKey(() => Products)
    @Column
    productId!: number;

    @Column
    image!: string;
  }
  
  export default ProductsImages;