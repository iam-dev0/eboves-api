import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  HasMany,
  Scopes,
  Default,
  AfterDestroy,
  HasOne,
  BelongsTo,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  IsUrl,
} from "sequelize-typescript";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "categories",
})
@Scopes({
  basic: {
    attributes: ["id", "name", "active", "createdAt"],
  },
  website: {
    attributes: ["id", "name", "slug","image"],
    where: { active: true },
  },
})
export class Categories extends Model<Categories> {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @ForeignKey(() => Categories)
  @Column
  categoryId!: number;

  @HasMany(() => Categories, { onDelete: "cascade", hooks: true })
  childrens!: Categories[];

  @BelongsTo(() => Categories)
  parent!: Categories;

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

  @Default(true)
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

  toggelChildes(): void {
    if (this.active) {
      Categories.findAll({ where: { categoryId: this.id } })
        .then((categories) => {
          for (const category of categories) {
            category.toggelChildes();
          }
          return categories;
        })
        .then((categories) => {
          Categories.update(
            { active: false },
            { where: { id: categories.map((cate) => cate.id) } }
          );
        });
    }
  }
  // @AfterDestroy()
  //Implemnt a hook to soft delete child
  // }
}

export default Categories;
