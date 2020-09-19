import {
    Column,
    DataType,
    Model,
    Table,
    Default,
    Scopes,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    IsUrl,
    IsEmail,
    NotNull,
  } from "sequelize-typescript";
  
  @Table({
    paranoid: false,
    timestamps: false,
    tableName: "contact_us",
  })
  @Scopes({
    website: {
      where: { active: true },
    },
  })

  export class ContactUs extends Model<ContactUs> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER.UNSIGNED,
    })
    id!: number;
  
    @NotNull
    @Column
    name!: string;
  
    @NotNull
    @IsEmail
    @Column
    email!: string;
  
    @NotNull
    @Column
    phone!: string;
  
    @NotNull
    @Column
    subject!: string;
  
    @NotNull
    @Column
    message!: string;
  
  }
  
  export default ContactUs;
  