import {
  Column,
  DataType,
  Model,
  Table,
  Scopes,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
} from "sequelize-typescript";








@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: "Brands"
})
@Scopes(() => ({
  basic: {
    attributes:["id","name","active","createdAt","popularity"]
  },
  extends: {
    where: {primaryColor: "yellow"}
  }
}))
export class Brands extends Model<Brands> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column
  name!: string;

  @Column
  logo1!: string;

  @Column
  logo2!: string;

  @Column
  image!: string;



  @Column
  storyText!: string;

  @Column
  storyTextColor!: string;

  @Column
  storyCover!: string;


  @Column
  popularity!: boolean;

  @Column
  new!: boolean;



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
  active!: boolean;





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

export default Brands;