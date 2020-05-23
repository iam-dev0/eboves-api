import {
  Column,
  DataType,
  Model,
  Table,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  DefaultScope,
  Scopes
} from "sequelize-typescript";







@DefaultScope(() => ({
  attributes: ["id","name", "brandId","sku","productType","active","createdAt",]
}))
@Scopes(() => ({
  full: {
  },
  // yellow: {
  //   where: { brandId: "yellow" }
  // }
}))

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: "Products"
})
export class Products extends Model<Products> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  id!: number;

  @Column
  brandId!: number;

  @Column
  supplierId!: number;


  @Column
  attributeId!: number;

  @Column({
    unique: false,
    type: DataType.STRING
  })
  sku!: string;

  @Column({
    unique: false,
    type: DataType.STRING
  })
  productCode!: string;

  @Column({
    unique: false,
    type: DataType.STRING
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

  @Column({
    type: DataType.ENUM,
    values: ["Injesting", "Uploaded", "Processing", "Transcoded", "Failed"]
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