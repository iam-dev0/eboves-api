import {
  Column,
  DataType,
  Model,
  Table,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  Scopes,
} from "sequelize-typescript";








@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: "Attributes"
})
@Scopes({
  basic: {
    attributes:["id","name","slug"]
  },
})
export class Attributes extends Model<Attributes> {
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

  @Column({
    type: DataType.ENUM,
    values:["text","image"],
  })
  type!: string;

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

export default Attributes;