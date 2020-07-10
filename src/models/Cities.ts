import {
  Column,
  DataType,
  Model,
  Table,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
  ForeignKey,
} from "sequelize-typescript";
import Countries from "./Countries";

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] },
  },
  paranoid: true,
  tableName: "Cities",
})
export class Cities extends Model<Cities> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED,
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name!: string;

  @Column
  @ForeignKey(() => Countries)
  countryId!: number;

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

export default Cities;
