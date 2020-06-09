import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
} from "sequelize-typescript";


@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,

  tableName: "Categories",
})
export class Categories extends Model<Categories> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(() => Categories)
  @Column
  categoryId!: number;

  @Column({ unique: true })
  slug!: string;

  @Column
  name!: string;

  @Column
  image!: string;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  displayOrder!: number;

  @Column
  storyText!: string;

  @Column
  storyTextColor!: string;

  @Column
  storyCover!: string;

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

export default Categories;
