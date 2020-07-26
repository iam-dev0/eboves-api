module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      outletId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "outlets",
        },
      },
      supplierId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "suppliers",
        },
      },
      firstName: {
        type: DataTypes.STRING,
        comment: "Company Name",
      },
      lastName: {
        type: DataTypes.STRING,
      },
      slug: {
        unique: true,
        type: DataTypes.STRING,
      },
      designation: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        comment: "Contact person email",
      },
      emailVerifyAt: {
        type: DataTypes.DATE,
      },
      phone: {
        type: DataTypes.STRING,
        comment: "Contact person phone",
      },
      phoneVerifyAt: {
        type: DataTypes.DATE,
      },
      password: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM(["male", "female", "other"]),
      },
      DOB: {
        type: DataTypes.DATE,
      },
      image: {
        type: DataTypes.STRING,
      },
      active: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
      createdBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
        onDelete: "No Action",
      },

      updatedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
        onDelete: "No Action",
      },
      deletedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          key: "id",
          model: "users",
        },
        onDelete: "No Action",
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      charset: "utf8",
    }
  );
};

module.exports.down = (queryInterface) => queryInterface.dropTable("users");
