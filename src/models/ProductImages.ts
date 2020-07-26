import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
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
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER.UNSIGNED,
    })
    id!: number;
    
    @ForeignKey(() => Products)
    @Column
    productId!: number;

    @Column
    image!: string;
  }
  
  export default ProductsImages;