import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
import Products from "./Products";
import Attributes from "./Attributes";
  
  
  
  
  
  
  


  
  @Table({
    defaultScope: {
      attributes: { exclude: ["deletedAt"] }
    },
    paranoid: false,
    timestamps:false,
    tableName: "product_attribute"
  })
  export class ProductAttribute extends Model<ProductAttribute> {
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

    @ForeignKey(() => Attributes)
    @Column
    attributeId!: number;


  }
  
  export default ProductAttribute;