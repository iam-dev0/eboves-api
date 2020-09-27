import {
  Column,
  DataType,
  Model,
  Table,
  Scopes,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
, Default
} from "sequelize-typescript";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "brands",
})
@Scopes(() => ({
  basic: {
    attributes: ["id", "name", "active", "createdAt", "featured"],
  },
  website: {
    attributes: ["id", "name", "logo", "slug"],
    where: { active: true },
  },
}))
export class Brands extends Model<Brands> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column
  name!: string;

  
  @Column
  logo!: string;

  
  @Column
  image!: string;

  @Column
  storyText!: string;

  @Column
  storyTextColor!: string;

  
  @Column
  storyCover!: string;

  @Column
  featured!: boolean;

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

  @Default(false)
  @Column
  active!: boolean;

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

export default Brands;
